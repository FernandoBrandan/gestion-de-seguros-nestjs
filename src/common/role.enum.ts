export enum typeRole {
    AGENTE = 'AGENTE',             // Vende seguros
    SUPERVISOR = 'SUPERVISOR',     // Supervisa agentes  
    ADMIN = 'ADMIN',               // Gestión sistema
    SUPER_ADMIN = 'SUPER_ADMIN'    // Control total
}


type Role = "admin" | "user" | "guest"
const permissions: Record<Role, string[]> = {
    admin: ["read", "write", "delete"],
    user: ["read", "write"],
    guest: ["read"]
}
