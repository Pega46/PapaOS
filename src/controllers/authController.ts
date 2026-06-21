import { getAdminSession, loginAdmin, logoutAdmin } from '../services/authService'

export const authController = {
  getSession: getAdminSession,
  login: loginAdmin,
  logout: logoutAdmin,
}
