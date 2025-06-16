import { jwtDecode } from 'jwt-decode'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { AuthStoreDto, UseAuthStore } from './auth.type'

const init = {
  id: 0,
  email: '',
  username: '',
  exp: 0,
  role: {
    name: '',
    id: 0
  },
  iat: 0,
  lastname: ''
} as AuthStoreDto

export const useAuthStore = create(
  persist<UseAuthStore>(
    (set, get) => ({
      _userData: init,
      _token: '',
      getToken: () => (get() as any)._token,
      isLoggedIn: () => (get() as any)._userData.id !== 0,
      getUserData: () => (get() as any)._userData,
      login: (token: string) => {
        set((state: any) => {
          return { ...state, _token: token, _userData: jwtDecode<AuthStoreDto>(token) }
        })
      },
      logout: () => {
        set((state: any) => ({ ...state, _userData: init }))
      }
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
