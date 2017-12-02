INSERT INTO spreadsheets (authid, exceldata, projectlocation, street, facility, industry, sqfoot, month, year, total)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
RETURNING id