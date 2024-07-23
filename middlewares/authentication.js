const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

module.exports = async function authentication(req, res, next) {
  let access_token = req.headers.authorization;
  try {
    //1. memastikan apakah ada access_token di dalam req.headers.authrzation
    if (!access_token) {
      throw { name: "Not Login" };
    }

    //2. memastikan format token yang dikirim benar
    let [bearer, token] = access_token.split(" ")
    if (bearer !== "Bearer") throw {name: "Invalid Token"}

    //3. verify & decode token
    let payload = verifyToken(token)

    //4. cari user apakah ada di DB
    let user = await User.findByPk(payload.id)
    if(!user) throw {name: "Invalid Token"}

    //5. jika user ada
    req.user = {
        id: user.id,
        role: user.role
    }
    next()
  } catch (error) {
    next(error);
  }
};
