const user = 'admin'
const pass = 'bxzstbxirejqysjs'
const configInstance1 = {
  auth: {
    username: user,
    password: pass,
  },
}
const configInstance2 = {
  ...configInstance1,
  headers: {
    'X-Makaira-Instance': 'hackathon_stage',
  },
}

const axios = require('axios')

async function getDataFromMakaira(pageid) {
  const url = 'https://team5.makaira.io/landingpage/' + pageid
  return await axios.get(url, configInstance1)
}
async function putDataintoMakaira(pageData) {
  //const pageData = response.data
  pageData.id = 14
  pageData.seoUrls = { de: '/test2' }
  pageData.revisionParent = ''
  pageData.name = 'asdasd'
  const url = 'https://team5.makaira.io/landingpage/' + pageData.id

  return await axios.put(url, pageData, configInstance2)
}

module.exports = async function copyPageData(pageId) {
  const pageData = await getDataFromMakaira(pageId)
  //console.log(data)
  const res = await putDataintoMakaira(pageData)
  console.log(res)

  return {
    status: 'ok',
  }
}
