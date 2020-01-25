
function getLyrics(){

    var trackSearch = document.getElementById("trackSearch").value;
    document.getElementById("lyrics").textContent = "";
      $.ajax({
        type: "GET",
        data: {
            apikey:"da9deef32d4c04ca1b56d484548bdf76",
            q_track: trackSearch,
            format:"jsonp",
            callback:"jsonp_callback"
        },
        url: "https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&quorum_factor=1&apikey=https://api.musixmatch.com/ws/1.1/track.lyrics.get?format=jsonp&callback=callback&track_id=0&apikey=da9deef32d4c04ca1b56d484548bdf76",
        dataType: "jsonp",
        jsonpCallback: 'jsonp_callback',
        contentType: 'application/json',
        success: function(data) {
            console.log(data); 
            //console.log(data.message.body.track_list[0].track.album_coverart_350x350)
            //console.log(data.message.body.track_list[0].track.lyrics_id)
            var rand = data.message.body.track_list[0];
            //Math.floor(Math.random(-0) * data.message.body.track_list.length)];
            console.log("track id")
            console.log(rand.track.track_id)
            var thisTrack = (rand.track.track_id)
            console.log("thispic");
           // var thisPic = rand.track.album_coverart_350x350;
            //console.log(thisPic)
    
            var p = document.createElement("p");
            p.textContent = thisTrack;
            p.id = thisTrack;
    
            //var img = document.createElement("img")
            //img.setAttribute("src",thisPic)
    
            document.getElementById("lyrics").appendChild(p).style.opacity = 0;
            //document.getElementById("lyrics").appendChild(img);
            document.getElementById("ghost").click();
    
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }    
      });
     };
    
    
     function getLyricsNow(){
        var trackId = document.getElementById("lyrics").textContent;
        console.log(trackId)
      $.ajax({
        type: "GET",
        data: {
            apikey:"da9deef32d4c04ca1b56d484548bdf76",
            track_id: trackId,
            format:"jsonp",
            callback:"jsonp_callback"
        },
        url: "https://api.musixmatch.com/ws/1.1/track.lyrics.get?format=jsonp&callback=callback&track_id=0&apikey=https://api.musixmatch.com/ws/1.1/track.lyrics.get?format=jsonp&callback=callback&track_id=0&apikey=da9deef32d4c04ca1b56d484548bdf76",
        dataType: "jsonp",
        jsonpCallback: 'jsonp_callback',
        contentType: 'application/json',
        success: function(data) {
           console.log(data); 
           console.log(data.message.body.lyrics.lyrics_body); 
          var lyricsBody = data.message.body.lyrics.lyrics_body.split(/\s+/).slice(0,100).join(" ")+ "...";
           
            var j = document.createElement("p")
            j.textContent = lyricsBody
            document.getElementById("lyrics").appendChild(j)
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }    
      });
     };