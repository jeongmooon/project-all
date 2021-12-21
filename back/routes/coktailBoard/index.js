const express = require("express");
const coktailController = require("../../controller/coktail/coktailController");
const router = express.Router();

// CRUD 경로
const {
  createCoktailPost,
  readCoktailPost,
  deletCoktailPost,
  updateCoktailPost,
  searchCoktailPost,
} = require("../../controller/coktail/coktailController");

// 이미지 업로드 경로
const upload = require("../../modules/awsUpload");

// 생성
router.post("/", createCoktailPost);

// 읽기
router.get("/", readCoktailPost);

// 삭제
router.delete("/:id", deletCoktailPost);

// 수정
router.put("/:id", updateCoktailPost);

// 검색
router.get("/:id", searchCoktailPost);

//이미지 업로드
router.post("/images", upload.single("img"), coktailController.uploadImage);

module.exports = router;
