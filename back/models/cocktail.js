const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coktailModels = new Schema({
  // 칵테일 이름
  coktailName: {
    type: String,
    required: true,
  },
  // 단맛 (그래프 형식)
  sweet: {
    type: Number,
    required: true,
  },
  // 신맛 (그래프 형식)
  sour: {
    type: Number,
    required: true,
  },
  // 쓴맛 (그래프 형식)
  bitter: {
    type: Number,
    required: true,
  },
  // 도수
  alcoholDegree: {
    type: Number,
    required: true,
  },
  // 들어간 술 종류
  kind: [
    {
      type: String,
      required: true,
    },
  ],
  // 향
  perifume: [
    {
      type: String,
      required: true,
    },
  ],
  // 술말고 다른 재료
  sauceKind: [
    {
      type: String,
    },
  ],
  // 술에 대한 내용
  cocktailContent: {
    type: String,
    required: true,
  },
  // 이미지 저장
  imgURL: {
    type: String,
  },
  // 카테고리
  //1 = 알콜 낮은거, 2=작업주, 3=분위기좋을때 먹는거
  category: {
    type: Number,
    required: true,
  },
  // 작성시간
  createAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("coktail", coktailModels);
