export default {
  registration(user: any): Promise<any> {
    return useApiFetch('/auth/registration', { method: 'POST', body: user })
  },
  registerStudent(user: any): Promise<any> {
    return useApiFetch('/auth/register-student', { method: 'POST', body: user })
  },
  login(email: string, password: string): Promise<any> {
    return useApiFetch('/auth/login', { method: 'POST', body: { email, password } })
  },
  refresh(): Promise<any> {
    return useApiFetch('/auth/refresh', { method: 'GET' })
  },
  logout(): Promise<any> {
    return useApiFetch('/auth/logout', { method: 'POST' })
  },
  updateUser(user: any): Promise<any> {
    return useApiFetch('/auth/update', { method: 'POST', body: { user } })
  },
  sendResetLink(email: string) {
    return useApiFetch('/auth/send-reset-link', {
      method: 'POST',
      body: { email }
    })
  },
  resetPassword(password: string, userId: string, token: string) {    
    return useApiFetch('/auth/reset-password', {
      method: 'POST',
      body: { password, userId, token }
    })
  },
}