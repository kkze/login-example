export interface LoginRequestData {
    /** admin 或 editor */
    username: "admin" | "editor"
    /** 密码 */
    password: string
  }
