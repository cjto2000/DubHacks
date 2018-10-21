/*
    post: print out some form of data response from the News API
*/
function queryNewsAPI(source) {
    var url = 'https://newsapi.org/v2/everything?' +
              'q=Apple&' +
              'sources=' + source +
              'from=2018-10-21&' +
              'sortBy=popularity&' +
              'apiKey=661e892338f046869d509792438cb3c0';


    console.log(url);
    
    var req = new Request(url);

    fetch(req)  // using the MDN Fetch API
        .then(function(response) {  // Processing the response object from request
            return response.json();
        })
        .then(function (response) {  // Processing to get the json from the response
            console.log(response);
            document.getElementById("article1").innerHTML = (response.articles[0].content);
        });
}

function specifySource(source) {
    queryNewsAPI("bbc-news");
}
