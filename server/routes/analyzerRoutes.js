import { Router } from 'express';
import { analyzeProblem } from '../controllers/analyzerController.js';

const router = Router();

// POST /api/analyze  { problem: string }  ->  full structured spec
router.post('/analyze', analyzeProblem);

export default router;
