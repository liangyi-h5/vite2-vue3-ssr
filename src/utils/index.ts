/**
 * @description 四舍五入取整数
 * @param num
 * @returns {number}
 */
export const roundingFn = (num: any) => {
  if (typeof num !== 'number') {
    return 0
  }
  const n = parseInt(num * 10 + '') % 10
  return n < 5 ? parseInt(num + '') : parseInt(num + '') + 1
}

/**
 * @description 前补位, padStart(1,4) => 0001
 * str 需要补齐的字符串
 * n 长度
 * tmp 需要补的字符
 * */
export const padStart = (str: string, n: number, tmp = '0') => {
  return (Array(n).join(tmp) + str).slice(-n)
}

/**
 * @description 后补位, padEnd(1,4) => 1000
 * str 需要补齐的字符串
 * n 长度
 * tmp 需要补的字符
 * */
export const padEnd = (str: string, n: number, tmp = '0') => {
  return (str + Array(n).join(tmp)).slice(0, n)
}

/**
 * @description 获取url链接上的某个参数
 * @param key
 * @returns {string}
 */
export const getUrlQueryString = (key: string) => {
  let value = ''
  window.location.search
    .replace(/^\?/, '')
    .split('&')
    .forEach((item) => {
      const arr = item.split('=')
      if (arr[0] === key && arr.length > 1) {
        value = arr[1]
      }
    })
  if (value && /^[0-9]*$/.test(value)) {
    const val = parseInt(value)
    return isNaN(val) ? window.decodeURIComponent(value) : parseInt(value)
  } else {
    return window.decodeURIComponent(value)
  }
}

/**
 * @returns @des 浏览器基本信息
 */
export const browserinfo = () => {
  var u = navigator.userAgent
  var ua = u.toLocaleLowerCase()
  return {
    trident: u.indexOf('Trident') > -1, // IE内核
    presto: u.indexOf('Presto') > -1, // opera内核
    webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
    ios: !!u.match(/\(i[^]+( U)? CPU.+Mac OS X/), // ios终端
    android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
    iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
    iPad: u.indexOf('iPad') > -1, // 是否iPad
    webApp: u.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
    weixin: u.indexOf('MicroMessenger') > -1, // 是否微信
    qq: /\sQQ|\sqq/gi.test(u), // 是否QQ
    xiaomi: /MiuiBrowser/gi.test(u),
    fb: /FB/gi.test(u), // 是否是fb内置浏览器
    samsung: /SamsungBrowser/gi.test(u),
    isSafari:
      ua.indexOf('applewebkit') > -1 &&
      ua.indexOf('mobile') > -1 &&
      ua.indexOf('safari') > -1 &&
      ua.indexOf('linux') === -1 &&
      ua.indexOf('android') === -1 &&
      ua.indexOf('chrome') === -1 &&
      ua.indexOf('ios') === -1 &&
      ua.indexOf('browser') === -1, // 是否是 Safari
    isQQbrowse:
      ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null, // qq 浏览器
  }
}

/**
 * @description 往url拼接参数
 * @param url
 * @param obj
 * @returns
 */
export const splicingUrlParams = (url: string, obj: {[key: string]: string}) => {
  let str = ''
  for (const key in obj) {
    str += '&' + key + '=' + window.encodeURIComponent(obj[key])
  }
  if (url.indexOf('?') > -1) {
    url += str
  } else {
    url += '?' + str.replace(/^&/, '')
  }
  return url.replace(/^\?/, '')
}

/**
 * @description 获取浏览器系统语言信息
 */
export const getLanguage = () => {
  let lang = 'en'
  if (navigator && navigator.language) {
    lang = navigator.language.split('-')[0]
  }
  return getUrlQueryString('language') + '' || lang || 'en'
}

/**
 * @description base64编码
 */
export const base64Encode = (str: string) => {
  var c1, c2, c3
  var base64EncodeChars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  var i = 0
  var len = str.length
  var string = ''

  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff
    if (i === len) {
      string += base64EncodeChars.charAt(c1 >> 2)
      string += base64EncodeChars.charAt((c1 & 0x3) << 4)
      string += '=='
      break
    }
    c2 = str.charCodeAt(i++)
    if (i === len) {
      string += base64EncodeChars.charAt(c1 >> 2)
      string += base64EncodeChars.charAt(
        ((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4)
      )
      string += base64EncodeChars.charAt((c2 & 0xf) << 2)
      string += '='
      break
    }
    c3 = str.charCodeAt(i++)
    string += base64EncodeChars.charAt(c1 >> 2)
    string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4))
    string += base64EncodeChars.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6))
    string += base64EncodeChars.charAt(c3 & 0x3f)
  }
  return string
}
/**
 * @description base64 解码
 */
