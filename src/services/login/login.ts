import xjRequest from '..'
import { IAccount, ILoginResult, IDataType } from './type'

enum LoginApi {
  AccountLogin = '/login',
  LoginUserInfo = '/user/',
  UserMenus = '/role/'
}

export function accountLogin(account: IAccount) {
  return xjRequest.post<IDataType<ILoginResult>>({
    url: LoginApi.AccountLogin,
    data: account
  })
}
export function requestUserInfoById(id: number) {
  return xjRequest.get<IDataType>({
    url: LoginApi.LoginUserInfo + id
  })
}

export function requestUserMenusByRoleId(id: number) {
  return xjRequest.get<IDataType>({
    url: LoginApi.UserMenus + id + '/menu'
  })
}
