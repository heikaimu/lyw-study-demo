/**
 * 获取随机数
 * @param {Number} min - 最小随机数
 * @param {Number} max - 最大随机数
 */
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * 获取随机的颜色
 * @param {Number} alpha - 色彩透明度
 */
function randomColor(alpha = 1) {
  const R = Math.floor(randomNumber(0, 255));
  const G = Math.floor(randomNumber(0, 255));
  const B = Math.floor(randomNumber(0, 255));
  return `rgba(${R},${G},${B},${alpha})`;
}

// ==================矢量==================
/**
 * a,b两点之间的直线距离
 * @param {Object} a - 点a
 * @param {Object} b - 点b
 */
function getDistance(a, b) {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}

/**
 * 修改加减速度
 * @param {Object} vector - 矢量
 * @param {Number} vector.x
 * @param {Number} vector.y
 * @param {Number} value - 加减速度
 */
function updateVector(vector, value) {
  const angle = Math.atan2(vector.y, vector.x);
  const v = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
  const newV = v + value;
  return {
    x: newV * Math.cos(angle),
    y: newV * Math.sin(angle)
  }
}

/**
 * 旋转矢量
 * @param {Object} vector - 矢量
 * @param {Number} vector.x
 * @param {Number} vector.y
 * @param {Number} angle - 角度（Math.PI / 180 * angle）
 */
function rotateVector(vector, angle) {
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);
  return {
    x: vector.x * cos - vector.y * sin,
    y: vector.x * sin + vector.y + cos
  }
}

/**
 * 两物体碰撞后的速度
 * @param {Object} a - 物体a
 * @param {Number} a.x - a中心点x
 * @param {Number} a.y - a中心点y
 * @param {Number} a.vx - a的x加速度
 * @param {Number} a.vy - a的y加速度
 * @param {Number} a.m - a的质量
 * @param {Object} b - 物体b（参数同a）
 */
function collisionDetect(a, b) {
  // 碰撞小球的夹角
  let angle = Math.atan2(a.y - b.y, a.x - b.x);
  const D = Math.PI / 2;
  if (angle > -D * 2 && angle < 0) { angle += D * 2 };

  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  // a球球心速度和分速度
  const avc = (a.vx * cos + a.vy * sin);
  const avv = (a.vx * Math.cos(angle + D) + a.vy * cos);
  // b球球心速度和分速度
  const bvc = (b.vx * cos + b.vy * sin);
  const bvv = (b.vx * Math.cos(angle + D) + b.vy * cos);

  // 质量守恒
  const avcNew = ((a.m - b.m) * avc + 2 * b.m * bvc) / (a.m + b.m);
  const bvcNew = ((b.m - a.m) * bvc + 2 * a.m * avc) / (a.m + b.m);

  const n = Math.cos(-angle);
  const o = Math.sin(-angle);
  // 使用三角函数从新计算x,y轴速度
  const avx = avcNew * n + avv * o;
  const avy = avcNew * Math.cos(D - angle) + avv * n;
  const bvx = bvcNew * n + bvv * o;
  const bvy = bvcNew * Math.cos(D - angle) + bvv * n;

  return {
    a: {
      x: avx,
      y: avy
    },
    b: {
      x: bvx,
      y: bvy
    }
  }
}