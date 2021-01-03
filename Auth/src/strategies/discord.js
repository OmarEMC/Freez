const passport = require("passport");
const DS = require("passport-discord");
const User = require("../database/models/User")
const uuidAPIKey = require('uuid-apikey');

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async(id, done) => {
  try {
    const DBUser = await User.findOne({ id })
    if(DBUser) {
      let user = {
        api: DBUser.api,
        requests: DBUser.requests,
        id: DBUser.id,
        avatar: DBUser.avatar,
        tag: DBUser.tag,
        createdAt: DBUser.createdAt,
        updatedAt: DBUser.updatedAt,
        logged: true
      }
      return done(null, user);
    } else {
      done(null, null)
    }
  } catch (e) {
    console.log(`Error en deserializeUser:\n${e.message}`)
    done(error, null)
  }
})

passport.use(new DS({
  clientID: process.env.DISCORD_CLIENT_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
  callbackURL: process.env.DISCORD_CALLBACK_URL,
  scope: ["identify"]
}, async function(accessToken, refreshToken, profile, done) {
  const { id, username, discriminator, avatar } = profile;
  const findedUser = await User.findOneAndUpdate({ id }, {
    tag: `${username}#${discriminator}`,
    avatar
  }, {new: true})
  if(findedUser) {
    return done(null, findedUser)
  } else {
    try {
      let {apiKey} = uuidAPIKey.create()
      const newUser = await User.create({
        id,
        avatar,
        tag: `${username}#${discriminator}`,
        api: {
          key: apiKey
        }
      })
      console.log(`Usuario ${username}#${discriminator} creado en la base de datos.`)
      return done(null, newUser)
    } catch(e) {
      console.log(`Error creando a un usuario en la base de datos\n: ${e.message}`)
      return done(e, null)
    }
  }
}))