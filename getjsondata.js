/*
    pre: takes in strings keyword and source.

        source is which news outlet to search from.
    post: print out some form of data response from the News API
*/
function queryNewsAPI(keyword, source) {
    // Make a url with query strings and apiKey
    var url = "https://newsapi.org/v2/everything?" +
    "q=" + keyword + "&" +
    "sources=" + source + "&" +
    "apiKey=661e892338f046869d509792438cb3c0";

    console.log(url);

    var req = new Request(url);

    fetch(req)  // using the MDN Fetch API
        .then(function(response) {  // Processing the response object from request
            return response.json();
        })
        .then(function (response) {  // Processing to get the json from the response
            console.log(response);
            if (response.articles.length > 0) {
                document.getElementById("article1").setAttribute("src", response.articles[0].url);
            } else {
                document.getElementById("article1").innerHTML = "No articles found.";
            }
        });
}

function specifySource() {
    queryNewsAPI("trump", "abc-news");
}
