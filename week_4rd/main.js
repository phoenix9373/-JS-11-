import App from './App.js'

const dummyData = [
  {
    text: 'JS 복습',
  },
  {
    text: 'JS 예습',
  },
]

const $app = document.querySelector('$app')
const app = new App({ $app, initialState: dummyData })
app.render()
