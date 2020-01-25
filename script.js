var button = document.getElementsByClassName("btn");

button.addEventListener("click", function () {
    var redirectUri = window.location.href;
    if (redirectUri !== "https://sk2060sk2060.github.io/project-1") {
        console.log(redirectUri);
        var scope = "user-library-modify";
        window.location.href = "https://accounts.spotify.com/authorize?client_id=21b6e99dfa9948818d67377855f4d685&response_type=token&scope=" + encodeURIComponent(scope) + "&redirect_uri=" + redirectUri;
    }
});




