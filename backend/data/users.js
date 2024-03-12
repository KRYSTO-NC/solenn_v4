import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Compte Admin',
    lastname: 'admin',
    email: 'admin@mail.com',
    role: 'Responsable',
    password: bcrypt.hashSync('So123456!', 10),
    isAdmin: true,
  },
  {
    name: 'Compte user',
    lastname: 'user',
    email: 'user@mail.com',
    role: 'User',
    password: bcrypt.hashSync('So123456!', 10),
  },
  {
    name: 'Compte commercial',
    lastname: 'commercial',
    email: 'commercial@mail.com',
    role: 'Commercial',
    password: bcrypt.hashSync('So123456!', 10),
  },
  {
    name: 'Compte installateur',
    lastname: 'Insatallateur',
    email: 'installateur@mail.com',
    role: 'Installateur',
    password: bcrypt.hashSync('So123456!', 10),
  },

  {
    name: 'Compte Responsable',
    lastname: 'Responsable',
    email: 'responsable@mail.com',
    role: 'Responsable',
    password: bcrypt.hashSync('So123456!', 10),
  },
]

export default users
