const express = require('express');
const router = express.Router();
const { kriteria } = require('../models');
const { kriteriaTable } = require('../helpers/jsonToTable');

router.get('/', (req, res, next) => {
  res.render('kriteria/index', { title: 'Kriteria' });
});

router.get('/table', async (req, res, next) => {
  //   const user_id = req.session.userId;
  const user_id = 1;
  const exclude = ['createdAt', 'updatedAt'];
  const kriterias = await kriteria.findAll({ where: { user_id }, attributes: { exclude }, order: [['id', 'ASC']] });
  res.json(kriteriaTable(kriterias, 'dataValues'));
});

router.post('/', async (req, res, next) => {
  //   const user_id = req.session.userId;
  const user_id = 1;
  const { name, bobot } = req.body;
  const findKriteria = await kriteria.findOne({ where: { name } });
  if (findKriteria) {
    req.flash('error', 'Nama Kriteria Sudah Aada');
    return res.redirect('/kriteria');
  }
  req.flash('success', 'Data Berhasil ditambahkan');
  await kriteria.create({ user_id, name, bobot });
  return res.redirect('/kriteria');
});

router.post('/:id', async (req, res, next) => {
  //   const user_id = req.session.userId;
  const user_id = 1;
  const { id } = req.params;
  const { name, bobot } = req.body;
  await kriteria.update({ name, bobot }, { where: { user_id, id } });
  req.flash('success', 'Data Berhasil diubah');
  return res.redirect('/kriteria');
});

router.get('/form', (req, res, next) => {
  const value = { name: '', bobot: '' };
  res.render('kriteria/form', { title: 'Kriteria', action: '/kriteria', value });
});

router.get('/form/:id', async (req, res, next) => {
  //   const user_id = req.session.userId;
  const user_id = 1;
  const { id } = req.params;
  const exclude = ['createdAt', 'updatedAt'];
  const value = await kriteria.findOne({ where: { user_id, id }, attributes: { exclude } });
  res.render('kriteria/form', { title: 'Kriteria', action: `/kriteria/${id}`, value });
});

router.get('/delete/:id', async (req, res, next) => {
  const id = req.params.id;
  const tempKriteria = await kriteria.findByPk(id);
  await tempKriteria.destroy();
  req.flash('success', 'Data Berhasil Dihapus');
  return res.redirect('/kriteria');
});

module.exports = router;
