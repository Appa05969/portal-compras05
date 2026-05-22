// ─────────────────────────────────────────────────────────────────
// REFERENCE DATA
// ─────────────────────────────────────────────────────────────────
const UNIDADES = [
  {codigo:'408',nome:'AGGE SERVICOS TERCEIRIZADOS LT'},
  {codigo:'3',  nome:'AGGE SERVIÇOS'},
  {codigo:'1',  nome:'APPA SERVICOS TEMPORARIOS'},
  {codigo:'403',nome:'APPA SERVICOS TEMPORARIOS - BA'},
  {codigo:'5',  nome:'APPA SERVICOS TEMPORARIOS - MG'},
  {codigo:'404',nome:'APPA SERVICOS TEMPORARIOS - MT'},
  {codigo:'402',nome:'APPA SERVICOS TEMPORARIOS - PE'},
  {codigo:'401',nome:'APPA SERVICOS TEMPORARIOS - PR'},
  {codigo:'4',  nome:'APPA SERVICOS TEMPORARIOS - RJ'},
  {codigo:'406',nome:'APPA SERVICOS TEMPORARIOS - SC'},
  {codigo:'412',nome:'APPA SERVICOS TEMPORARIOS E EF'},
  {codigo:'405',nome:'APPA SERVICOS TEMPORARIOS-SUZ'}
];

const DESTINOS = [
  {codigo:'408', nome:'AGGE SERVICOS TERCEIRIZADOS LT'},
  {codigo:'3',   nome:'AGGE SERVIÇOS'},
  {codigo:'1',   nome:'APPA SERVICOS TEMPORARIOS'},
  {codigo:'403', nome:'APPA SERVICOS TEMPORARIOS - BA'},
  {codigo:'5',   nome:'APPA SERVICOS TEMPORARIOS - MG'},
  {codigo:'404', nome:'APPA SERVICOS TEMPORARIOS - MT'},
  {codigo:'402', nome:'APPA SERVICOS TEMPORARIOS - PE'},
  {codigo:'401', nome:'APPA SERVICOS TEMPORARIOS - PR'},
  {codigo:'4',   nome:'APPA SERVICOS TEMPORARIOS - RJ'},
  {codigo:'406', nome:'APPA SERVICOS TEMPORARIOS - SC'},
  {codigo:'412', nome:'APPA SERVICOS TEMPORARIOS E EF'},
  {codigo:'405', nome:'APPA SERVICOS TEMPORARIOS-SUZ'},
  {codigo:'1013',nome:'CODEVASF 614'},
  {codigo:'1008',nome:'FIOCRUZ RJ 360'},
  {codigo:'1004',nome:'FPMZB MG 438'},
  {codigo:'1001',nome:'FUNDACENTRO MG 452'},
  {codigo:'1010',nome:'FUNDACENTRO SP 457'},
  {codigo:'1006',nome:'FUNDAÇÃO SAUDE RJ 2028'},
  {codigo:'1002',nome:'HOSPITAL ODILON MG 238'},
  {codigo:'1012',nome:'IF SALTO SP 609'},
  {codigo:'1009',nome:'PRF SP 447'},
  {codigo:'1011',nome:'RAYFLEX SP 603'},
  {codigo:'1005',nome:'RIBEIRÃO DAS NEVES MG 2089'},
  {codigo:'1000',nome:'SEBRAE MG 2099'},
  {codigo:'1007',nome:'TJ NUR RJ 469'},
  {codigo:'1003',nome:'TRT MG 449'},
  {codigo:'1014',nome:'ZOOLOGICO MG 679'}
];

const COMPRADORES = [
  {codigo:'359915',     nome:'THAIS CAMARGO'},
  {codigo:'359975',     nome:'DANIELA DOS SANTOS VIEIRA'},
  {codigo:'37935129835',nome:'WENDEL GALVINO'},
  {codigo:'38388870858',nome:'KARLA RAFAELA DA SILVA SANTOS'},
  {codigo:'41209480808',nome:'ROGERIO LIMA DE SOUZA'}
];

