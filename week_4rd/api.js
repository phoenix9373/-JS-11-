const END_POINT = 'https://todo-api.roto.codes'
const DELAY_TIME = 500

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
  getTodoList: async (userName) => {
    return await request(`${END_POINT}/${userName}?delay=${DELAY_TIME}`)
  },
  getUserList: async () => {
    return await request(`${END_POINT}/users`)
  },
  addTodo: async (userName, todoContent) => {
    return await request(`${END_POINT}/${userName}`, options.post(todoContent))
  },
  deleteTodo: async (userName, todoId) => {
    return await request(`${END_POINT}/${userName}/${todoId}`, options.delete())
  },
  toggleTodo: async (userName, todoId) => {
    return await request(`${END_POINT}/${userName}/${todoId}/toggle`, options.put())
  },
}
