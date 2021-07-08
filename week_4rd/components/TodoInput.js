export default function TodoInput({ $app, onAdd }) {
  const $target = document.createElement('div')
  const $input = document.createElement('input')
  const $button = document.createElement('button')

  this.$target = $target
  this.$input = $input
  this.$button = $button
  this.$button.innerText = '추가'

  this.$target.appendChild(this.$input)
  this.$target.appendChild(this.$button)
  $app.appendChild(this.$target)

  $input.addEventListener('keyup', (e) => {
    const text = e.target.value
    if (e.key === 'Enter' && text.length > 0) {
      onAdd(text)
      this.$input.value = ''
      this.$input.focus()
    }
  })

  $button.addEventListener('click', () => {
    const text = this.$input.value.trim()
    if (text.length > 0) {
      onAdd(text)
      this.$input.value = ''
      this.$input.focus()
    }
  })
}
