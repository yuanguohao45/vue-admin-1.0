import cookie from 'cookie_js'

export default function getToken() {
  return cookie.get('admin_token')
}