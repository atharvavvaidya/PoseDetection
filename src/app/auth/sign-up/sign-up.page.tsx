import ImgLogin from '../_assets/login.svg'

export const SignUpPage = () => (
  <>
    <p className="flex flex-col py-5 px-5 gap-y-3 justify-center items-center ext-3xl text-sm">
      <h2 className="capitalize font-bold text-lg mb-5 text-gray-400">sign up</h2>
      <img
        className="w-24 mb-5"
        src={ImgLogin}
        alt=""
      />
      <input
        className="w-full border border-gray-200 px-3 py-2 rounded-md"
        type="text"
        placeholder="Username ..."
      />
      <input
        className="w-full border border-gray-200 px-3 py-2 rounded-md"
        type="text"
        placeholder="password"
      />

      <input
        className="w-full border border-gray-200 px-3 py-2 rounded-md"
        type="text"
        placeholder="confirm password"
      />

      <button className="bg-green-400 text-md w-32 text-white mt-5 rounded-md py-2 px-5">
        login
      </button>
    </p>
  </>
)
