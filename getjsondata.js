//maps the bias value to source with that value
var valueToSource = new Map([
    [1, ["buzzfeed", "the-huffington-post"]],
    [2, ["new-york-magazine"]],
    [3, ["the-new-york-times", "the-washington-post", "the-guardian-uk", "politico"]],
    [4, ["nbc-news", "abc-news", "bbc-news", "usa-today"]],
    [5, ["reuters", "bloomberg", "cbs-news", "the-economist", "time"]],
    [6, ["the-wall-street-journal", "the-hill"]],
    [7, ["the-washington-times"]],
    [8, ["fox-news", "the-american-conservative"]],
]);

// maps the news source to its bias value
var sourceToValue = new Map([
    ["abc-news", 4],
    ["bbc-news", 4],
    ["bloomberg", 5],
    ["buzzfeed", 1],
    ["cbs-news", 5],
    ["fox-news", 8],
    ["nbc-news", 4],
    ["new-york-magazine", 2],
    ["politico", 3],
    ["reuters", 5],
    ["the-american-conservative", 8],
    ["the-economist", 5],
    ["the-guardian-uk", 3],
    ["the-hill", 1],
    ["the-huffington-post", 1],
    ["the-new-york-times", 3],
    ["the-wall-street-journal", 6],
    ["the-washington-post", 3],
    ["the-washington-times", 7],
    ["time", 5],
    ["usa-today", 4],
]);

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

    console.log(valueToSource);
    console.log(sourceToValue);
}

function specifySource() {
    queryNewsAPI("trump", "abc-news");
}
