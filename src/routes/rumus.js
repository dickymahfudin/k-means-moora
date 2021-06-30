const express = require('express');
const dataFormat = require('../helpers/dataFormat');
const group = require('../helpers/group');
const hitung = require('../helpers/hitung');
const router = express.Router();
const jsonToTable = require('../helpers/jsonToTable');
const { kriteria, petani } = require('../models');

router.get('/', async (req, res, next) => {
  const user_id = 1;
  const exclude = ['id', 'user_id', 'createdAt', 'updatedAt'];
  const tempPetanis = await petani.findAll({
    where: { user_id },
    attributes: { exclude: [...exclude, 'name'] },
    order: [['id', 'ASC']],
  });
  const tempKriterias = await kriteria.findAll({ where: { user_id }, attributes: { exclude }, order: [['id', 'ASC']] });
  const petanis = tempPetanis.map(e => e.dataValues);
  const kriterias = tempKriterias.map(e => e.dataValues);
  const rumus = hitung(petanis, kriterias);
  res.render('perhitungan', { title: 'Rumus', rumus });
});

router.get('/rumus', async (req, res, next) => {
  const user_id = 1;
  const exclude = ['id', 'user_id', 'createdAt', 'updatedAt'];
  const tempPetanis = await petani.findAll({
    where: { user_id },
    attributes: { exclude: [...exclude, 'name'] },
    order: [['id', 'ASC']],
  });
  const tempKriterias = await kriteria.findAll({ where: { user_id }, attributes: { exclude }, order: [['id', 'ASC']] });
  const petanis = tempPetanis.map(e => e.dataValues);
  const kriterias = tempKriterias.map(e => e.dataValues);
  return res.json(hitung(petanis, kriterias));
});

module.exports = router;
