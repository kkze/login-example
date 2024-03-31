export interface LoginRequestData {
    /** admin 或 editor */
    username: "admin" | "editor"
    /** 密码 */
    password: string
  }

export interface TasksRequestData{
    name: string,
    task_type: 'single' | 'repeat',
    start_time?: string | '',
    schedule?: 'daily'|'hourly'|'minutely'|'monthly'|'weekly'|'',
    execute_type: 'immediate'|'scheduled',
}