function ReadOneProduct(id, keywords) {
    console.log(id, keywords);

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${id}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            ReadOneProductHtml(data, keywords);
            changePageTitle("Recherche " + keywords);
        })

    function ReadOneProductHtml(data, keywords) {

        // start html
        var read_one_product_html = "";

        // when clicked, it will show the product's list
        read_one_product_html += "<div id='read-products' class='btn btn-primary pull-right m-b-15px list-products-button'>";
        read_one_product_html += "<span class='glyphicon glyphicon-list'></span> Go Back";
        read_one_product_html += "</div>";

        // product data will be shown in this table
        read_one_product_html += "<table class='table table-bordered'>";

        // product name
        read_one_product_html += "<tr>";
        read_one_product_html += `<th colspan='2'><img src='${data.items[0].volumeInfo.imageLinks.smallThumbnail}'></th>`;
        read_one_product_html += "</tr>";

        // product name
        read_one_product_html += "<tr>";
        read_one_product_html += "<td class='w-30-pct'>Name</td>";
        read_one_product_html += `<td class='w-70-pct'>${data.items[0].volumeInfo.title}</td>`;
        read_one_product_html += "</tr>";

        // product price
        read_one_product_html += "<tr>";
        read_one_product_html += "<td>Authors</td>";
        read_one_product_html += `<td>${data.items[0].volumeInfo.authors[0]}</td>`;
        read_one_product_html += "</tr>";

        // product description
        read_one_product_html += "<tr>";
        read_one_product_html += "<td>Description</td>";
        read_one_product_html += `<td>${data.items[0].volumeInfo.description}</td>`;
        read_one_product_html += "</tr>";

        // product category name
        read_one_product_html += "<tr>";
        read_one_product_html += "<td>Publisher</td>";
        read_one_product_html += `<td>${data.items[0].volumeInfo.publisher}</td>`;
        read_one_product_html += "</tr>";

        // product category name
        read_one_product_html += "<tr>";
        read_one_product_html += "<td>Published date</td>";
        read_one_product_html += `<td>${data.items[0].volumeInfo.publishedDate}</td>`;
        read_one_product_html += "</tr>";

        read_one_product_html += "</table>";

        // inject html to 'page-content' of our app
        $("#page-content").html(read_one_product_html);

        // chage page title
        changePageTitle("Détails");

        // btn retour
        let btnReturnList = document.querySelector('.list-products-button');
        btnReturnList.addEventListener('click', function (e) {

            if (keywords) {
                searchBook(keywords);
            } else {
                listProduct();
            }

            e.preventDefault();
            return false;
        });
    };
};