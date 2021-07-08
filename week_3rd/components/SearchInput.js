import { basicDebounce } from '../utils/debounce.js'

function SearchInput({ $app, onSearch }) {
  this.$target = document.createElement('div')
  this.$target.className = 'search-input'
  $app.appendChild(this.$target)

  this.onSearch = onSearch

  this.$target.addEventListener(
    'keyup',
    basicDebounce((e) => {
      // (e) => debounce()와 debounce((e) => {})의 차이를 보면, 전자는 어쨋든 이벤트를 입력마다 발생시킨다.
      // 반면 후자는 debounce된 값이 적용되어, 이벤트가 발생할때마다 debounce로 가서 timer를 clear, assign을 반복한다.
      const keyword = e.target.value
      if (keyword.length > 0) {
        this.onSearch(keyword)
      }
    }, 500)
  )

  this.render = () => {
    const htmlString = `<input type="text" />`
    this.$target.innerHTML = htmlString
  }
}

export default SearchInput
