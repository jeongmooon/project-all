const express = require("express");
const loginCheckController = require("../../controller/loginCheck/loginCheckController");
const authModule = require("../../modules/authModule");
const router = express.Router();

// 정보조회
router.get("/",authModule.loggedIn, loginCheckController.getLoginInfo);

module.exports = router;