export const base64Decode = (str: string) => {
  const _keyStr =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  var output = ''
  var chr1, chr2, chr3
  var enc1, enc2, enc3, enc4
  var i = 0
  var string = ''
  var j = 0
  var c = 0
  var c3 = 0
  var c2 = 0
  str = str.replace(/[^A-Za-z0-9+/=]/g, '')
  while (i < str.length) {
    enc1 = _keyStr.indexOf(str.charAt(i++))
    enc2 = _keyStr.indexOf(str.charAt(i++))
    enc3 = _keyStr.indexOf(str.charAt(i++))
    enc4 = _keyStr.indexOf(str.charAt(i++))
    chr1 = (enc1 << 2) | (enc2 >> 4)
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
    chr3 = ((enc3 & 3) << 6) | enc4
    output = output + String.fromCharCode(chr1)
    if (enc3 !== 64) {
      output = output + String.fromCharCode(chr2)
    }
    if (enc4 !== 64) {
      output = output + String.fromCharCode(chr3)
    }
  }
  while (j < output.length) {
    c = output.charCodeAt(j)
    if (c < 128) {
      string += String.fromCharCode(c)
      j++
    } else if (c > 191 && c < 224) {
      c2 = output.charCodeAt(j + 1)
      string += String.fromCharCode(((c & 31) << 6) | (c2 & 63))
      j += 2
    } else {
      c2 = output.charCodeAt(j + 1)
      c3 = output.charCodeAt(j + 2)
      string += String.fromCharCode(
        ((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
      )
      i += 3
    }
  }
  return string
}

/**
 * @description 生成uuid
 */
export const generateUUID = () => {
  let d = Date.now()
  return 'xxxxxxxxxx9xxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x7) | 0x8).toString(16)
  })
}

/**
 * @description 注意域名更换时根域名的获取改动是否有影响
 */
