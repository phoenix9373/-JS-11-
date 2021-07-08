const localStorage = window.localStorage

export const getItemFromLocalStorage = (key) => {
  const item = localStorage.getItem(key) // string을 반환한다.

  if (item === 'undefined') {
    return null
  }

  try {
    const parsedItem = JSON.parse(item)
    return parsedItem
  } catch (e) {
    console.error(e)
  }
}

export const setItemFromLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}
