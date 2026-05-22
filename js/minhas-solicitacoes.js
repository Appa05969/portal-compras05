// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
var PRODUTOS_SAMPLE = [
  {cod:'1010101000',nome:'LUVA LATEX AMARELA TAM P',         cat:'EPI',                   unid:'PR'},
  {cod:'1010158000',nome:'LUVA NITRILICA M',                 cat:'EPI',                   unid:'PR'},
  {cod:'1010186000',nome:'LUVA VERNIZ SILVER AMARELA P',     cat:'EPI',                   unid:'PR'},
  {cod:'1020127000',nome:'CONE LARANJA E BRANCO 75 CM',      cat:'EPC / UNIFORMES',       unid:'UN'},
  {cod:'1020138002',nome:'CAMISA ALGODAO M/C AZUL MARINHO G',cat:'EPC / UNIFORMES',       unid:'UN'},
  {cod:'1020129000',nome:'FITA DEMARC. ZEBRADA 14MTS',       cat:'EPC / UNIFORMES',       unid:'UN'},
  {cod:'1040122000',nome:'ASPIRADOR VERTICAL',               cat:'EQUIPAMENTOS/MÁQUINAS', unid:'UN'},
  {cod:'1040134000',nome:'FOICE',                            cat:'EQUIPAMENTOS/MÁQUINAS', unid:'UN'},
  {cod:'1040143000',nome:'MANGUEIRA FLEX 3/4 100 MTS',       cat:'EQUIPAMENTOS/MÁQUINAS', unid:'UN'},
  {cod:'1050102000',nome:'SILK SCREEN FRENTE',               cat:'SERVIÇOS - UNIFORMES',  unid:'UN'},
  {cod:'1050201002',nome:'SERVIÇO DE LAVANDERIA',            cat:'SERVIÇOS - UNIFORMES',  unid:'SV'},
  {cod:'1120301000',nome:'CAMISA POLO MC CINZA P',           cat:'CAMISETA/CAMISA',       unid:'UN'},
  {cod:'1120109002',nome:'CAMISETA MC AZ. MARINHO G',        cat:'CAMISETA/CAMISA',       unid:'UN'},
  {cod:'1130201000',nome:'CARDIGAN PRETO MASCULINO P',       cat:'BLUSA / CARDIGAN',      unid:'UN'},
  {cod:'1140101000',nome:'BLAZER FEM. PRETO PP/36',          cat:'BLAZER/PALETÓ/JAQUETA', unid:'UN'},
  {cod:'1150101000',nome:'CALCA BRIM CINZA SEM BOLSO P/38',  cat:'CALÇA',                 unid:'UN'},
  {cod:'1160101001',nome:'MEIA SOCIAL MASCULINA',            cat:'MEIA',                  unid:'UN'},
  {cod:'1170102002',nome:'SAPATO SOCIAL FEMINIO 35',         cat:'CALÇADOS',              unid:'UN'},
  {cod:'1210101002',nome:'AVENTAL ML BRANCO G',              cat:'AVENTAL',               unid:'UN'},
];

var UNIDADES = ['APPA SERVICOS TEMPORARIOS','AGGE SERVIÇOS','APPA SERVICOS TEMPORARIOS - MG','APPA SERVICOS TEMPORARIOS - RJ','APPA SERVICOS TEMPORARIOS - PR','APPA SERVICOS TEMPORARIOS-SUZ'];
var DESTINOS = ['SEBRAE MG 2099','FIOCRUZ RJ 360','TRT MG 449','FUNDACENTRO SP 457','HOSPITAL ODILON MG 238','PRF SP 447','IF SALTO SP 609','ZOOLOGICO MG 679','RAYFLEX SP 603','FUNDAÇÃO SAUDE RJ 2028'];
var COMPRADORES = ['THAIS CAMARGO','DANIELA DOS SANTOS VIEIRA','WENDEL GALVINO','KARLA RAFAELA DA SILVA SANTOS'];
var TIPO_JUST = ['Padrão','Mensal','Reposição de Estoque','Complementar','Urgente','Implantação'];
var STATUS_W = ['Pendente','Pendente','Em análise','Em análise','Aprovado','Aprovado','Aprovado','Recusado','Cancelado','Rascunho'];
var PRIO_W   = ['Normal','Normal','Normal','Urgente','Baixa'];

