// Workflow 
// url : http://localhost:3000/api/{modules}
// modules : auth - users - customers - insured-object
// Steps
// 1. Register and login
// 2. Create user app to manage customers 
// 2.1 Check roles and permissions
// 3. Dev crud customers with user agent
// 4. Dev crud insured objects with user agent

import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'

describe('Workflow E2E', () => {
    let app: INestApplication
    let server: any
    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()
        app = moduleFixture.createNestApplication()
        await app.init()
        server = app.getHttpServer()
        await import('../src/database/seed/seed')
    })
    afterAll(async () => await app.close())

    it('should run full workflow: SUPER_ADMIN', async () => {
        const req = await request(server)
            .post('/api/auth/signin')
            .send({
                "email": "superadmin@example.com",
                "password": "superadmin123"
            })
        console.log(req.body)
    })
})
