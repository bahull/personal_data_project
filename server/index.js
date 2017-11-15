const express = require("express");
const session = require("express-session");
const massive = require("massive");
const { json } = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");

const users = require("./controllers/users");

const { secret } = require("./../config");
const { domain, clientID, clientSecret } = require("./../config").auth0;

require("dotenv").config();

const port = process.env.port || 3001;

const app = express();

massive(process.env.CONNECTION_STRING).then(dbInstance => {
  app.set("db", dbInstance);
});

app.use(json());
app.use(cors());

app.use(
  session({
    secret,
    saveUninitialized: false,
    resave: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new Auth0Strategy(
    {
      domain,
      clientID,
      clientSecret,
      callbackURL: "/login"
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      //   // accessToken is the token to call Auth0 API (not needed in the most cases)
      //   // extraParams.id_token has the JSON Web Token
      //   // profile has all the information from the user
      app
        .get("db")
        .getUserByAuthID(profile.id)
        .then(response => {
          if (!response[0]) {
            app
              .get("db")
              .createUserByAuth([profile.id, profile.displayName])
              .then(created => {
                return done(null, created[0]);
              })
              .catch(console.log);
          } else {
            return done(null, response[0]);
          }
        });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get(
  "/login",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/dashboard",
    failureFlash: true
  })
);

app.listen(port, () => {
  console.log(`listening at port: ${port}`);
});
