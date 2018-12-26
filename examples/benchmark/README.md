# Beidou Benchmark

=================

Keep this example here for **performance** tracing.

> Added in v1.1.0

## Benchmark

### V1.1.0

**Platform: MacOS 10.14.1, 16 GB 1600 MHz DDR3, Intel(R) Core(TM) i7-4770HQ CPU @ 2.20GHz**

- node version: v8.14.0

| Benchmark                             | Result                 |
| ------------------------------------- | ---------------------- |
| 3000+DOM(depth=3,breadth=10,repeat=3) | x 78.45 ops/sec ±3.72% |
| 2000+DOM(depth=3,breadth=10,repeat=2) | x 102 ops/sec ±3.33%   |
| 1000+DOM(depth=3,breadth=10,repeat=1) | x 135 ops/sec ±3.86%   |
| 500+DOM(depth=3,breadth=8,repeat=1)   | x 162 ops/sec ±3.65%   |
| 300+DOM(depth=2,breadth=10,repeat=3)  | x 178 ops/sec ±4.44%   |

- node version: v10.14.2

| Benchmark                             | Result                 |
| ------------------------------------- | ---------------------- |
| 3000+DOM(depth=3,breadth=10,repeat=3) | x 67.86 ops/sec ±4.52% |
| 2000+DOM(depth=3,breadth=10,repeat=2) | x 89.01 ops/sec ±1.71% |
| 1000+DOM(depth=3,breadth=10,repeat=1) | x 110 ops/sec ±1.55%   |
| 500+DOM(depth=3,breadth=8,repeat=1)   | x 122 ops/sec ±2.33%   |
| 300+DOM(depth=2,breadth=10,repeat=3)  | x 130 ops/sec ±2.46%   |

- node version: v11.5.0

| Benchmark                             | Result                 |
| ------------------------------------- | ---------------------- |
| 3000+DOM(depth=3,breadth=10,repeat=3) | x 74.98 ops/sec ±1.01% |
| 2000+DOM(depth=3,breadth=10,repeat=2) | x 95.14 ops/sec ±1.02% |
| 1000+DOM(depth=3,breadth=10,repeat=1) | x 120 ops/sec ±2.31%   |
| 500+DOM(depth=3,breadth=8,repeat=1)   | x 137 ops/sec ±1.87%   |
| 300+DOM(depth=2,breadth=10,repeat=3)  | x 149 ops/sec ±0.76%   |

## License

[MIT](LICENSE)
