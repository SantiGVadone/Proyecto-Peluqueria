import { CreateBonusDTO, UpdateBonusDTO } from '../interfaces/bonus.interfaces'
import { getAllBonus, getBonusById, getBonusByEmployeeId, newBonus, updateBonus, deleteBonus} from '../repository/bonus.repository'


export const getAllBonusServices = async () => {
    const result = await getAllBonus()
    return result
}

export const getBonusByIdService = async (id: number) => {
    const Bonus = await getBonusById(id)
    return Bonus
}


export const getBonusByEmployeeIdService = async (employeeId: number) => {
    const Bonus = await getBonusByEmployeeId(employeeId)
    return Bonus
}
export const createBonusService = async (data: CreateBonusDTO) => {
    //tengo que mandar los datos a la db
    const result = await newBonus(data)
    return result
}

export const updateBonusService = async (id:number , data: UpdateBonusDTO) => {
    const result = await updateBonus(id, data)
    return result
}

export const deleteBonusService = async (id:number) => {
    const result = await deleteBonus(id)
    return result
}

