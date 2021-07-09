function Loading(initialState) {
  this.state = initialState

  const $target = document.querySelector('#loading')
  this.$target = $target

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    if (this.state) {
      this.$target.style.display = 'flex'
    } else {
      this.$target.style.display = 'none'
    }
  }
}

export default Loading
