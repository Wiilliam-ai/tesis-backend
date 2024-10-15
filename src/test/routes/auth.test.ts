import { describe, test, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '../../app'

const apiTest = request(app)

describe('Verify apis for patient', () => {
  test('Defined route POST /api/patient/register', async () => {
    const response = await apiTest.post('/api/patient/register')

    const reponseFormatJson = response.header['content-type'].includes('json')
    expect(response.status).toBe(200)
    expect(reponseFormatJson).toBe(true)
  })

  test('Defined route PATCH /api/patient/update', async () => {
    const response = await apiTest.patch('/api/patient/update')
    const reponseFormatJson = response.header['content-type'].includes('json')
    expect(response.status).toBe(200)
    expect(reponseFormatJson).toBe(true)
  })

  test('Defined route DELETE /api/patient/delete/:id', async () => {
    const response = await apiTest.delete('/api/patient/delete/1')
    const reponseFormatJson = response.header['content-type'].includes('json')
    expect(response.status).toBe(200)
    expect(reponseFormatJson).toBe(true)
  })
})
