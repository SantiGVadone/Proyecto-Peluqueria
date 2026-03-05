import { Router } from "express"
import * as BonusController from '../controllers/bonus.controller'
import { validateBody } from "../middlewares/validate.middlewares"
import { bonusSchema, updateBonusSchema } from "../schemas/bonus.schemas"
import { authRequired } from "../middlewares/auth.middlewares"
import { checkRole } from "../middlewares/role.middlewares"

const router = Router()

// routes for Bonus

// Get all Bonus
router.get('/',authRequired, checkRole(['ADMIN','BOSS']) ,BonusController.getAllBonusController)

//Get a Bonus by ID
router.get('/:id',authRequired, checkRole(['ADMIN','BOSS']) ,BonusController.getBonusByIdController)

//Get all Bonus by Employee ID
router.get('/employee/:id',authRequired, checkRole(['ADMIN','BOSS', 'EMPLOYEE']) ,BonusController.getBonusByEmployeeIdController)

// Create a new Bonus
router.post('/',authRequired, checkRole(['ADMIN','BOSS']) ,validateBody(bonusSchema) ,BonusController.createBonusController)

// Update an existing Bonus
router.patch('/:id',authRequired, checkRole(['ADMIN','BOSS']) ,validateBody(updateBonusSchema) ,BonusController.updateBonusController)

// Delete a Bonus
router.delete('/:id',authRequired, checkRole(['ADMIN','BOSS']) ,BonusController.deleteBonusController)

export default router