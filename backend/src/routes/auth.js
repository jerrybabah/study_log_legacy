import express from 'express';
import Evernote from 'evernote';
import config from 'config';


const router = express.Router();


router.get('/', (req, res) => {
  const {
    consumerKey, consumerSecret, sandbox, china, callback,
  } = config.get('evernote');
  console.log({
    consumerKey, consumerSecret, sandbox, china,
  });
  const client = new Evernote.Client({
    consumerKey, consumerSecret, sandbox, china,
  });

  client.getRequestToken(callback, (error, oauthToken, oauthTokenSecret, results) => {
    if (error) {
      req.session.error = JSON.stringify(error);
      res.redirect('/');
    } else {
      // store the tokens in the session
      req.session.oauthToken = oauthToken;
      req.session.oauthTokenSecret = oauthTokenSecret;

      // redirect the user to authorize the token
      res.redirect(client.getAuthorizeUrl(oauthToken));
    }
  });
});


router.get('/callback', (req, res) => {
  const {
    consumerKey, consumerSecret, sandbox, china,
  } = config.get('evernote');
  const client = new Evernote.Client({
    consumerKey, consumerSecret, sandbox, china,
  });

  client.getAccessToken(
    req.session.oauthToken,
    req.session.oauthTokenSecret,
    req.query.oauth_verifier,
    (error, oauthAccessToken, oauthAccessTokenSecret, results) => {
      if (error) {
        console.log('error');
        console.log(error);
        res.redirect('/');
      } else {
        // store the access token in the session
        req.session.oauthAccessToken = oauthAccessToken;
        req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;
        req.session.edamShard = results.edam_shard;
        req.session.edamUserId = results.edam_userId;
        req.session.edamExpires = results.edam_expires;
        req.session.edamNoteStoreUrl = results.edam_noteStoreUrl;
        req.session.edamWebApiUrlPrefix = results.edam_webApiUrlPrefix;
        console.log(oauthAccessToken);
        res.redirect('/');
      }
    },
  );
});

export default router;
