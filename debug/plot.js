import Plotly from 'plotly.js-dist-min';
import DsMap from '../src/dsmap.js';

const options = {
  size: 8,
  height: 64,
  roughness: 64,
  seed: '17',
};

function $set(id, value, property = 'innerHTML') {
  const element = document.getElementById(id);

  if (element) {
    element[property] = value;
  }
}

function $setIfNot(id, value, property = 'innerHTML') {
  const element = document.getElementById(id);

  if (element && !element[property]) {
    element[property] = value;
  }
}

function drawHeightMap({
  size = 8,
  height = 64,
  roughness = 64,
  seed = '17',
}) {
  const start = new Date().getTime();
  const map = new DsMap(size, {
    height,
    roughness,
  });

  map.seed(seed, false);
  map.calculate();
  if (document.getElementById('normalize').checked) {
    map.normalize();
  }
  console.table(map.data);

  const end = new Date().getTime();

  $set('time', `Calculating time ${end - start}ms with seed ${seed}`);

  const layout = {
    title: 'Diamond-Square generator',
    autosize: false,
    width: 800,
    height: 600,
    margin: {
      l: 65,
      r: 50,
      b: 65,
      t: 90,
    },
  };

  Plotly.newPlot('map', [{
    z: map.data,
    type: 'surface',
  }], layout);
}

export const toggleSeed = () => {
  const element = document.getElementById('seed');
  console.log(element);

  if (element) {
    element.hidden = !element.hidden;
  }
};

export const calculate = (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  [...formData.entries()].forEach(([key, value]) => {
    if (key === 'seed') {
      const randomize = document.getElementById('randseed').checked;
      if (randomize) {
        options.seed = String(Math.round(Math.random() * 10000000));
      } else {
        options.seed = value ?? String(Math.round(Math.random() * 10000000));
      }
    } else if (value) {
      options[key] = Number(value);
    }
    form[key].value = options[key];
  });

  drawHeightMap(options);
};

Object.keys(options).forEach((key) => {
  $setIfNot(key, options[key], 'value');
});

if (document.getElementById('randseed').checked) {
  options.seed = String(Math.round(Math.random() * 10000000));
  const element = document.getElementById('seed');
  element.value = options.seed;
  element.hidden = true;
}

drawHeightMap(options);

export default {
  calculate,
  options,
};
