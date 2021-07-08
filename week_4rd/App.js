import TodoList from './components/TodoList'

export default function App({ $app, initialState }) {
  this.state = initialState

  const todoList = new TodoList({
    $app,
    initialState: this.state,
  })

  this.setState = (nextState) => {
    this.state = nextState
    todoList.setState(nextState)
    this.render()
  }

  this.render = () => {
    todoList.render()
  }
}
