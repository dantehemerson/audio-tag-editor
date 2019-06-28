export class ApiController {
  constructor(apiBaseUrl) {
    this.apiBaseUrl = apiBaseUrl
  }

  sendToEdit(tags) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      xhr.open('POST', this._parseUrl('update'))

      xhr.onload = () => {
        if (this.status === 200) {
          resolve(xhr.response)
        }
      }

      xhr.onerror = () => {
        reject({
          status: this.status,
          message: xhr.statusText
        })
      }

      xhr.send({
        tags
      })
    })
  }

  _parseUrl(path) {
    return `${this.apiBaseUrl}/${path}`
  }
}
