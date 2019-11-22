class ResponseHelper {
  constructor() {
    this.json = {
      success: null,
      message: null,
    }
  }

  get(success, message, res, data = null) {
    let newJson = this.json
    newJson.success = success
    newJson.message = message
    res.rawJson = newJson
    if (data) {
      newJson = { ...newJson, data }
      res.rawJson = newJson
    }
    return newJson
  }
}

module.exports = new ResponseHelper()
