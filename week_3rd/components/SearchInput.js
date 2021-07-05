function SearchInput({ $app, onHandleSearch }) {
  this.$target = document.createElement('input')
  this.$target.id = 'search-input'

  this.$target.addEventListener('keyup', (e) => {
    const keyword = e.target.value
    onHandleSearch(keyword)
  })

  $app.appendChild(this.$target)
}

export default SearchInput
