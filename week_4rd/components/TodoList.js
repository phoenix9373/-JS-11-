export default function TodoList({ $app, initialState, onDelete, onToggle }) {
  const $target = document.createElement('ul')

  this.$target = $target
  this.$target.id = 'todo-list'

  this.state = initialState
  this.onDelete = onDelete
  this.onToggle = onToggle

  $app.appendChild(this.$target)

  this.$target.addEventListener('click', (e) => {
    if (e.target === this.$target) {
      return
    }

    const $li = e.target.closest('li')
    const id = $li.dataset.id

    if (e.target.classList.contains('todo-toggle') || e.target.tagName === 'S') {
      onToggle(id)
    }

    if (e.target.classList.contains('todo-delete')) {
      onDelete(id)
    }
  })

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    if (this.state.length > 0) {
      const htmlString = this.state
        .map((data) => {
          const toggleTemplate = data.isCompleted ? `<s>${data.content}</s>` : `${data.content}`
          const htmlTemplate = `
            <li data-id="${data._id}">
              <span class="todo-toggle">${toggleTemplate}</span>
              <button class="todo-delete">Del</button>
            </li>
          `
          return htmlTemplate
        })
        .join('')

      this.$target.innerHTML = htmlString
    } else {
      this.$target.innerHTML = ''
    }
  }
}
