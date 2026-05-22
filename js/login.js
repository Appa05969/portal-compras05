// ════════════════════════════════════════════════════════════════════════════
//  ⚙️  CONFIGURAÇÃO MICROSOFT ENTRA ID (Azure AD / Microsoft 365)
// ════════════════════════════════════════════════════════════════════════════
//
//  COMO CONFIGURAR — siga estes passos no Azure Portal:
//  1. Acesse https://portal.azure.com → "Microsoft Entra ID" → "App registrations"
//  2. Clique "New registration":
//       • Name: Portal de Compras
//       • Supported account types: "Accounts in this organizational directory only"
//       • Redirect URI: Web → URL completa desta página (ex: https://seusite.com/login.html)
//  3. Após criar, copie:
//       • Application (client) ID  → cole em CLIENT_ID abaixo
//       • Directory (tenant) ID    → cole em TENANT_ID abaixo
//  4. Em "Authentication" → "Implicit grant": marque "Access tokens" e "ID tokens"
//  5. Em "API permissions" → Add: Microsoft Graph → Delegated → User.Read → Grant admin consent
//
// ════════════════════════════════════════════════════════════════════════════
var AZURE = {
  CLIENT_ID:    'SEU_CLIENT_ID_AQUI',     // ← colar Application (client) ID
  TENANT_ID:    'SEU_TENANT_ID_AQUI',     // ← colar Directory (tenant) ID
  REDIRECT_URI: window.location.origin + window.location.pathname,  // ajuste se necessário
};
// ════════════════════════════════════════════════════════════════════════════

var MSAL_SCOPES = ['openid', 'profile', 'email', 'User.Read'];

// Detecta se o app foi configurado (substitua os placeholders acima)
var MSAL_READY = (
  AZURE.CLIENT_ID !== 'SEU_CLIENT_ID_AQUI' &&
  AZURE.TENANT_ID !== 'SEU_TENANT_ID_AQUI'
);

// ── MSAL instance ─────────────────────────────────────────────────────────────
var msalApp = null;

function getMsalApp() {
  if (msalApp) return msalApp;
  msalApp = new msal.PublicClientApplication({
    auth: {
      clientId:    AZURE.CLIENT_ID,
      authority:   'https://login.microsoftonline.com/' + AZURE.TENANT_ID,
      redirectUri: AZURE.REDIRECT_URI,
      postLogoutRedirectUri: AZURE.REDIRECT_URI,
    },
    cache: {
      cacheLocation: 'sessionStorage',
      storeAuthStateInCookie: false,
    },
    system: {
      loggerOptions: {
        logLevel: msal.LogLevel.Warning,
        loggerCallback: function(level, message) {
          if (level <= msal.LogLevel.Warning) console.warn('[MSAL]', message);
        },
      },
    },
  });
  return msalApp;
}

// ── Microsoft Login Flow ─────────────────────────────────────────────────────
async function loginMicrosoft() {
  var btn = document.getElementById('btn-microsoft');

  if (!MSAL_READY) {
    document.getElementById('config-badge').classList.add('show');
    btn.style.borderColor = 'var(--accent2)';
    setTimeout(function() { btn.style.borderColor = ''; }, 3000);
    return;
  }

  btn.disabled = true;
  btn.classList.add('loading');
  clearMsError();

  try {
    var app = getMsalApp();

    // Handle any pending redirect first
    await app.handleRedirectPromise();

    // Try popup login (fallback to redirect if popup blocked)
    var loginResponse;
    try {
      loginResponse = await app.loginPopup({
        scopes: MSAL_SCOPES,
        prompt: 'select_account',
      });
    } catch (popupErr) {
      // If popup was blocked by browser, fall back to redirect
      if (popupErr.errorCode === 'popup_window_error' ||
          popupErr.name === 'BrowserAuthError') {
        await app.loginRedirect({ scopes: MSAL_SCOPES, prompt: 'select_account' });
        return; // page will reload after redirect
      }
      throw popupErr;
    }

    await handleMsalSuccess(loginResponse);

  } catch (err) {
    btn.disabled = false;
    btn.classList.remove('loading');

    var msg = 'Erro ao conectar com a Microsoft.';
    if (err.errorCode === 'user_cancelled' || err.message === 'user_cancelled') {
      msg = 'Login cancelado pelo usuário.';
    } else if (err.errorCode === 'interaction_in_progress') {
      msg = 'Uma janela de autenticação já está aberta.';
    } else if (err.errorCode === 'consent_required') {
      msg = 'É necessário conceder permissões ao aplicativo. Contacte o administrador.';
    } else if (err.message) {
      msg = err.message;
    }
    showError(msg, null);
    console.error('[MSAL Error]', err);
  }
}

