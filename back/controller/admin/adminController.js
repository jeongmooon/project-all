const adminModel = require("../../models/admin");
const jwtModule = require("../../modules/jwtModule");
const crypto = require("crypto");
const passConfig = require("../../config/passwordConfig.json");

const adminController = {
  createAdmin: async (req, res) => {
    const { adminId, email, password } = req.body;

    let searchId;
    try {
      searchId = await adminModel.findOne({ adminId });
    } catch (error) {
      res.status(500).json({
        message: "DB오류",
      });
    }

    if (searchId) {
      res.status(400).json({
        message: "새로운 아이디 등록하세요",
      });
      return;
    } else {
      // 비밀번호 암호화 작업
      crypto.randomBytes(64, (err, buf) => {
        //salt값 생성
        const salt = buf.toString("base64");
        crypto.pbkdf2(
          req.body.password,
          salt,
          passConfig.secretPasswrodKey,
          64,
          "sha512",
          (err, key) => {
            if (err) return err;
            const passwordN = key.toString("base64");

            const data = new adminModel({
              adminId,
              email,
              salt,
              password: passwordN,
              createDate: new Date(),
            });

            try {
              const saveData = data.save();
              res.status(200).json({
                message: "회원 가입 완료",
                data: saveData,
              });
            } catch (error) {
              res.status(500).json({
                message: "DB서버 오류",
                error: error,
              });
            }
          }
        );
      });
    }
  },

  loginAdmin: async (req, res) => {
    const { adminId, password } = req.body;

    try {
      const loginId = await adminModel.findOne({ adminId });

      if (loginId.lockAccount === false) {
        if (loginId) {
          //로그인 아이디가 있다면
          const loginPassword = loginId.password;
          const objId = loginId._id;

          // console.log(loginId.salt)

          crypto.pbkdf2(
            password,
            loginId.salt,
            passConfig.secretPasswrodKey,
            64,
            "sha512",
            async (err, key) => {
              // 비밀번호 암호화 체크
              // console.log(key.toString('base64') === loginPassword)

              // 암호화된 비밀번호 변환
              const passwordP = key.toString("base64");

              if (passwordP === loginPassword) {
                //비밀 번호가 있다면 토큰 생성을 한다
                const accessToken = jwtModule.create({
                  objId,
                });

                res.status(200).json({
                  message: "로그인 성공",
                  accessToken: accessToken,
                });
              } else {
                // 비밀번호가 다르다면

                if (loginId.signinCount > 9) {
                  try {
                    // 10회 이상일시 잠굼 트리거
                    const lockData = await adminModel.updateOne(
                      { adminId },
                      { $set: { lockAccount: true } }
                    );
                    res.status(401).json({
                      message: "비밀번호 10회이상틀려 잠김",
                      lock: lockData.lockAccount,
                    });
                    return;
                  } catch (error) {
                    res.status(500).json({
                      message: "DB서버 오류(비밀번호 카운트)",
                      error: error,
                    });
                  }
                } else {
                  try {
                    // 잠굼 카운트
                    await adminModel.updateOne(
                      { adminId },
                      { $set: { signinCount: loginId.signinCount + 1 } }
                    );
                    res.status(401).json({
                      message: "비밀번호 틀림",
                      // count : `${countData.signinCount}`
                    });
                    return;
                  } catch (error) {
                    res.status(500).json({
                      message: "DB서버 오류(비밀번호 카운트)",
                      error: error,
                    });
                    return;
                  }
                }
                res.status(401).json({
                  message: "비밀번호가 틀립니다",
                });
              }
            }
          );
        } else {
          // 로그인 아이디가 없다면
          res.status(401).json({
            message: "아이디가 없습니다",
          });
        }
      } else if (loginId.lockAccount === true) {
        res.status(402).json({
          message: "계정잠굼",
        });
      }
    } catch (error) {
      console.log(error);
      // DB오류
      res.status(500).json({
        message: "DB오류",
      });
    }
  },
};

module.exports = adminController;
