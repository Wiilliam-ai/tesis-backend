import { PrismaClient } from '@prisma/client'
import { createObjectCsvWriter } from 'csv-writer'

const prisma = new PrismaClient()

interface IViewUsersGlucose {
  id: string
  glucose_level: number
  age: number
  weight: number
  height: number
  fasting: number
}

interface IViewUsersGlucoseAvg {
  id: string
  name: string
  age: number
  weight: number
  height: number
  Fasting: number
  Promedio: number
}

async function usersGlucose() {
  const result = await prisma.$queryRaw`SELECT * FROM view_users_clucose`
  const data = result as IViewUsersGlucose[]
  return data
}

async function usersGlucoseAvg() {
  const result = await prisma.$queryRaw`SELECT * FROM view_users_clucose_avg`
  const data = result as IViewUsersGlucoseAvg[]
  console.log(data)
  return data
}

async function writeCsvGlucose(data: IViewUsersGlucose[]) {
  const csvWriter = createObjectCsvWriter({
    path: 'users_glucose.csv', // Ruta del archivo CSV
    header: [
      { id: 'id', title: 'userId' },
      { id: 'glucose_level', title: 'glucose_level' },
      { id: 'age', title: 'age' },
      { id: 'weight', title: 'weight' },
      { id: 'height', title: 'height' },
      { id: 'fasting', title: 'fasting' },
    ],
  })

  await csvWriter.writeRecords(data)
  console.log('CSV file was written successfully')
}

async function writeCsvGlucoseAvg(data: IViewUsersGlucoseAvg[]) {
  const csvWriter = createObjectCsvWriter({
    path: 'users_glucose_avg.csv', // Ruta del archivo CSV
    header: [
      { id: 'id', title: 'userId' },
      { id: 'name', title: 'name' },
      { id: 'age', title: 'age' },
      { id: 'weight', title: 'weight' },
      { id: 'height', title: 'height' },
      { id: 'Fasting', title: 'fasting' },
      { id: 'Promedio', title: 'promedio' },
    ],
  })
  await csvWriter.writeRecords(data)
  console.log('CSV file was written successfully')
}

;(async () => {
  try {
    // const data = await usersGlucose()
    // await writeCsvGlucose(data) // Llamar a la función para escribir el CSV

    const dataAvg = await usersGlucoseAvg()
    await writeCsvGlucoseAvg(dataAvg) // Llamar a la función para escribir el CSV
  } catch (e) {
    console.error(e)
  } finally {
    await prisma.$disconnect()
  }
})()
