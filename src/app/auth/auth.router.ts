import { redirect } from 'react-router'
import { AuthRouterType } from './_types/router.type'
import { SignInPage } from './sign-in/sign-in.page'
import { SignUpPage } from './sign-up/sign-up.page'

export const AuthRoutes = [
  { index: true, loader: () => redirect(AuthRouterType.SIGN_IN) },
  { path: AuthRouterType.SIGN_IN, Component: SignInPage },
  { path: AuthRouterType.SIGN_UP, Component: SignUpPage }
]
