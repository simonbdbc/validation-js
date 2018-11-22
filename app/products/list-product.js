function listProduct() {

    let keywords = '';
    let data = {items: []};
    let aData = [];

    // data local storage
    function getAllLocalStorage() {
        if (localStorage.length > 0) {
            for (var i = 1; i < localStorage.length + 1; i++) {
                aData.push(JSON.parse(localStorage.getItem(`${i}`)));
            };
            data.items = aData;
            return data;
        };
    };
    
    data = getAllLocalStorage();

    var read_products_html = "";

    // search products form
    read_products_html += "<form id='search-product-form' action='#' method='post'>";
    read_products_html += "<div class='input-group pull-left w-30-pct'>";

    read_products_html += `<input type='text' value='${keywords}' id='keywords' name='keywords' class='form-control product-search-keywords' placeholder='Chercher un livre...' />`;

    read_products_html += "<span class='input-group-btn'>";
    read_products_html += "<button type='submit' class='btn btn-default' type='button'>";
    read_products_html += "<span class='glyphicon glyphicon-search'></span>";
    read_products_html += "</button>";
    read_products_html += "</span>";

    read_products_html += "</div>";
    read_products_html += "</form>";

    // table
    read_products_html += "<table class='table table-bordered table-hover'>";

    // table head
    read_products_html += "<thead>";
    read_products_html += "<tr>";
    read_products_html += "<th class='w-20-pct'>Couverture</th>";
    read_products_html += "<th class='w-20-pct'>Titre</th>";
    read_products_html += "<th class='w-20-pct'>Editeur</th>";
    read_products_html += "<th class='w-10-pct text-align-center'>Action</th>";
    read_products_html += "</tr>";
    read_products_html += "</thead>";
    read_products_html += "<tbody id='btnParent'>";

    // loop list of data
    if (data) {
        if (data.items) {
            const val = data.items
            for (let i = 0; i < val.length; i++) {

                read_products_html += "<tr>";

                if (val[i].volumeInfo.imageLinks) {
                    if (val[i].volumeInfo.imageLinks.smallThumbnail) {
                        read_products_html += `<td class='justify-center'><img src=${val[i].volumeInfo.imageLinks.smallThumbnail}></td>`;
                        read_products_html += `<td>${val[i].volumeInfo.title}</td>`;
                        read_products_html += `<td>${val[i].volumeInfo.publisher}</td>`;

                        read_products_html += "<td>";
                        // detail product button
                        read_products_html += `<button class='btn btn-primary m-10px read-one-product-button' data-id='${val[i].id}' data-keywords='${keywords}'>`;
                        read_products_html += "<span class='glyphicon glyphicon-eye-open'></span> Détails";
                        read_products_html += "</button>";
                        
                    }
                }

                read_products_html += "</tr>";
            }
        };
    };

    read_products_html += "</tbody>";

    // end table
    read_products_html += "</table>";

    // inject to 'page-content' of our app
    document.querySelector('#page-content').innerHTML = read_products_html;

    // btn search
    let form = document.querySelector("#search-product-form");
    form.addEventListener("submit", function (e) {

        let keywords = document.querySelector("#keywords").value;

        if (keywords) {
            // searchApi(keywords);
            searchBook(keywords);
        }

        e.preventDefault();
        return false;
    });

    // event listen on each btn
    let theParent = document.querySelector("#btnParent");
    for (let i = 0; i < theParent.children.length; i++) {
        
        // event listen on each detail btn
        let detailEl = theParent.children[i].children[3].children[0];
        detailEl.addEventListener('click', function (e) {

            let id = e.target.dataset.id;
            let keywords = e.target.dataset.keywords;
            console.log(id, keywords);

            ReadOneProduct(id, keywords);

        }, false);
    };
}