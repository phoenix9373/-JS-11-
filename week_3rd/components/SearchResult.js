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
    if (this.state.data.length > 0) {
      const infoString = `<h3>'${this.state.keyword}'로 검색한 결과, 총 ${this.state.data.length}개의 짤을 찾았습니다.</h3>`
      const htmlString = this.state.data
        .map((data) => {
          return `<li><img src=${data.imageUrl} alt=${data.title} /></li>`
        })
        .join('')

      this.$target.innerHTML = this.state.keyword ? infoString + htmlString : htmlString
    } else {
      this.$target.innerHTML = `'${this.state.keyword}' 에 대한 검색 결과가 없습니다.`
    }
  }
}

export default SearchResult
