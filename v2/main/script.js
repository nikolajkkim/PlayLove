let access_token = '';
let playlist_id = '';
let songData = {
    "uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh"]
  };
let message = "coding is religion".split(" ")
message.reverse()

// function getInputValue(){
//     // Selecting the input element and get its value 
//     var inputVal = document.getElementById("sentence").value;
//     message = inputVal.split(" ")
//     message.reverse();
//     console.log();

    

// }

function load() {
    console.log(window.location);
    let access = window.location.hash.substring(14);
    console.log(access);
    access_token = access;
    let id = ''

    fetch('https://api.spotify.com/v1/me',

        {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + access,
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        }

    ).then(res => res.json()).then(renderSpotifyDataInHTML);
}

function renderSpotifyDataInHTML(spotifyData) {
    console.log(spotifyData);
    document.body.innerHTML += spotifyData.display_name;
    id = spotifyData.display_name
    document.body.innerHTML += `<img src="${spotifyData.images[0].url}" />`;


    let playlistData = {
        "name": "Love List",
        "description": "Play love has created a playlist for you!!!",
        "public": true
      };
    fetch('https://api.spotify.com/v1/users/' + spotifyData.id + '/playlists',
        {
            method: 'POST',
            body: JSON.stringify(playlistData),
            headers: new Headers({
                'Authorization': 'Bearer ' + access_token,
                'Content-Type': 'application/json'
            }),
            success: function(response) {
                console.log(response);
              }
        }
    ).then(res => res.json()).then(savePlayListData)

    function savePlayListData(playlist_info){
        playlist_id = playlist_info.id

        function processSearch(searchResults){
            // songData.push( searchResults.track.items[0].uri)

            let temp = {"uris": [searchResults.tracks.items[0].uri], "position": 0}
            addSongsToPlaylist(playlist_id, temp)

        }

        for (let i = 0; i <= message.length-1; i++) {
            fetch('https://api.spotify.com/v1/search?q=' + message[i] + '&type=track',
                {
                    method: 'GET',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + access_token,
                        'Content-Type': 'application/json'
                    }),
                    success: function(response) {
                        console.log(response);
                      }
                }
            ).then(res => res.json()).then(processSearch)
            
          }

         
    }

    function addSongsToPlaylist(playlist_id, songData){
        // if(songs.length) return;
        // let songData = songs[0];
        print(playlist_id)
        uri = JSON.stringify(songData)

        fetch('https://api.spotify.com/v1/playlists/' + playlist_id + '/tracks',
        {
            method: 'POST',
            body: JSON.stringify(songData),
            headers: new Headers({
                'Authorization': 'Bearer ' + access_token,
                'Content-Type': 'application/json'
            }),
            success: function(response) {
                console.log(response);
              }
        }
    ).then(res => res.json()).then()
    }

    

}


// function fnCallbackExample(fn) {
//     // they do stuff ehre
//     let stuff = 'hello';

//     fn(stuff);
// }