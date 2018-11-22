function searchBook(keywords) {

    const baseUrl = "https://api.themoviedb.org/3/";
    const apiKey = "6201f860754bab18d08c1e6dad850dae";

    const url = `${baseUrl}search/tv?api_key=${apiKey}&language=fr-FR&query=${keywords}&page=1-100`;


    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            searchBookHtml(data, keywords);
            changePageTitle("Recherche " + keywords);
        })

    function searchBookHtml(data, keywords) {

        var read_products_html = "";

        // when clicked, it will show the product's list
        read_products_html += "<div id='read-products' class='btn btn-primary pull-right m-b-15px list-products-button'>";
        read_products_html += "<span class='glyphicon glyphicon-list'></span> Go Back";
        read_products_html += "</div>";

        // table
        read_products_html += "<table class='table table-bordered table-hover'>";

        // table head
        read_products_html += "<thead>";
        read_products_html += "<tr>";
        read_products_html += "<th class='w-20-pct'>Couverture</th>";
        read_products_html += "<th class='w-20-pct'>Titre</th>";
        read_products_html += "<th class='w-20-pct'>Note</th>";
        read_products_html += "<th class='w-10-pct text-align-center'>Action</th>";
        read_products_html += "</tr>";
        read_products_html += "</thead>";
        read_products_html += "<tbody id='searchBtnParent'>";

        // loop list of data
        if (data.results) {
            const val = data.results
            for (let i = 0; i < val.length; i++) {

                read_products_html += "<tr>";

                // if (val[i].volumeInfo.imageLinks) {
                //     if (val[i].volumeInfo.imageLinks.smallThumbnail) {
                        read_products_html += `<td class='justify-center'><img src=https://image.tmdb.org/t/p/w500${val[i].poster_path}></td>`;
                        read_products_html += `<td>${val[i].name}</td>`;
                        read_products_html += `<td>${val[i].vote_average}</td>`;

                        read_products_html += "<td>";
                        // detail product button
                        read_products_html += `<button class='btn btn-primary m-10px read-one-product-button' data-id='${val[i].id}' data-keywords='${keywords}'>`;
                        read_products_html += "<span class='glyphicon glyphicon-eye-open'></span> Détails";
                        read_products_html += "</button>";
                        // add button
                        read_products_html += `<button class='btn btn-info m-10px add-product-button' data-id='${val[i].id}' data-keywords='${keywords}'>`;
                        read_products_html += "<span class='glyphicon glyphicon-edit'></span> Ajouter";
                        read_products_html += "</button>";
                        read_products_html += "</td>";

                //     }
                // }

                read_products_html += "</tr>";
            }
        };

        read_products_html += "</tbody>";

        // end table
        read_products_html += "</table>";

        // pagination
      

        // inject to 'page-content' of our app
        document.querySelector('#page-content').innerHTML = read_products_html;

        // chargement des data sur les boutons
        chargeDataBtn();

        // btn retour
        let btnReturnList = document.querySelector('#read-products');
        btnReturnList.addEventListener('click', function (e) {

            listProduct();

        });

    };

    const chargeDataBtn = function chargeDataBtn() {

        // event listen on each btn action
        let searchBtnParent = document.querySelector("#searchBtnParent");
        console.log(searchBtnParent);

        for (let i = 0; i < searchBtnParent.children.length; i++) {

            let id = '';
            let keywords = '';

            // event listen on each detail btn
            let detailElement = searchBtnParent.children[i].children[3].children[0];
            detailElement.addEventListener('click', function (e) {

                id = e.target.dataset.id;
                keywords = e.target.dataset.keywords;
                console.log(id, keywords);

                ReadOneProduct(id, keywords);

            });
            
            // event listen on each add btn
            let addElement = searchBtnParent.children[i].children[3].children[1];
            addElement.addEventListener('click', function (e) {

                id = e.target.dataset.id;
                keywords = e.target.dataset.keywords;
                console.log(id, keywords);

                AddOneProduct(id, keywords);

            });
        };
    };
};
