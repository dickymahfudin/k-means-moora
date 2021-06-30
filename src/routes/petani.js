const express = require('express');
const router = express.Router();
const katagoris = require('../helpers/katagori');
const { petani } = require('../models');
const { petaniTable } = require('../helpers/jsonToTable');

router.get('/', (req, res, next) => {
  res.render('petani/index', { title: 'Petani' });
});

router.get('/table', async (req, res, next) => {
  //   const user_id = req.session.userId;
  const user_id = 1;
  const exclude = ['password', 'createdAt', 'updatedAt'];
  const petanis = await petani.findAll({ where: { user_id }, attributes: { exclude }, order: [['id', 'ASC']] });
  res.json(petaniTable(petanis, 'dataValues'));
});

router.post('/', async (req, res, next) => {
  //   const user_id = req.session.userId;
  const user_id = 1;
  const { name, lahan, kepemilikan, dokumentasi, ekonomi, panen, bantuan } = req.body;
  const findPetani = await petani.findOne({ where: { name } });
  if (findPetani) {
    req.flash('error', 'Nama Petani Sudah Aada');
    return res.redirect('/petani');
  }
  req.flash('success', 'Data Berhasil ditambahkan');
  await petani.create({ user_id, name, lahan, kepemilikan, dokumentasi, ekonomi, panen, bantuan });
  return res.redirect('/petani');
});

router.post('/:id', async (req, res, next) => {
  //   const user_id = req.session.userId;
  const user_id = 1;
  const { id } = req.params;
  const { name, lahan, kepemilikan, dokumentasi, ekonomi, panen, bantuan } = req.body;
  await petani.update({ name, lahan, kepemilikan, dokumentasi, ekonomi, panen, bantuan }, { where: { user_id, id } });
  req.flash('success', 'Data Berhasil diubah');
  return res.redirect('/petani');
});

router.get('/form', (req, res, next) => {
  const valName = '';
  res.render('petani/form', { title: 'Petani', action: '/petani', valName, katagoris });
});

router.get('/form/:id', async (req, res, next) => {
  //   const user_id = req.session.userId;
  const user_id = 1;
  const { id } = req.params;
  const exclude = ['password', 'createdAt', 'updatedAt'];
  const findPetani = await petani.findOne({ where: { user_id, id }, attributes: { exclude } });
  const valName = findPetani.name;
  Object.keys(findPetani.dataValues).forEach(el => {
    if (el != 'id' && el != 'user_id' && el != 'name') {
      const tempFind = katagoris.find(tfn => tfn.db == el);
      return (tempFind.subs.find(fn => fn.value == findPetani[el]).selected = true);
    }
  });
  res.render('petani/form', { title: 'Petani', action: `/petani/${id}`, valName, katagoris });
});

router.get('/delete/:id', async (req, res, next) => {
  const id = req.params.id;
  const temppetani = await petani.findByPk(id);
  await temppetani.destroy();
  req.flash('success', 'Data Berhasil Dihapus');
  return res.redirect('/petani');
});

module.exports = router;
