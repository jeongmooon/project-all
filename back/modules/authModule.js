const jwtModule = require("./jwtModule");
const adminModel = require("../models/admin");

const authModule = {
  loggedIn: async (req, res, next) => {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      res.status(409).json({
        msessage: "토큰 없음",
      });
      return;
    }

    const decoded = jwtModule.verify(accessToken);
    if (decoded === -1) {
      return res.status(409).json({
        message: "만료된 토큰 입니다",
      });
    } else if (decoded === -2) {
      return res.status(409).json({
        message: "유효하지 않는 토큰 입니다",
      });
    } else if (decoded === -3) {
      return res.status(409).json({
        message: "에러 토큰",
      });
    }
    let adminInfo;

    try {
      adminInfo = await adminModel.findOne({ _id: decoded.objId });
      if (!adminInfo) {
        return res.status(401).json({
          message: "일치하지 않는 유저임니다",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "유효하지 않는 유저 입니다",
      });
    }

    req.adminInfo = adminInfo;
    next();
  },
};

module.exports = authModule;
