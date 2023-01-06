
function isTokenValid () {
  // check if token exist and not expired.
  const token = localStorage.getItem('token')
  const expiredTime = Number(localStorage.getItem('tokenExpirationTime'))
  const currentTime = Math.floor(Date.now() / 1000)
  return token && expiredTime && expiredTime > currentTime
}

module.exports = {
  isTokenValid
}
