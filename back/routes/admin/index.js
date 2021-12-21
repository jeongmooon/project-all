const express = require("express");
const {
  createAdmin,
  loginAdmin,
} = require("../../controller/admin/adminController");
const router = express.Router();

// 회원가입
router.post("/signup", createAdmin);

//로그인
router.post("/signin", loginAdmin);

module.exports = router;