// ── Handle successful MSAL authentication ────────────────────────────────────
async function handleMsalSuccess(loginResponse) {
  var account = loginResponse.account;
  var userData = {
    nome:     account.name    || account.username.split('@')[0],
    email:    account.username,
    oid:      account.localAccountId,
    tenantId: account.tenantId,
    provider: 'microsoft365',
    fotoUrl:  null,
    cargo:    '',
    depto:    '',
  };

  // Fetch extra profile data from Microsoft Graph
  try {
    var app = getMsalApp();
    var tokenRes = await app.acquireTokenSilent({
      scopes:  ['User.Read'],
      account: account,
    });

    var graphRes = await fetch(
      'https://graph.microsoft.com/v1.0/me?$select=id,displayName,mail,userPrincipalName,jobTitle,department,officeLocation',
      { headers: { Authorization: 'Bearer ' + tokenRes.accessToken } }
    );

    if (graphRes.ok) {
      var g = await graphRes.json();
      userData.nome  = g.displayName || userData.nome;
      userData.email = g.mail || g.userPrincipalName || userData.email;
      userData.cargo = g.jobTitle        || '';
      userData.depto = g.department      || '';
      userData.local = g.officeLocation  || '';
    }

    // Try to get profile photo (optional — may fail if not licensed)
    try {
      var photoRes = await fetch('https://graph.microsoft.com/v1.0/me/photo/$value', {
        headers: { Authorization: 'Bearer ' + tokenRes.accessToken }
      });
      if (photoRes.ok) {
        var blob = await photoRes.blob();
        userData.fotoUrl = URL.createObjectURL(blob);
      }
    } catch(_) { /* foto opcional */ }

  } catch (graphErr) {
    console.warn('[Graph] Erro ao buscar perfil:', graphErr);
  }

  // ── Persist session ──────────────────────────────────────────────────────
  sessionStorage.setItem('portal_user',    JSON.stringify(userData));
  sessionStorage.setItem('portal_auth_ts', Date.now().toString());

  // ── Show success state ───────────────────────────────────────────────────
  document.getElementById('user-name-ok').textContent = userData.nome;
  document.getElementById('auth-provider-badge').innerHTML =
    '<div class="ms-success-badge">' +
    '<svg width="14" height="14" viewBox="0 0 21 21"><rect x="1" y="1" width="9" height="9" fill="#f25022"/><rect x="11" y="1" width="9" height="9" fill="#7fba00"/><rect x="1" y="11" width="9" height="9" fill="#00a4ef"/><rect x="11" y="11" width="9" height="9" fill="#ffb900"/></svg>' +
    ' Autenticado via Microsoft 365' +
    '</div>';
  document.getElementById('form-state').style.display = 'none';
  document.getElementById('success-state').classList.add('show');

  // Auto redirect after 2s
  setTimeout(function() { window.location.href = 'menu-inicial.html'; }, 2000);
}

// ── Handle redirect response on page load (fallback flow) ────────────────────
async function checkRedirectResult() {
  if (!MSAL_READY) {
    document.getElementById('config-badge').classList.add('show');
    return;
  }
  try {
    var app = getMsalApp();
    var result = await app.handleRedirectPromise();
    if (result) {
      await handleMsalSuccess(result);
    }
  } catch (err) {
    console.warn('[MSAL redirect]', err);
  }
}

// ── Utility: clear Microsoft error ───────────────────────────────────────────
function clearMsError() {
  var el = document.getElementById('error-msg');
  if (el) el.classList.remove('show');
  var emailEl = document.getElementById('email');
  var senhaEl = document.getElementById('senha');
  if (emailEl) emailEl.classList.remove('error');
  if (senhaEl) senhaEl.classList.remove('error');
}

