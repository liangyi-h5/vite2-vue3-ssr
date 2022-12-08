const express = require('express')
const router = express.Router()
// const isProd = process.env.NODE_ENV === 'production'
const Reader = require('../utils/reader')
const reader = new Reader()
const isProd = process.env.NODE_ENV === 'production'

router.get('/get/access_info', async function (req, res) {
  try {
    const json = await reader.get()
    res.status(200)
    res.send({
      status: 200,
      data: {
        visits: json.length,
        numberOfVisits: [...new Set(json)].length
      },
      message: 'ok'
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

router.get('/set/access_info', async function (req, res) {
  try {
    const uuId = req.query.uuId || ''
    if (uuId && isProd) {
      await reader.push(uuId)
    }
    const json = await reader.get()
    res.status(200)
    res.send({
      status: 200,
      data: {
        visits: json.length,
        numberOfVisits: [...new Set(json)].length
      },
      message: 'ok'
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
