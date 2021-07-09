const END_POINT = 'https://todo-api.roto.codes'

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(url, options)
    const method = options.method ? options.method : 'GET'

    if (!res.ok) {
      throw new Error(`${method} 요청 에러`)
    }

    return res
  } catch (e) {
    console.error(e.message)
  }
}

export const fetchTodoList = async (username) => {
  const res = await request(`${END_POINT}/${username}`)
  return await res.json()
}

export const fetchAddTodo = async (username, todoContent) => {
  const options = {
    method: 'POST', // 멱등성이 없음 -> 여러 번 요청한 것에 대한 응답이 다를 수 있음.
    headers: {
      'Content-Type': 'application/json', // body의 유형을 나타냄.
    },
    body: JSON.stringify({
      content: todoContent,
    }),
  }
  const res = await request(`${END_POINT}/${username}`, options)
  console.log(res)
  return res
}

export const fetchDeleteTodo = async (username, todoId) => {
  const options = {
    method: 'DELETE',
  }
  const res = await request(`${END_POINT}/${username}/${todoId}`, options)
  console.log(res)
  return res
}

export const fetchToggleTodo = async (username, todoId) => {
  const options = {
    method: 'PUT',
  }
  const res = await request(`${END_POINT}/${username}/${todoId}/toggle`, options)
  console.log(res)
  return res
}
