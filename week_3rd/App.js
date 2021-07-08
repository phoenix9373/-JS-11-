import SearchInput from './components/SearchInput.js'
import SearchResult from './components/SearchResult.js'
import SearchHistory from './components/SearchHistory.js'
import { getFetchImage } from './api.js'

function App($app) {
  this.state = {
    history: [],
    data: [],
    keyword: '',
  }

  const searchInput = new SearchInput({
    $app,
    onSearch: async (keyword) => {
      const data = await getFetchImage(keyword)
      this.setState({
        history: [...this.state.history, keyword],
        data: data,
        keyword,
      })
    },
  })

  const searchHistory = new SearchHistory({
    $app,
    initialState: this.state.history,
    onClick: async (keyword) => {
      const data = await getFetchImage(keyword)
      this.setState({
        history: [...this.state.history, keyword],
        data: data,
        keyword,
      })
    },
  })

  const searchResult = new SearchResult({
    $app,
    initialState: { data: this.state.data, keyword: this.state.keyword },
  })

  this.setState = (nextState) => {
    const { data, history, keyword } = nextState
    this.state = nextState
    searchResult.setState({ data, keyword })
    searchHistory.setState(history)
  }

  this.render = () => {
    searchInput.render()
    searchHistory.render()
    searchResult.render()
  }
}

export default App
