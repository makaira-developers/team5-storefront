const makaira_api = require('./makaira-api')

async function getComponentConfig(pageData) {
  const page = pageData.config.main.elements.filter((element) => {
    if (element.component == 'copy-settings') {
      return element
    }
  })
  const componentData = page[0].properties.de.content
  const targeInstances = componentData['target-instance']

  return {
    'active': componentData['sync-active'],
    'targetInstance': targeInstances[0]
  }
}

module.exports = async function copyPageData(pageId, sourceInstanceName) {
  let ret = {}
  try {
    // Get original Page:
    const pageData = await makaira_api.getPageData(pageId, sourceInstanceName)
    if (pageData == null) {
      throw new Error('Original Page does not exist')
    }

    const { active, targetInstance } = await getComponentConfig(pageData)

    // getPage on Target instance
    const targetPage = await makaira_api.getPageData(pageId, targetInstance)
    //console.log('Targetpage' + targetPage)
    if (targetPage == null) {
      // Page does not exist:
      makaira_api.createPage(pageData, targetInstance)
    } else {
      makaira_api.updatePage(pageData, targetInstance)
    }
    makaira_api.addNotification(
      sourceInstanceName,
      'Page wurde erfolgreich übertragen',
      'Erfolg',
      'info'
    )
    ret = {
      status: 'ok',
    }
  } catch (e) {
    makaira_api.addNotification(
      sourceInstanceName,
      'Page konnte nicht erfolgreich übertragen werden',
      'Misserfolg',
      'error'
    )
    throw e
  }

  //console.log(data)
  //const res = await putDataintoMakaira(pageData, configInstance2)
  //console.log(res)

  return ret
}