// ════════════════════════════════════════════════════════════════════════════
//  SESSION UTILITY — disponível para todas as outras páginas do portal
//
//  Como usar em outra página:
//
//    // Verificar se usuário está autenticado
//    var user = JSON.parse(sessionStorage.getItem('portal_user') || 'null');
//    if (!user) window.location.href = 'login.html'; // redireciona se não logado
//
//    // Exibir nome do usuário
//    document.getElementById('user-name').textContent = user.nome;
//
//    // Logout
//    function logout() {
//      sessionStorage.removeItem('portal_user');
//      sessionStorage.removeItem('portal_auth_ts');
//      window.location.href = 'login.html';
//    }
// ════════════════════════════════════════════════════════════════════════════

  // Toggle password visibility
  document.getElementById('pw-toggle').addEventListener('click', function() {
    var inp = document.getElementById('senha');
    var isVisible = inp.type === 'text';
    inp.type = isVisible ? 'password' : 'text';
    this.textContent = isVisible ? '👁' : '🙈';
  });

  // Enter key on inputs triggers login
  ['email','senha'].forEach(function(id) {
    document.getElementById(id).addEventListener('keydown', function(e) {
      if (e.key === 'Enter') handleLogin();
    });
  });

  // Simulate local login (mantido como fallback)
  function handleLogin() {
    var email = document.getElementById('email').value.trim();
    var senha  = document.getElementById('senha').value;
    var btn    = document.getElementById('btn-submit');

    clearMsError();

    if (!email) { showError('Informe seu e-mail corporativo.', 'email'); return; }
    if (!email.includes('@')) { showError('Informe um e-mail válido.', 'email'); return; }
    if (!senha) { showError('Informe sua senha.', 'senha'); return; }

    btn.classList.add('loading');
    btn.disabled = true;

    setTimeout(function() {
      btn.classList.remove('loading');
      btn.disabled = false;

      // Demo: qualquer e-mail + senha "123456" — substitua por chamada real à sua API/backend
      if (senha === '123456') {
        var userName = email.split('@')[0].replace('.', ' ');
        userName = userName.replace(/\b\w/g, function(c){ return c.toUpperCase(); });

        // Salva sessão local (mesmo padrão do Microsoft auth)
        var userData = { nome: userName, email: email, provider: 'local' };
        sessionStorage.setItem('portal_user',    JSON.stringify(userData));
        sessionStorage.setItem('portal_auth_ts', Date.now().toString());

        document.getElementById('user-name-ok').textContent = userName;
        document.getElementById('auth-provider-badge').innerHTML =
          '<div style="font-size:11px;color:var(--muted);margin-top:6px">Acesso via e-mail e senha</div>';
        document.getElementById('form-state').style.display = 'none';
        document.getElementById('success-state').classList.add('show');
      } else {
        showError('E-mail ou senha inválidos. Tente novamente.', 'senha');
      }
    }, 1400);
  }

  function showError(msg, fieldId) {
    var errEl  = document.getElementById('error-msg');
    var errTxt = document.getElementById('error-text');
    if (errTxt) errTxt.textContent = msg;
    if (errEl)  errEl.classList.add('show');
    if (fieldId) {
      var el = document.getElementById(fieldId);
      if (el) { el.classList.add('error'); el.focus(); }
    }
  }

  // Check for MSAL redirect on page load
  checkRedirectResult();

  document.getElementById('pw-toggle').addEventListener('click', function() {
    var inp = document.getElementById('senha');
    var isVisible = inp.type === 'text';
    inp.type = isVisible ? 'password' : 'text';
    this.textContent = isVisible ? '👁' : '🙈';
  });

  // Enter key on inputs triggers login
  ['email','senha'].forEach(function(id) {
    document.getElementById(id).addEventListener('keydown', function(e) {
      if (e.key === 'Enter') handleLogin();
    });
  });

  // Simulate login
  function handleLogin() {
    var email = document.getElementById('email').value.trim();
    var senha  = document.getElementById('senha').value;
    var btn    = document.getElementById('btn-submit');
    var errEl  = document.getElementById('error-msg');
    var errTxt = document.getElementById('error-text');

    // Clear errors
    errEl.classList.remove('show');
    document.getElementById('email').classList.remove('error');
    document.getElementById('senha').classList.remove('error');

    // Validation
    if (!email) {
      showError('Informe seu e-mail corporativo.', 'email');
      return;
    }
    if (!email.includes('@')) {
      showError('Informe um e-mail válido.', 'email');
      return;
    }
    if (!senha) {
      showError('Informe sua senha.', 'senha');
      return;
    }

    // Simulate loading
    btn.classList.add('loading');
    btn.disabled = true;

    setTimeout(function() {
      btn.classList.remove('loading');
      btn.disabled = false;

      // Demo credentials: qualquer email com senha "123456"
      if (senha === '123456') {
        var userName = email.split('@')[0].replace('.', ' ');
        userName = userName.replace(/\b\w/g, function(c){ return c.toUpperCase(); });
        document.getElementById('user-name-ok').textContent = userName;
        document.getElementById('form-state').style.display = 'none';
        document.getElementById('success-state').classList.add('show');
      } else {
        showError('E-mail ou senha inválidos. Tente novamente.', 'senha');
      }
    }, 1400);
  }

  function showError(msg, fieldId) {
    var errEl  = document.getElementById('error-msg');
    var errTxt = document.getElementById('error-text');
    errTxt.textContent = msg;
    errEl.classList.add('show');
    if (fieldId) document.getElementById(fieldId).classList.add('error');
    document.getElementById(fieldId || 'email').focus();
  }
