// Tenha que pegar o valor que está na url da página
// e passar para o controller

// Pegar o valor da url
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
urlProduto = `https://fakestoreapi.com/products/${productId}`;

// Passar o valor para o controller
fetch(urlProduto).then(res => res.json()).then(function (produtoDetalhes) {
    
    console.log(produtoDetalhes);

    // Caso produtosDetalhes.rating.rate seja maior ou igual a 4.0, guardar <div class="ref-sale-badge">Melhor Avaliado</div> em uma variável
    // Caso contrário, guardar <div class="ref-sale-badge">Mais Vendido</div> em uma variável

    var produtoEspecial = '';

    if (produtoDetalhes.rating.rate >= 4.0) {
        produtoEspecial = '<div class="ref-sale-badge">Melhor Avaliado</div>';
    } else {
        produtoEspecial = '<div class="ref-sale-badge">Mais Vendido</div>';
    }

    if (produtoDetalhes.price.toString().includes('.')) {
        if (produtoDetalhes.price.toString().split('.')[1].length == 1) {
            produtoDetalhes.price = produtoDetalhes.price + '0';
        }
    } else {
        produtoDetalhes.price = produtoDetalhes.price + ',00';
    }
    produtoDetalhes.price = produtoDetalhes.price.toString().replace('.', ',');

    produtoFoco = $(`
        <div class="reflow-product">
            <div class="ref-media shadow-lg rounded-3">
                <div class="ref-preview">
                    <img class="ref-image active" src="${produtoDetalhes.image}" data-reflow-preview-type="image" style="object-fit: fill;"/>
                </div>
                ${produtoEspecial}
            </div>
            <div class="ref-product-data">
                <h2 class="ref-name">${produtoDetalhes.title}</h2>
                <div class="ref-categories">
                    <span class="ref-category">${produtoDetalhes.category}</span>
                </div>
                <strong class="ref-price ref-on-sale"><span class="ref-original-price bi-star">&nbsp${produtoDetalhes.rating.rate}</span>R$${produtoDetalhes.price}</strong>
                <span data-reflow-type="add-to-cart" data-reflow-shoppingcart-url="shopping-cart.html" data-reflow-addtocart-text data-reflow-product="589605485" data-reflow-variant="199976733_s">
                    <div class="reflow-add-to-cart ref-product-controls">
                        <span data-reflow-variant="199976733_s" data-reflow-product="589605485" data-reflow-max-qty="999" data-reflow-quantity="1">
                            <div class="ref-quantity-widget rounded-0">
                                <div class="ref-decrease"><i class="bi-dash"></i></div>
                                    <input type="text" value="1"/>
                                <div class="ref-increase"><i class="bi-plus"></i></div>
                            </div>
                        </span><a class="ref-button" href="#">Comprar</a>
                    </div>
                </span>
                <div class="ref-description">${produtoDetalhes.description}</div>
            </div>
        </div>
    `);
    $('#produtoDetalhado').append(produtoFoco);
});