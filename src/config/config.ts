export const EnvironmentsVariables = {
    PORT: parseInt(process.env.PORT, 10) || 3000,
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h',
    DATABASE_URL: process.env.DATABASE_URL || 'postgres://postgres:123@localhost:5432/mydb',
}