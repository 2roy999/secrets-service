const Secret = require('mongoose').model('Secret')

module.exports = function setSecret (req, res) {
  const body = req.body || {}

  if (!(body.key && body.value && body.token)) {
    return res.status(400).end()
  }

  Secret.findOne({ key: body.key })
    .then(secret => secret || new Secret(), () => new Secret())
    .then(secret => secret.encrypt(body.key, body.value, body.token))
    .then(() => {
      res.status(200).jsonp({ key: body.key }).end()
    })
    .catch(() => {
      return res.status(400).end()
    })
}
