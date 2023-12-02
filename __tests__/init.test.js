import {
  describe,
  expect,
  test,
} from '@jest/globals';
import DsMap from '../index.js';

const MAP_DEGREE = 3;
const MAP_SIZE = 8;
const MAP_HEIGHT = 4;
const MAP_ROUGHNESS = 2;

describe('Initiation tests', () => {
  test('Test base config', () => {
    const map = new DsMap(MAP_DEGREE, {
      height: MAP_HEIGHT,
      roughness: MAP_ROUGHNESS,
    });
    map.calculate();

    expect(map.size).toBe(MAP_SIZE);
    expect(map.height).toBe(MAP_HEIGHT);
    expect(map.roughness).toBe(MAP_ROUGHNESS);
  });

  test('Test without config', () => {
    const map = new DsMap(MAP_DEGREE);
    map.calculate();

    expect(map.size).toBe(MAP_SIZE);
    expect(map.height).toBe(1);
    expect(map.roughness).toBe(0.5);
  });

  test('Test normalize', () => {
    const map = new DsMap(MAP_DEGREE);
    map.calculate();
    map.normalize(50);

    const max = Math.max(...map.data.flat());
    const min = Math.min(...map.data.flat());

    expect(max).toBe(50);
    expect(min).toBe(0);
  });
});
