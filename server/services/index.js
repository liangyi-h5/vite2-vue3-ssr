const express = require('express')
const router = express.Router()
// const isProd = process.env.NODE_ENV === 'production'
const Reader = require('../utils/reader')
const reader = new Reader()
router.get('/get/access_info', async function (req, res) {
  try {
    if (req.customersIp) {
      await reader.push(req.customersIp)
    }
    const json = await reader.get()
    res.status(200)
    res.send({
      status: 200,
      data: {
        visits: json.length,
        numberOfVisits: [...new Set(json)].length
      },
      message: 'test'
    })
  } catch (err) {
    console.log(err)
    res.status(200)
    res.send({
      status: 400,
      data: {
        visits: 0,
        numberOfVisits: 0
      },
      message: err.message
    })
  }
})

module.exports = router
