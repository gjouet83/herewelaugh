const jwt = require('jsonwebtoken');

exports.regularReq = (req, res, next) => {
  try {
    //on récupère le token a droite de bearer dans le header authorization
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.USER_TOKEN);
    //on récupère le userId de l'object décodedToken et on le test dans le if
    const userId = decodedToken.userId;
    const admin = decodedToken.admin;
    req.auth = {
      userId: userId,
      admin: admin,
    };
    next();
  } catch (error) {
    res.status(403).json({ error: error.name });
  }
};

exports.forgotPwdReq = (req, res, next) => {
  try {
    //on récupère le token a droite de bearer dans le header authorization
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(
      token,
      process.env.FORGOTPWD_TOKEN,
      function (error, decodedToken) {
        if (error) {
          throw error;
        }
        const email = decodedToken.key;
        req.auth = {
          email: email,
        };
      }
    );
    next();
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};
