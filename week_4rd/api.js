const END_POINT = 'https://todo-api.roto.codes'

const options = {
  post: (todoContent) => ({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: todoContent,
    }),
  }),
  delete: () => ({
    method: 'DELETE',
  }),
  put: () => ({
    method: 'PUT',
  }),
}

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(url, options)
    const method = options.method ? options.method : 'GET'

    if (!res.ok) {
      throw new Error(`${method} 요청 에러`)
    }

    return await res.json()
  } catch (e) {
    console.error(e.message)
  }
}

export const api = {
  getTodoList: (userName) => {
    return request(`${END_POINT}/${userName}`)
  },
  getUserList: () => {
    return request(`${END_POINT}/users`)
  },
  addTodo: (userName, todoContent) => {
    return request(`${END_POINT}/${userName}`, options.post(todoContent))
  },
  deleteTodo: (userName, todoId) => {
    return request(`${END_POINT}/${userName}/${todoId}`, options.delete())
  },
  toggleTodo: (userName, todoId) => {
    return request(`${END_POINT}/${userName}/${todoId}/toggle`, options.put())
  },
}
