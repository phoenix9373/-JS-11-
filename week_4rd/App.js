import TodoList from './components/TodoList.js'
import TodoInput from './components/TodoInput.js'
import TodoCount from './components/TodoCount.js'
import { api } from './api.js'
import Loading from './components/Loading.js'

function App($app) {
  const USER_NAME = 'roto'

  this.state = {
    todos: [],
    users: [],
    isLoading: false,
    loginUserName: USER_NAME,
  }

  this.todoInput = new TodoInput({
    $app,
    onAdd: async (inputText) => {
      try {
        await api.addTodo(this.state.loginUserName, inputText)
        this.getLoadUpdatedData()
      } catch (e) {
        console.error(e)
      }
    },
  })

  this.todoCount = new TodoCount({
    $app,
    initialState: this.state.todos,
  })

  this.todoList = new TodoList({
    $app,
    initialState: this.state.todos,
    onDelete: async (id) => {
      try {
        await api.deleteTodo(this.state.loginUserName, id)
        this.getLoadUpdatedData()
      } catch (e) {
        console.error(e)
      }
    },
    onToggle: async (id) => {
      try {
        await api.toggleTodo(this.state.loginUserName, id)
        this.getLoadUpdatedData()
      } catch (e) {
        console.error(e)
      }
    },
  })

  this.loading = new Loading(this.state.isLoading)

  this.setState = (nextState) => {
    this.state = nextState
    this.todoList.setState(nextState.todos)
    this.todoCount.setState(nextState.todos)
    this.loading.setState(nextState.isLoading)
    this.render()
  }

  this.render = () => {
    this.todoInput.render()
    this.todoList.render()
    this.todoCount.render()
    this.loading.render()
  }

  this.getLoadUpdatedData = async () => {
    this.setState({ ...this.state, isLoading: true })
    const todos = await api.getTodoList(USER_NAME)
    const users = await api.getUserList()

    this.setState({ ...this.state, todos, users })
    this.setState({ ...this.state, isLoading: false })
  }

  this.getLoadUpdatedData()
}

export default App
