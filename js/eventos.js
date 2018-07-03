$('.btn-passos').addClass('disabled');
$('.btn-testar').addClass('disabled');
$('.btn-limpar').addClass('disabled');

$('.btn-gerar').click(function() {
  setTimeout(function() {
    atualizaBotoes()
  }, 200)
});

$('.token').on('input', function() {
  atualizaBotoes()
});

var click = 0
var $tabela = $('.tbody-table')

$('.btn-gerar').click(function() {
  var token = gerarTokens('');
  token = token.split("")
  while (true) {
    token = gerarTokens(token.join('')).split('')
    var errado = false
    token.forEach(function(e) {
      if (e === e.toUpperCase())
        errado = true
    })
    if (errado)
      gerarTokens(token.join(''))
    else {
      token = token.join('')
      $('.token').val(token)
      return token
      break
    }
  }
})

$('.btn-passos').click(function() {
  click += 1
  if (click <= 1) {
    $tabela.append(trTable())
    $('.tr-table').append(tdPilha("$S"))
    $('.tr-table').append(tdEntrada(($('.token').val()) + "$"))
    var cedula = $(".tabela-gramatica").find('.line-S').find(".coluna-" + $('.token').val().split('')[0]).text()
    $('.tr-table').append(tdAcao(cedula))
  } else if ($('.td-acao').last().text().split(' ')[0] === "Lê") {
    desempila()
  } else {
    empilha()
  }
  $('.btn-testar').addClass('disabled');
  $('.btn-gerar').addClass('disabled');
  $('html').prop("scrollTop", $('html').prop("scrollHeight"))
})

$('.btn-testar').click(function() {
  $tabela.append(trTable())
  $('.tr-table').append(tdPilha("$S"))
  $('.tr-table').append(tdEntrada(($('.token').val()) + "$"))
  var cedula = $(".tabela-gramatica").find('.line-S').find(".coluna-" + $('.token').val().split('')[0]).text()
  $('.tr-table').append(tdAcao(cedula))
  $('.btn-gerar').addClass('disabled');
  $('.btn-limpar').removeClass('disabled');
  $('.btn-passos').addClass('disabled');
  $('.btn-testar').addClass('disabled');
  while ($('.td-acao').last().text().split(' ')[0] != "Erro" || $('.td-acao').last().text().split(' ')[0] != "OK") {
    if ($('.td-acao').last().text().split(' ')[0] === "Lê")
      desempila()
    else
      empilha()
    $('html').prop("scrollTop", $('html').prop("scrollHeight"))
  }
})

$('.btn-limpar').click(function() {
  click = 0
  $('.token').val('')
  $('.tbody-table').html('')

  $('.btn-gerar').removeClass('disabled');
  $('.btn-limpar').addClass('disabled');
})
