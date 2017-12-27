UPDATE spreadsheets 
SET degreedayarray = $1
WHERE id = $2
RETURNING id