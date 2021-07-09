import TodoList from './components/TodoList.js'
import TodoInput from './components/TodoInput.js'
import TodoCount from './components/TodoCount.js'
import { api } from './api.js'
import Loading from './components/Loading.js'
import UserList from './components/Users.js'

function App($app) {
  const USER_NAME = 'roto'

  this.state = {
    todos: [],
    users: [],
    isLoading: false,
    currentUser: USER_NAME,
  }

  this.todoInput = new TodoInput({
    $app,
    onAdd: async (inputText) => {
      try {
        await api.addTodo(this.state.currentUser, inputText)
        await this.getLoadUpdatedData(this.state.currentUser)
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
        await api.deleteTodo(this.state.currentUser, id)
        await this.getLoadUpdatedData(this.state.currentUser)
      } catch (e) {
        console.error(e)
      }
    },
    onToggle: async (id) => {
      try {
        await api.toggleTodo(this.state.currentUser, id)
        await this.getLoadUpdatedData(this.state.currentUser)
      } catch (e) {
        console.error(e)
      }
    },
  })

  this.userList = new UserList({
    $app,
    initialState: {
      users: this.state.users,
      currentUser: this.state.currentUser,
    },
    onClick: async (userName) => {
      try {
        await this.getLoadUpdatedData(userName)
        this.setState({ ...this.state, currentUser: userName })
      } catch (e) {}
    },
  })

  this.loading = new Loading(this.state.isLoading)

  this.setState = (nextState) => {
    const { todos, users, isLoading, currentUser } = nextState
    this.state = nextState
    this.todoList.setState(todos)
    this.todoCount.setState(todos)
    this.loading.setState(isLoading)
    this.userList.setState({ users, currentUser })
    this.render()
  }

  this.render = () => {
    this.todoInput.render()
    this.todoList.render()
    this.todoCount.render()
    this.loading.render()
    this.userList.render()
  }

  this.getLoadUpdatedData = async (userName) => {
    this.setState({ ...this.state, isLoading: true })
    const todos = await api.getTodoList(userName)
    const users = await api.getUserList()

    this.setState({ ...this.state, todos, users })
    this.setState({ ...this.state, isLoading: false })
  }

  this.getLoadUpdatedData(USER_NAME)
}

export default App
