module.exports = {
    storeSpreadsheet:  (req, res, next) => {
        const dbInstance = req.app.get("db");
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
            res.status(200).json(response[0].id);
          })
          .catch(error => {
            res.status(500).json(error);
          });
      },
      retrieveSavedFile: (req, res, next) => {
        req.user.newFile = req.body.file;
      
        res.status(200).json(req.user);
      },
      getFile: (req, res, next) => {
        const dbInstance = req.app.get("db");
      
        dbInstance
          .getSpreadsheets([req.user.authid])
          .then(response => {
            res.status(200).json(response);
          })
          .catch(error => {
            res.status(500).json();
          });
      },
      uploadedFile: (req, res, next) => {
        const dbInstance = req.app.get("db");
      
        if (!req.body.file) {
          res.status(200).json("");
        } else {
          dbInstance
            .uploadedFile([req.body.file])
            .then(response => {
              res.status(200).json(response[0]);
            })
            .catch(error => {
              res.status(500).json();
            });
        }
      },
      donate: function(req, res) {
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
      },
      getDegreeDays: (req, res, next) => {
        const { month, year, total } = req.body;
        const dbInstance = req.app.get("db");
      
        dbInstance
          .getDegreeDays([month, year, total])
          .then(response => {
            res.status(200).json(response);
            // req.app.post((req, res, next) => {});
          })
          .catch(error => {
            res.status(500).json(error);
          });
      },
      totalDegreeDays:  (req, res, next) => {
        const { fullDegree, spreadsheetId } = req.body;
        const dbInstance = req.app.get("db");
      
        dbInstance
          .addDegreeFinal([JSON.stringify(fullDegree), spreadsheetId])
      
          .then(response => {
            res.status(200).json(response);
          })
          .catch(error => {
            res.status(500).json(error);
          });
      },
      deleteFailedSheet:  (req, res, next) => {
        const { excelId } = req.body;
        const dbInstance = req.app.get("db");
      
        dbInstance
          .deleteFailedSheet([excelId])
      
          .then(response => {
            res.status(200).json(response);
          })
          .catch(error => {
            res.status(500).json(error);
          });
      }

}