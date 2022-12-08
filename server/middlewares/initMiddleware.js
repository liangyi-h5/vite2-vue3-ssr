/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @desc 中间件初始化
 */
module.exports = (req, res, next) => {
  // ip
  let customersIp = req.headers['x-forwarded-for'] || ''
  customersIp = customersIp.split(',')[0]
  req.customersIp = customersIp
  next()
}
