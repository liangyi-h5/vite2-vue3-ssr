const e = require('express')
const fs = require('fs')
const path = require('path')
const filepath = path.join(process.cwd(), '/local.json')

module.exports = class Reader {
  constructor () {
    this.cache = []
    this.pushStatus = false
  }
  // 写入
  push (ip) {
    ip && this.cache.unshift(ip)
    return new Promise((reslove) => {
      if(this.pushStatus || this.cache.length === 0) {
        return reslove()
      }
      this.pushStatus = true
      this.access(filepath, ()=>{
        var ipJson = require(filepath)
        if (ipJson && ipJson instanceof Array) {
          ipJson = [...this.cache, ...ipJson]
        } else {
          ipJson = this.cache
        }
        this.cache = []
        this.writeFile(filepath, ipJson, ()=>{
          this.logStatus = false
          if (this.cache.length > 0) {
            this.push()
          } else {
            reslove()
          }
        })
      })
    })
    
  }

  get () {
    return new Promise((reslove) => {
      this.access(filepath, ()=>{
        reslove(require(filepath))
      })
    })
    
  }

  // 判断文件是否存在
  access(file, callback) {
    fs.access(file, fs.constants.F_OK, (err)=> {
      if (err) {
        // 不存在文件创建
        this.writeFile(file, [], callback)
      } else {
        // 存在，直接写
        callback()
      }
    })
  }
  // 更
  // 创建写入文件
  writeFile(path, content, callback) {
    fs.writeFile(path, JSON.stringify(content), { encoding: 'utf8' }, (err) => {
      callback()
    })
  }
}