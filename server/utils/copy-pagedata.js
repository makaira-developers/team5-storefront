const user = 'admin'
const pass = 'bxzstbxirejqysjs'
const auth = {
  auth: {
    username: user,
    password: pass,
  },
  timeout: 5000,
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
  const url = 'https://team5.makaira.io/landingpage'
  let ret = null
  try {
    const response = await axios.post(url, pageData, config)
    ret = response.data
    //console.log(ret)
  } catch (e) {
    //console.log(e)
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

async function addNotification(
  config,
  message = 'error happened',
  title = 'error title',
  level = 'error'
) {
  const url = 'https://team5.makaira.io/notifications'
  let ret = null
  try {
    const postBody = {
      message: message,
      title: title,
      level: level,
      //"show_immidiately" : true
    }
    const response = await axios.post(url, postBody, config)
    ret = response.data
  } catch (e) {
    ret = e.message
  }
  //console.log(ret)
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
    //console.log('Targetpage' + targetPage)
    if (targetPage == null) {
      // Page does not exist:
      createPage(pageData, targetInstance)
    } else {
      updatePage(pageData, targetInstance)
    }
    addNotification(
      sourceInstance,
      'Page wurde erfolgreich übertragen',
      'Erfolg',
      'info'
    )
    ret = {
      status: 'ok',
    }
  } catch (e) {
    addNotification(
      sourceInstance,
      'Page konnte nicht erfolgreich übertragen werden',
      'Misserfolg',
      'error'
    )
    ret = {
      status: 'error',
    }
  }

  //console.log(data)
  //const res = await putDataintoMakaira(pageData, configInstance2)
  //console.log(res)

  return ret
}
