const loginCheckController = {
  getLoginInfo: (req, res) => {
    const loginInfo = req.adminInfo;

    if (!loginInfo) {
      res.status(400).json({
        message: "유저정보가 없음",
      });
      return;
    }

    res.status(200).json({
      message: "유저 조회 성공",
      data: loginInfo,
    });
  },
};

module.exports = loginCheckController;
