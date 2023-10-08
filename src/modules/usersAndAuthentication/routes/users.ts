import express from 'express';

import userControllers from '../controllers/users';
import { tokenExtractor, roleAuthority } from '../utils/midwares';

const router = express.Router();

// Get Users
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', userControllers.getAllUsers);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', userControllers.getUser);

// Create User
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', tokenExtractor, roleAuthority(['ADMIN']), userControllers.addUser);

// Edit User
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:id', tokenExtractor, roleAuthority(['ADMIN']), userControllers.editUser);


export default router;