// Seeded random
var seed = 7;
function rnd(){seed=(seed*1664525+1013904223)&0xFFFFFFFF;return(seed>>>0)/0xFFFFFFFF;}
function pick(arr){return arr[Math.floor(rnd()*arr.length)];}
function rndInt(a,b){return a+Math.floor(rnd()*(b-a+1));}
function pad2(n){return String(n).padStart(2,'0');}
function pad6(n){return '#'+String(n).padStart(6,'0');}

// Generate mock solicitations
var SOLICITATIONS = (function(){
  var list = [];
  var statusOptions = ['Pendente','Em análise','Aprovado','Aprovado','Aprovado','Recusado','Cancelado','Rascunho'];
  for(var i=1; i<=28; i++){
    var month = Math.min(5, Math.ceil(i/6));
    var day   = rndInt(1,27);
    var date  = '2026-'+pad2(month)+'-'+pad2(day);
    var status = statusOptions[Math.floor(rnd()*statusOptions.length)];
    var prio   = PRIO_W[Math.floor(rnd()*PRIO_W.length)];
    var nItens = rndInt(2,8);
    var itens  = [];
    for(var j=0;j<nItens;j++){
      var p = PRODUTOS_SAMPLE[Math.floor(rnd()*PRODUTOS_SAMPLE.length)];
      itens.push({cod:p.cod,nome:p.nome,cat:p.cat,unid:p.unid,qty:rndInt(1,20)});
    }
    var analises = [];
    if(status === 'Em análise' || status === 'Aprovado' || status === 'Recusado'){
      analises.push({data:date,acao:'Recebido',obs:'Solicitação recebida pelo comprador.'});
    }
    if(status === 'Aprovado'){
      analises.push({data:date,acao:'Aprovado',obs:'Solicitação aprovada conforme orçamento.'});
    }
    if(status === 'Recusado'){
      analises.push({data:date,acao:'Recusado',obs:'Item fora da categoria autorizada para o período.'});
    }
    var dataNec = '';
    if(rnd() > 0.4){
      var dMonth = Math.min(6, month+rndInt(0,1));
      dataNec = '2026-'+pad2(dMonth)+'-'+pad2(rndInt(1,28));
    }
    list.push({
      id: i,
      numero: pad6(i),
      data: date,
      dataNec: dataNec,
      status: status,
      prio: prio,
      unidLanc: pick(UNIDADES),
      unidSolic: pick(UNIDADES),
      destino: pick(DESTINOS),
      comprador: pick(COMPRADORES),
      tipoJust: pick(TIPO_JUST),
      just: rnd() > 0.5 ? 'Reposição mensal conforme cronograma de fornecimento aprovado.' : 'Material necessário para continuidade das operações no contrato.',
      obs: rnd() > 0.6 ? 'Entregar na portaria até as 16h.' : '',
      central: '405 | APPA SERVICOS TEMPORARIOS-SUZ',
      itens: itens,
      analises: analises,
    });
  }
  return list;
})();

// ─────────────────────────────────────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────────────────────────────────────
var VIEW_MODE = 'list'; // list | grid
var cancelTarget = null;

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function fmtDate(d){if(!d)return'—';var p=d.split('-');return p[2]+'/'+p[1]+'/'+p[0];}
function statusCls(s){
  var m={Pendente:'pendente','Em análise':'analise',Aprovado:'aprovado',Recusado:'recusado',Cancelado:'cancelado',Rascunho:'rascunho'};
  return m[s]||'pendente';
}
function cardCls(s){
  var m={Pendente:'s-pendente','Em análise':'s-analise',Aprovado:'s-aprovado',Recusado:'s-recusado',Cancelado:'s-cancelado',Rascunho:'s-rascunho'};
  return m[s]||'s-pendente';
}
function prioCls(p){return({Urgente:'urgente',Normal:'normal',Baixa:'baixa'})[p]||'normal';}
function totalQty(itens){return itens.reduce(function(s,i){return s+i.qty;},0);}

function badge(s){return '<span class="sbadge '+statusCls(s)+'">'+s+'</span>';}
function pbadge(p){return '<span class="pbadge '+prioCls(p)+'">'+p+'</span>';}

function daysDiff(d){
  var diff = (new Date() - new Date(d+'T12:00'))/86400000;
  if(diff < 1) return 'Hoje';
  if(diff < 2) return 'Ontem';
  return Math.round(diff)+'d atrás';
}

