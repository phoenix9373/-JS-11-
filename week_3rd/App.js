import SearchInput from './components/SearchInput.js'
import SearchResult from './components/SearchResult.js'
import SearchHistory from './components/SearchHistory.js'
import { getFetchImage } from './api.js'

function App($app) {
  this.state = {
    histories: [],
    data: [],
    keyword: '',
  }

  const createNextHistories = (keyword) => {
    if (this.state.histories.includes(keyword)) {
      return this.state.histories
    }
    return [...this.state.histories, keyword]
  }

  const searchInput = new SearchInput({
    $app,
    onSearch: async (keyword) => {
      const data = await getFetchImage(keyword)
      this.setState({
        histories: createNextHistories(keyword),
        data: data,
        keyword,
      })
    },
  })

  const searchHistory = new SearchHistory({
    $app,
    initialState: this.state.histories,
    onClick: async (keyword) => {
      const data = await getFetchImage(keyword)
      this.setState({
        ...this.state,
        data: data,
      })
    },
  })

  const searchResult = new SearchResult({
    $app,
    initialState: { data: this.state.data, keyword: this.state.keyword },
  })

  this.setState = (nextState) => {
    const { data, histories, keyword } = nextState
    this.state = nextState
    searchResult.setState({ data, keyword })
    searchHistory.setState(histories)
  }

  this.render = () => {
    searchInput.render()
    searchHistory.render()
    searchResult.render()
  }
}

export default App
