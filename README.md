# Diamond-Square Generator

## Heightmap generator based on the Diamond-Square algorithm

### Installation

`npm install diamond-square-generator --save`

### Usage

#### Base

```js
import {
  DsMap,
} from 'diamond-square-generator';

const size = 8; // Real size of the map = 2^size
const height = 255; // Max height of the map
const roughness = 128; // Base roughness of the map

const map = new DsMap(size, {
  height,
  roughness,
});

map.calculate();
```

#### Randomizer

Before starting the calculation, run `seed(string seed, bool xor4096=false)` to use a specific seed

```js
map.seed('6641471', true); // If the second argument is true, then the xor4096 randomizer is used
map.calculate();
```

#### Normalizer

Due to the addition of random noise to each map point, some points may go beyond the maximum height or, conversely, not reach it (or zero)

To bring the minimum height to zero and the maximum to a given height, use `normalize(number height=1)`, after calculating

```js
map.calculate();
map.normalize(32);
```

#### Heightmap

After calculation, the `data` property contains a two-dimensional array of heights

```js
map.calculate();
map.normalize();
console.log(map.data);
```