const USUARIOS_LIST = [
  {id:1, nome:'Admin Sistema',     email:'admin@appa.com.br',    perfil:'Administrador'},
  {id:2, nome:'João Silva',        email:'joao@appa.com.br',     perfil:'Solicitante'},
  {id:3, nome:'Maria Souza',       email:'maria@appa.com.br',    perfil:'Comprador'},
  {id:4, nome:'Carlos Pereira',    email:'carlos@appa.com.br',   perfil:'Solicitante'},
  {id:5, nome:'Ana Rodrigues',     email:'ana@appa.com.br',      perfil:'Solicitante'},
  {id:6, nome:'Pedro Lima',        email:'pedro@appa.com.br',    perfil:'Aprovador'},
  {id:7, nome:'Fernanda Costa',    email:'fernanda@appa.com.br', perfil:'Solicitante'},
  {id:8, nome:'Ricardo Alves',     email:'ricardo@appa.com.br',  perfil:'Comprador'}
];

const CATEGORIAS_LIST = [
  'EPI','EPC / UNIFORMES','EQUIPAMENTOS/MÁQUINAS','SERVIÇOS - UNIFORMES',
  'MÁQUINAS E ACESSÓRIOS 2','CAMISETA/CAMISA','BLUSA / CARDIGAN',
  'BLAZER/PALETÓ/JAQUETA','CALÇA','MEIA','CALÇADOS','GRAVATA','CINTO','AVENTAL'
];

const PRODUTOS_SAMPLE = [
  {codigo:'1010101000',nome:'LUVA LATEX AMARELA TAM P',  cat:'EPI',                   unid:'PR'},
  {codigo:'1010158000',nome:'LUVA NITRILICA M',           cat:'EPI',                   unid:'PR'},
  {codigo:'1020127000',nome:'CONE LARANJA E BRANCO 75CM', cat:'EPC / UNIFORMES',       unid:'UN'},
  {codigo:'1020138002',nome:'CAMISA ALGODÃO M/C AZ. G',   cat:'EPC / UNIFORMES',       unid:'UN'},
  {codigo:'1040122000',nome:'ASPIRADOR VERTICAL',         cat:'EQUIPAMENTOS/MÁQUINAS', unid:'UN'},
  {codigo:'1040134000',nome:'FOICE',                      cat:'EQUIPAMENTOS/MÁQUINAS', unid:'UN'},
  {codigo:'1050102000',nome:'SILK SCREEN',                cat:'SERVIÇOS - UNIFORMES',  unid:'UN'},
  {codigo:'1050201002',nome:'SERVIÇO DE LAVANDERIA',      cat:'SERVIÇOS - UNIFORMES',  unid:'UN'},
  {codigo:'1120301000',nome:'CAMISA POLO MC CINZA P',     cat:'CAMISETA/CAMISA',       unid:'UN'},
  {codigo:'1120109002',nome:'CAMISETA MC AZ. MARINHO G',  cat:'CAMISETA/CAMISA',       unid:'UN'},
  {codigo:'1130201000',nome:'CARDIGAN PRETO MASCULINO P', cat:'BLUSA / CARDIGAN',      unid:'UN'},
  {codigo:'1140101000',nome:'BLAZER FEM. PRETO PP/36',    cat:'BLAZER/PALETÓ/JAQUETA', unid:'UN'},
  {codigo:'1150101000',nome:'CALCA BRIM CINZA SEM BOLSO', cat:'CALÇA',                 unid:'UN'},
  {codigo:'1160101001',nome:'MEIA SOCIAL MASCULINA',      cat:'MEIA',                  unid:'UN'},
  {codigo:'1170102002',nome:'SAPATO SOCIAL FEMINIO 35',   cat:'CALÇADOS',              unid:'UN'},
  {codigo:'1180101000',nome:'GRAVATA PRETA',              cat:'GRAVATA',               unid:'UN'},
  {codigo:'1190101001',nome:'CINTO MASCULINO M',          cat:'CINTO',                 unid:'UN'},
  {codigo:'1210101002',nome:'AVENTAL ML BRANCO G',        cat:'AVENTAL',               unid:'UN'}
];

