function queryNewsAPI() {
    var url = 'https://newsapi.org/v2/everything?' +
              'q=Apple&' +
              'from=2018-10-21&' +
              'sortBy=popularity&' +
              'apiKey=661e892338f046869d509792438cb3c0';

    var req = new Request(url);

    fetch(req)
        .then(function(response) {
            console.log(response.json());
        });
}
