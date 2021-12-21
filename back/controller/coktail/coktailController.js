const coktailModel = require("../../models/cocktail");

const coktailController = {
  // 게시물 만들기
  createCoktailPost: async (req, res) => {
    const {
      coktailName,
      sweet,
      sour,
      bitter,
      alcoholDegree,
      kind,
      perifume,
      sauceKind,
      cocktailContent,
      imgURL,
      category,
    } = req.body;

    const post = new coktailModel({
      coktailName,
      sweet,
      sour,
      bitter,
      alcoholDegree,
      kind,
      perifume,
      sauceKind,
      cocktailContent,
      imgURL,
      category,
      createAt: Date.now(),
    });

    try {
      const saveData = await post.save();
      res.status(200).json({
        message: "저장완료",
        data: saveData,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "DB오류",
      });
    }
  },

  // 리스트 불러오기
  readCoktailPost: async (req, res) => {
    try {
      const dataList = await coktailModel.find();
      if (dataList === 0) {
        res.status(400).json({
          message: "데이터가 없다",
        });
        return;
      }
      res.status(200).json({
        message: "조회 완료",
        dataList: dataList,
      });
    } catch (error) {
      res.status(500).json({
        message: "서버오류",
        error: error,
      });
    }
  },

  // 게시물 삭제하기
  deletCoktailPost: async (req, res) => {
    const { id } = req.params;
    try {
      await coktailModel.findByIdAndDelete(id);
      res.status(200).json({
        message: "삭제 완료",
      });
    } catch (error) {
      res.status(500).json({
        message: "서버 오류",
        error: error,
      });
    }
  },

  // 게시물 수정하기
  updateCoktailPost: async (req, res) => {
    const { id } = req.params;
    const {
      coktailName,
      sweet,
      sour,
      bitter,
      alcoholDegree,
      kind,
      perifume,
      sauceKind,
      cocktailContent,
      category,
      imgURL,
    } = req.body;

    try {
      const data = {
        coktailName,
        sweet,
        sour,
        bitter,
        alcoholDegree,
        kind,
        perifume,
        sauceKind,
        cocktailContent,
        category,
        imgURL,
      };
      const newData = await coktailModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      res.status(200).json({
        message: "수정완료",
        data: newData,
      });
    } catch (error) {
      res.status(500).json({
        message: "DB오류",
        error: error,
      });
    }
  },

  // 디테일 페이지 불러오기
  searchCoktailPost: async (req, res) => {
    const { id, coktailName, alcoholDegree } = req.params;
    try {
      const data = await coktailModel.findById(id);
      console.log(data);
      if (data === null) {
        res.json({
          message: "데이터 없음",
        });
        return;
      }
      res.status(200).json({
        message: "검색 완료",
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        message: "DB서버 오류",
      });
    }
  },

  // 업로드 이미지
  uploadImage: (req, res) => {
    const imageInfo = req.file;
    res.status(200).json({
      message: "업로드 완료",
      data: imageInfo,
      // data.location
    });
  },
};

module.exports = coktailController;
