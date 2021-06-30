const katagori = [
  {
    name: 'Luas Lahan',
    db: 'lahan',
    subs: [
      { name: '1m-500m', value: 1, selected: false },
      { name: '15000m-20.000m', value: 2, selected: false },
    ],
  },
  {
    name: 'Status kepemilikan Lahan',
    db: 'kepemilikan',
    subs: [
      { name: 'Sewa', value: 1, selected: false },
      { name: 'Milik Pribadi', value: 2, selected: false },
    ],
  },
  {
    name: 'Dokumentasi Pribadi',
    db: 'dokumentasi',
    subs: [
      { name: 'Bukti Sewa, Bukti Setoran Pajak Tanah', value: 1, selected: false },
      { name: 'Tanda Kepemilikan Tanah,Bukti Setoran Pajak Tanah', value: 2, selected: false },
    ],
  },
  {
    name: 'Kondisi Ekonomi',
    db: 'ekonomi',
    subs: [
      { name: 'Tidak Mampu', value: 1, selected: false },
      { name: 'Mampu ', value: 2, selected: false },
      { name: 'Tidak Mampu ', value: 3, selected: false },
    ],
  },
  {
    name: 'Tingkat Keberhasilan Panen',
    db: 'panen',
    subs: [
      { name: 'Gagal', value: 1, selected: false },
      { name: 'Kurang Berhasil ', value: 2, selected: false },
      { name: 'Berhasil', value: 3, selected: false },
    ],
  },
  {
    name: 'Jenis Bantuan',
    db: 'bantuan',
    subs: [
      { name: 'Pupuk Bansos', value: 1, selected: false },
      { name: 'Pupuk ', value: 2, selected: false },
    ],
  },
];

module.exports = katagori;
