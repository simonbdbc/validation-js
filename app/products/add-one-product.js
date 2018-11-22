function AddOneProduct(id, keywords) {
    // console.log(id, keywords);
    const baseUrl = "https://api.themoviedb.org/3/";
    const apiKey = "6201f860754bab18d08c1e6dad850dae";
    const url = `${baseUrl}tv/${id}?api_key=${apiKey}&language=fr-FR`;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data.items[0]);

            nKey = localStorage.length + 1;
            sData = JSON.stringify(data.items[0]);
            localStorage.setItem(nKey, sData);
        })
};