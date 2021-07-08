export default function TodoInput({ $app, onAdd }) {
  const $target = document.createElement('div')

  this.$target = $target

  $app.appendChild(this.$target)

  this.render = () => {
    const htmlString = `
      <form class="todo-form">
        <label for="todo-input">Todo 추가: </label>
        <input type="text" class="todo-input" id="todo-input" />
        <button type="submit" class="todo-add">Add</button>
      </form>
      <button class="todo-remove-all">Remove All</button>
    `

    this.$target.innerHTML = htmlString

    this.$form = document.querySelector('.todo-form')
    this.$input = document.querySelector('.todo-input')
    this.$addBtn = document.querySelector('.todo-add')
    this.$removeAllBtn = document.querySelector('.todo-remove-all')

    this.$form.addEventListener('submit', (e) => {
      e.preventDefault()
      const text = this.$input.value.trim()
      if (text.length > 0) {
        onAdd(text)
        this.$input.value = ''
        this.$input.focus()
      }
    })

    this.$removeAllBtn.addEventListener('click', () => {
      const removeAll = new Event('remove')
      $app.dispatchEvent(removeAll)
    })
  }
}
