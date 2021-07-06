// ;(function () {
//   document.querySelector('#search-keyword').addEventListener('keyup', function (e) {
//     fetch(`https://jjalbot.com/api/jjals?text=${e.target.value}`)
//       .then((x) => x.json())
//       .then((data) => {
//         console.log(JSON.stringify(data, null, 2))
//         const htmlString = `${data.map((d) => `<img src="${d.imageUrl}">`).join('')}`
//         document.querySelector('#search-result').innerHTML = htmlString
//       })
//   })
// })()

import App from './App.js'
import dummyData from './dummyData.js'

const $app = document.querySelector('#app')
const app = new App({ $app, initialState: dummyData })
app.render()
