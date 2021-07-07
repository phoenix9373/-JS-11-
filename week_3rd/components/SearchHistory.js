function SearchHistory({ $app, initialState, debouncedGetSearchResult }) {
  this.state = initialState
  this.$target = document.createElement('ul')
  this.$target.className = 'search-history'

  this.$target.addEventListener('click', (e) => {
    if (e.target.className === 'keyword') {
      debouncedGetSearchResult(e.target.dataset.keyword)
    }
  })

  $app.appendChild(this.$target)

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
