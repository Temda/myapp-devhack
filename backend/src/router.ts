import { Router } from 'express'
import createList from './controllers/createList'
import createListAll from './controllers/createListAll'
import deletteList from './controllers/deletteList'
import updateList from './controllers/updateList'
import itemsList from './controllers/itemsList'

const router = Router()

router.post('/create-list', createList)
router.get('/create-list-all', createListAll)
router.get('/items-list/:id', itemsList)
router.delete('/delete-list/:id', deletteList)
router.put('/update-list/:id', updateList)





export default router