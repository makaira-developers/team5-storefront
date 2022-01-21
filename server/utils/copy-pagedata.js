const user = 'admin'
const pass = 'bxzstbxirejqysjs'
const auth = {
  auth: {
    username: user,
    password: pass,
  },
}
const sourceInstance = {
  ...auth,
  headers: {
    'X-Makaira-Instance': 'hackathon',
  },
}
const targetInstance = {
  ...auth,
  headers: {
    'X-Makaira-Instance': 'hackathon_stage',
  },
}

const axios = require('axios')

async function getPageData(pageid, config) {
  const url = 'https://team5.makaira.io/landingpage/' + pageid
  let ret = null
  try {
    const response = await axios.get(url, config)
    ret = response.data
  } catch (e) {
    ret = null
  }
  return ret
}
async function createPage(pageData, config) {
  const url = 'https://team5.makaira.io/landingpage/'
  let ret = null
  try {
    const response = await axios.post(url, pageData, config)
    ret = response.data
  } catch (e) {
    ret = null
  }
  return ret
}
async function updatePage(pageData, config) {
  const url = 'https://team5.makaira.io/landingpage/' + pageData.id
  let ret = null
  try {
    const response = await axios.put(url, pageData, config)
    ret = response.data
  } catch (e) {
    ret = null
  }
  return ret
}

module.exports = async function copyPageData(pageId) {
  let ret = {}
  try {
    // Get original Page:
    const pageData = await getPageData(pageId, sourceInstance)
    if (pageData == null) {
      throw new Error('Original Page does not exist')
    }
    // getPage on Target instance
    const targetPage = await getPageData(pageId, targetInstance)
    if (targetPage == null) {
      // Page does not exist:
      createPage(pageData, targetInstance)
    } else {
      updatePage(pageData, targetInstance)
    }
    ret = {
      status: 'ok',
    }
  } catch (e) {
    ret = {
      status: 'error',
    }
  }

  //console.log(data)
  //const res = await putDataintoMakaira(pageData, configInstance2)
  //console.log(res)

  return ret
}
