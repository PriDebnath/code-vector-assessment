import { users } from "@/feature/user/model";

export const table = {
    users,
} as const

export type Table = typeof table

export { 
    users 
}  // drizzle look at it to maintain migration