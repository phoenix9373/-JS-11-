function SearchInput({ $app, debouncedGetSearchResult }) {
  this.$target = document.createElement('div')
  this.$target.className = 'search-input'
  $app.appendChild(this.$target)

  this.$target.addEventListener('keyup', (e) => {
    const keyword = e.target.value
    debouncedGetSearchResult(keyword)
  })

  this.render = () => {
    const htmlString = `<input type="text" />`
    this.$target.innerHTML = htmlString
  }
}

export default SearchInput
