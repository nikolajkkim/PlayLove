function load() {
    console.log(window.location);
    let access = window.location.hash.substring(14);
    console.log(access);

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
    document.body.innerHTML += `<img src="${spotifyData.images[0].url}" />`;
}


// function fnCallbackExample(fn) {
//     // they do stuff ehre
//     let stuff = 'hello';

//     fn(stuff);
// }