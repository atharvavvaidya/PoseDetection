import { Outlet } from 'react-router'

export const AuthLayout = () => (
  <>
    <div className="flex size-full bg-gray-50 justify-center items-center">
      <div className="w-96 p-5 bg-white rounded-2xl  shadow-md">
        <Outlet></Outlet>
      </div>
    </div>
  </>
)
