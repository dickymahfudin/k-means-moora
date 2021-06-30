const perhitungan = (datas, kriteria) => {
  const tempKatagoris = Object.keys(datas[0]);
  const katagoris = tempKatagoris.filter(e => e != 'name');
  const tempCentroid1 = Object.values(datas[0]);
  const tempCentroid2 = Object.values(datas[1]);
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  const sumKatagori = (arr, param) => {
    const matrix = arr.map(val => val[param]);
    const sum = +(matrix.reduce(reducer) / arr.length).toFixed(3);
    const latex = matrix.join('+');
    return { latex, sum };
  };

  const jarak = centroid => {
    const result = datas.map((petani, index) => {
      let test = [];
      let stringLatex = [];
      katagoris.forEach((katagori, i) => {
        const pow = Math.pow(centroid[i] - petani[katagori], 2);
        stringLatex.push(`(${centroid[i]}-${petani[katagori]}^2)`);
        test.push(pow);
      });
      const sum = test.reduce(reducer);
      const sqrt = +Math.sqrt(sum).toFixed(3);
      return { latex: stringLatex.join('+'), sqrt };
    });

    return result;
  };

  const pengelompokan = (jarak1, jarak2) => {
    let klaster1 = [];
    let klaster2 = [];
    for (let i = 0; i < jarak1.length; i++) {
      if (jarak1[i]['sqrt'] < jarak2[i]['sqrt']) {
        klaster1.push(i + 1);
      } else {
        klaster2.push(i + 1);
      }
    }
    return { klaster1, klaster2 };
  };

  const centroid = klasters => {
    const klaster = klasters.map(klaster => datas[klaster - 1]);
    const centroid = katagoris.map((katagori, i) => {
      return sumKatagori(klaster, katagori);
    });
    return centroid;
  };

  const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  const kMeans = length => {
    const arr = new Array(length);
    let c1 = [...tempCentroid1];
    let c2 = [...tempCentroid2];
    let tempC1;
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      if (!equals(c1, tempC1)) {
        const jarak1 = jarak(c1);
        const jarak2 = jarak(c2);
        const kmeanJarak = { jarak1, jarak2 };
        const pengulangan = pengelompokan(jarak1, jarak2);
        const centroidBaru1 = centroid(pengulangan.klaster1);
        const centroiNew1 = centroidBaru1.map(e => e.sum);
        const centroidBaru2 = centroid(pengulangan.klaster2);
        const centroiNew2 = centroidBaru2.map(e => e.sum);
        result.push({ kmeanJarak, pengulangan, centroidBaru1, centroidBaru2, centroiNew1, centroiNew2 });
        tempC1 = [...c1];
        c1 = [...centroiNew1];
      } else {
        break;
      }
    }
    return result;
  };

  const moora = datas => {
    const sumPow = (arr, param, criteria) => {
      const matrix = arr.map(val => val[param]);
      const sum = +Math.sqrt(matrix.reduce((acc, val) => acc + Math.pow(val, 2), 0)).toFixed(3);
      const perhitungan1 = matrix.map(val => +(val / sum).toFixed(3));

      const ternormalisasi = perhitungan1.map(val => +(val * criteria).toFixed(3));
      return {
        matrixString: matrix.join('^2+'),
        matrix,
        sum,
        perhitungan1,
        ternormalisasi,
      };
    };

    const data = datas.map(data => {
      const array = Object.values(data);
      return array;
    });
    const matrix1 = data.map(matrix => {
      return matrix.join('&');
    });
    const matrixD = kriteria.map(criteria => {
      return sumPow(datas, criteria.name, criteria.bobot);
    });
    const lengthI = matrixD[0].ternormalisasi.length;
    const lengthJ = matrixD.length;
    const newMatrixTernormalisasi = new Array(lengthI).fill(0).map(() => new Array(lengthJ).fill(0));
    const newMatrixPerhitungan1 = new Array(lengthI).fill(0).map(() => new Array(lengthJ).fill(0));
    matrixD.forEach((el, i) => {
      el.ternormalisasi.forEach((element, j) => {
        newMatrixTernormalisasi[j][i] = element;
      });
      el.perhitungan1.forEach((element, j) => {
        newMatrixPerhitungan1[j][i] = element;
      });
    });
    const matrix2 = newMatrixPerhitungan1.map(matrix => {
      return matrix.join('&');
    });
    const matrix3 = newMatrixTernormalisasi.map(matrix => {
      return matrix.join('&');
    });
    const y = newMatrixTernormalisasi.map(e => (e.slice(0, e.length - 1).reduce(reducer) - e[e.length - 1]).toFixed(3));

    return {
      matrix1: matrix1.join('\\\\'),
      matrix2: matrix2.join('\\\\'),
      matrix3: matrix3.join('\\\\'),
      perhitungan: matrixD,
      y,
    };
  };
  const kmeans = kMeans(10);
  const klaster = kmeans[kmeans.length - 1].pengulangan;
  const mooraKlaster1 = moora(klaster.klaster1.map((e, i) => datas[e - 1]));
  const mooraKlaster2 = moora(klaster.klaster2.map((e, i) => datas[e - 1]));
  const result = { kMeans: kMeans(10), mooraKlaster1, mooraKlaster2 };
  return result;
};

module.exports = perhitungan;
