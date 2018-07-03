function atualizaBotoes() {
  if ($('.token').val() != '') {
    $('.btn-passos').removeClass('disabled');
    $('.btn-testar').removeClass('disabled')
  } else {
    $('.btn-passos').addClass('disabled');
    $('.btn-testar').addClass('disabled')
  }
}

function empilha() {
  var ultima_seq = $('.td-acao').last().text().split('→ ')[1].split('').reverse().join('')
  var texto_pilha = $('.td-pilha').last().text()
  if ($('.td-acao').last().text().split('→ ')[1] === 'ε') {
    $tabela.append(trTable())
    $('.tr-table').last().append(tdPilha(texto_pilha.substr(0, (texto_pilha.length - 1))))
    $('.tr-table').last().append(tdEntrada($('.td-entrada').last().text()))
  } else {
    $tabela.append(trTable())
    $('.tr-table').last().append(tdPilha(texto_pilha.substr(0, (texto_pilha.length - 1)) + ultima_seq))
    $('.tr-table').last().append(tdEntrada($('.td-entrada').last().text()))
  }
  var texto_entrada = $('.td-entrada').last().text();
  cedulaComparavel($('.td-pilha').last().text().split('').pop(), texto_entrada.split('')[0])
}

function desempila() {
  var texto_pilha = $('.td-pilha').last().text()
  $tabela.append(trTable())
  $('.tr-table').last().append(tdPilha(texto_pilha.substr(0, (texto_pilha.length - 1))))
  $('.tr-table').last().append(tdEntrada($('.td-entrada').last().text().substr(1)))
  var texto_entrada = $('.td-entrada').last().text();
  cedulaComparavel($('.td-pilha').last().text().split('').pop(), texto_entrada.split('')[0])
}

function cedulaComparavel(line, coluna) {
  if (coluna == '$')
    coluna = 's'

  if (line == '$')
    line = 'k'

  if (line === "k" && coluna === "s") {
    $('.btn-limpar').removeClass('disabled');
    $('.btn-passos').addClass('disabled');
    $('.tokens-corretos').val($('.tokens-corretos').val() + ' ' + $('.token').val())
    return $('.tr-table').last().append(tdAcao("OK em " + $('.tbody-table').find('tr').length + " iterações"))
  } else if (coluna === line) {
    var last_word = $('.td-pilha').last().text().split('').pop()
    var first_word = $('.td-entrada').last().text().split('')[0]
    $('.tr-table').last().append(tdAcao("Lê " + last_word + ' e desempilha'))
  } else {
    var cedula = $(".tabela-gramatica").find('.line-' + line).find(".coluna-" + coluna).text()
    if (cedula != '') {
      return $('.tr-table').last().append(tdAcao(cedula))
    } else {
      $('.btn-limpar').removeClass('disabled');
      $('.btn-passos').addClass('disabled');
      $('.tokens-incorretos').val($('.tokens-incorretos').val() + ' ' + $('.token').val())
      return $('.tr-table').last().append(tdAcao("Erro em " + $('.tbody-table').find('tr').length + " iterações"))
    }
  }
}

function gerarTokens(token) {
  token = token
  if (token === '')
    token = consultaGramatica('s')[Math.floor(Math.random() * consultaGramatica('s').length)]

  token = token.split("")
  var novo_token = []
  token.forEach(function(e) {
    if (e === e.toUpperCase()) {
      var letra = consultaGramatica(e.toLowerCase())
      e = letra[Math.floor(Math.random() * letra.length)]
    }
    if (e != 'ε') {
      novo_token.push(e)
      token = novo_token.join('')
    }
  })
  return token
}
