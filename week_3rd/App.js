import SearchInput from './components/SearchInput.js'
import SearchResult from './components/SearchResult.js'
import SearchHistory from './components/SearchHistory.js'
import { getFetchImage } from './api.js'
import { debounce } from '../utils/debounce.js'

const HTTP_STATUS_CODE = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
}

function App({ $app, initialState = [] }) {
  this.$app = $app
  this.state = {
    data: initialState,
    keyword: '',
    history: [],
  }

  const getSearchResult = async (keyword) => {
    try {
      const data = await getFetchImage(keyword)
      this.setState({ data, keyword, history: [...this.state.history, keyword] })
    } catch (e) {
      switch (e.status) {
        case HTTP_STATUS_CODE.BAD_REQUEST:
          console.error(`Error BAD_REQUEST: ${e}`)
          break
        case HTTP_STATUS_CODE.NOT_FOUND:
          console.error(`Error NOT_FOUND: ${e}`)
          break
        case HTTP_STATUS_CODE.SERVER_ERROR:
          console.error(`Error SERVER_ERROR: ${e}`)
          break
        default:
          console.error(`Error UNKNOWN: ${e}`)
      }
    }
  }

  const debouncedGetSearchResult = debounce(getSearchResult, 300)

  const searchInput = new SearchInput({
    $app: this.$app,
    debouncedGetSearchResult: debouncedGetSearchResult,
  })

  const searchHistory = new SearchHistory({
    $app: this.$app,
    initialState: this.state.history,
    debouncedGetSearchResult: debouncedGetSearchResult,
  })

  const searchResult = new SearchResult({
    $app: this.$app,
    initialState: this.state,
  })

  this.setState = (nextState) => {
    const { data, history } = nextState
    this.state = nextState
    searchResult.setState({ data, history })
    searchHistory.setState(history)
  }

  this.render = () => {
    searchInput.render()
    searchHistory.render()
    searchResult.render()
  }
}

export default App
