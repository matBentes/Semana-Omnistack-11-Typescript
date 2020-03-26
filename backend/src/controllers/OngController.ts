import { Request, Response } from 'express'
import crypto from 'crypto' 
import connection from '../database/connection'

export async function index (request: Request, response: Response) {
  try {
    const ongs = await connection('ongs').select('*')

    return response.json({
      ongs: ongs,
    }) 

  } catch(error) {
    console.error('error: ', error)
  }
}

export async function store (request: Request, response: Response) {
  try {
    const { name, email, whatsapp, city, uf } = request.body
  
    console.log(request.body)
  
    const id = crypto.randomBytes(4).toString('HEX')
    
    const ong = await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    })

    response.json({ id, ong})

  } catch (Error) {
    console.error('create error: ', Error)
  }
}

// export { create }  


/* export default -> import 'corpoDaFuncao' from '.ts' */
/* export -> import { nomeDaFuncao } from '.ts' */ 