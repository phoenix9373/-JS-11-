import SearchInput from './components/SearchInput.js'
import SearchResult from './components/SearchResult.js'
import { getFetchImage } from './api.js'

const HTTP_STATUS_CODE = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
}

function App({ $app, initialState }) {
  this.$app = $app
  this.state = initialState

  // instances
  this.searchInput = new SearchInput({
    $app: this.$app,
    onHandleSearch: async (keyword) => {
      try {
        const data = await getFetchImage(keyword)

        this.setState(data)
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
    },
  })

  this.searchResult = new SearchResult({
    $app: this.$app,
    initialState: this.state,
  })

  // methods
  this.setState = (nextState) => {
    this.state = nextState
    this.searchResult.setState(nextState)
  }

  this.render = () => {
    this.searchResult.render()
  }
}

export default App
