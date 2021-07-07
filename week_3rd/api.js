const API_END_POINT = 'https://jjalbot.com/api/jjals'

// 1. 에러 처리: 저수준에서 발생시키고, 고수준에서 처리하는 방법 => callee에서 발생, caller에서 처리.
// 2. callee: request / caller: index.js => 즉, api.js에 정의하고, 실제 사용하는 곳에서 error를 처리함.
// 3. catch하자마자 다시 error를 throw하는 것은 의미가 없다. -> 어차피 같은 에러가 request단계에서 일어나기 때문.
// 4. 따라서 어떤 종류의 에러가 발생했는지 알려줘야 의미가 있다.
// 5. 참고: https://prgrms-fe-js.slack.com/archives/C01RDSWL1C5/p1624431331030000

export const getFetchImage = async (keyword) => {
  const response = await fetch(`${API_END_POINT}?text=${keyword}`)

  if (!response.ok) throw new Error(response)

  return response.json()
}
