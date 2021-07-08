export default function TodoList({ $app, initialState }) {
  const $target = document.createElement('ul')
  this.$target = $target
  this.$target.id = 'todo-list'
  this.state = initialState

  $app.appendChild(this.$target)

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    if (this.state.length > 0) {
      const htmlString = this.state
        .map((data) => {
          return `<li>${data.text}</li>`
        })
        .join('')

      this.$target.innerHTML = htmlString
    }
  }
}
