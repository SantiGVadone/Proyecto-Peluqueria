export enum EmployeeRole {
    ADMIN = 'ADMIN',
    BOSS = 'BOSS',
    EMPLOYEE = 'EMPLOYEE'
}
export interface Employee {
    id: number
    name: string 
    lastname: string 
    phone: string 
    email?: string
    role: EmployeeRole
    commission?: number
    salary?: number
    businessId: number
    createdAt: Date | string
}

export type CreateEmployeeDTO = Omit<Employee, 'id' | 'createdAt'>

export type UpdateEmployeeDTO = Partial<CreateEmployeeDTO>