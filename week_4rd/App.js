import TodoList from './components/TodoList.js'
import TodoInput from './components/TodoInput.js'
import TodoCount from './components/TodoCount.js'
import { getItemFromLocalStorage, setItemFromLocalStorage } from './utils/localStorage.js'

export default function App({ $app, initialState }) {
  const savedData = getItemFromLocalStorage('data')
  this.state = savedData ? savedData : initialState

  $app.addEventListener('remove', () => {
    this.setState([])
  })

  const todoInput = new TodoInput({
    $app,
    onAdd: (inputText) => {
      this.setState([...this.state, { id: Date.now(), text: inputText, isCompleted: false }])
    },
  })

  const todoCount = new TodoCount({
    $app,
    initialState: this.state,
  })

  const todoList = new TodoList({
    $app,
    initialState: this.state,
    onDelete: (id) => {
      const nextState = this.state.filter((data) => data.id !== Number(id))
      this.setState(nextState)
    },
    onToggle: (id) => {
      const nextState = this.state.map((data) => {
        if (data.id === Number(id)) {
          return { ...data, isCompleted: !data.isCompleted }
        }
        return data
      })
      this.setState(nextState)
    },
    onRemoveAll: () => {
      this.setState([])
    },
  })

  this.setState = (nextState) => {
    setItemFromLocalStorage('data', nextState)
    this.state = nextState
    todoList.setState(nextState)
    todoCount.setState(nextState)
    this.render()
  }

  this.render = () => {
    todoInput.render()
    todoList.render()
    todoCount.render()
  }
}
