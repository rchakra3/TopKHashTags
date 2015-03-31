var twitterConsumerKey=process.env.TWITTER_CONSUMER_KEY;
var twitterConsumerSecret=process.env.TWITTER_CONSUMER_SECRET;
var twitterAccessToken=process.env.TWITTER_ACCESS_TOKEN;
var twitterAccessSecret=process.env.TWITTER_ACCESS_SECRET;

module.exports = {
    consumer_key: twitterConsumerKey.toString()
  , consumer_secret: twitterConsumerSecret.toString()
  , access_token: twitterAccessToken.toString()
  , access_token_secret: twitterAccessSecret.toString()
}