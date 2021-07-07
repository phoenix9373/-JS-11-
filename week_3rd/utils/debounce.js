// 1. 디바운스 함수 구현에 대해..
// const debounce = (_디바운싱할 함수, debounceTime) => 디바운싱된_새로운_함수

export const debounce = (targetFunction, debounceTime) => {
  let timeoutId = null // 1. setTimeout이 반환하는 Id가 함수 내에서 주기적으로 바뀌기 때문에 let으로 선언.

  return (...args) => {
    // 2. 반환되는 함수가 어떤 인자를 받을지 모르기 때문에 rest parameter로 인자를 받음.
    const functionToBeCalledLater = () => {
      // 이 함수가 실제로 x ms 이후에 실행이 되면 타임아웃을 해제하고, timeoutId를 초기화한다.
      clearTimeout(timeoutId)
      timeoutId = null
      return targetFunction(...args)
    }

    // 처음 실행 시에는 null 이므로 건너뛴다.
    // 맨 아래 코드에서 타임아웃을 걸면 timeoutId에 값이 있으므로 timeout을 통한 함수 호출을 막는다.
    // 위의 functionToBeCalledLater 함수가 타임 아웃에 의해 debounceTime 시간이 흐른 후,
    // 실제로 실행이 되면 함수 바디(내부 코드)에서 타임아웃을 해제하고 timeoutId를 초기화한다.
    // 따라서 실제 함수(functionToBeCalledLater) 실행 이후에 다시 첫 사이클로 돌아온다.
    if (timeoutId) {
      return
    }

    timeoutId = setTimeout(functionToBeCalledLater, debounceTime)
  }
}
