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

//Initialize session for use
app.use(
  session({
    secret,
    resave: true,
    saveUninitialized: true
  })
);

//Initialize massive and gain access to db
massive(process.env.CONNECTION_STRING)
  .then(db => app.set("db", db))
  .catch(console.log);

//Body parser and Cors initialization
app.use(json());
app.use(cors());

//Initializes passport for use
app.use(passport.initialize());
app.use(passport.session());

//Checks if user is in the database and if not, adds an entry with their auth.id and profile.id
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

//On successful login redirects to the dashboard
app.get(
  "/login",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/dashboard"
  })
);

//On component render checks if their is a user object on session, otherwise redirects them to login
app.get("/api/me", (req, res, next) => {
  if (!req.user) res.json("");
  res.status(200).json(req.user);
  console.log("req.user: ", req.user);
});

//Retrieves blob and stores it on the user object on session to save
app.post("/api/retrieveFile", (req, res, next) => {
  console.log("The User: ", req.body.file, req.user);
  req.user.newFile = req.body.file;
  res.status(200).json(req.user.newFile);
});

app.listen(port, () => {
  console.log(`listening at port: ${port}`);
});
