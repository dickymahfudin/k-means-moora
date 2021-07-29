const katagori = require('./katagori');

const petaniTable = (data, param = null) => {
  let result = { data: [], columns: [] };
  result.columns.push({ data: 'no', title: 'NO' });
  const key = param ? data[0][param] : data[0];
  Object.keys(key).forEach(el => {
    if (el != 'id' && el != 'user_id' && el != 'bantuan') {
      result.columns.push({ data: el, title: el.toUpperCase() });
    }
  });
  result.data = data.map((e, i) => {
    const newData = param ? e[param] : e;
    Object.keys(key).forEach(el => {
      if (el != 'id' && el != 'user_id' && el != 'name' && el != 'y') {
        const tempFind = katagori.find(tfn => tfn.db == el);
        return (e[el] = tempFind.subs.find(fn => fn.value == e[el]).name);
      }
    });
    return { ...newData, no: (i += 1) };
  });
  return result;
};

const kriteriaTable = (data, param = null) => {
  let result = { data: [], columns: [] };
  result.columns.push({ data: 'no', title: 'NO' });
  const key = param ? data[0][param] : data[0];
  Object.keys(key).forEach(el => {
    if (el != 'id' && el != 'user_id') {
      result.columns.push({ data: el, title: el.toUpperCase() });
    }
  });
  result.data = data.map((e, i) => {
    const newData = param ? e[param] : e;
    return { ...newData, no: (i += 1) };
  });
  return result;
};

module.exports = { petaniTable, kriteriaTable };
