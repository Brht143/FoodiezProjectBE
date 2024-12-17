const Users = require("../../models/Users");

const LocalStrategy = require("passport-local").Strategy;

const bcrypt = require("bcrypt");

exports.localStrategy = new LocalStrategy(
  { usernameField: "name" },
  async (name, password, done) => {
    try {
      const user = await Users.findOne({
        name, // equivalent to { name : name }
      });

      const passwordsMatch = user
        ? await bcrypt.compare(password, user.password)
        : false;

      if (passwordsMatch) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      done(error);
    }
  }
);

const { JWT_SECRET } = require("../../config/keys");
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.exp) {
      return done(null, false); // this will throw a 401
    }
    try {
      const user = await Users.findById(jwtPayload.id);
      done(null, user); // if there is no user, this will throw a 401
    } catch (error) {
      done(error);
    }
  }
);
