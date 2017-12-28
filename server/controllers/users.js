module.exports = {
    validUser: (req, res, next) => {
        if (!req.user) {
          res.status(200).send("No User");
        } else {
          const dbInstance = req.app.get("db");
      
          dbInstance
            .getAccess([req.user.authid])
            .then(response => {
              res.status(200).json(response);
            })
            .catch(error => {
              res.status(500).json();
            });
        }
      },
      logout:  (req, res, next) => {
        req.session.destroy();
        res.status(200).json("Session Destroyed");
      },
      getUsers: (req, res, next) => {
        const dbInstance = req.app.get("db");
      
        dbInstance
          .getUsers()
          .then(response => {
            res.status(200).json(response);
          })
          .catch(error => {
            res.status(500).json(error);
          });
      }
};
