import { CreateBonusDTO, UpdateBonusDTO } from '../interfaces/bonus.interfaces'
import { getAllBonus, getBonusById, getBonusByEmployeeId, newBonus, updateBonus, deleteBonus} from '../repository/bonus.repository'


export const getAllBonusServices = async (business_id: number ) => {
    const result = await getAllBonus(business_id)
    return result
}

export const getBonusByIdService = async (id: number, business_id: number) => {
    const Bonus = await getBonusById(id, business_id)
    return Bonus
}


export const getBonusByEmployeeIdService = async (employeeId: number, business_id: number) => {
    const Bonus = await getBonusByEmployeeId(employeeId, business_id)
    return Bonus
}
export const createBonusService = async (data: CreateBonusDTO, business_id: number) => {
    //tengo que mandar los datos a la db
    const result = await newBonus(data, business_id)
    return result
}

export const updateBonusService = async (id:number , data: UpdateBonusDTO, business_id: number) => {
    const result = await updateBonus(id, data, business_id)
    return result
}

export const deleteBonusService = async (id: number, business_id: number) => {
    const result = await deleteBonus(id, business_id)
    return result
}

