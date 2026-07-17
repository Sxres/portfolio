/*
 * Simplified browser-native bonsai generator adapted from PyBonsai:
 * https://github.com/Ben-Edwards44/PyBonsai
 *
 * Copyright 2024 Ben Edwards
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

export type BonsaiRole = 'empty' | 'branch' | 'leaf' | 'pot' | 'soil';
export type BonsaiType = 'classic' | 'fibonacci' | 'offset-fibonacci' | 'random-fibonacci';

export interface BonsaiCell {
  char: string;
  role: BonsaiRole;
  tone: number;
}

export interface BonsaiOperation extends BonsaiCell {
  x: number;
  y: number;
}

export interface BonsaiBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export interface BonsaiBlueprint {
  width: number;
  height: number;
  operations: BonsaiOperation[];
  bounds: BonsaiBounds;
}

export type BonsaiGrid = BonsaiCell[][];

interface Point {
  x: number;
  y: number;
}

interface GenerateOptions {
  width?: number;
  height?: number;
  seed?: number;
  layers?: number;
  startLength?: number;
  type?: BonsaiType;
}

const EMPTY_CELL: BonsaiCell = { char: ' ', role: 'empty', tone: 0 };
const BRANCH_TEXTURE = ['~', ';', ':', '='];
const LEAF_TEXTURE = ['&', '%', '#', '@'];

/** Small, deterministic PRNG so the tree does not jump between renders. */
function mulberry32(seed: number) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function radians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

function branchChar(dx: number, dy: number, random: () => number) {
  if (random() < 0.16) return BRANCH_TEXTURE[Math.floor(random() * BRANCH_TEXTURE.length)];
  if (Math.abs(dy) > Math.abs(dx) * 1.45) return '|';
  if (Math.abs(dx) > Math.abs(dy) * 1.8) return '_';
  return dx * dy >= 0 ? '/' : '\\';
}

/**
 * Generates a compact, single-style fractal canopy and records its drawing order.
 * Coordinates use a bottom-left origin to make growth read naturally.
 */
