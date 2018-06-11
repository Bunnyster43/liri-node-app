require("dotenv").config();

var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");
var twitter = require("twitter");
var spotify = require ("node-spotify-api");
var liriArgument = process.argv[2];

switch(liriArgument) {
	case "my-tweets": myTweets(); break;
	case "spotify-song": spotifySong(); break;
	case "movie-this": movieThis(); break;
  case "do-what-it-says": doWhatItSays(); break;
};

// node liri.js my-tweets 'squirrelster21'
// node liri.js spotify-song 'I Want It That Way'
// node liri.js movie-this 'mr nobody'
// node liri.js do-what-it-says

// Twitter
function myTweets() {
  var client = new twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
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
function spotifySong(){
var spotify = spotifySong({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});
var songname = "";
  for (var i = 3; i < process.argv.length; i++) {
  songname += process.argv[i] + "";
}
if(songname === ""){
  spotify.search({type: "track", query: "I Want It That Way"}, function(error,data) {
if (error) {
  return console.log("Error occurred: " + error);
}else {
  console.log("Artists: " + data.tracks.items[7].artists[0].name);
  console.log('Album Name: ' + data.tracks.items[7].album.name);
  console.log("Song name: " + data.tracks.items[7].name);
  console.log("Link: " + data.tracks.items[7].preview_url);
  
  console.log(spotifyResults);
  log(spotifyResults);
}});
}}

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