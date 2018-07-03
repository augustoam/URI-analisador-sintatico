function tdPilha(elemento) {
  return "<td class='td-pilha'>" + elemento + "</td>"
}

function tdEntrada(elemento) {
  return "<td class='td-entrada'>" + elemento + "</td>"
}

function tdAcao(elemento) {
  return "<td class='td-acao'>" + elemento + "</td>"
}

function trTable() {
  return "<tr class='tr-table'></tr>"
}

function consultaGramatica(letra) {
  if (letra === "s") {
    return ['aAc', 'C']
  }
  if (letra === "a") {
    return ['aBc', 'bA', 'ε']
  }
  if (letra === "b") {
    return ['aB', 'C', 'cCa']
  }
  if (letra === "c") {
    return ['bBa', 'c']
  }
}
