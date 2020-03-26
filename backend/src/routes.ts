import { Router, Request, Response } from 'express'
import * as OngController from './controllers/OngController' 
import * as IncidenteController from './controllers/IncidentsController'
import * as ProfileControler from './controllers/ProfileController'
import * as SessionCrontoller from './controllers/SessionController'

const routes = Router()

routes.get('/ongs', OngController.index)
routes.post('/ongs', OngController.store)

routes.post('/incidents', IncidenteController.store)
routes.get('/incidents', IncidenteController.index)
routes.delete('/incidents/:id', IncidenteController.remove)

routes.get('/profile', ProfileControler.index)

routes.post('/session', SessionCrontoller.store)
 
export default routes

/**
 * npx tsc --init --rootDir src --outDir build \
--esModuleInterop --resolveJsonModule --lib es6 \
--module commonjs --allowJs true --noImplicitAny true
 */