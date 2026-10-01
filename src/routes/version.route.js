import express from 'express';
const router = express.Router();

router.get('/version', (req, res) => {
  res.json({
    version: "1.0.0",
    name: "DevOps Lab API",
    timestamp: new Date()
  });
});

export default router;
