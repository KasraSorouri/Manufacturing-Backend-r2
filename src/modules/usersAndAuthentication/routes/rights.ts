import express from 'express';

import rightControllers from '../controllers/rights';
import { tokenExtractor, roleAuthority } from '../utils/midwares';

const router = express.Router();

// Get Rights
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', rightControllers.getAllRights);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', rightControllers.getRight);

// Create Right
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', tokenExtractor, roleAuthority(['ADMIN']), rightControllers.addRight);

// Edit Right
//router.put('/:id', tokenExtractor, rightAuthority(['ADMIN']), rightControllers.editRight);

export default router;