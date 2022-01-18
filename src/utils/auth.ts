
export const getToken = (key: string): string  => {
  return localStorage.getItem(key) || ''
}

export const removeToken = (key: string): void => {
  localStorage.removeItem(key)
}