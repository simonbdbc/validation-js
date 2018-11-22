document.addEventListener('DOMContentLoaded', function () {

    // app html
    html_app = "";

    html_app += "<div class='container'>";

    html_app += "<div class='page-header'>";
    html_app += "<h1 id='page-title'>Bibliothèque :</h1>";
    html_app += "</div>";

    html_app += "<div id='page-content'></div>";

    html_app += "</div>";

    // inject l'app dans l'index.html
    $("#app").html(html_app);
    
    listProduct();

    changePageTitle("Liste des livres");
});

// change titre de la page
function changePageTitle(page_title) {

    document.querySelector('#page-title').textContent = page_title;

    // change titre dans l'index.html
    document.title = page_title;
};