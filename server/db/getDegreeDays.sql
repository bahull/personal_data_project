SELECT *
FROM degreedays
WHERE id >= (SELECT id FROM degreedays WHERE month = $1 AND year= $2)
ORDER BY id
LIMIT $3