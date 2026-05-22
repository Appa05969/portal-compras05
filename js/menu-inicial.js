  // Set today's date on the banner
  (function() {
    var days   = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
    var months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
    var now = new Date();
    document.getElementById('today-day').textContent   = now.getDate();
    document.getElementById('today-label').textContent = days[now.getDay()] + ', ' + months[now.getMonth()] + ' ' + now.getFullYear();
  })();
