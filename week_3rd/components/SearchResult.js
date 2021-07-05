function SearchResult({ $app, initialState }) {
  this.state = initialState
  this.$target = document.createElement('ul')
  this.$target.id = 'search-result'

  $app.appendChild(this.$target)

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    if (this.state.length > 0) {
      const htmlString = this.state
        .map((data) => {
          return `<li><img src=${data.imageUrl} alt=${data.title} /></li>`
        })
        .join('')

      this.$target.innerHTML = htmlString
    }
  }
}

export default SearchResult