const STATUS_LIST = ['Pendente','Em análise','Aprovado','Aprovado','Aprovado','Recusado'];
const MESES = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

// ─────────────────────────────────────────────────────────────────
// GENERATE MOCK SOLICITATIONS
// ─────────────────────────────────────────────────────────────────
function rnd(arr){return arr[Math.floor(Math.random()*arr.length)];}
function rndInt(a,b){return a+Math.floor(Math.random()*(b-a+1));}
function pad(n){return String(n).padStart(2,'0');}

var ALL_SOLIC = (function(){
  var list=[], seed=42;
  function sr(){seed=(seed*1664525+1013904223)&0xFFFFFFFF;return(seed>>>0)/0xFFFFFFFF;}
  for(var i=1;i<=72;i++){
    var month=Math.floor((i-1)/6)+1; if(month>6)month=((i-1)%12)+1;
    var day=Math.floor(sr()*27)+1;
    var date='2026-'+pad(Math.min(month,5))+'-'+pad(day);
    var user=USUARIOS_LIST[Math.floor(sr()*USUARIOS_LIST.length)];
    var unid=UNIDADES[Math.floor(sr()*UNIDADES.length)];
    var dest=DESTINOS[Math.floor(sr()*DESTINOS.length)];
    var comp=COMPRADORES[Math.floor(sr()*COMPRADORES.length)];
    var statIdx=Math.floor(sr()*STATUS_LIST.length);
    var itens=Math.floor(sr()*8)+1;
    var prods=[];
    for(var j=0;j<itens;j++){
      var p=PRODUTOS_SAMPLE[Math.floor(sr()*PRODUTOS_SAMPLE.length)];
      prods.push({codigo:p.codigo,nome:p.nome,cat:p.cat,unid:p.unid,qtd:Math.floor(sr()*10)+1});
    }
    list.push({
      id:i, numero:'#'+String(i).padStart(6,'0'),
      data:date, solicitante:user.nome, solicitanteId:user.id,
      unidade:unid.nome, unidCodigo:unid.codigo,
      destino:dest.nome, destCodigo:dest.codigo,
      comprador:comp.nome,
      status:STATUS_LIST[statIdx],
      itens:itens, produtos:prods
    });
  }
  return list;
})();

// ─────────────────────────────────────────────────────────────────
// FILTER STATE
// ─────────────────────────────────────────────────────────────────
var FILTER = {de:'2026-01-01',ate:'2026-05-31',unid:'',dest:'',comp:'',status:''};
var ACTIVE_VIEW = 'dashboard';
var SORT_STATE = {};
var PAGE_STATE = {};

function filteredSolic(){
  return ALL_SOLIC.filter(function(s){
    if(FILTER.de  && s.data < FILTER.de)  return false;
    if(FILTER.ate && s.data > FILTER.ate) return false;
    if(FILTER.unid   && s.unidCodigo !== FILTER.unid)   return false;
    if(FILTER.dest   && s.destCodigo !== FILTER.dest)   return false;
    if(FILTER.comp   && s.comprador  !== FILTER.comp)   return false;
    if(FILTER.status && s.status     !== FILTER.status) return false;
    return true;
  });
}

function applyFilters(){
  FILTER.de     = document.getElementById('f-de').value;
  FILTER.ate    = document.getElementById('f-ate').value;
  FILTER.unid   = document.getElementById('f-unid').value;
  FILTER.dest   = document.getElementById('f-dest').value;
  FILTER.comp   = document.getElementById('f-comp').value;
  FILTER.status = document.getElementById('f-status').value;
  renderAll();
  showToast('Filtros aplicados — '+filteredSolic().length+' solicitações');
}
function clearFilters(){
  FILTER={de:'2026-01-01',ate:'2026-05-31',unid:'',dest:'',comp:'',status:''};
  document.getElementById('f-de').value='2026-01-01';
  document.getElementById('f-ate').value='2026-05-31';
  ['f-unid','f-dest','f-comp','f-status'].forEach(function(id){document.getElementById(id).value='';});
  renderAll();
}

