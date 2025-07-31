import express from 'express';
import { search } from '../controllers/searchController.js';

const router = express.Router();

router.post('/', (req, res, next) => {
  search(req, res, next);
});

export default router; 