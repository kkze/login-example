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

export interface TasksData{
    execute_type: "scheduled"|'immediate',
    id: number,
    name: string,
    last_run?: string,
    next_run?: string,
    schedule?: "minutely"|'hourly'|'daily'|'weekly'|'monthly'|'',
    start_time?: string,
    status?: "running"|"stopped"|"completed",
    task_type: "repeat"|'single',
}