// ─────────────────────────────────────────────────────────────────────────────
// KPI
// ─────────────────────────────────────────────────────────────────────────────
function renderKPIs(data){
  var total   = data.length;
  var pend    = data.filter(function(s){return s.status==='Pendente';}).length;
  var analise = data.filter(function(s){return s.status==='Em análise';}).length;
  var aprov   = data.filter(function(s){return s.status==='Aprovado';}).length;
  var recus   = data.filter(function(s){return s.status==='Recusado'||s.status==='Cancelado';}).length;
  var qtdItens= SOLICITATIONS.reduce(function(s,sol){return s+sol.itens.length;},0);

  document.getElementById('kpi-row').innerHTML =
    kpi('green','Total de Pedidos',total,'📋',aprov+' aprovados')+
    kpi('orange','Pendentes',pend,'⏳',analise+' em análise')+
    kpi('blue','Em Análise',analise,'🔍','Aguardando retorno')+
    kpi('green','Aprovados',aprov,'✅',Math.round(aprov/Math.max(total,1)*100)+'% dos pedidos')+
    kpi('red','Recusados/Canc.',recus,'❌',Math.round(recus/Math.max(total,1)*100)+'% dos pedidos');
}
function kpi(cls,label,val,icon,sub){
  return '<div class="kpi '+cls+'">'
    +'<div class="kpi-label">'+label+'</div>'
    +'<div class="kpi-val">'+val+'</div>'
    +'<div class="kpi-sub">'+sub+'</div>'
    +'<div class="kpi-icon">'+icon+'</div>'
    +'</div>';
}

