const express = require('express');
const hitung = require('../helpers/hitung');
const { petaniTable } = require('../helpers/jsonToTable');
const router = express.Router();

router.get('/', async (req, res, next) => {
  const petanis = await (await hitung()).petanis;
  res.render('dashboard', { title: 'Dashboard', petani: petanis.length });
});

router.get('/table', async (req, res, next) => {
  const k1 = (await hitung()).hitung.table.klaster1;
  res.json(petaniTable(k1));
});

router.get('/table1', async (req, res, next) => {
  const k2 = (await hitung()).hitung.table.klaster2;
  res.json(petaniTable(k2));
});

module.exports = router;
