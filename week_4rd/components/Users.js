function UserList({ $app, initialState, onClick }) {
  this.state = initialState

  const $target = document.createElement('div')
  this.$target = $target
  this.$target.className = 'user-list'
  this.onClick = onClick

  $app.appendChild(this.$target)

  this.$target.addEventListener('click', (e) => {
    if (e.target === this.$target) {
      return
    }

    const $user = e.target.closest('li')
    const { userName } = $user.dataset

    this.onClick(userName)
  })

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    if (this.state.users.length > 0) {
      const htmlString = this.state.users
        .map((user) => {
          const isCurrentUser = user === this.state.currentUser
          const classList = isCurrentUser ? 'user active' : 'user'
          return `<li class="${classList}" data-user-name="${user}">${user}</li>`
        })
        .join('')

      this.$target.innerHTML = htmlString
    } else {
      this.$target.innerHTML = '목록에 저장된 유저가 없습니다.'
    }
  }
}

export default UserList