// ─────────────────────────────────────────────────────────────────
// POPULATE SIDEBAR SELECTS
// ─────────────────────────────────────────────────────────────────
(function(){
  var su=document.getElementById('f-unid');
  UNIDADES.forEach(function(u){su.innerHTML+='<option value="'+u.codigo+'">'+u.nome+'</option>';});
  var sd=document.getElementById('f-dest');
  DESTINOS.forEach(function(d){sd.innerHTML+='<option value="'+d.codigo+'">'+d.nome+'</option>';});
  var sc=document.getElementById('f-comp');
  COMPRADORES.forEach(function(c){sc.innerHTML+='<option value="'+c.nome+'">'+c.nome+'</option>';});
})();

// ─────────────────────────────────────────────────────────────────
// VIEW SWITCHER
// ─────────────────────────────────────────────────────────────────
function showView(v){
  ACTIVE_VIEW=v;
  document.querySelectorAll('.view-section').forEach(function(s){s.classList.remove('active');});
  document.querySelectorAll('.rep-item').forEach(function(s){s.classList.remove('active');});
  var sec=document.getElementById('view-'+v);
  if(sec)sec.classList.add('active');
  var nav=document.getElementById('nav-'+v);
  if(nav)nav.classList.add('active');
  renderAll();
}

// ─────────────────────────────────────────────────────────────────
// BADGE HELPER
// ─────────────────────────────────────────────────────────────────
function badge(s){
  var cls='b-pend';
  if(s==='Aprovado')cls='b-aprov';
  else if(s==='Em análise')cls='b-anali';
  else if(s==='Recusado')cls='b-recus';
  else if(s==='Ativo')cls='b-ativo';
  else if(s==='Inativo')cls='b-inat';
  return '<span class="badge '+cls+'">'+s+'</span>';
}
function fmtDate(d){if(!d)return'—';var p=d.split('-');return p[2]+'/'+p[1]+'/'+p[0];}

// ─────────────────────────────────────────────────────────────────
// TABLE RENDER ENGINE (pagination + search)
// ─────────────────────────────────────────────────────────────────
var TBL_DATA={};
var PAGE_SIZE=15;
function renderTable(key,rows,cntId,footId,pagesId){
  TBL_DATA[key]=rows;
  PAGE_STATE[key]=PAGE_STATE[key]||1;
  document.getElementById(cntId).textContent=rows.length+' registros';
  _renderPage(key,PAGE_STATE[key],footId,pagesId);
}
function _renderPage(key,page,footId,pagesId){
  var rows=TBL_DATA[key]||[];
  var q=(document.querySelector('#tbl-'+key).closest('.table-card').querySelector('.tbl-search')||{}).value||'';
  if(q){
    var ql=q.toLowerCase();
    rows=rows.filter(function(r){return r.join('|').toLowerCase().includes(ql);});
  }
  var total=rows.length;
  var pages=Math.max(1,Math.ceil(total/PAGE_SIZE));
  page=Math.min(page,pages);
  PAGE_STATE[key]=page;
  var slice=rows.slice((page-1)*PAGE_SIZE,page*PAGE_SIZE);
  var tb=document.getElementById('tbody-'+key);
  tb.innerHTML=slice.map(function(r){
    return '<tr>'+r.map(function(c){return'<td>'+c+'</td>';}).join('')+'</tr>';
  }).join('')||'<tr><td colspan="20" class="empty-state"><div class="empty-icon">📭</div><div>Nenhum registro encontrado</div></td></tr>';
  document.getElementById(footId).textContent='Mostrando '+(total===0?0:(page-1)*PAGE_SIZE+1)+'–'+Math.min(page*PAGE_SIZE,total)+' de '+total;
  var pb=document.getElementById(pagesId);
  pb.innerHTML='';
  for(var i=1;i<=pages;i++){
    pb.innerHTML+='<button class="pbn'+(i===page?' active':'')+'" onclick="goPage(\''+key+'\','+i+',\''+footId+'\',\''+pagesId+'\')">'+i+'</button>';
  }
}
function goPage(key,page,footId,pagesId){PAGE_STATE[key]=page;_renderPage(key,page,footId,pagesId);}
function tblSearch(tblId,q){
  var key=tblId.replace('tbl-','');
  PAGE_STATE[key]=1;
  _renderPage(key,1,'foot-'+key,'pages-'+key);
}

