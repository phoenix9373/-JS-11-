import App from './App.js'

const $app = document.querySelector('#app')
const app = new App({ $app, initialState: [] })
app.render()
