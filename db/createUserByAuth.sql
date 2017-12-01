INSERT INTO users
    (authid, email, access)
VALUES
    ($1, $2, 'false')
RETURNING authId, email;