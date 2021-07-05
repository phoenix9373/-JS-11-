import SearchInput from './components/SearchInput.js'
import SearchResult from './components/SearchResult.js'
import { getFetchImage } from './api.js'

function App({ $app, initialState }) {
  this.$app = $app
  this.state = initialState

  this.searchInput = new SearchInput({
    $app: this.$app,
    onHandleSearch: async (keyword) => {
      const data = await getFetchImage(keyword)
      this.setState(data)
    },
  })

  this.searchResult = new SearchResult({
    $app: this.$app,
    initialState: this.state,
  })

  this.setState = (nextState) => {
    this.state = nextState
    this.searchResult.setState(nextState)
  }

  this.render = () => {
    this.searchResult.render()
  }
}

export default App
