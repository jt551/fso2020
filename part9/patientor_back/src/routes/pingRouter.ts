import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log('ping request');
  res.send('pong_');
});

export default router;
