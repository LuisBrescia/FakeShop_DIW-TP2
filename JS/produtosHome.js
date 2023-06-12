fetch('https://fakestoreapi.com/products?sort=desc').then(res => res.json()).then(function (listaProdutos) {
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
        <a class="row ref-product my-5 rounded-3 p-3 mx-auto" href="detalhes.html?id=${listaProdutos[i].id}">
            <!-- ? Card-header -->
            <div class="col-12 col-md-6 ref-media">
                <img class="ref-image w-100 h-100" src="${listaProdutos[i].image}" loading="lazy" style="object-fit: cover;"/>
            </div>
            <!-- ? Card-body -->
            <div class="col-12 col-md-6 ref-product-data d-flex flex-column flex-wrap">
                <div class="ref-sale-badge fs-2 fw-bold text-black my-2">R$ ${listaProdutos[i].price}</div>
                <div class="ref-product-info">
                    <h5 class="ref-name text-dark mb-3">${listaProdutos[i].title}</h5>
                    <p class="ref-excerpt mb-3 text-wrap">${listaProdutos[i].description}</p>
                </div>
                <button class="ref-button preview-toggle border-0 align-self-end bg-primary mt-auto text-nowrap" href="#">Ver detalhes</button>
            </div>
        </a>
        `);
        // Adiciona o produto na lista
        $('#produtosIndex').append(produtoAdicionado);
    }
});