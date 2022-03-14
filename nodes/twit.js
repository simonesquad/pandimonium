// initial instinct is to rely on twit to connect to the Twitter API
var Twit = require('twit');
//this requires pulling twitter acct info from a config file
var config = require('./config.js');
//making a new Twit object for connection to the API
var T = new Twit(config);

//Set up the user stream
var stream = T.stream('user');

// Need the bot looking for that specific tweet event mention
stream.on('tweet', tweetEvent);

function tweetEvent(tweet) {
    //first sanity check programmed in for testing account credentials
    T.get('account/verify_credentials', { skip_status: true })
        .catch(function (err) {
            console.log('caught error', err.stack)
        })
        .then(function (result) {
            console.log('data', result.data);
        })

    var name = tweet.user.screen_name;
    var txt = tweet.text;

    if (reply_to === 'PizzaDonez') {
        txt = txt.replace(/@PizzaDonez/g,'');

        //Repost their tweet for funsies
        T.post('statuses/update', { status: reply }, tweeted);

        //Sanity check for tweet reply and a back up on twitter
        function tweeted(err, reply) {
            if (err != undefined) {
                console.log(err);
            } else {
                console.log('Tweeted: ' + reply);
            }
        };
    }

}