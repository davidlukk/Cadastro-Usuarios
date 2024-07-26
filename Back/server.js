import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())

const users = []

app.get('/users', async (req, res) => {
  let users = []

  if (req.query) {
     users = await prisma.user.findMany ({
      where: {
        name: req.query.name,
        email: req.query.email,
        age: req.query.age
      }
     })
  } else {
    users = users = await prisma.user.findMany 
  }
  return res.json(users)
})

app.post('/users', async (req, res) => {
  await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age
    },
  })

  res.status(201).json({ message: 'Usuário criado com Sucesso!' })
})

app.put('/users/:id', async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id
    },
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age
    },
  })

  res.status(201).json(req.body)
})

app.delete('/users/:id', async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id
    }
  })

  res.status(200).json({ message: "Usuário deletado com Sucesso!" })
})

app.listen(3000)


async function main() {
  // ... you will write your Prisma Client queries here
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

// luccadavid07
// BRtkTLAIeHArx5tM