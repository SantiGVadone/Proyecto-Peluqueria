export interface Bonus {
    id: number 
    amount: number
    description?: string 
    employeeId: number
    createdAt: Date | string
}

export type CreateBonusDTO = Omit < Bonus , 'id'>

export type UpdateBonusDTO = Partial<CreateBonusDTO> 