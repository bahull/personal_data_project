const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");

const users = require("./controllers/users");

const { secret } = require("./../config");
const { domain, clientID, clientSecret } = require("./../config").auth0;

require("dotenv").config();

const port = 3001;

const app = express();

// app.use(express.static(`${__dirname}/build`));

app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: false
  })
);

massive(process.env.CONNECTION_STRING)
  .then(db => app.set("db", db))
  .catch(console.log);

app.use(json());
app.use(cors());

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
      app
        .get("db")
        .getUserByAuthId(profile.id)
        .then(response => {
          if (!response[0]) {
            app
              .get("db")
              .createUserByAuth([profile.id, profile.displayName])
              .then(created => {
                return done(null, created[0]);
              });
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

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get(
  "/login",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/dashboard"
  })
);

app.get("/api/me", function(req, res) {
  if (!req.user) res.json("");
  res.status(200).json(req.user);
});

app.listen(port, () => {
  console.log(`listening at port: ${port}`);
});
