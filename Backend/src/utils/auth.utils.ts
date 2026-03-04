import bcrypt from "bcrypt"

const SALT_ROUNDS = 10 //esto es la cantidad de vueltas que se hashea la pass por asi decirlo

export const hashPassword = async (plainPassword: string) : Promise<string> => {
    return bcrypt.hash(plainPassword, SALT_ROUNDS)
}

export const comparePassword = async (
    plainPassword: string,
    hashedPassword: string
): Promise<boolean> => {
    return bcrypt.compare(plainPassword,hashedPassword)
}