const express = require('express');
const hitung = require('../helpers/hitung');
const router = express.Router();

router.get('/', async (req, res, next) => {
  const rumus = (await hitung()).hitung;
  res.render('perhitungan', { title: 'Rumus', rumus });
});

router.get('/rumus', async (req, res, next) => {
  return res.json((await hitung()).hitung);
});

module.exports = router;
