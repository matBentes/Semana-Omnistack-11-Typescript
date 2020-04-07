import { Request, Response } from 'express'
import connection from '../database/connection'

export async function index (request: Request, response: Response) {
  try {
    
    const ong_id = request.headers.authorization

    if(!ong_id) {
      return response.status(404).json({
        msg: 'no ID provide in request'
      })
    }

    const incidents = await connection('incidents')
    .where('ong_id', ong_id)
    .select('*')

    return response.json(incidents)

  } catch(error) {
    console.error(error)
  }
}