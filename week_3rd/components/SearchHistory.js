import { basicDebounce } from '../utils/debounce.js'

function SearchHistory({ $app, initialState, onClick }) {
  this.state = initialState
  this.$target = document.createElement('ul')
  this.$target.className = 'search-history'
  $app.appendChild(this.$target)

  this.onClick = onClick

  this.$target.addEventListener(
    'click',
    basicDebounce((e) => {
      if (e.target.className === 'keyword') {
        this.onClick(e.target.dataset.keyword)
      }
    })
  )

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    if (this.state.length > 0) {
      const htmlString = this.state
        .map((keyword) => {
          return `<li class="keyword" data-keyword="${keyword}">${keyword}</li>`
        })
        .join('')

      this.$target.innerHTML = htmlString
    }
  }
}

export default SearchHistory
