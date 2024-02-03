const express = require('express');
const router = express.Router();
const register = require('../Controllers/Register');
const auth = require('../Controllers/Auth');
const authToken = require('../Controllers/TokenAuth');
const whoami = require('../Controllers/WhoAmI');
const userFetcher = require('../Controllers/GetUserData');

router.use(express.json());

router.get("/whoami",whoami.whoami);
router.get("/fetch-data",userFetcher.fetchUserData);
router.post("/update-data",userFetcher.updateUserData);

module.exports = (router);