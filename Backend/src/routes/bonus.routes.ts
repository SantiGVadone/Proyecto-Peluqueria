import { Router } from "express"
import * as BonusController from '../controllers/bonus.controller'

const router = Router()

// routes for Bonus

// Get all Bonus
router.get('/', BonusController.getAllBonusController)

//Get a Bonus by ID
router.get('/:id',BonusController.getBonusByIdController)

//Get all Bonus by Employee ID
router.get('/employee/:id',BonusController.getBonusByEmployeeIdController)

// Create a new Bonus
router.post('/',BonusController.createBonusController)

// Update an existing Bonus
router.patch('/:id',BonusController.updateBonusController)

// Delete a Bonus
router.delete('/:id',BonusController.deleteBonusController)

export default router