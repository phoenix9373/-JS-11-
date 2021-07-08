const API_END_POINT = 'https://jjalbot.com/api/jjals'

// 1. 에러 처리: 저수준에서 발생시키고, 고수준에서 처리하는 방법 => callee에서 발생, caller에서 처리.
// 2. callee: request / caller: index.js => 즉, api.js에 정의하고, 실제 사용하는 곳에서 error를 처리함.
// 3. catch하자마자 다시 error를 throw하는 것은 의미가 없다. -> 어차피 같은 에러가 request단계에서 일어나기 때문.
// 4. 따라서 어떤 종류의 에러가 발생했는지 알려줘야 의미가 있다.
// 5. 참고: https://prgrms-fe-js.slack.com/archives/C01RDSWL1C5/p1624431331030000

// Promise를 활용한 API 요청
export const requestWithPromise = (url) => {
  return fetch(url) // Promise 객체를 반환함. Promise 객체는 API 요청의 성공 여부에 따라 새로운 Promise 객체를 반환한다.
    .then((res) => {
      if (res.ok) {
        return res.json() // body.json() 함수는 Promise 객체를 반환.
      }
      throw new Error('API 요청 중에 에러가 발생했습니다...')
    })
    .catch((e) => {
      alert(e.message)
    })
}

// async, await을 활용한 API 요청
// tip: 코드의 일관성을 유지하기 위해 async, await을 API 요청에 관련한 곳에 모두 사용하는 것이 좋다.
export const request = async (url) => {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('API 요청 중에 에러가 발생했습니다....')
    }

    const result = await response.json()
    return result
  } catch (e) {
    alert(e.message)
  }
}

// request의 경우, Promise 객체를 리턴하므로 async, await을 굳이 붙이지 않아도 되긴 한다.
// (하지만 일관성을 위해! 비동기를 명시하는 의미)
export const getFetchImage = async (keyword) => {
  return await request(`${API_END_POINT}?text=${keyword}`)
}

// index.js에서 고수준 처리를 하는 방법.
// -> API 요청 중 에러가 발생하면 아래의 catch 구문에 걸린다.(api.js에서 catch는 따로 없고, throw new Error만 반환.)

// const HTTP_STATUS_CODE = {
//   OK: 200,
//   BAD_REQUEST: 400,
//   NOT_FOUND: 404,
//   SERVER_ERROR: 500,
// }

// const getSearchResult = async (keyword) => {
//   try {
//     const data = await getFetchImage(keyword)
//     // searchResult.setState({ data, keyword }) // tip: 아래에 선언한 객체를 사용하지만, 실행 시에는 이미 선언된 후이기 때문에 정상 작동함.
//     // searchHistory.setState(keyword)
//   } catch (e) {
//     switch (e.status) {
//       case HTTP_STATUS_CODE.BAD_REQUEST:
//         console.error(`Error BAD_REQUEST: ${e}`)
//         break
//       case HTTP_STATUS_CODE.NOT_FOUND:
//         console.error(`Error NOT_FOUND: ${e}`)
//         break
//       case HTTP_STATUS_CODE.SERVER_ERROR:
//         console.error(`Error SERVER_ERROR: ${e}`)
//         break
//       default:
//         console.error(`Error UNKNOWN: ${e}`)
//     }
//   }
// }
