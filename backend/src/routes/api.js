import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ msg: 'this is api route' });
});

router.use('*', (req, res) => {
  res.json({ msg: 'any api is not found' });
});

export default router;
