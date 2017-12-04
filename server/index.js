const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const configureStripe = require("stripe");

// const users = require("./controllers/users");

// const { domain, clientID, clientSecret } = require("./config").auth0;
// const { STRIPE_SECRET_KEY, CONNECTION_STRING, secret } = require("./config");

require("dotenv").config();

const port = 80;

const app = express();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// app.use(express.static(`${__dirname}/../build`));
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
      console.log("hit auth strat");
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
app.get("/api/me", (req, res, next) => {
  console.log(req.user, "req.user line 97");
  if (!req.user) {
    console.log("hit !req.user");
    res.status(200).send("No User");
  } else {
    console.log("hit else user");
    const dbInstance = app.get("db");

    dbInstance
      .getAccess([req.user.authid])
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        res.status(500).json();
      });
  }
});

//Retrieves blob and stores it on the user object on session to save
app.post("/api/retrieveFile", (req, res, next) => {
  // req.user.newFile = req.body.file;
  // console.log("req.user.newFile: ", req.user);
  console.log("you hit me", req.body.file);
  const dbInstance = app.get("db");
  const {
    file,
    authid,
    exceldata,
    projectLocation,
    address,
    facility,
    industry,
    squareFootage,
    month,
    year,
    total
  } = req.body;

  dbInstance
    .postSpreadsheet([
      req.user.authid,
      JSON.stringify(file),
      // req.body.file,
      // authid,
      // exceldata,
      projectLocation,
      address,
      facility,
      industry,
      squareFootage,
      month,
      year,
      total
    ])
    .then(response => {
      req.user.excelID = response[0].id;
      console.log("req.user.excelID: ", req.user.excelID);
      res.status(200).json(response[0].id);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//Post a saved spreadsheet to user.newfile
app.post("/api/retrieveSavedFile", (req, res, next) => {
  req.user.newFile = req.body.file;

  res.status(200).json(req.user);
});

app.get("/api/getFile", (req, res, next) => {
  const dbInstance = app.get("db");

  dbInstance
    .getSpreadsheets([req.user.authid])
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json();
    });
});

//Retrieves the uploaded file
app.post("/api/get", (req, res, next) => {
  console.log("_____Node sending back_____:", req.user);
  // res.status(200).json(req.user);
  const dbInstance = app.get("db");

  if (!req.body.file) {
    res.status(200).json("");
  } else {
    dbInstance
      .uploadedFile([req.body.file])
      .then(response => {
        res.status(200).json(response[0]);
        console.log("Heres the resposne        ", response);
      })
      .catch(error => {
        res.status(500).json();
      });
  }
});

//Destroys current session on logout
app.get("/api/logout", (req, res, next) => {
  req.session.destroy();
  res.status(200).json("Session Destroyed");
});

// Donate
app.post("/api/donate", function(req, res) {
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

app.post("/api/getDegreeDays", (req, res, next) => {
  const { month, year, total } = req.body;
  const dbInstance = app.get("db");

  dbInstance
    .getDegreeDays([month, year, total])
    .then(response => {
      res.status(200).json(response);
      // app.post((req, res, next) => {});
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

app.post("/api/actualDegreeDays", (req, res, next) => {
  console.log("THE FINAL TRUTH++++++", req.body);
  const { fullDegree, spreadsheetId } = req.body;
  const dbInstance = app.get("db");

  dbInstance
    .addDegreeFinal([JSON.stringify(fullDegree), spreadsheetId])

    .then(response => {
      res.status(200).json(response);
      console.log("degree day response", response);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

app.post("/api/actualDegreeDays", (req, res, next) => {
  const { spreadsheetId } = req.body;
  const dbInstance = app.get("db");

  dbInstance
    .getDegreeDayFinal([spreadsheetId])

    .then(response => {
      res.status(200).json(response);
      console.log(response);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

var path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../build/index.html`));
});

app.listen(port, () => {
  console.log(`listening at port: ${port}`);
});