// ─────────────────────────────────────────────────────────────────
// SORT
// ─────────────────────────────────────────────────────────────────
function sortTable(tblId,col){
  var key=tblId.replace('tbl-','');
  var data=TBL_DATA[key]||[];
  var cur=SORT_STATE[key];
  var asc=(cur&&cur.col===col)?!cur.asc:true;
  SORT_STATE[key]={col:col,asc:asc};
  data.sort(function(a,b){
    var av=a[col]||'',bv=b[col]||'';
    av=av.replace(/<[^>]+>/g,''); bv=bv.replace(/<[^>]+>/g,'');
    return asc?av.localeCompare(bv,undefined,{numeric:true}):bv.localeCompare(av,undefined,{numeric:true});
  });
  TBL_DATA[key]=data;
  document.querySelectorAll('#'+tblId+' th').forEach(function(th,i){th.classList.remove('sort-asc','sort-desc');if(i===col)th.classList.add(asc?'sort-asc':'sort-desc');});
  _renderPage(key,1,'foot-'+key,'pages-'+key);
}

// ─────────────────────────────────────────────────────────────────
// RENDER ALL VIEWS
// ─────────────────────────────────────────────────────────────────
var CHARTS={};
function renderAll(){
  var solic=filteredSolic();
  if(ACTIVE_VIEW==='dashboard') renderDashboard(solic);
  if(ACTIVE_VIEW==='usuarios')  renderUsuarios(solic);
  if(ACTIVE_VIEW==='unidades')  renderUnidades(solic);
  if(ACTIVE_VIEW==='destino')   renderDestino(solic);
  if(ACTIVE_VIEW==='por-usuario')  renderPorUsuario(solic);
  if(ACTIVE_VIEW==='por-destino')  renderPorDestino(solic);
  if(ACTIVE_VIEW==='prod-destino') renderProdDestino(solic);
}

