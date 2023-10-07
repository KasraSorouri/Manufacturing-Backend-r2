import express from 'express';

import loginController from '../controllers/login';

const router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/',loginController.login);

export default router;