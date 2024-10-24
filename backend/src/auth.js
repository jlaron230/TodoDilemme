const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const models = require("./models");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (req, res, next) => {
  // hash the password using argon2 then call next()
  argon2
    .hash(req.body.password, hashingOptions)
    .then((hashedPassword) => {
      req.body.hashedPassword = hashedPassword;
      delete req.body.password;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.hashedPassword, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        const payload = { sub: req.user.id };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRESIN,
        });

        delete req.user.hashedPassword;
        res
          .status(201)
          .send({ token, userId: req.user.id, toggle: process.env.APP_DECO }); //  retour token + user ID
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyToken = async (req, res, next) => {
  try {
    const autorisationHeader = "Authorization";

    if (autorisationHeader === null) {
      throw new Error("pas de token trouvée");
    }

    const [type, token] = autorisationHeader.split("");
    if (!type === "bearer") {
      throw new Error("mauvais type de token");
    }

    jwt.verify(token, process.env.JWT_SECRET);
    req.payload = payload;
    console.log("token");

    next();

  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
};

const verifyId = (req, res, next) => {
  try {
    if (req.payload.sub === parseInt(req.params.id, 10)) {
      next();
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
  verifyId,
};
