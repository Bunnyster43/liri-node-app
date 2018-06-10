var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");
var twitter = require("twitter");
var spotify = require ("node-spotify-api");
var liriArgument = process.argv[2];

switch(liriArgument) {
	case "my-tweets": myTweets(); break;
	case "spotify-this-song": spotifySong(); break;
	case "movie-this": movieThis(); break;
  case "do-what-it-says": doWhatItSays(); break;
};

// node liri.js my-tweets 'squirrelster21'
// node liri.js spotify-this-song 'I Want It That Way'
// node liri.js movie-this 'mr nobody'
// node liri.js do-what-it-says
  
// Twitter
function myTweets() {
  var client = new twitter({
    consumer_key: 'EhgmBD8cBs6A381NZLMh4cumL',
    consumer_secret: 'pFxnZSm8lfCLVDtr8lYga6GNEd94shdbKlYSe3HLUU3lYeaP8i',
    access_token_key: '1306315945-eXh2mOQ4SjOSkT4zKXSndLnG2sATkcLKJS2uiVM',
    access_token_secret: 'tHibqVAAXYj6uBiDCIt0wBfOtPhXpL6Ofe7PPhiwVrWVv',
  });
  var twitterUsername = process.argv[3];
  if(!twitterUsername){
    twitterUsername = "squirrelster21";
  }
  var params = {screen_name: 'squirrelster21'} && {count: 20};
  client.get("statuses/user_timeline/", params, function(error, data, response){
    if (!error) {
      for(var i = 0; i < data.length; i++) {
        var twitterResults = 
        "@" + data[i].user.screen_name + ": " + 
        data[i].text + "\r\n" + 
        data[i].created_at + "\r\n" + 
        "------------------------------ " + i + " ------------------------------" + "\r\n";
        console.log(twitterResults);
        log(twitterResults); 
      }
    }  else {
      console.log("Error :"+ error);
      return;
    }
  });
}

//Spotify
//function spotifySong(){
//var spotify = new spotify({
//  id: '3fc069d43e7b4eb8b5b2a2ea53c8df0c',
//  secret: '70ac4a227c884202b4d58c4b76050c14',
//})
//}
//{
//if(!songName){
//    songName = "I Want It That Way";
//  }
//{
//var spotify = require('node-spotify-api'); //.request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
//  spotify.search({
//    type: 'track',
//    query: value + '&limit=1&'
//}, function(err, data) {
//    if(!err){
//      var songInfo = data.tracks.items;
//      for (var i = 0; i < 5; i++) {
//        if (songInfo[i] != undefined) {
//          var spotifyResults =
//          "Artist: " + songInfo[i].artists[0].name + "\r\n" +
//          "Song: " + songInfo[i].name + "\r\n" +
//          "Album the song is from: " + songInfo[i].album.name + "\r\n" +
//          "Preview Url: " + songInfo[i].preview_url + "\r\n" + 
//          "------------------------------ " + i + " ------------------------------" + "\r\n";
//          console.log(spotifyResults);
//          log(spotifyResults);
//        }
//      }
//    }	else {
//      console.log("Error :"+ err);
//      return;
//    }}
//  ,);
//};

 //Movie
function movieThis(){
  var movie = process.argv[3];
  if(!movie){
    movie = "mr nobody";
  }
  params = movie
  request("http://www.omdbapi.com/?t=" + params + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var movieObject = JSON.parse(body);
      console.log(movieObject);
      var movieResults =
      "Title: " + movieObject.Title+"\r\n"+
      "Year: " + movieObject.Year+"\r\n"+
      "Imdb Rating: " + movieObject.imdbRating+"\r\n"+
      //"Rotten Tomatoes Rating: " + movieObject.tomatoRating+"\r\n"+
      "Country: " + movieObject.Country+"\r\n"+
      "Language: " + movieObject.Language+"\r\n"+
      "Plot: " + movieObject.Plot+"\r\n"+
      "Actors: " + movieObject.Actors+"\r\n"+
      console.log(movieResults);
      log(movieResults);
    } else {
      console.log("Error :"+ error);
      return;
    }
  });
};

//Do What It Says
function doWhatItSays() {
  fs.writeFile("random.txt", "spotify-this-song: I Want It That Way", "utf8", function(err){
    if (err) {
      return console.log(err);
    } else {
      console.log("random.txt was updated!");
      log("random.txt was updated!");
    }
  });
};

//log text
function log(logResults) {
  fs.appendFile("log.txt", logResults, (error) => {
    if(error) {
      throw error;
    }
  });
}