// ─────────────────────────────────────────────────────────────────────────────
// FILTER
// ─────────────────────────────────────────────────────────────────────────────
function filtered(){
  var q      = (document.getElementById('search').value||'').toLowerCase();
  var fSt    = document.getElementById('f-status').value;
  var fPr    = document.getElementById('f-prio').value;
  var fPer   = parseInt(document.getElementById('f-period').value)||0;
  var cutoff = fPer ? new Date(Date.now()-fPer*86400000) : null;

  return SOLICITATIONS.filter(function(s){
    if(fSt  && s.status !== fSt)  return false;
    if(fPr  && s.prio   !== fPr)  return false;
    if(cutoff && new Date(s.data+'T12:00') < cutoff) return false;
    if(q){
      var hay = (s.numero+s.destino+s.unidSolic+s.comprador+s.tipoJust+s.just+
        s.itens.map(function(i){return i.nome;}).join(' ')).toLowerCase();
      if(!hay.includes(q)) return false;
    }
    return true;
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// RENDER
// ─────────────────────────────────────────────────────────────────────────────
function render(){
  var data = filtered();
  renderKPIs(data);
  document.getElementById('results-count').textContent = data.length + ' solicitaç' + (data.length===1?'ão':'ões');

  var container = document.getElementById('cards-container');

  if(data.length === 0){
    container.innerHTML =
      '<div class="empty">'
      +'<div class="empty-icon">📭</div>'
      +'<div class="empty-title">Nenhuma solicitação encontrada</div>'
      +'<div class="empty-sub">Tente remover os filtros ou crie uma nova solicitação de compra.</div>'
      +'<button class="ca-btn green" onclick="window.location.href=\'portal.html\'">+ Nova Solicitação</button>'
      +'</div>';
    return;
  }

  if(VIEW_MODE === 'grid'){
    container.className = 'cards-grid';
    container.innerHTML = data.map(gridCard).join('');
  } else {
    container.className = 'cards-list';
    container.innerHTML = data.map(listCard).join('');
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// CARD TEMPLATES
// ─────────────────────────────────────────────────────────────────────────────
function listCard(s){
  var cls = cardCls(s.status);
  var canCancel = s.status==='Pendente'||s.status==='Rascunho';
  var itensHtml = s.itens.slice(0,5).map(function(it){
    return '<tr>'
      +'<td>'+it.cod+'</td>'
      +'<td style="max-width:260px;overflow:hidden;text-overflow:ellipsis">'+it.nome+'</td>'
      +'<td>'+it.cat+'</td>'
      +'<td style="text-align:center">'+it.qty+' '+it.unid+'</td>'
      +'</tr>';
  }).join('');
  if(s.itens.length>5) itensHtml += '<tr><td colspan="4" style="color:var(--muted);font-style:italic">+ '+(s.itens.length-5)+' item(ns) não exibido(s)…</td></tr>';

  var timelineHtml = buildTimeline(s.status);

  return '<div class="sol-card '+cls+'" id="card-'+s.id+'">'

    // Main row (always visible)
    +'<div class="card-main" onclick="toggleCard('+s.id+')">'
      +'<div class="card-num">'+s.numero+'</div>'
      +'<div class="card-body">'
        +'<div class="card-title">'
          +s.destino
          +' '+badge(s.status)
          +' '+pbadge(s.prio)
        +'</div>'
        +'<div class="card-meta">'
          +'<span class="card-meta-item">🏢 '+s.unidSolic+'</span>'
          +'<span class="card-meta-item">👤 '+s.comprador+'</span>'
          +'<span class="card-meta-item">📦 '+s.itens.length+' item(ns) · '+totalQty(s.itens)+' un.</span>'
          +(s.dataNec?'<span class="card-meta-item">📅 Necessário até '+fmtDate(s.dataNec)+'</span>':'')
        +'</div>'
      +'</div>'
      +'<div class="card-right">'
        +'<div class="card-date">'+fmtDate(s.data)+'</div>'
        +'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>'
      +'</div>'
    +'</div>'

    // Expandable area
    +'<div class="card-expand">'
      +timelineHtml

      +'<div class="expand-grid">'
        +'<div class="expand-field"><span class="ef-label">Unid. Lançamento</span><span class="ef-val">'+s.unidLanc+'</span></div>'
        +'<div class="expand-field"><span class="ef-label">Unid. Solicitante</span><span class="ef-val">'+s.unidSolic+'</span></div>'
        +'<div class="expand-field"><span class="ef-label">Central de Compras</span><span class="ef-val">'+s.central+'</span></div>'
        +'<div class="expand-field"><span class="ef-label">Tipo Justificativa</span><span class="ef-val">'+s.tipoJust+'</span></div>'
        +'<div class="expand-field"><span class="ef-label">Data Lançamento</span><span class="ef-val">'+fmtDate(s.data)+'</span></div>'
        +(s.dataNec?'<div class="expand-field"><span class="ef-label">Necessário até</span><span class="ef-val">'+fmtDate(s.dataNec)+'</span></div>':'<div></div>')
        +(s.just?'<div class="expand-field" style="grid-column:1/-1"><span class="ef-label">Justificativa</span><span class="ef-val">'+s.just+'</span></div>':'')
        +(s.obs?'<div class="expand-field" style="grid-column:1/-1"><span class="ef-label">Observações</span><span class="ef-val">'+s.obs+'</span></div>':'')
      +'</div>'

      +'<div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);margin-bottom:8px">Itens do Pedido</div>'
      +'<table class="items-table">'
        +'<thead><tr><th>Código</th><th>Produto</th><th>Categoria</th><th style="text-align:center">Qtd</th></tr></thead>'
        +'<tbody>'+itensHtml+'</tbody>'
      +'</table>'

      +'<div class="card-actions">'
        +'<button class="ca-btn blue" onclick="openDetail('+s.id+');event.stopPropagation()">🔍 Ver detalhes</button>'
        +(canCancel?'<button class="ca-btn red" onclick="openConfirm('+s.id+');event.stopPropagation()">✕ Cancelar</button>':'')
        +(s.status==='Aprovado'?'<button class="ca-btn" onclick="exportSingle('+s.id+');event.stopPropagation()">📥 Exportar</button>':'')
        +'<button class="ca-btn" onclick="duplicateSol('+s.id+');event.stopPropagation()">⊕ Duplicar</button>'
      +'</div>'
    +'</div>'

  +'</div>';
}

function gridCard(s){
  var cls = cardCls(s.status);
  return '<div class="sol-card '+cls+'" onclick="openDetail('+s.id+')">'
    +'<div class="card-main" style="grid-template-columns:1fr auto">'
      +'<div class="card-body">'
        +'<div style="font-size:11px;color:var(--muted);font-weight:700;margin-bottom:4px">'+s.numero+' · '+fmtDate(s.data)+'</div>'
        +'<div class="card-title" style="font-size:13px;margin-bottom:6px">'+s.destino+'</div>'
        +'<div style="margin-bottom:8px">'+badge(s.status)+' '+pbadge(s.prio)+'</div>'
        +'<div class="card-meta">'
          +'<span class="card-meta-item">📦 '+s.itens.length+' item(ns)</span>'
          +'<span class="card-meta-item">👤 '+s.comprador.split(' ')[0]+'</span>'
        +'</div>'
      +'</div>'
      +'<div style="font-size:22px;opacity:.15;align-self:center">📋</div>'
    +'</div>'
  +'</div>';
}

function buildTimeline(status){
  var steps = [
    {label:'Criado',     icon:'✓'},
    {label:'Em análise', icon:'🔍'},
    {label:'Decisão',    icon:'📋'},
  ];
  var doneIdx = 0;
  var failIdx = -1;
  if(status==='Em análise'){doneIdx=1;}
  else if(status==='Aprovado'){doneIdx=2;}
  else if(status==='Recusado'){doneIdx=1;failIdx=2;}
  else if(status==='Cancelado'){doneIdx=0;}

  var html = '<div class="timeline" style="margin-bottom:14px">';
  steps.forEach(function(st,i){
    var cls = 'inactive';
    if(failIdx===i) cls='fail';
    else if(i<doneIdx) cls='done';
    else if(i===doneIdx) cls='active';
    html += '<div class="tl-step '+cls+'">'
      +'<div class="tl-dot">'+(cls==='done'?'✓':cls==='fail'?'✕':st.icon)+'</div>'
      +'<div class="tl-label">'+st.label+'</div>'
    +'</div>';
  });
  return html+'</div>';
}

// ─────────────────────────────────────────────────────────────────────────────
// INTERACTIONS
// ─────────────────────────────────────────────────────────────────────────────
function toggleCard(id){
  var card = document.getElementById('card-'+id);
  if(!card) return;
  var wasOpen = card.classList.contains('open');
  document.querySelectorAll('.sol-card.open').forEach(function(c){c.classList.remove('open');});
  if(!wasOpen) card.classList.add('open');
}

function openDetail(id){
  var s = SOLICITATIONS.find(function(x){return x.id===id;});
  if(!s) return;
  document.getElementById('m-title').textContent = 'Solicitação '+s.numero;
  document.getElementById('m-subtitle').textContent = s.destino+' · '+fmtDate(s.data)+' · '+badge(s.status);
  document.getElementById('m-subtitle').innerHTML = s.destino+' · '+fmtDate(s.data)+' · '+badge(s.status)+' '+pbadge(s.prio);

  var itensRows = s.itens.map(function(it,idx){
    return '<tr>'
      +'<td style="color:var(--muted)">'+(idx+1)+'</td>'
      +'<td style="font-family:monospace;font-size:11px">'+it.cod+'</td>'
      +'<td><strong>'+it.nome+'</strong><br><span style="font-size:10px;color:var(--muted)">'+it.cat+'</span></td>'
      +'<td style="text-align:center;font-weight:700">'+it.qty+'</td>'
      +'<td>'+it.unid+'</td>'
      +'</tr>';
  }).join('');

  var analiseRows = s.analises.length
    ? s.analises.map(function(a){
        return '<div style="display:flex;gap:12px;align-items:flex-start;padding:10px 0;border-bottom:1px solid var(--border)">'
          +'<div style="width:8px;height:8px;border-radius:50%;background:var(--accent);margin-top:5px;flex-shrink:0"></div>'
          +'<div><div style="font-size:12px;font-weight:700">'+a.acao+'</div>'
          +'<div style="font-size:11px;color:var(--muted)">'+a.obs+'</div></div>'
          +'</div>';
      }).join('')
    : '<div style="font-size:12px;color:var(--muted);padding:8px 0">Nenhuma análise registrada ainda.</div>';

  var body =
    buildTimeline(s.status)
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:20px">'
      +mf('Número',s.numero)+mf('Data Lançamento',fmtDate(s.data))
      +mf('Unid. Lançamento',s.unidLanc)+mf('Unid. Solicitante',s.unidSolic)
      +mf('Destino',s.destino)+mf('Comprador',s.comprador)
      +mf('Tipo Justificativa',s.tipoJust)+mf('Prioridade',s.prio)
      +(s.dataNec?mf('Necessário até',fmtDate(s.dataNec)):'')
      +(s.just?'<div style="grid-column:1/-1">'+mf('Justificativa',s.just)+'</div>':'')
      +(s.obs?'<div style="grid-column:1/-1">'+mf('Observações',s.obs)+'</div>':'')
    +'</div>'
    +'<div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);margin-bottom:10px">📦 Itens do Pedido ('+s.itens.length+' produto(s) · '+totalQty(s.itens)+' un. total)</div>'
    +'<table class="items-table" style="margin-bottom:20px">'
      +'<thead><tr><th>#</th><th>Código</th><th>Produto / Categoria</th><th>Qtd</th><th>Unid.</th></tr></thead>'
      +'<tbody>'+itensRows+'</tbody>'
    +'</table>'
    +'<div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);margin-bottom:8px">🕐 Histórico de Análise</div>'
    +'<div>'+analiseRows+'</div>';

  document.getElementById('modal-body-content').innerHTML = body;
  document.getElementById('modal-detail').classList.add('open');
}

function mf(label,val){
  return '<div class="expand-field"><span class="ef-label">'+label+'</span><span class="ef-val">'+val+'</span></div>';
}

function closeModal(){document.getElementById('modal-detail').classList.remove('open');}

function openConfirm(id){
  var s = SOLICITATIONS.find(function(x){return x.id===id;});
  if(!s) return;
  cancelTarget = id;
  document.getElementById('confirm-num').textContent = s.numero;
  document.getElementById('modal-confirm').classList.add('open');
}
function closeConfirm(){document.getElementById('modal-confirm').classList.remove('open');cancelTarget=null;}
function doCancel(){
  if(!cancelTarget) return;
  var s = SOLICITATIONS.find(function(x){return x.id===cancelTarget;});
  if(s){ s.status='Cancelado'; s.analises.push({data:new Date().toISOString().slice(0,10),acao:'Cancelado',obs:'Cancelado pelo solicitante.'}); }
  closeConfirm();
  render();
  toast('✅ Solicitação '+s.numero+' cancelada.');
}

function duplicateSol(id){
  var s = SOLICITATIONS.find(function(x){return x.id===id;});
  if(!s) return;
  var newId = SOLICITATIONS.length+1;
  var today = new Date().toISOString().slice(0,10);
  SOLICITATIONS.unshift(Object.assign({},s,{
    id:newId,
    numero:pad6(newId+1000),
    data:today,
    dataNec:'',
    status:'Rascunho',
    analises:[],
    itens:s.itens.slice()
  }));
  render();
  toast('⊕ Solicitação duplicada como rascunho.');
}

function exportSingle(id){
  var s = SOLICITATIONS.find(function(x){return x.id===id;});
  if(!s) return;
  var rows = [['Código','Produto','Categoria','Qtd','Unid.']].concat(
    s.itens.map(function(i){return[i.cod,i.nome,i.cat,i.qty,i.unid];})
  );
  var wb = XLSX.utils.book_new();
  var ws = XLSX.utils.aoa_to_sheet(rows);
  XLSX.utils.book_append_sheet(wb,ws,'Itens');
  XLSX.writeFile(wb,'solicitacao-'+s.numero+'.xlsx');
  toast('📥 Exportado: solicitacao-'+s.numero+'.xlsx');
}

function exportXLSX(){
  var data = filtered();
  var rows = [['Nº','Data','Status','Prioridade','Destino','Unid. Solicitante','Comprador','Itens','Qtd Total','Necessário até']];
  data.forEach(function(s){
    rows.push([s.numero,fmtDate(s.data),s.status,s.prio,s.destino,s.unidSolic,s.comprador,s.itens.length,totalQty(s.itens),fmtDate(s.dataNec)]);
  });
  var wb = XLSX.utils.book_new();
  var ws = XLSX.utils.aoa_to_sheet(rows);
  ws['!cols'] = rows[0].map(function(){return{wch:22};});
  XLSX.utils.book_append_sheet(wb,ws,'Minhas Solicitações');
  XLSX.writeFile(wb,'minhas-solicitacoes-'+new Date().toISOString().slice(0,10)+'.xlsx');
  toast('📥 Exportado com sucesso!');
}

function setView(v){
  VIEW_MODE = v;
  document.getElementById('btn-list').classList.toggle('active', v==='list');
  document.getElementById('btn-grid').classList.toggle('active', v==='grid');
  render();
}

// ─────────────────────────────────────────────────────────────────────────────
// TOAST
// ─────────────────────────────────────────────────────────────────────────────
var toastTimer;
function toast(msg){
  var el = document.getElementById('toast');
  el.textContent = msg; el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function(){el.classList.remove('show');},3200);
}

// Close modals on overlay click
document.getElementById('modal-detail').addEventListener('click',function(e){if(e.target===this)closeModal();});
document.getElementById('modal-confirm').addEventListener('click',function(e){if(e.target===this)closeConfirm();});

// ESC key
document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeModal();closeConfirm();}});

// ─────────────────────────────────────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────────────────────────────────────
render();