export function generateBonsai(options: GenerateOptions = {}): BonsaiBlueprint {
  const type = options.type ?? 'classic';
  const width = options.width ?? 96;
  const height = options.height ?? 36;
  const layers = options.layers ?? 7;
  const random = mulberry32(options.seed ?? 847);
  const operations: BonsaiOperation[] = [];
  // Keep the growth family recognisable while giving every seed a distinct silhouette.
  const trunkAngle = radians(-14 + random() * 28);
  const trunkLength = options.startLength ?? (9 + random() * 2);
  const canopyLean = (random() - 0.5) * radians(24);

  const put = (x: number, y: number, char: string, role: BonsaiRole, tone = 0) => {
    const column = Math.round(x);
    const row = Math.round(y);
    if (column < 0 || column >= width || row < 0 || row >= height) return;
    operations.push({ x: column, y: row, char, role, tone });
  };

  const drawPot = (centerX: number) => {
    const halfWidth = 10;

    put(centerX - halfWidth, 3, '.', 'pot');
    put(centerX + halfWidth, 3, '.', 'pot');
    for (let x = centerX - halfWidth + 1; x < centerX + halfWidth; x += 1) {
      put(x, 3, random() < 0.2 ? '.' : '~', 'soil', Math.floor(random() * 2));
    }

    put(centerX - halfWidth + 1, 2, '\\', 'pot');
    put(centerX + halfWidth - 1, 2, '/', 'pot');
    put(centerX - halfWidth + 3, 1, '\\', 'pot');
    put(centerX + halfWidth - 3, 1, '/', 'pot');
    for (let x = centerX - halfWidth + 4; x < centerX + halfWidth - 3; x += 1) {
      put(x, 1, '_', 'pot');
    }
  };

  const drawLine = (start: Point, end: Point, layer: number) => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const steps = Math.max(1, Math.ceil(Math.max(Math.abs(dx), Math.abs(dy)) * 1.35));
    const tone = Math.min(2, Math.floor(layer / 2));

    for (let step = 0; step <= steps; step += 1) {
      const progress = step / steps;
      const x = start.x + dx * progress;
      const y = start.y + dy * progress;
      const char = branchChar(dx, dy, random);
      put(x, y, char, 'branch', tone);

      if (layer === 0 && step < steps * 0.7) {
        put(x + 1, y, random() < 0.35 ? ':' : char, 'branch', 0);
      }
    }
  };

  const drawLeaves = (origin: Point, density = 5) => {
    for (let walk = 0; walk < density; walk += 1) {
      let x = origin.x;
      let y = origin.y;
      let velocityX = (random() * 2 - 1) * 1.25;
      let velocityY = 0.35 + random() * 0.85;

      for (let step = 0; step < 4; step += 1) {
        x += velocityX;
        y += velocityY;
        velocityX += (random() - 0.5) * 0.45;
        velocityY -= 0.22;
        const char = LEAF_TEXTURE[Math.floor(random() * LEAF_TEXTURE.length)];
        put(x, y, char, 'leaf', Math.floor(random() * 3));
      }
    }
  };

  const drawBranch = (
    start: Point,
    length: number,
    angle: number,
    layer: number
  ) => {
    const end = {
      x: start.x + Math.sin(angle) * length * 1.7,
      y: start.y + Math.cos(angle) * length
    };

    drawLine(start, end, layer);

    return { start, end, length, angle };
  };

  const growClassicBranch = (
    start: Point,
    length: number,
    angle: number,
    layer: number
  ) => {
    const branch = drawBranch(start, length, angle, layer);

    if (layer >= layers) {
      drawLeaves(branch.end);
      return;
    }

    const split = radians(20 + random() * 32);
    const sharedLean = canopyLean / (layer + 1) + (random() - 0.5) * radians(18);
    const nextLength = length * (0.62 + random() * 0.16);

    growClassicBranch(
      branch.end,
      nextLength * (0.82 + random() * 0.24),
      angle - split + sharedLean,
      layer + 1
    );
    growClassicBranch(
      branch.end,
      nextLength * (0.82 + random() * 0.24),
      angle + split + sharedLean,
      layer + 1
    );
  };

  const fibonacciNumbers = (count: number) => {
    const sequence = [1, 1];
    while (sequence.length < count) {
      sequence.push(sequence[sequence.length - 1] + sequence[sequence.length - 2]);
    }
    return sequence;
  };

  const growFibonacciTree = (root: Point, mode: Exclude<BonsaiType, 'classic'>) => {
    const sequence = fibonacciNumbers(layers + 3);
    const branchDirection = random() < 0.5 ? -1 : 1;
    let frontier = [drawBranch(root, trunkLength, trunkAngle, 0)];

    for (let layer = 1; layer <= layers; layer += 1) {
      const targetBranches = sequence[layer + 1];
      const branchAllocations = frontier.map((_, index) =>
        Math.floor(targetBranches / frontier.length) +
        (index < targetBranches % frontier.length ? 1 : 0)
      );
      const nextFrontier: ReturnType<typeof drawBranch>[] = [];
      let globalBranchIndex = 0;

      frontier.forEach((parent, parentIndex) => {
        const childCount = branchAllocations[parentIndex];
        let reachesParentEnd = false;

        for (let childIndex = 0; childIndex < childCount; childIndex += 1) {
          let originProgress = 1;
          if (mode === 'offset-fibonacci') {
            const evenlyOffset = (childIndex + 1) / childCount;
            originProgress = Math.min(
              0.98,
              Math.max(0.2, evenlyOffset + (random() - 0.5) * 0.22)
            );
          } else if (mode === 'random-fibonacci') {
            originProgress = 0.2 + random() * 0.78;
          }

          if (originProgress > 0.88) reachesParentEnd = true;

          if (mode === 'fibonacci') {
            originProgress = 0.82 + random() * 0.18;
          }

          const direction = (globalBranchIndex % 2 === 0 ? -1 : 1) * branchDirection;
          const split = radians(22 + random() * 26);
          const childAngle =
            parent.angle +
            direction * split +
            canopyLean / (layer + 1) +
            (random() - 0.5) * radians(14);
          const childStart = {
            x: parent.start.x + (parent.end.x - parent.start.x) * originProgress,
            y: parent.start.y + (parent.end.y - parent.start.y) * originProgress
          };
          const childLength = parent.length * (0.58 + random() * 0.18);

          nextFrontier.push(drawBranch(childStart, childLength, childAngle, layer));
          globalBranchIndex += 1;
        }

        if (mode === 'random-fibonacci' && !reachesParentEnd && random() < 0.72) {
          drawLeaves(parent.end, 3);
        }
      });

      frontier = nextFrontier;
    }

    const leafDensity = mode === 'fibonacci' ? 5 + Math.floor(random() * 4) : 5 + Math.floor(random() * 3);
    for (const branch of frontier) drawLeaves(branch.end, leafDensity);
  };

  const root = { x: Math.floor(width / 2), y: 3 };
  drawPot(root.x);
  if (type === 'classic') {
    growClassicBranch(root, trunkLength, trunkAngle, 0);
  } else {
    growFibonacciTree(root, type);
  }

  const occupied = operations.length > 0 ? operations : [{ x: 0, y: 0 }];
  const minX = Math.max(0, Math.min(...occupied.map((cell) => cell.x)) - 1);
  const maxX = Math.min(width - 1, Math.max(...occupied.map((cell) => cell.x)) + 1);
  const minY = Math.max(0, Math.min(...occupied.map((cell) => cell.y)));
  // Keep every tree bottom-aligned so shorter modes do not leave a gap above the controls.
  const maxY = height - 1;

  return {
    width,
    height,
    operations,
    bounds: { minX, maxX, minY, maxY }
  };
}

export function createBonsaiGrid(width: number, height: number): BonsaiGrid {
  return Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({ ...EMPTY_CELL }))
  );
}

export function applyBonsaiOperation(grid: BonsaiGrid, operation: BonsaiOperation) {
  grid[operation.y][operation.x] = {
    char: operation.char,
    role: operation.role,
    tone: operation.tone
  };
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

/** Converts adjacent cells with the same role/tone into compact colored spans. */
export function bonsaiGridToMarkup(grid: BonsaiGrid, bounds: BonsaiBounds) {
  const rows: string[] = [];

  for (let y = bounds.maxY; y >= bounds.minY; y -= 1) {
    const runs: string[] = [];
    let runText = '';
    let runRole: BonsaiRole = 'empty';
    let runTone = 0;

    const flushRun = () => {
      if (!runText) return;
      const escaped = escapeHtml(runText);
      runs.push(
        runRole === 'empty'
          ? escaped
          : `<span class="bonsai-${runRole} bonsai-tone-${runTone}">${escaped}</span>`
      );
      runText = '';
    };

    for (let x = bounds.minX; x <= bounds.maxX; x += 1) {
      const cell = grid[y][x];
      if (cell.role !== runRole || cell.tone !== runTone) {
        flushRun();
        runRole = cell.role;
        runTone = cell.tone;
      }
      runText += cell.char;
    }

    flushRun();
    rows.push(runs.join('').replace(/ +$/, ''));
  }

  return rows.join('\n');
}
