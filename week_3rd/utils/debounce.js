const debounce = (callBackFunc, time) => {
  let inDebounce
  return function () {
    const context = this
    const args = arguments

    clearTimeout(inDebounce) // inDebounce라는 timeout의 설정을 해제함.
    inDebounce = setTimeout(() => callBackFunc.apply(context, args), time) // setTimeout은 timeoutID(Number)를 반환함.
  }
}

export default debounce
