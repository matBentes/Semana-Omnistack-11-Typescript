import { Request, Response } from 'express'
import connection from '../database/connection'

export async function store (request: Request, response: Response) {
  try {
    
    const { id } = request.body
    
    const ong = await connection('ongs')
    .where('id', id)
    .select('name')
    .first()

    if (!ong) {
      return response.status(404).send({
        error: 'No ONG found with this ID'
      })
    }

    return response.json({ ong })

  } catch(error) {
    console.error('store error: ', error)
  }
}