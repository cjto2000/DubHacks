//maps the bias value to source with that value
var valueToSource = new Map([
    [1, ["buzzfeed", "the-huffington-post"]],
    [2, ["new-york-magazine"]],
    [3, ["the-new-york-times", "the-washington-post", "the-guardian-uk", "politico"]],
    [4, ["nbc-news", "abc-news", "bbc-news", "usa-today"]],
    [5, ["reuters", "cbs-news", "the-economist", "time"]],
    [6, ["the-wall-street-journal", "the-hill"]],
    [7, ["the-washington-times"]],
    [8, ["fox-news", "the-american-conservative"]],
]);

// maps the news source to its bias value
var sourceToValue = new Map([
    ["abc-news", 4],
    ["bbc-news", 4],
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

var sourceName = new Map([
    ["abc-news", "ABC News"],
    ["bbc-news", "BBC News"],
    ["buzzfeed", "Buzzfeed News"],
    ["cbs-news", "CBS News"],
    ["fox-news", "FOX News"],
    ["nbc-news", "NBC News"],
    ["new-york-magazine", "New York Magazine"],
    ["politico", "Politico"],
    ["reuters", "Reuters"],
    ["the-american-conservative", "The American Conservative"],
    ["the-economist", "The Economist"],
    ["the-guardian-uk", "The Guardian"],
    ["the-hill", "The Hill"],
    ["the-huffington-post", "The Huffington Post"],
    ["the-new-york-times", "The New York Times"],
    ["the-wall-street-journal", "The Wall Street Journal"],
    ["the-washington-post", "The Washington Post"],
    ["the-washington-times", "The Washington Times"],
    ["time", "TIME"],
    ["usa-today", "USA TODAY"],
]);

//gets the id of the dropdown selection
var currentSource;
$(function(){
  $(".dropdown-menu a").click(function(e){
    currentSource = e.target.id;
    console.log("user source: " + currentSource);
    $(".btn:first-child").text($(this).text());
    $(".btn:first-child").val($(this).text());
  });
});

/*
    pre: takes in strings keyword and source.

        source is which news outlet to search from.
    post: print out some form of data response from the News API
*/
function queryNewsAPI(keyword, source, article, fail) {
    // Make a url with query strings and apiKey
    var url = "https://newsapi.org/v2/everything?" +
    "q=" + keyword + "&" +
    "sources=" + source + "&" +
    "apiKey=1c2c9496522c45818207e592c841a459";

    console.log(url);

    var req = new Request(url);

    fetch(req)  // using the MDN Fetch API
        .then(function(response) {  // Processing the response object from request
            return response.json();
        })
        .then(function (response) {  // Processing to get the json from the response
            console.log(response);
            if (response.articles.length > 0) {
                document.getElementById(article).setAttribute("src", response.articles[0].url);
            } else {
                document.getElementById(fail).innerHTML = "No articles found.";
            }
        });
}

function specifySource() {
    // TODO: Get user's source
    source = currentSource;
    // TODO: Get user's keyword
    keyword = document.getElementById("currentKeyword").value;
    keyword = formatSpaces(keyword);
    console.log("keyword: " + keyword);
    polarity = sourceToValue.get(source);
    console.log("user source bias: " + polarity);
    oppositePolarity = valueToSource.size - polarity + 1;
    console.log("opposite source bias: " + oppositePolarity);
    var randomBiasIndex = pickRandomBias(oppositePolarity);
    console.log("final source bias: " + randomBiasIndex);
    listOfSources = valueToSource.get(randomBiasIndex);
    randomSource = pickRandomSource(listOfSources);
    console.log("opposite source: " + randomSource);
    document.getElementById("fail1").innerHTML = "";
    document.getElementById("fail2").innerHTML = "";
    document.getElementById("articleL").src = "about:blank";
    document.getElementById("articleR").src = "about:blank";
    queryNewsAPI(keyword, source, "articleL", "fail1");
    queryNewsAPI(keyword, randomSource, "articleR", "fail2");
    document.getElementById("article1").innerHTML = sourceName.get(currentSource);
    document.getElementById("article2").innerHTML = sourceName.get(randomSource);
}

//picks a random bias value from the vicinity of the opposite source
function pickRandomBias(oppositePolarity) {
    var randomIndex = getRandomArbitrary(oppositePolarity - 1, oppositePolarity + 1);
    if (randomIndex < 1) {
        randomIndex = 1;
    } else if (randomIndex > 8) {
        randomIndex = 8;
    }
    return randomIndex;
}

//picks a random source from within the array that represents its bias value
function pickRandomSource(listOfSources) {
    var randomIndex = getRandomArbitrary(0, listOfSources.length);
    return listOfSources[randomIndex];
}
// Accessed from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function formatSpaces(phrase) {
    return phrase.replace(/ /g, '%20');
}
