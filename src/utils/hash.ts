import bcrypt from "bcryptjs"

const rounds = 10;

export const hash = async (password: string) => {
    const salt = await bcrypt.genSalt(rounds);
    return await bcrypt.hash(password, salt);
}

export const compare = async (password: string, hashed: string) => {
    return await bcrypt.compare(password, hashed);
}