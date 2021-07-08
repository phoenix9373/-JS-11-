export default function TodoCount({ $app, initialState }) {
  const $target = document.createElement('div')
  this.$target = $target
  this.state = initialState

  $app.appendChild(this.$target)

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    const completedTodoCount = this.state.reduce((acc, cur) => {
      if (cur.isCompleted) {
        return acc + 1
      }
      return acc
    }, 0)

    const htmlString = `
      <span>총 개수: ${this.state.length}</span>
      <span>완료된 개수: ${completedTodoCount}</span>
    `

    this.$target.innerHTML = htmlString
  }
}
