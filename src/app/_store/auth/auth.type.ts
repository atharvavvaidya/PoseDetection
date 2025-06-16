export interface AuthStoreDto {
  id: number
  email: string
  lastname: string
  role: {
    id: number
    name: string
  }
  iat: number
  exp: number
}

export interface UseAuthStore {
  _token: string
  _userData: AuthStoreDto
  isLoggedIn: () => boolean
  getUserData: () => AuthStoreDto
  getToken: () => string
  login: (token: string) => void
  logout: () => void
}
