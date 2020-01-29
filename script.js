var button = document.getElementById("btn");
var authorizationToken;
var queryURL;
var searchTerm;

$(document).ready(function () {

    requestToken();
    getToken();

});

function requestToken() {

    var redirectUri = window.location.href;
    if (redirectUri.includes("#access_token=")) return;

    if (redirectUri !== "https://sk2060sk2060.github.io/project-1" || redirectUri !== "http://127.0.0.1:8080/") {
        redirectUri = "http://127.0.0.1:8080/"

        var scope = "user-library-modify";
        window.location.href = "https://accounts.spotify.com/authorize?client_id=21b6e99dfa9948818d67377855f4d685&response_type=token&scope=" + encodeURIComponent(scope) + "&redirect_uri=" + redirectUri;
    }
}
function getToken() {
    var returnAuthorizationToken = location.hash.substr(1);
    authorizationToken = "Bearer " + returnAuthorizationToken.substring(returnAuthorizationToken.indexOf("=") + 1, returnAuthorizationToken.indexOf("&"));
    console.log(authorizationToken);

}

function buildQueryURL() {
    searchTerm = $("#search-term").val();
    console.log(searchTerm);
    queryURL = "https://api.spotify.com/v1/search?q=" + searchTerm + "&type=artist";
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
        var firstSongID = response.artists.items[0].id;
        queryURL = `https://api.spotify.com/v1/artists/${firstSongID}/top-tracks?country=US`;

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
            console.log("tracks", response);
            var artist = response[0].artists[0].name;
            var title = response[0].name;
            var musixMatchQuery = `${artist} - ${title}`;

        });

    });
}



document.getElementById("search").addEventListener("click", function () {
    searchForArtist();
});





