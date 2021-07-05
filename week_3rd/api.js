const API_BASE_URL = 'https://jjalbot.com/api/jjals'

export const getFetchImage = async (keyword) => {
  const response = await fetch(`${API_BASE_URL}?text=${keyword}`)
  const data = await response.json()

  return data
}
