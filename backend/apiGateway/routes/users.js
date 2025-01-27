var express = require("express");
var router = express.Router();

const axios = require("axios");

const https = require("https");
const fs = require("fs");

const auth = require("../auth/auth");

const key = fs.readFileSync(__dirname + "/../certs/selfsigned.key");
const cert = fs.readFileSync(__dirname + "/../certs/selfsigned.crt");

const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // (NOTE: this will disable client verification)
  cert: cert,
  key: key,
});

const usersURL = "https://users:10001/";

/*
User structure
{
    "_id": Mongoose.type.id,
    "name": Nullable string,
    "email": Nullable string,
    "password": Nullable string,
    "type": String,
    "operations": []
}

JWT structure = JWT with a user's _id information
*/

/**
 * Note: auth.checkToken is a midleware used to verify JWT
 */

/**
 * Validate a user's JWT
 * Header: { "Authorization" : "JWT" }
 * @returns {"valid": Boolean}
 *
 */
router.get("/validate/:user", function (req, res, next) {
  axios
    .get(usersURL + `validate/${req.params.user}`, {
      httpsAgent: httpsAgent,
      headers: { Authorization: req.headers["authorization"] },
    })
    .then((resp) => res.status(200).jsonp(resp.data))
    .catch((err) => res.status(500).jsonp("Error validating JWT token"));
});

/**
 * Get user
 * @returns User structure
 *
 */
router.get("/:user", function (req, res, next) {
  axios
    .get(usersURL + `${req.params.user}`, { httpsAgent: httpsAgent })
    .then((resp) => res.status(200).jsonp(resp.data))
    .catch((err) => res.status(500).jsonp("Error getting user"));
});

/**
 * Register a new user
 * @body { "name": String (Optional), "email": String (Optional), "password": String (Optional), "type": String }
 * @returns JWT structure
 */
router.post("/", function (req, res, next) {
  axios
    .post(usersURL, req.body, { httpsAgent: httpsAgent })
    .then((resp) => res.status(201).jsonp(resp.data))
    .catch((err) => res.status(500).jsonp("Error registering new user"));
});

/**
 * Login a user
 * @body { "password": String }
 * @returns An object with { "user": User structure, "jwt": JWT structure }
 */
router.post("/:email/login", function (req, res, next) {
  axios
    .post(usersURL + `${req.params.email}/login`, req.body, {
      httpsAgent: httpsAgent,
    })
    .then((resp) => res.status(201).jsonp(resp.data))
    .catch((err) => res.status(500).jsonp("Error logging in"));
});

/**
 * Update a user's information
 * @body { "name": String (Optional), "email": String (Optional), "password": String (Optional), "type": String (Optional) }
 * @returns Empty
 */
router.put("/:user", auth.checkToken, function (req, res, next) {
  axios
    .put(usersURL + `${req.params.user}`, req.body, { httpsAgent: httpsAgent })
    .then((_) => res.sendStatus(204))
    .catch((err) => res.status(500).jsonp("Error updating user's information"));
});

/**
 * Delete a user
 * @body Empty
 * @returns Empty
 */
router.delete("/:user", auth.checkToken, function (req, res, next) {
  axios
    .delete(usersURL + `${req.params.user}`, { httpsAgent: httpsAgent })
    .then((_) => res.sendStatus(204))
    .catch((err) => res.status(500).jsonp("Error deleting user"));
});

module.exports = router;
