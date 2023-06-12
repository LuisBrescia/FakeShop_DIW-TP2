const urlParams = new URLSearchParams(window.location.search);
const pesquisaRealizada = urlParams.get('pesquisa');
const pesquisaCategoria = urlParams.get('categoria');

$('#pesquisa').val(pesquisaRealizada);
var urlPesquisa = 'https://fakestoreapi.com/products/';

// Caso essa string tenha a palavra man, mudar a url para https://fakestoreapi.com/products/category/men'%20clothing
// 'https://fakestoreapi.com/products/category/men\'%20clothing'
console.log(pesquisaRealizada);

switch (pesquisaCategoria) {
    case 'homens':
        urlPesquisa = 'https://fakestoreapi.com/products/category/men\'s%20clothing';
        $('#pesquisaRealizada').append(' para categoria Men\'s clothing');
        break;
    case 'mulheres':
        urlPesquisa = 'https://fakestoreapi.com/products/category/women\'s%20clothing';
        $('#pesquisaRealizada').append(' para categoria Women\'s clothing');
        break;
    case 'joias':
        urlPesquisa = 'https://fakestoreapi.com/products/category/jewelery';
        $('#pesquisaRealizada').append(' para categoria Jewelery');
        break;
    case 'eletronicos':
        urlPesquisa = 'https://fakestoreapi.com/products/category/electronics';
        $('#pesquisaRealizada').append(' para categoria Electronics');
        break;
    case 'todos':
        urlPesquisa = 'https://fakestoreapi.com/products/';
        $('#pesquisaRealizada').append(' para todos os produtos');
        break;
    default:
        urlPesquisa = 'https://fakestoreapi.com/products/';
        break;
}

if (pesquisaRealizada != '' && pesquisaRealizada != null) {
    $('#pesquisaRealizada').append('"' + pesquisaRealizada + '"');
    $('section small').toggleClass('d-none');
    $('#pesquisaAviso').append("Se não apareceu nada é porque a API é mal feita mesmo");
    urlPesquisa = `https://fakestoreapi.com/products/search?query=${pesquisaRealizada}`;
    console.log(urlPesquisa);
    console.log("oi");
} else if (pesquisaCategoria == '') {
    $('#pesquisaRealizada').append('todos os produtos');
}

fetch(urlPesquisa).then(res => res.json()).then(function (listaProdutos) {
    // Para cada item de data
    for (let i = 0; i < listaProdutos.length; i++) {

        // Em lista[i].description, se tiver mais de 100 caracteres, corta e adiciona "..."
        if (listaProdutos[i].description.length > 100) {
            listaProdutos[i].description = listaProdutos[i].description.substring(0, 100) + '...';
        }

        if (listaProdutos[i].price.toString().includes('.')) {
            if (listaProdutos[i].price.toString().split('.')[1].length == 1) {
                listaProdutos[i].price = listaProdutos[i].price + '0';
            }
        } else {
            listaProdutos[i].price = listaProdutos[i].price + ',00';
        }
        listaProdutos[i].price = listaProdutos[i].price.toString().replace('.', ',');

        produtoAdicionado = $(`            
        <a class="ref-product" href="detalhes.html?id=${listaProdutos[i].id}">
            <!-- ? Card-header -->
            <div class="ref-media">
                <img class="ref-image rounded-3 c-shadow" src="${listaProdutos[i].image}" loading="lazy" style="object-fit: cover;"/>
                <div class="ref-sale-badge">R$ ${listaProdutos[i].price}</div>
            </div>
            <!-- ? Card-body -->
            <div class="ref-product-data">
                <div class="ref-product-info">
                    <h5 class="ref-name">${listaProdutos[i].title}</h5>
                    <p class="ref-excerpt">${listaProdutos[i].description}</p>
                </div>
                
            </div>
            <button class="ref-button preview-toggle border-0 align-self-start bg-primary" href="#">Ver detalhes</button>
        </a>
        `);
        // Adiciona o produto na lista
        $('#listaProdutos').append(produtoAdicionado);
    }
});

