var express = require("express");
var router = express.Router();

router.use("/admin", require("./admin"));
router.use("/coktail", require("./coktailBoard"));
router.use("/user", require("./user"));

module.exports = router;
