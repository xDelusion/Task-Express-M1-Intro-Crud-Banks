const express = require("express");
const router = express.Router();

let accounts = require("../../accounts");
const methods = require("./accounts.controllers");

router.get("/", accountGet);

router.post("/", accountCreate);

router.delete("/:accountId", accountDelete);

router.put("/:accountId", accountUpdate);

module.exports = router;
