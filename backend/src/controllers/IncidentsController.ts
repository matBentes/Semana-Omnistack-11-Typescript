import { Request, Response } from 'express'
import connection from '../database/connection'

export async function index (request: Request, response: Response) {
  try {
    const { page = 1 } = request.query

    const [count] = await connection('incidents')
    .count()
    
    const incidents = await connection('incidents')
    .select([
      'incidents.*',
      'ongs.name',
      'ongs.email',
      'ongs.whatsapp',
      'ongs.city',
      'ongs.uf'
    ])
    .limit(5)
    .offset((page - 1) * 5)
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')

    response.header('X-Total-Count', count['count(*)'])
    return response.json(incidents)

  } catch (error) {
    console.log('index error: ', error)
  }
}

export async function store (request: Request, response: Response) {
  try {
    
    const { title, description, value } = request.body 
    
    const ong_id = request.headers.authorization

    const [id] = await connection('incidents').insert({
      title, 
      description, 
      value,
      ong_id
    })

    return response.json({ id })

  } catch (Error) {
    console.error('incidents store: ', Error)
  }
}

export async function remove (request: Request, response: Response) {
  try {
    const { id } = request.params

    const ong_id = request.headers.authorization
    
    const incident = await connection('incidents')
    .where('id', id)
    .select('ong_id', 'title')
    .first()
        
    if (!incident) {
      return response.status(404).json({
        msg: 'incident not found'
      })
    }

    if (incident.ong_id !== ong_id) {
      return response.status(401).json({
        error: 'Operation not allowed'
      })
    } 

    await connection('incidents')
    .where('id', id)
    .delete()
    
    response.json({msg: `incident: ${incident.title} removed`})

  } catch(error) {
    console.error('remove error: ', error)
  }
}