const getRootDomain = () => {
  const ipRegExp =
    /^(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/
  if (
    /^localhost$/.test(window.location.hostname) ||
    ipRegExp.test(window.location.hostname)
  ) {
    return window.location.hostname
  }
  return '.' + window.location.hostname.split('.').slice(-2).join('.')
}

/**
 * @description 设置cookies
 */
export const setCookie = (name: string, value: string, day = 1) => {
  const domain = getRootDomain()
  const expires = new Date(Date.now() + 60 * 1000 * 60 * 24 * day)
  document.cookie = `${name}=${escape(
    value
  )}domain=${domain}expires=${expires}path=/`
}

/**
 * @description 获取cookies
 */
export const getCookie = (name: string, decode = true) => {
  var arr
  var reg = new RegExp('(^| )' + name + '=([^]*)(|$)')
  if ((arr = document.cookie.match(reg))) {
    let ls = unescape(arr[2])
    if (decode) {
      ls = decodeURIComponent(ls)
    }
    return ls
  } else {
    return ''
  }
}

/**
 * @description 删除cookies
 */
export const delCookie = (name: string) => {
  const rootDomain = getRootDomain()
  document.cookie = `${name}= expires=Thu, 01 Jan 1970 00:00:01 GMT path=/domain=${rootDomain}`
}

/**
 * @description: 是否华为浏览器
 */
export const isHuewei = () => {
  const ua = navigator.userAgent.toLocaleLowerCase()
  return /huawei/gi.test(ua)
}

/**
 * @description: 是否是移动端
 * @return {Boolean}
 */
export const isMobile = () => {
  return /ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(
    navigator.userAgent.toLowerCase()
  )
}

/**
 * @description 是否是json
 */
export const checkIsJson = (str: any) => {
  if (checkIsString(str)) {
    try {
      JSON.parse(str)
      return true
    } catch {
      return false
    }
  } else {
    return false
  }
}

/**
 * @description 是否是null 包括string类型的null
 */
export const checkIsNull = (n: any) => {
  if (checkIsString(n) && n === 'null') {
    return true
  } else {
    return typeof n === 'object' && !(n instanceof Object)
  }
}

/**
 * @description 是否是对象, 不包含Map Set
 */
export const checkIsObject = (n: any) => {
  return (
    typeof n === 'object' &&
    n instanceof Object &&
    !(n instanceof Map) &&
    !(n instanceof Set) &&
    !(n instanceof Array)
  )
}

/**
 * @description 是否是数组
 */
export const checkIsArray = (n: any) => {
  return typeof n === 'object' && n instanceof Array
}

/**
 * @description 是否是undefined
 */
export const checkIsUndefined = (n: any) => {
  return typeof n === 'undefined' || checkIsString(n) || n === 'undefined'
}

/**
 * @description 是否是string
 */
export const checkIsString = (n: any) => {
  return typeof n === 'string'
}

/**
 * @description 是否是函数
 */
export const checkIsFunction = (n: any) => {
  return typeof n === 'function'
}

/**
 * @description 是否是数字
 */
export const checkIsNumber = (n: any) => {
  return typeof n === 'number'
}

/**
 * @description 是否是 Map
 */
export const checkIsMap = (n: any) => {
  return typeof n === 'object' && n instanceof Map
}

/**
 * @description 是否是 Set
 */
export const checkIsSet = (n: any) => {
  return typeof n === 'object' && n instanceof Set
}

/**
 * @description 是否有key
 */
export const hasKey = (o: any, key: string) => {
  return checkIsObject(o) && Object.prototype.hasOwnProperty.call(o, key + '')
}

/**
 * @description 安全读取对象值，如果读取的是对象，不进行深克隆，引用其地址
 */
export const safe = (...arg: [any, string, any, boolean] | [any, string, any]) => {
  if (arg.length < 3) return false // 参数最少为3个
  const obj = arg[0] // 读取对象
  const str = arg[1] // key
  const df = arg[2] // 默认值
  const dp = arg[3] // 是否克隆
  if (!(checkIsObject(obj) && checkIsString(str))) return df
  let newObj = obj
  const arr = str.split('.')
  for (let i = 0; i < arr.length; i++) {
    if (newObj[arr[i]] === undefined) return df // undefined 没有值
    if (
      newObj[arr[i]] === null ||
      !(checkIsObject(newObj[arr[i]]) && hasKey(newObj, arr[i]))
    ) {
      if (i === arr.length - 1) {
        return dp ? deepClone(newObj[arr[i]]) : newObj[arr[i]]
      } else {
        return df
      }
    }
    newObj = newObj[arr[i]]
  }
  return dp ? deepClone(newObj) : newObj
}

/**
 * @description 深克隆, 不考虑函数类型
 */
export const deepClone = (obj: any) => {
  const isObject = checkIsObject(obj)
  const isArray = checkIsArray(obj)
  const isMap = checkIsMap(obj)
  const isSet = checkIsSet(obj)
  if (isObject || isArray || isMap || isSet) {
    if (isObject) {
      const newObj: {[key:string]: any} = {}
      for (const key in obj) {
        const value = obj[key]
        if (checkIsObject(value) || checkIsArray(value)) {
          // 对象或者数组
          newObj[key] = deepClone(value)
        } else if (checkIsMap(value)) {
          // map
          const newMap = new Map()
          value.forEach((v:string, k: any) => {
            // map类型的key不考虑深克隆，key可能为任意类型，只克隆value
            newMap.set(k, deepClone(v))
          })
          newObj[key] = newMap
        } else if (checkIsSet(value)) {
          // set
          const newSet = new Set()
          for (const item of value) {
            newSet.add(deepClone(item))
          }
          newObj[key] = newSet
        } else {
          // 其他类型，比如 symbol, function 等
          newObj[key] = value
        }
      }
      return newObj
    } else if (isArray) {
      const newArray: any[] = []
      obj.forEach((item:any, index: number) => {
        const value = item
        if (checkIsObject(value) || checkIsArray(value)) {
          // 对象或者数组
          newArray[index] = deepClone(value)
        } else if (checkIsMap(value)) {
          // map
          const newMap = new Map()
          value.forEach((v: any, k: string) => {
            // map类型的key不考虑深克隆，key可能为任意类型，只克隆value
            newMap.set(k, deepClone(v))
          })
          newArray[index] = newMap
        } else if (checkIsSet(value)) {
          // set
          const newSet = new Set()
          for (const item of value) {
            newSet.add(deepClone(item))
          }
          newArray[index] = newSet
        } else {
          // 其他类型，比如symbol, function 等
          newArray[index] = value
        }
      })
      return newArray
    } else if (isMap) {
      // map
      const newMap = new Map()
      const value = obj
      value.forEach((v: any, k: string) => {
        // map类型的key不考虑深克隆，key可能为任意类型，只克隆value
        newMap.set(k, deepClone(v))
      })
      return newMap
    } else if (isSet) {
      // set
      const newSet = new Set()
      const value = obj
      for (const item of value) {
        newSet.add(deepClone(item))
      }
      return newSet
    } else {
      return obj
    }
  } else {
    return obj
  }
}

/**
 * @description isPromise
 */
export const isPromise = (cb: any) => {
  return (
    (!!cb && (typeof cb === 'object' || typeof cb === 'function') && typeof cb.then === 'function') ||
    cb.__proto__.constructor.name === 'AsyncFunction' ||
    cb.__proto__.constructor.name === 'Promise'
  )
}