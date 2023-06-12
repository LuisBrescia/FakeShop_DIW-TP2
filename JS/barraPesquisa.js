function pesquisaProduto() {
    let pesquisa = $('#pesquisa').val();
    window.location.href = `pesquisa.html?pesquisa=${pesquisa}`;
}

$('#pesquisa').keydown( function(event) {
  if (event.key === 'Enter') {
    pesquisaProduto();
  }
});