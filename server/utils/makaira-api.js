const user = 'admin'
const pass = 'bxzstbxirejqysjs'
const auth = {
  auth: {
    username: user,
    password: pass,
  },
  timeout: 5000,
}
const axios = require('axios')

module.exports = {
  /**
   * Gets the configuration for the Instance
   * @param instanceName
   * @returns {Promise<{headers: {"X-Makaira-Instance": *}, auth: {password: string, username: string}, timeout: number}>}
   */
  async getInstanceConfig(instanceName) {
    return {
      ...auth,
      headers: {
        'X-Makaira-Instance': instanceName,
      },
    }
  },
  /**
   * Gets Page Data
   * @param pageid
   * @param instanceName
   * @returns {Promise<*>}
   */
  async getPageData(pageid, instanceName) {
    let config = await this.getInstanceConfig(instanceName)
    const url = 'https://team5.makaira.io/landingpage/' + pageid
    let ret = null
    try {
      const response = await axios.get(url, config)
      ret = response.data
    } catch (e) {
      ret = null
    }
    return ret
  },
  /**
   *
   * @param pageData
   * @param instanceName
   * @returns {Promise<*>}
   */
  async createPage(pageData, instanceName) {
    let config = await this.getInstanceConfig(instanceName)
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
  },
  /**
   * Updates the Page
   * @param pageData
   * @param instanceName
   * @returns {Promise<*>}
   */
  async updatePage(pageData, instanceName) {
    let config = await this.getInstanceConfig(instanceName)
    const url = 'https://team5.makaira.io/landingpage/' + pageData.id
    let ret = null
    try {
      const response = await axios.put(url, pageData, config)
      ret = response.data
    } catch (e) {
      ret = null
    }
    return ret
  },
  /**
   * Adds a notification
   * @param instanceName
   * @param message
   * @param title
   * @param level
   * @returns {Promise<*>}
   */
  async addNotification(
    instanceName,
    message = 'error happened',
    title = 'error title',
    level = 'error'
  ) {
    let config = await this.getInstanceConfig(instanceName)
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
  },
}
