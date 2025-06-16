import { useAuthStore } from '@/app/_store/auth/auth.store'
import { DashboardRouterType } from '@/app/dashboard/_types/router.type'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ImgLogin from '../_assets/login.svg'
import { TOKEN } from './sign-in.constant'
import type { SignInDto } from './sign-in.type'

export const SignInPage = () => {
  const store = useAuthStore()
  const navigate = useNavigate()
  const [getData, setData] = useState<SignInDto>({
    password: '',
    username: ''
  })

  const login = () => {
    const username = import.meta.env.VITE_SAMPLE_USERNAME
    const pass = import.meta.env.VITE_SAMPLE_PASSWORD

    if (getData.username == username && getData.password == pass) {
      store.login(TOKEN)
      navigate(DashboardRouterType.LIST_OF_MOTIONS)
    } else {
      toast.error('The username or password you entered is incorrect.')
    }
  }

  return (
    <>
      <p className="flex flex-col py-5 px-5 gap-y-3 justify-center items-center ext-3xl text-sm">
        <span className="capitalize font-bold text-lg mb-5 text-gray-400">sign in</span>
        <img
          className="w-24 mb-5"
          src={ImgLogin}
          alt=""
        />
        <input
          className="w-full border border-gray-200 px-3 py-2 rounded-md"
          type="text"
          value={getData.username}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              username: e.target.value
            }))
          }
          placeholder="Username ..."
        />
        <input
          className="w-full border border-gray-200 px-3 py-2 rounded-md"
          type="password"
          value={getData.password}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              password: e.target.value
            }))
          }
          placeholder="password"
        />
        <button
          onClick={login}
          className="bg-green-400 text-md w-32 text-white mt-5 rounded-md py-2 px-5">
          login
        </button>
      </p>
    </>
  )
}