// ── DASHBOARD ──────────────────────────────────────────────────
function renderDashboard(solic){
  var total=solic.length;
  var aprov=solic.filter(function(s){return s.status==='Aprovado';}).length;
  var pend= solic.filter(function(s){return s.status==='Pendente';}).length;
  var recus=solic.filter(function(s){return s.status==='Recusado';}).length;
  var anali=solic.filter(function(s){return s.status==='Em análise';}).length;

  document.getElementById('kpi-row').innerHTML=
    kpiCard('Total Solicitações','k-green',total,'📋','Período selecionado')+
    kpiCard('Aprovadas',         'k-blue', aprov,'✅',Math.round(aprov/Math.max(total,1)*100)+'% do total')+
    kpiCard('Pendentes',         'k-orange',pend,'⏳',anali+' em análise')+
    kpiCard('Recusadas',         'k-red',  recus,'❌',Math.round(recus/Math.max(total,1)*100)+'% do total');

  // Status doughnut
  buildChart('chart-status','doughnut',
    ['Aprovado','Em análise','Pendente','Recusado'],
    [aprov,anali,pend,recus],
    ['#009B77','#1F75BB','#E07B3A','#e05252'],
    {plugins:{legend:{position:'right'}}}
  );

  // Monthly bar
  var months=['Jan','Fev','Mar','Abr','Mai'];
  var mVals=months.map(function(_,i){
    var m=String(i+1).padStart(2,'0');
    return solic.filter(function(s){return s.data&&s.data.startsWith('2026-'+m);}).length;
  });
  buildChart('chart-mensal','bar',months,mVals,['#009B77','#009B77','#009B77','#009B77','#009B77'],
    {plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,ticks:{stepSize:1}}}}
  );

  // Top unidades
  var uMap={};
  solic.forEach(function(s){uMap[s.unidade]=(uMap[s.unidade]||0)+1;});
  var uTop=Object.entries(uMap).sort(function(a,b){return b[1]-a[1];}).slice(0,6);
  buildChart('chart-unidades','bar',
    uTop.map(function(e){return e[0].replace('APPA SERVICOS TEMPORARIOS','APPA').replace('AGGE SERVICOS','AGGE').substring(0,18)+'…';}),
    uTop.map(function(e){return e[1];}),
    Array(uTop.length).fill('#1F75BB'),
    {plugins:{legend:{display:false}},indexAxis:'y',scales:{x:{beginAtZero:true,ticks:{stepSize:1}}}}
  );

  // Categorias pie
  var catMap={};
  solic.forEach(function(s){s.produtos.forEach(function(p){catMap[p.cat]=(catMap[p.cat]||0)+p.qtd;});});
  var catTop=Object.entries(catMap).sort(function(a,b){return b[1]-a[1];}).slice(0,6);
  var colors=['#009B77','#1F75BB','#E07B3A','#e05252','#4ecb8d','#7a8899'];
  buildChart('chart-categorias','doughnut',
    catTop.map(function(e){return e[0];}),
    catTop.map(function(e){return e[1];}),
    colors,
    {plugins:{legend:{position:'right'}}}
  );

  // Top destinos
  var dMap={};
  solic.forEach(function(s){dMap[s.destino]=(dMap[s.destino]||0)+1;});
  var dTop=Object.entries(dMap).sort(function(a,b){return b[1]-a[1];}).slice(0,10);
  buildChart('chart-destinos','bar',
    dTop.map(function(e){return e[0];}),
    dTop.map(function(e){return e[1];}),
    Array(dTop.length).fill('#E07B3A'),
    {plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,ticks:{stepSize:1}}}}
  );
}
function kpiCard(label,cls,val,icon,sub){
  return '<div class="kpi-card '+cls+'"><div class="kpi-label">'+label+'</div><div class="kpi-val">'+val+'</div><div class="kpi-sub">'+sub+'</div><div class="kpi-icon">'+icon+'</div></div>';
}
function buildChart(id,type,labels,data,colors,opts){
  if(CHARTS[id]){CHARTS[id].destroy();}
  var ctx=document.getElementById(id);
  if(!ctx)return;
  var cfg={type:type,data:{labels:labels,datasets:[{data:data,backgroundColor:colors,borderColor:type==='line'?colors[0]:'transparent',fill:false,tension:.4,borderWidth:type==='bar'?0:2}]},options:Object.assign({responsive:true,maintainAspectRatio:false,plugins:{legend:{display:true}}},opts||{})};
  CHARTS[id]=new Chart(ctx,cfg);
}

// ── USUÁRIOS ──────────────────────────────────────────────────
function renderUsuarios(solic){
  var rows=USUARIOS_LIST.map(function(u){
    var mine=solic.filter(function(s){return s.solicitanteId===u.id;});
    var aprov=mine.filter(function(s){return s.status==='Aprovado';}).length;
    var pend= mine.filter(function(s){return s.status==='Pendente'||s.status==='Em análise';}).length;
    return [u.id,u.nome,u.email,u.perfil,mine.length,aprov,pend,badge('Ativo')];
  });
  renderTable('usuarios',rows,'cnt-usuarios','foot-usuarios','pages-usuarios');
}

// ── UNIDADES ──────────────────────────────────────────────────
function renderUnidades(solic){
  var rows=UNIDADES.map(function(u){
    var mine=solic.filter(function(s){return s.unidCodigo===u.codigo;});
    var aprov=mine.filter(function(s){return s.status==='Aprovado';}).length;
    var pend= mine.filter(function(s){return s.status==='Pendente';}).length;
    var recus=mine.filter(function(s){return s.status==='Recusado';}).length;
    return [u.codigo,u.nome,mine.length,aprov,pend,recus,badge('Ativo')];
  });
  renderTable('unidades',rows,'cnt-unidades','foot-unidades','pages-unidades');
}

// ── DESTINO ───────────────────────────────────────────────────
function renderDestino(solic){
  var rows=DESTINOS.map(function(d){
    var mine=solic.filter(function(s){return s.destCodigo===d.codigo;});
    var aprov=mine.filter(function(s){return s.status==='Aprovado';}).length;
    var anali=mine.filter(function(s){return s.status==='Em análise';}).length;
    var pend= mine.filter(function(s){return s.status==='Pendente';}).length;
    var recus=mine.filter(function(s){return s.status==='Recusado';}).length;
    return [d.codigo,d.nome,mine.length,aprov,anali,pend,recus,badge('Ativo')];
  });
  renderTable('destino',rows,'cnt-destino','foot-destino','pages-destino');
}

