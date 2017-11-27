const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const configureStripe = require("stripe");

// const users = require("./controllers/users");

const { secret } = require("./../config");
const { domain, clientID, clientSecret } = require("./../config").auth0;
const { STRIPE_SECRET_KEY } = require("./../config");

require("dotenv").config();

const port = 3001;

const app = express();
const stripe = require("stripe")(STRIPE_SECRET_KEY);
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
    function (accessToken, refreshToken, extraParams, profile, done) {
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
              })
              .catch(console.log);
          } else {
            return done(null, response[0]);
          }
        });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

//On successful login redirects to the dashboard
app.get(
  "/login",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/dashboard",
    failureRedirect: "/login"
  })
);

//On component render checks if their is a user object on session, otherwise redirects them to login
app.get("/api/me", (req, res, next) => {

  if (!req.user) {
    res.json("");
  } else {
    const dbInstance = app.get("db");

    dbInstance
      .getAccess([req.user.authid])
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        res.status(500).json(
        )
      });
  }
});

//Retrieves blob and stores it on the user object on session to save
app.post("/api/retrieveFile", (req, res, next) => {
  req.user.newFile = req.body.file;
  res.status(200).json(req.user.newFile);
});

//Retrieves the uploaded file
app.get("/api/get", (req, res, next) => {
  res.status(200).json(req.user);
});

//Destroys current session on logout
app.get("/api/logout", (req, res, next) => {
  req.sessions.destroy();
  res.status(200).json("Session Destroyed");
});

// Donate
app.post("/api/donate", function (req, res) {
  var token = req.body.source;
  var amount = req.body.amount;
  var currency = req.body.currency;

  stripe.charges.create(req.body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.redirect(200, "/");
    }
  });
});

app.get("/api/getPeople", (req, res, next) => {
  const dbInstance = app.get("db");

  dbInstance
    .getUsers()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

app.listen(port, () => {
  console.log(`listening at port: ${port}`);
});