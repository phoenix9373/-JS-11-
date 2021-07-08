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

function App($app) {
  const getSearchResult = async (keyword) => {
    try {
      const data = await getFetchImage(keyword)
      searchResult.setState({ data, keyword }) // tip: 아래에 선언한 객체를 사용하지만, 실행 시에는 이미 선언된 후이기 때문에 정상 작동함.
      searchHistory.setState(keyword)
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
    $app,
    debouncedGetSearchResult,
  })

  const searchHistory = new SearchHistory({
    $app,
    initialState: [],
    debouncedGetSearchResult,
  })

  const searchResult = new SearchResult({
    $app,
    initialState: { data: [], keyword: '' },
  })

  this.render = () => {
    searchInput.render()
    searchHistory.render()
    searchResult.render()
  }
}

export default App