// ── LANÇ. POR USUÁRIO ─────────────────────────────────────────
function renderPorUsuario(solic){
  var rows=solic.map(function(s){
    return [s.numero,fmtDate(s.data),s.solicitante,s.unidade,s.destino,s.comprador,s.itens,badge(s.status)];
  });
  renderTable('por-usuario',rows,'cnt-por-usuario','foot-por-usuario','pages-por-usuario');
}

// ── LANÇ. POR DESTINO ─────────────────────────────────────────
function renderPorDestino(solic){
  var rows=solic.map(function(s){
    return [s.numero,fmtDate(s.data),s.destino,s.solicitante,s.unidade,s.comprador,s.itens,badge(s.status)];
  });
  renderTable('por-destino',rows,'cnt-por-destino','foot-por-destino','pages-por-destino');
}

// ── PRODUTO × DESTINO ─────────────────────────────────────────
function renderProdDestino(solic){
  var map={};
  solic.forEach(function(s){
    s.produtos.forEach(function(p){
      var key=p.codigo+'|'+s.destino;
      if(!map[key]) map[key]={codigo:p.codigo,nome:p.nome,cat:p.cat,unid:p.unid,destino:s.destino,qtd:0,n:0,last:s.data};
      map[key].qtd+=p.qtd;
      map[key].n++;
      if(s.data>map[key].last) map[key].last=s.data;
    });
  });
  var rows=Object.values(map).sort(function(a,b){return b.qtd-a.qtd;}).map(function(r){
    return [r.codigo,r.nome,r.cat,r.unid,r.destino,r.qtd,r.n,fmtDate(r.last)];
  });
  renderTable('prod-destino',rows,'cnt-prod-destino','foot-prod-destino','pages-prod-destino');
}

// ─────────────────────────────────────────────────────────────────
// EXCEL EXPORT (SheetJS)
// ─────────────────────────────────────────────────────────────────
var EXCEL_HEADERS={
  'usuarios':     ['ID','Nome','E-mail','Perfil','Solicitações','Aprovadas','Pendentes','Situação'],
  'unidades':     ['Código','Nome','Total Solicit.','Aprovadas','Pendentes','Recusadas','Situação'],
  'destino':      ['Código','Destino','Total Solicit.','Aprovadas','Em análise','Pendentes','Recusadas','Situação'],
  'por-usuario':  ['Nº','Data','Solicitante','Unidade','Destino','Comprador','Itens','Status'],
  'por-destino':  ['Nº','Data','Destino','Solicitante','Unidade','Comprador','Itens','Status'],
  'prod-destino': ['Código','Produto','Categoria','Unid.','Destino','Qtd Total','Solicitações','Último Lanç.']
};
function stripHtml(s){return String(s).replace(/<[^>]+>/g,'');}
function exportExcel(key){
  var data=TBL_DATA[key];
  if(!data||!data.length){showToast('Nenhum dado para exportar');return;}
  var headers=EXCEL_HEADERS[key]||[];
  var wsData=[headers].concat(data.map(function(row){return row.map(stripHtml);}));
  var wb=XLSX.utils.book_new();
  var ws=XLSX.utils.aoa_to_sheet(wsData);
  // column widths
  ws['!cols']=headers.map(function(){return{wch:22};});
  XLSX.utils.book_append_sheet(wb,ws,'Relatório');
  var fname='relatorio-'+key+'-'+new Date().toISOString().slice(0,10)+'.xlsx';
  XLSX.writeFile(wb,fname);
  showToast('📥 Exportado: '+fname);
}

// ─────────────────────────────────────────────────────────────────
// TOAST
// ─────────────────────────────────────────────────────────────────
var toastTimer;
function showToast(msg){
  var t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(function(){t.classList.remove('show');},3000);
}

// ─────────────────────────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────────────────────────
renderAll();
