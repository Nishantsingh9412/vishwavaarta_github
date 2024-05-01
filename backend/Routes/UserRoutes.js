import express from 'express'
import { registerUser ,loginUser, allUsers , updateLang } from '../Controllers/usersControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router =  express.Router();


router.post('/register',registerUser)
router.post('/login',loginUser)

router.patch('/updateLang',updateLang)

router.get('/', protect, allUsers);

export default router;