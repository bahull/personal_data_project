const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");
const passport = require("passport");

const app = express();

const Auth0Strategy = require("passport-auth0");
const configureStripe = require("stripe");



const users = require("./controllers/users"); 
const data = require("./controllers/data"); 


require("dotenv").config();

const port = 3001;



const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(express.static(`${__dirname}/../build`));
//
//Initialize session for use
app.use(
  session({
    secret: process.env.SECRET,
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
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL: "/auth"
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

passport.deserializeUser(function(user, done) {
  done(null, user);
});

//On successful login redirects to the dashboard
app.get(
  "/auth",
  passport.authenticate("auth0", {
    successRedirect: "/dashboard"
  })
);

//On component render checks if their is a user object on session, otherwise redirects them to login
app.get("/api/me", users.validUser);

//Retrieves blob and stores it on the user object on session to save
app.post("/api/retrieveFile", data.storeSpreadsheet);

//Post a saved spreadsheet to user.newfile
app.post("/api/retrieveSavedFile",data.retrieveSavedFile);

app.get("/api/getFile", data.getFile);

//Retrieves the uploaded file
app.post("/api/get", data.uploadedFile);

//Destroys current session on logout
app.get("/api/logout", users.logout);

// Donate
app.post("/api/donate", data.donate);

app.get("/api/getPeople", users.getUsers);

app.post("/api/getDegreeDays", data.getDegreeDays);

app.post("/api/actualDegreeDays", data.totalDegreeDays);

app.post("/api/deleteFailedSheet", data.deleteFailedSheet);


var path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../build/index.html`));
});

app.listen(port, () => {
  console.log(`listening at port: ${port}`);
});
