fetch('https://fakestoreapi.com/products').then(res => res.json()).then(function (listaProdutos) {
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
                <img class="ref-image" src="${listaProdutos[i].image}" loading="lazy" style="object-fit: cover;"/>
                <div class="ref-sale-badge">R$ ${listaProdutos[i].price}</div>
            </div>
            <!-- ? Card-body -->
            <div class="ref-product-data">
                <div class="ref-product-info">
                    <h5 class="ref-name">${listaProdutos[i].title}</h5>
                    <p class="ref-excerpt">${listaProdutos[i].description}</p>
                </div>
                
            </div>
            <button class="ref-button preview-toggle border-0 align-self-start" href="#">Ver detalhes</button>
        </a>
        `);
        // Adiciona o produto na lista
        $('#listaProdutos').append(produtoAdicionado);
    }
});


{/* <strong class="ref-price ref-on-sale">
    R$${listaProdutos[i].price}
</strong> */}