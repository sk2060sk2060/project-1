var button = document.getElementById("btn");
var authorizationToken;
var queryURL;
var searchTerm;

getToken();

function getToken() {
    var returnAuthorizationToken = location.hash.substr(1);
    authorizationToken = "Bearer " + returnAuthorizationToken.substring(returnAuthorizationToken.indexOf("=") + 1, returnAuthorizationToken.indexOf("&"));
    console.log(authorizationToken);
}

function buildQueryURL() {
    searchTerm = $("#search-term").val();
    console.log(searchTerm);
    queryURL = "https://api.spotify.com/v1/search?q=" + searchTerm + "&type=artists";
}

function searchForArtist() {
    buildQueryURL();
    $.ajax({
        method: "GET",
        // headers: {
        //     "Authorization": authorizationToken
        // },
        beforeSend: function (request) {
          request.setRequestHeader("Authorization", authorizationToken);
          request.setRequestHeader("Accept", "application/json");
        },
        url: queryURL,
      }).fail(function (jqXHR, textStatus, errorThrown) {
      }).done(function (response) {
        console.log(response);
    });
}

button.addEventListener("click", function () {
    console.log("click");
    
    var redirectUri = window.location.href;
    if (redirectUri !== "https://sk2060sk2060.github.io/project-1" || redirectUri !== "http://127.0.0.1:8080/") {
        console.log(redirectUri);
        var scope = "user-read-email";
        window.location.href = "https://accounts.spotify.com/authorize?client_id=21b6e99dfa9948818d67377855f4d685&response_type=token&scope=" + encodeURIComponent(scope) + "&redirect_uri=" + redirectUri;
    }
});

document.getElementById("search").addEventListener("click", function() {
    searchForArtist();
});





