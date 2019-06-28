export class ApiController {
  constructor(apiBaseUrl) {
    this.apiBaseUrl = apiBaseUrl
  }

  sendToEdit(id, tags) {
    console.log(`Editando `, id, ` con `, tags)
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      xhr.open('POST', this._parseUrl(`update/${id}`))

      xhr.onload = () => {
        console.log('loaded', xhr.response)
        resolve(xhr.response)
      }

      xhr.onerror = () => {
        console.log('error')
        reject({
          status: this.status,
          message: xhr.statusText
        })
      }
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
      xhr.send(JSON.stringify({ tags }))
    })
  }

  _parseUrl(path) {
    return `${this.apiBaseUrl}/${path}`
  }
}
