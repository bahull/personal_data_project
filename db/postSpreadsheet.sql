INSERT INTO spreadsheets (authid, exceldata, projectlocation, street, facility, industry, sqfoot)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING authId, exceldata;