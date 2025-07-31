// routes/newsRoutes.js
import express from 'express';
import { getNewsByCategory } from '../controllers/newsController.js';

const router = express.Router();

router.get('/category/:category', getNewsByCategory);

export default router;