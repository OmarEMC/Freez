const User = require("../database/models/User");
const url = require("url")

module.exports = async function ApiAuth(req, res, next) {
  let { authorization: key } = req.headers;
  if(!key) return res.json({
    error: "Falta el api key en la consulta."
  })
  let user = await User.findOne({ api: { key } })
  if(!user) return res.json({
    error: "Clave invalida en la consulta."
  })
  const { pathname } = url.parse(req.originalUrl)
  user.requests.last.date = String(Date.now())
  user.requests.last.to = String(req.originalUrl)
  user.requests.total += 1;
  user.requests[pathname.slice(1)] += 1;
  user.save()

  next()
}