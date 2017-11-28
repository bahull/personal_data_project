INSERT INTO spreadsheets (authid, exceldata)
VALUES ($1, $2)
RETURNING authId, exceldata;