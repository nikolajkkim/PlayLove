let access_token = '';

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
    ).then(res => res.json())

    console.log(spotifyData);
    document.body.innerHTML += spotifyData.display_name;
    id = spotifyData.display_name
    document.body.innerHTML += `<img src="${spotifyData.images[0].url}" />`;
}

function createPlaylist(spotifyData){
    //console.log(spotifyData)
}


// function fnCallbackExample(fn) {
//     // they do stuff ehre
//     let stuff = 'hello';

//     fn(stuff);
// }