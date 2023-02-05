const { response } = require('express');
const express = require('express')
const port = 3000

var client_id = '74a093c1a91546eb88453c63d4edc6da';
var redirect_uri = 'http://localhost:3000/test';
const querystring = require('node:querystring');

var app = express();

app.get('/login', function(req, res) {

//   var state = generateRandomString(16);
  var scope = 'playlist-modify-public';
console.log(querystring.stringify({
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
  }));
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
    }));
    
});

app.get('/test', function(req, res){
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
      };
    res.render('index', { title: 'Hey', message: 'Hello there!' })
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })