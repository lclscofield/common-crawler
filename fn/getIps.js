const { getHtml, saveIps } = require('./common.js')
const _ = require('lodash')

async function getIps(ipsFn, path) {
  let ips = []
  const startTime = new Date()
  for (let i = 0, len = ipsFn.length; i < len; i++) {
    let ipFn = ipsFn[i]
    if (ipFn.url && ipFn.callback) {
      try {
        const $ = await getHtml({
          url: ipFn.url
        })
        ips = ips.concat(
          _.isArray(await ipFn.callback($)) ? await ipFn.callback($) : []
        )
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log('缺少 url 或 callback', JSON.stringify(ipFn))
    }
  }
  await saveIps(ips, path)
  console.log(`获取并存入 ip 池共耗时 ${new Date() - startTime} ms`)
}

module.exports = getIps
