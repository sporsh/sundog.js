/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/vector3.js
const fromXYZ = (x, y, z) => ({
  x,
  y,
  z
})

const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y, z: a.z + b.z })

const cross = (a, b) => ({
  x: a.y * b.z - a.z * b.y,
  y: a.z * b.x - a.x * b.z,
  z: a.x * b.y - a.y * b.x
})

const dot = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z

const length2 = v => dot(v, v)

const vector3_length = v => Math.sqrt(length2(v))

const negate = ({ x, y, z }) => ({ x: -x, y: -y, z: -z })

const normalize = v => scale(v, 1 / vector3_length(v))

const scale = ({ x, y, z }, f) => ({ x: x * f, y: y * f, z: z * f })

const sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y, z: a.z - b.z })

const ZERO = { x: 0, y: 0, z: 0 }

const hadamard = (a, b) => ({ x: a.x * b.x, y: a.y * b.y, z: a.z * b.z })

const abs = ({ x, y, z }) => ({
  x: Math.abs(x),
  y: Math.abs(y),
  z: Math.abs(z)
})

const floor = ({ x, y, z }) => ({
  x: Math.floor(x),
  y: Math.floor(y),
  z: Math.floor(z)
})

// export const mod = ({ x, y, z }, v) => fromXYZ(x % v, y % v, z % v)
const mod = ({ x, y, z }, v) => ({
  x: x % v.x || x,
  y: y % v.y || y,
  z: z % v.z || z
})

const addAll = ({ x, y, z }, v) => ({ x: x + v, y: y + v, z: z + v })

const max = ({ x, y, z }, v) => ({
  x: Math.max(x, v),
  y: Math.max(y, v),
  z: Math.max(z, v)
})

const map = ({ x, y, z }, fn) => ({ x: fn(x), y: fn(y), z: fn(z) })

// CONCATENATED MODULE: ./src/color.js
const fromRGB = (r, g, b) => ({ r, g, b })

const fromV3 = ({ x, y, z }) => fromRGB(x, y, z)

const toAbgr32 = ({ r, g, b }) =>
  0xff000000 |
  (Math.min(0xff, b * 0xff) << 16) |
  (Math.min(0xff, g * 0xff) << 8) |
  Math.min(0xff, r * 0xff)

// CONCATENATED MODULE: ./src/render.js



const renderRegion = (trace, cameraRayThrough) => (
  spp = 1,
  x0,
  y0,
  x1,
  y1,
  width,
  height
) => {
  const dx = x1 - x0
  const dy = y1 - y0
  const buffer = new Float64Array(dx * dy * 3)
  const halfWidth = width / 2
  const halfHeight = height / 2

  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      for (let n = 0; n < spp; n++) {
        const u = (x + Math.random()) / halfWidth - 1
        const v = (y + Math.random()) / halfHeight - 1
        const ray = cameraRayThrough(
          u + (2 * Math.random() - 1) / width,
          v + (2 * Math.random() - 1) / height
        )
        let radiance = trace(ray, fromXYZ(0, 0, 0), fromXYZ(1, 1, 1), 0)
        // const color = fromV3(scale(radiance, 1 / spp))
        const i = (x - x0) * 3 + (y - y0) * dx * 3
        buffer[i] += radiance.x
        buffer[i + 1] += radiance.y
        buffer[i + 2] += radiance.z
      }
    }
  }

  return buffer
}

// CONCATENATED MODULE: ./src/pathTrace.js


const iterative = ({
  maxDepth = 8,
  russianRouletteThreshold = 0
}) => intersect => ray => {
  let radiance = fromXYZ(0, 0, 0)
  let weight = fromXYZ(1, 1, 1)
  let depth = 0

  while (depth < maxDepth) {
    const intersection = intersect(ray)
    if (intersection) {
      const { point, basis } = intersection
      const material = intersection.material(intersection)
      const emittance = material.emittance(ray.direction)
      radiance = add(radiance, hadamard(emittance, weight))

      const pdf = material.pdf()
      if (Math.max(pdf.x, pdf.y, pdf.z) <= 0) {
        return radiance
      }
      weight = hadamard(weight, pdf)

      const direction = material.scatter(ray.direction, basis)
      // weight = v3.hadamard(weight, prob)

      // if (depth > russianRouletteThreshold) {
      //   const p = Math.max(weight.x, weight.y, weight.z)
      //   if (Math.random() > p) {
      //     return radiance
      //   }
      //   // Compensate for "lost" energy by randomly terminating path
      //   weight = v3.scale(weight, 1 / p)
      // }

      if (depth > russianRouletteThreshold) {
        const q = Math.max(0.05, 1 - Math.max(weight.x, weight.y, weight.z))
        if (Math.random() < q) {
          return radiance
        }
        // Compensate for "lost" energy by randomly terminating path
        weight = scale(weight, 1 / (1 - q))
      }

      ray.origin = point
      ray.direction = direction
      depth++
    } else {
      return radiance
    }
  }
  return radiance
}

const recursive = ({
  maxDepth = 8,
  russianRouletteThreshold = 2
}) => intersect => {
  const trace = (ray, radiance, weight, depth) => {
    if (depth > maxDepth) {
      return radiance
    }

    const intersection = intersect(ray)
    if (intersection) {
      const { point, basis, material } = intersection

      let prob = material.pdf(ray.direction, basis)
      // if (Math.max(prob.x, prob.y, prob.z) <= 0) {
      //   return radiance
      // }

      const newRadiance = add(
        radiance,
        hadamard(material.emittance(ray.direction), weight)
      )

      const { direction, pdf } = material.scatter(ray.direction, basis)

      // const newWeight = v3.scale(v3.hadamard(weight, prob), 1 / pdf)
      const newWeight = scale(hadamard(weight, prob), pdf)

      // // Russian roulette (after a couple of bounces)
      // const pMax = Math.max(weight.x, weight.y, weight.z)
      //
      // if (pMax <= 0 || depth > russianRouletteThreshold) {
      //   //  Russian roulette
      //   if (Math.random() > pMax) {
      //     return newRadiance
      //   }
      //   weight = v3.scale(weight, 1 / pMax)
      // }
      //
      // if (
      //   depth > maxDepth ||
      //   pMax <= 0 ||
      //   (depth > russianRouletteThreshold && Math.random() > pMax)
      // ) {
      //   return newRadiance
      // }

      const newRay = {
        origin: point,
        direction,
        tMin: ray.tMin,
        tMax: ray.tMax
      }
      // const newWeight = v3.hadamard(weight, prob)
      // const newWeight = weight
      return trace(newRay, newRadiance, newWeight, depth + 1)
    } else {
      return radiance
    }
  }
  return trace
}

// CONCATENATED MODULE: ./src/rayCast.js


const cast = () => intersect => ray => {
  const intersection = intersect(ray)
  if (intersection) {
    return intersection.material(intersection).pdf()

    // return v3.scale(
    //   v3.add(intersection.basis.normal, v3.fromXYZ(1, 1, 1)),
    //   1 / 2
    // )
    //
    // const { t } = intersection
    // return v3.scale(v3.fromXYZ(t - 2, t - 2, t - 2), 1 / 2)
  } else {
    return fromXYZ(0, 0, 0)
  }
}

// CONCATENATED MODULE: ./src/vector2.js
const fromXY = (x, y) => ({
  x,
  y
})

const vector2_add = (a, b) => fromXY(a.x + b.x, a.y + b.y)

const vector2_dot = (a, b) => a.x * b.x + a.y * b.y

const vector2_length2 = v => vector2_dot(v, v)

const vector2_length = v => Math.sqrt(vector2_length2(v))

const vector2_negate = ({ x, y }) => fromXY(-x, -y)

const vector2_normalize = v => vector2_scale(v, 1 / vector2_length(v))

const vector2_scale = ({ x, y }, f) => fromXY(x * f, y * f)

const vector2_sub = (a, b) => fromXY(a.x - b.x, a.y - b.y)

const vector2_ZERO = fromXY(0, 0)

const vector2_hadamard = (a, b) => fromXY(a.x * b.x, a.y * b.y)

const vector2_abs = ({ x, y }) => fromXY(Math.abs(x), Math.abs(y))

const vector2_floor = ({ x, y }) => fromXY(Math.floor(x), Math.floor(y))

// export const mod = ({ x, y }, v) => fromXY(x % v.x || x, y % v.y || y)
const vector2_mod = ({ x, y }, v) => fromXY(x % v.x, y % v.y)

const vector2_addAll = ({ x, y }, v) => ({ x: x + v, y: y + v })

const vector2_max = ({ x, y }, v) => fromXY(Math.max(x, v), Math.max(y, v))

// CONCATENATED MODULE: ./src/basis.js


const basis_basis = (tangent, bitangent, normal) => ({ tangent, bitangent, normal })

const fromStandardBasis = ({ tangent, bitangent, normal }, v) => ({
  x: dot(v, tangent),
  y: dot(v, bitangent),
  z: dot(v, normal)
})

const toStandardBasis = (
  { tangent, bitangent, normal },
  { x, y, z }
) => ({
  x: tangent.x * x + bitangent.x * y + normal.x * z,
  y: tangent.y * x + bitangent.y * y + normal.y * z,
  z: tangent.z * x + bitangent.z * y + normal.z * z
})

const arbitraryBasisForNormal = normal => {
  const tangent = orthogonalUnitVector(normal)
  return basis_basis(tangent, cross(tangent, normal), normal)
}

const orthogonalUnitVector = ({ x, y, z }) => {
  if (x === 0) {
    return {
      x: 1,
      y: 0,
      z: 0
    }
  }
  const f = Math.sqrt(x * x + z * z)
  return normalize({
    x: z * f,
    y: 0,
    z: -x * f
  })
}

// CONCATENATED MODULE: ./src/camera.js



const EPSILON = 0.00001
// const EPSILON = 0.0000001

const rayThrough = ({
  position,
  basis,
  aperture,
  fieldOfView,
  focalLength,
  tMin = EPSILON,
  tMax = Infinity
}) => (u, v) => {
  const origin = randomOriginWithinAperture(aperture, position, basis)
  const target = add(
    position,
    toStandardBasis(basis, {
      x: u * fieldOfView * focalLength,
      y: v * fieldOfView * focalLength,
      z: focalLength
    })
  )
  const direction = normalize(sub(target, origin))
  return { origin, direction, tMin, tMax }
}

const randomOriginWithinAperture = (aperture, position, basis) => {
  if (aperture == 0) {
    return position
  } else {
    const { x, y } = randomPointOnDisc(aperture)
    return add(position, toStandardBasis(basis, { x, y, z: 0 }))
  }
}

const randomPointOnDisc = r =>
  polarToCartesian(Math.sqrt(Math.random()) * r, randomAngle())

const randomAngle = () => Math.random() * PI2

const polarToCartesian = (r, phi) => ({
  x: r * Math.cos(phi),
  y: r * Math.sin(phi)
})

const PI2 = 2 * Math.PI

// CONCATENATED MODULE: ./src/sphere.js



const intersectSphereRay = ({ center, radius, material }) => ({
  origin,
  direction,
  tMin = 0,
  tMax = Infinity
}) => {
  // Vector pointing from sphere center to ray origin
  const m = sub(origin, center)

  // b = 0 (ray pointing directly at sphere center)
  // b < 0 (ray leaning towards sphere center)
  // b > 0 (ray leaning away from sphere center)
  const b = dot(m, direction)

  // Signed squared distance between ray origin and sphere surface
  const c = length2(m) - radius * radius

  if (c > 0 && b > 0) {
    // Ray origin is outside sphere, and ray direction is >90deg away from sphere center
    return
  }

  const discr = b * b - c

  if (discr < 0) {
    // Ray misses sphere
    // Quadric formula has no real root, means there are no intersections
    return
  }

  const sqrtDiscr = Math.sqrt(discr)
  const t0 = -b - sqrtDiscr
  // t0 < 0  (intersection was behind ray origin, we're inside the sphere so try the other solution)
  const t = t0 < tMin ? -b + sqrtDiscr : t0
  if (t > tMin && t < tMax) {
    const point = add(origin, scale(direction, t))
    const normal = normalize(sub(point, center))
    return {
      t,
      point,
      basis: arbitraryBasisForNormal(normal),
      material
    }
  }
}

// CONCATENATED MODULE: ./src/sdf2d.js


const dCircle = ({ radius }) => point => vector2_length(point) - radius

const dX = ({ width }) => point => Math.abs(point.x) - width

const dLine = ({ normal, width }) => point =>
  Math.abs(vector2_dot(point, normal)) - width

const dRectangle = dimensions => point => {
  const d = vector2_sub(vector2_abs(point), dimensions)
  return vector2_length(vector2_max(d, 0)) + Math.min(Math.max(d.x, d.y), 0)
}

// Domain Operators

const fTranslate = offset => point => vector2_sub(point, offset)

const fRepeat = c => {
  const cHalf = vector2_scale(c, 0.5)
  return p => vector2_sub(vector2_mod(vector2_abs(p), c), cHalf)
}

// Boolean Operators

const fUnion = dfs => point => Math.min(...dfs.map(df => df(point)))

// export const dfSubtract = dfs => point => Math.min(...dfs.map(df => df(point)))
const fSubtract = ([a, ...b]) => point =>
  Math.max(a(point), ...b.map(df => -df(point)))
// { return max(-d1,d2); }

const fIntersect = dfs => point => Math.max(...dfs.map(df => df(point)))

// CONCATENATED MODULE: ./src/material.js



// const lambertianBsdf = albedo => {
//   const distribution = v3.scale(albedo, 1 / Math.PI)
//   return (incoming, outgoing, { normal }) =>
//     v3.scale(distribution, v3.dot(normal, incoming))
// }
const lambertianMaterial = ({ albedo, emittance = ZERO }) => () => ({
  // bsdf: lambertianBsdf(albedo),
  emittance: () => emittance,
  pdf: () => albedo,
  scatter: (incoming, surfaceBasis) => {
    const u1 = Math.random()
    const u2 = Math.random()

    const sinTheta = Math.sqrt(u1)
    const cosTheta = Math.sqrt(1 - u1)

    const phi = 2 * Math.PI * u2

    return normalize(
      toStandardBasis(surfaceBasis, {
        x: sinTheta * Math.cos(phi),
        y: sinTheta * Math.sin(phi),
        z: cosTheta
      })
    )
  }
})

const specularMaterial = ({ albedo, emittance = ZERO }) => () => ({
  pdf: () => albedo,
  emittance: () => emittance,
  scatter: (incoming, { normal }) =>
    normalize(
      sub(incoming, scale(normal, 2 * dot(normal, incoming)))
    )
})

const fresnelDielectric = (cosThetaI, etaI, etaT) => {
  cosThetaI = Math.min(1, Math.max(-1, cosThetaI))
  // Potentially swap indices of refraction
  const entering = cosThetaI > 0
  if (!entering) {
    const etaI_ = etaI
    etaI = etaT
    etaT = etaI_
    cosThetaI = Math.abs(cosThetaI)
  }

  // Compute cosThetaT using Snell’s law
  const sinThetaI = Math.sqrt(Math.max(0, 1 - cosThetaI * cosThetaI))
  const sinThetaT = (etaI / etaT) * sinThetaI

  if (sinThetaT >= 1) {
    // Total internal refletion, always choose the reflection route
    return 1
  }

  const cosThetaT = Math.sqrt(Math.max(0, 1 - sinThetaT * sinThetaT))

  const Rparl =
    (etaT * cosThetaI - etaI * cosThetaT) /
    (etaT * cosThetaI + etaI * cosThetaT)
  const Rperp =
    (etaI * cosThetaI - etaT * cosThetaT) /
    (etaI * cosThetaI + etaT * cosThetaT)
  return (Rparl * Rparl + Rperp * Rperp) / 2
}

const material_cosTheta = ({ z }) => z
const cos2Theta = ({ z }) => z * z
const absCosTheta = ({ z }) => Math.abs(z)
const sin2Theta = w => Math.max(0, 1 - cos2Theta(w))
const material_sinTheta = w => Math.sqrt(sin2Theta(w))
const tanTheta = w => material_sinTheta(w) / material_cosTheta(w)
const tan2Theta = w => sin2Theta(w) / cos2Theta(w)

const refract = (incident, normal, eta) => {
  // Compute  using Snell’s law
  const cosThetaI = dot(normal, incident)
  const sin2ThetaI = Math.max(0, 1 - cosThetaI * cosThetaI)
  const sin2ThetaT = eta * eta * sin2ThetaI

  if (sin2ThetaT >= 1) {
    // Total internal reflection
    return
  }

  const cosThetaT = Math.sqrt(1 - sin2ThetaT)
  return add(
    scale(negate(incident), eta),
    scale(normal, eta * cosThetaI - cosThetaT)
  )
}

const faceForward = (n, v) => {
  return dot(n, v) < 0 ? negate(n) : n
}

const fresnelSpecularTransmissiveMaterial = ({
  albedo,
  emittance = ZERO,
  refractiveIndex
}) => () => ({
  pdf: () => albedo,
  emittance: () => emittance,
  scatter: (incoming, surfaceBasis) => {
    const wo = fromStandardBasis(surfaceBasis, negate(incoming))
    const fresnel = fresnelDielectric(material_cosTheta(wo), 1, refractiveIndex)
    if (Math.random() < fresnel) {
      // Specular reflection
      return toStandardBasis(surfaceBasis, fromXYZ(-wo.x, -wo.y, wo.z))
    } else {
      // Specular transmission
      const entering = material_cosTheta(wo) > 0
      const etaI = entering ? 1 : refractiveIndex
      const etaT = entering ? refractiveIndex : 1

      return toStandardBasis(
        surfaceBasis,
        refract(wo, faceForward(fromXYZ(0, 0, 1), wo), etaI / etaT)
      )
    }
  }
})

const checkerCube = ({ black, white, size }) => ({ point }) => {
  const x = Math.floor(point.x * size.x)
  const y = Math.floor(point.y * size.y)
  const z = Math.floor(point.z * size.z)
  return (x + y + z) % 2 ? white.material() : black.material()
}

const checkerNormal = ({ black, white, size }) => ({
  basis: { normal }
}) => {
  const x = Math.floor(normal.x * size.x)
  const y = Math.floor(normal.y * size.y)
  const z = Math.floor(normal.z * size.z)
  return (x + y + z) % 2 ? white.material() : black.material()
}

// export const proceduralGridTexture = ({
//   thickness = 0.01,
//   grid,
//   background
// }) => {
//   const delta = v => Math.abs(v - Math.floor(v + 0.5))
//   const isline = v => (delta(v) < thickness ? true : false)
//   return ({ point: { x, y, z } }) => {
//     if (isline(x) || isline(z)) {
//       return grid.material()
//     } else {
//       return background.material()
//     }
//     // isline(x) *	isline(y) * isline(z)
//
//     // const def eval(vec3 pos) vec3 :
//     // 	vec3( grid(pos*10.0) * grid(pos*100.0) * grid(pos*1000.0) * 0.6 + 0.3)]]
//   }
// }

const proceduralGridTexture = ({ thickness = 0.01 }) => {
  const delta = v => Math.abs(v - Math.floor(v + 0.5))
  const isline = (v, scale, thickness) =>
    delta(v * scale) > thickness * scale ? 1 : 0
  const grid = ({ x, y, z }, scale, thickness) =>
    isline(x, scale, thickness) * isline(z, scale, thickness)
  // const grid = ({ x, y, z }) => v3.fromXYZ(isline(x), isline(y), isline(z))
  // const grid = ({ x, y, z }) => v3.fromXYZ(isline(x), isline(y), isline(z))
  // const grid = ({ x, y, z }) => {
  //   const r = isline(x)
  //   const g = 0 //isline(y)
  //   const b = isline(z)
  //   return v3.fromXYZ(1 - b, 1 - r - b, 1 - r)
  // }

  return ({ point }) => {
    // const c = grid(point) * grid(v3.scale(point, 10.0))
    const c =
      0.25 + 0.75 * grid(point, 1, thickness) * grid(point, 10.0, thickness / 2)
    // grid(v3.scale(point, 100.0)) *

    return lambertianMaterial({ albedo: fromXYZ(c, c, c) })()
  }
}

// export const proceduralGridTexture = ({ thickness = 0.01 }) => {
//   const delta = v => Math.abs(v - Math.floor(v + 0.5))
//   const isline = v => (delta(v) < thickness ? 1 : 0)
//   // const grid = ({ x, y, z }) => isline(x) * isline(z)
//   // const grid = ({ x, y, z }) => v3.fromXYZ(isline(x), isline(y), isline(z))
//   // const grid = ({ x, y, z }) => v3.fromXYZ(isline(x), isline(y), isline(z))
//   const grid = ({ x, y, z }) => {
//     const r = isline(x)
//     const g = 0 //isline(y)
//     const b = isline(z)
//     return v3.fromXYZ(1 - b, 1 - r - b, 1 - r)
//   }
//
//   return ({ point }) => {
//     // const c =
//     //   grid(point) *
//     //     grid(v3.scale(point, 10.0)) *
//     //     grid(v3.scale(point, 100.0)) *
//     //     0.6 +
//     //   0.3
//     // return lambertianMaterial({ albedo: v3.fromXYZ(c, c, c) })()
//
//     // const c = v3.addAll(
//     //   v3.scale(
//     //     v3.hadamard(
//     //       v3.hadamard(grid(point), grid(v3.scale(point, 10.0))),
//     //       grid(v3.scale(point, 100.0))
//     //     ),
//     //     0.6
//     //   ),
//     //   0.3
//     // )
//     // const c = v3.sub(
//     //   v3.fromXYZ(1, 1, 1),
//     //   v3.scale(v3.hadamard(grid(point), v3.fromXYZ(1, 0, 1)), 0.5)
//     // )
//     const c = v3.scale(grid(point), 0.9)
//     return lambertianMaterial({ albedo: c })()
//     // if (isline(x) * isline(z)) {
//     //   return grid.material()
//     // } else {
//     //   return background.material()
//     // }
//     // isline(x) *	isline(y) * isline(z)
//
//     // const def eval(vec3 pos) vec3 :
//     // 	vec3( grid(pos*10.0) * grid(pos*100.0) * grid(pos*1000.0) * 0.6 + 0.3)]]
//   }
// }

const checkerTexture = ({ black, white, size }) => ({
  point,
  basis
}) => {
  // const x = Math.floor(point.x * size.x)
  // const y = Math.floor(point.y * size.y)
  // const z = Math.floor(point.z * size.z)
  // return (x + y + z) % 2 ? white.material() : black.material()

  // const { u, v } = sphericalMapping(basis.normal)
  // const { u, v } = sphericalMapping(basis.tangent)
  // const { u, v } = sphericalMapping(basis.bitangent)
  const { u, v } = sphericalMapping(point)

  // const u = basis.bitangent.x
  // const v = basis.bitangent.z

  const x = Math.floor(u * size.x)
  const y = Math.floor(v * size.y)
  return (x + y) % 2 ? white.material() : black.material()

  // const x = Math.floor(basis.tangent.y * size.x)
  // const y = Math.floor(basis.tangent.x * size.y)
  // const z = 0 //Math.floor(basis.bitangent.x * size.z)
  // return (x + y + z) % 2 ? white.material() : black.material()

  // const x = Math.floor(basis.normal.y * size.x)
  // const y = Math.floor(basis.normal.x * size.y)
  // const z = 0 //Math.floor(basis.bitangent.x * size.z)
  // return (x + y + z) % 2 ? white.material() : black.material()

  // const x = Math.floor(
  //   (basis.normal.x + basis.normal.y + basis.normal.z) * size.x
  // )
  // const y = Math.floor(
  //   (basis.tangent.x + basis.tangent.y + basis.tangent.z) * size.x
  // )
  // const z = Math.floor(
  //   (basis.bitangent.x + basis.bitangent.y + basis.bitangent.z) * size.x
  // )
  // // const y = Math.floor(
  // //   Math.min(basis.normal.x, basis.normal.y, basis.normal.z) * size.x
  // // )
  // // const y = Math.floor(basis.normal.x * size.y)
  // // const z = Math.floor(basis.normal.z * size.z)
  // // return (x + (y + z)) % 2 ? white.material() : black.material()
  // return y % 2 ? white.material() : black.material()

  // const n = v3.scale(v3.add(basis.normal, v3.fromXYZ(1, 1, 1)), 0.5)
  // const x = 0 //Math.floor(n.x * size.x)
  // const y = Math.floor(n.y * size.y)
  // const z = Math.floor(n.z * size.z)
  // return (x + y + z) % 2 ? white.material() : black.material()
}

const normalTexture = () => ({ basis: { normal } }) => {
  const albedo = scale(add(normal, fromXYZ(1, 1, 1)), 0.5)
  return lambertianMaterial({ albedo })()
}

const sphericalMapping = vector => {
  const theta = sphericalTheta(vector)
  const phi = sphericalPhi(vector)

  const u = theta / Math.PI
  const v = phi / (Math.PI * 2)
  // const u = theta / (Math.PI * 2)
  // const v = phi / (Math.PI * 2)

  return { u, v }

  // const x = Math.floor(u * size.x)
  // const y = Math.floor(v * size.y)
  // return (x + y) % 2 ? white.material() : black.material()
}

// const sphericalTheta = ({ x, y, z }) => Math.acos(clampUnit(z))
const sphericalTheta = ({ y }) => Math.acos(clampUnit(y))
// const sphericalTheta = ({ x, y, z }) => Math.acos(z)
// return std::acos(Clamp(v.z, -1, 1));

const sphericalPhi = ({ x, y, z }) => {
  // const p = Math.atan2(y, x)
  const p = Math.atan2(x, z)
  return p < 0 ? p + 2 * Math.PI : p
}

const clamp = (min, max) => value => Math.max(min, Math.min(value, max))

const clampUnit = clamp(-1, 1)




const sdf2dtexture = ({ distancefunction, black, white }) => ({
  point
}) => {
  let p2d = fromXY(point.x, point.z)
  const d = distancefunction(p2d)
  return d < 0 ? black.material() : white.material()
}

const sdf2dtexture_ = ({ black, white }) => ({ point }) => {
  let p2d = fromXY(point.x, point.z)
  // let p2d = sdf2d.fTranslate(v2.fromXY(0.5, 0.5))(v2.fromXY(point.x, point.z))
  // p2d = v2.mod(p2d, v2.fromXY(1, 1))
  // p2d = sdf2d.fTranslate(v2.fromXY(0.5, 0))(p2d)
  p2d = fRepeat(fromXY(1, 1))(p2d)

  const d = fUnion([
    dLine({ normal: { x: 1, y: 0 }, width: 0.01 }),
    dLine({ normal: { x: 0, y: 1 }, width: 0.01 })
  ])(p2d)

  return d < 0 ? black.material() : white.material()
}

const sdf2dtexture__ = ({ black, white }) => ({ point }) => {
  let p2d = fromXY(point.x, point.z)
  // let p2d = sdf2d.fTranslate(v2.fromXY(0.5, 0.5))(v2.fromXY(point.x, point.z))
  // p2d = v2.mod(p2d, v2.fromXY(1, 1))
  p2d = fTranslate(fromXY(0.5, 0))(p2d)
  p2d = fRepeat(fromXY(1, 1))(p2d)
  // const p2d = v2.mod(v2.fromXY(point.x, point.z), 2)

  // const d = sdf2d.dCircle({ radius: 0.5 })(p2d)

  // const d = sdf2d.dCircle({ radius: 1 })(sdf2d.fTranslate(0, 0)(p2d))
  // const d = sdf2d.dX({ width: 0.01 })(v2.fromXY(point.x, point.z))
  // const d = sdf2d.dLine({ n: { x: 1, y: 0 }, width: 0.01 })(
  // const d = sdf2d.fUnion([
  //   // const d = sdf2d.fIntersect([
  //   // const d = sdf2d.fSubtract([
  //   sdf2d.dLine({ n: v2.normalize({ x: 1, y: 1 }), width: 0.01 }),
  //   sdf2d.dLine({ n: v2.normalize({ x: -1, y: 1 }), width: 0.01 })
  // ])(p2d)
  const d = fIntersect([
    dLine({
      normal: vector2_normalize({ x: 1, y: 1 }),
      width: Math.sqrt(2) / 4
    }),
    dLine({
      normal: vector2_normalize({ x: -1, y: 1 }),
      width: Math.sqrt(2) / 4
    })
  ])(p2d)

  return d < 0 ? black.material() : white.material()
}

// CONCATENATED MODULE: ./src/group.js
const intersectGroupRay = intersectables => ray =>
  intersectables.reduce((nearest, intersectable) => {
    const current = intersectable(ray)
    if (!nearest) {
      return current
    } else if (current && current.t < nearest.t) {
      return current
    } else {
      return nearest
    }
  }, null)

// CONCATENATED MODULE: ./src/plane.js


const intersectPlaneRay = ({ d, basis, material }) => ({
  origin,
  direction,
  tMin = 0,
  tMax = Infinity
}) => {
  const { normal } = basis
  const t = (d - dot(normal, origin)) / dot(normal, direction)
  if (t > tMin && t < tMax) {
    const point = add(origin, scale(direction, t))
    return {
      t,
      point,
      basis,
      material
    }
  }
}

const intersectDirectedPlaneRay = plane => {
  const intersect = intersectPlaneRay(plane)
  return ray => {
    if (dot(plane.basis.normal, ray.direction) < 0) {
      return intersect(ray)
    }
  }
}

// CONCATENATED MODULE: ./src/triangle.js



const intersectTriangleRay = ({ a, b, c, material }) => {
  const ab = sub(b, a)
  const ac = sub(c, a)
  const normal = cross(ab, ac)
  const basis = arbitraryBasisForNormal(normalize(normal))

  return ({ origin, direction, tMin, tMax }) => {
    const qp = negate(direction)

    const d = dot(qp, normal)
    if (d === 0) {
      // Ray is parallel to triangle
      return
    }
    if (d < 0) {
      // Ray is potentially hitting the triange from the back
      return
    }

    const ap = sub(origin, a)
    const t = dot(ap, normal) / d
    if (t < tMin || t > tMax) {
      return
    }

    const e = cross(qp, ap)
    const v = dot(ac, e)
    if (v < 0 || v > d) {
      return
    }
    const w = -dot(ab, e)
    if (w < 0 || v + w > d) {
      return
    }

    return {
      t,
      point: add(origin, scale(direction, t)),
      basis: basis,
      material
    }
  }
}

// CONCATENATED MODULE: ./src/box.js
const testBoxRay = ({ min, max }) => ({
  origin,
  direction,
  tMin,
  tMax
}) => {
  // X-slab
  {
    const ood = 1 / direction.x
    const t1 = (min.x - origin.x) * ood
    const t2 = (max.x - origin.x) * ood
    tMin = Math.max(tMin, Math.min(t1, t2))
    tMax = Math.min(tMax, Math.max(t1, t2))
    if (tMin > tMax) return false
  }
  // Y-slab
  {
    const ood = 1 / direction.y
    const t1 = (min.y - origin.y) * ood
    const t2 = (max.y - origin.y) * ood
    tMin = Math.max(tMin, Math.min(t1, t2))
    tMax = Math.min(tMax, Math.max(t1, t2))
    if (tMin > tMax) return false
  }
  // Z-slab
  {
    const ood = 1 / direction.z
    const t1 = (min.z - origin.z) * ood
    const t2 = (max.z - origin.z) * ood
    tMin = Math.max(tMin, Math.min(t1, t2))
    tMax = Math.min(tMax, Math.max(t1, t2))
    if (tMin > tMax) return false
  }

  return {
    origin,
    direction,
    tMin,
    tMax
  }
}

const boundIntersectRay = (testRay, intersectRay) => ray => {
  const boundRay = testRay(ray)
  if (boundRay) {
    return intersectRay(boundRay)
  }
}

// CONCATENATED MODULE: ./src/distancefield.js



const distancefield_intersect = ({ material }) => distanceFunction => ray => {
  // TODO: Triangulate where ray intersects with tangent(point - (normal * d))

  let omega = 1

  // Initial step and initialization (for self-intersection)
  let prevD = ray.tMin
  let t = ray.tMin
  let point = add(ray.origin, scale(ray.direction, t))
  let d = distanceFunction(point)
  let sign = d < 0 ? -1 : 1
  let dt = d * sign

  t += dt

  const nMax = 200
  // const nMax = 100
  let n = 0

  // Avoid self-intersection
  // while (dt < ray.tMin && n++ < nMax) {
  while (dt < ray.tMin) {
    // while (dt < ray.tMin && t < 2 * ray.tMin) {
    point = add(ray.origin, scale(ray.direction, t))
    d = distanceFunction(point)

    if (d == 0) {
      t += ray.tMin
    } else {
      sign = d < 0 ? -1 : 1
      dt = d * sign

      prevD = dt
      t += dt
    }
  }
  // n = 0

  // Check how far the furthest ray distance is from the surface, and subtract that from the max
  let tMax = Math.min(1000, ray.tMax)
  tMax =
    tMax -
    sign * distanceFunction(add(ray.origin, scale(ray.direction, tMax)))

  while (t < tMax && n++ < nMax) {
    // while (t < tMax) {
    point = add(ray.origin, scale(ray.direction, t))
    d = distanceFunction(point)
    dt = d * sign

    if (dt < 0) {
      // Went through surface, stepping back
      // We have a hit between here and previous somewhere... (bisect?)
      // t += 1.6 * dt

      // const newT = t - prevD
      // prevD = (t - newT) / 2
      // t = newT

      // // DEBUG WHEN OVERSTEPPING
      // const normal = normalAtPoint(distanceFunction, point, ray.tMin)
      // return {
      //   t,
      //   point: v3.add(point, v3.scale(normal, -d)),
      //   basis: arbitraryBasisForNormal(normal),
      //   material: () => ({
      //     pdf: () => v3.fromXYZ(0, 0, 0),
      //     emittance: () => v3.fromXYZ(1, 0, 1)
      //   })
      // }

      // prevD = prevD / 2
      // t -= prevD

      // sign = -sign
      // prevD = Math.min(-prevD, dt)
      // t += prevD

      t += Math.min(-prevD, dt)
      // prevD = dt
      // t += dt * omega

      omega *= 0.5
    } else if (dt < ray.tMin) {
      // Close enough to consider it a hit
      const normal = normalAtPoint(distanceFunction, point, ray.tMin)

      // Point on tangent plane
      // t =
      //   // (v3.length(v3.add(point, v3.scale(normal, -dt))) -
      //   (v3.length(v3.add(point, v3.scale(normal, d))) -
      //     v3.dot(normal, ray.origin)) /
      //   v3.dot(normal, ray.direction)
      // point = v3.add(ray.origin, v3.scale(ray.direction, t))

      return {
        t,
        // point,
        // point: v3.add(point, v3.scale(normal, -dt * sign)),
        // point: v3.add(point, v3.scale(normal, -dt)),
        // point: v3.add(point, v3.scale(normal, d)),
        point: add(point, scale(normal, -d)),
        basis: arbitraryBasisForNormal(normal),
        // basis: arbitraryBasisForNormal(v3.scale(normal, sign)),
        // basis: arbitraryBasisForNormal(directedNormal),
        material
      }
    } else {
      // No hit, continuing to next iteration
      prevD = dt
      t += dt * omega
      omega = 1
    }
  }
}

const normalAtPoint = (distanceFunction, point, epsilon) => {
  let d = offset => {
    return distanceFunction(add(point, offset))
  }

  return normalize(
    fromXYZ(
      d(fromXYZ(epsilon, 0, 0)) - d(fromXYZ(-epsilon, 0, 0)),
      d(fromXYZ(0, epsilon, 0)) - d(fromXYZ(0, -epsilon, 0)),
      d(fromXYZ(0, 0, epsilon)) - d(fromXYZ(0, 0, -epsilon))
    )
  )
}

const dRound = radius => d => d - radius

const dShell = thickness => d => Math.abs(d + thickness) - thickness

const dfSphere = radius => point => vector3_length(point) - radius

// export const dfHalfspace = x => point => x - point.x
const dfPlane = normal => point => dot(point, normal)

const dfBox = dimensions => point => {
  const d = sub(abs(point), dimensions)
  return (
    vector3_length(max(d, 0)) + Math.min(Math.max(d.x, Math.max(d.y, d.z)), 0.0)
  )
}

const dfTorus = ({ major, minor }) => ({ x, y, z }) => {
  const l0 = Math.sqrt(x * x + y * y) - major
  const l1 = z
  return Math.sqrt(l0 * l0 + l1 * l1) - minor
}

const dfCappedCylinder = ({ height, radius }) => ({ x, y, z }) => {
  const dx = Math.abs(Math.sqrt(x * x + z * z) - height)
  const dy = Math.abs(y - radius)

  const dlx = Math.max(dx, 0)
  const dly = Math.max(dy, 0)
  const dl = Math.sqrt(dlx * dlx + dly * dly)
  return Math.min(Math.max(dx, dy), 0) + dl
  // return (
  //   Math.min(Math.max(dx, dy), 0) + v3.length(v3.max(v3.fromXYZ(dx, dy, 0), 0))
  // )
}

const dfCylinder = ({ height, radius }) => ({ x, y, z }) => {
  const d = Math.sqrt(x * x + z * z) - radius
  return Math.max(d, Math.abs(y) - height)
}

// export const dfCylinder = c => p => {
//   const x = p.x - c.x
//   const y = p.z - c.y
//   const l = Math.sqrt(x * x + y * y)
//   return l - c.z
// }

// float sdCappedCylinder( vec3 p, float h, float r )
// {
//   vec2 d = abs(vec2(length(p.xz),p.y)) - vec2(h,r);
//   return
// min(
//   max(d.x,d.y)
//   ,0.0)
//  + length(max(d,0.0));
// }

const dfOctahedron = s => point => {
  const p = abs(point)
  return (p.x + p.y + p.z - s) * 0.57735027
}

// Alterations

const dfTranslate = offset => point => sub(point, offset)

// export const dfRotate = k => ({ x, y, z }) => {
//   const cost = Math.cos(k)
//   const sint = Math.sin(k)
//   // return v3.fromXYZ(cost * x + -sint * z, y, sint * x + cost * z)
//   return v3.fromXYZ(x * cost - z * sint, y, z * cost + x * sint)
// }

const dfRotate = k => ({ x, y, z }) => {
  const cost = Math.cos(k)
  const sint = Math.sin(k)

  return fromXYZ(x * cost + z * sint, y, z * cost - x * sint)
  // return v3.fromXYZ(x * cost - z * sint, y, z * cost + x * sint)
}

// export const dfTwist = theta => ({ x, y, z }) => {
//   const k = theta
//   const cost = Math.cos(k * y)
//   const sint = Math.sin(k * y)
//   return v3.fromXYZ(cost * x + -sint * z, y, sint * x + cost * z)
// }

// export const dfTwist = theta => ({ x, y, z }) => {
//   // vec2 v = vec2(x, y);
//   // mat2 m = mat2(cost, -sint,  sint, cost);
//   // vec2 w = m * v; // = vec2(cost * x + sint * y, -sint * x + cost * y)
//   //
//   //
//   // const float k = 10.0; // or some other amount
//   // float cost = cos(k*p.y);
//   // float sint = sin(k*p.y);
//   // mat2  m = mat2(cost,-sint,sint,cost);
//   // vec3  q = vec3(m*p.xz,p.y);
//   // return primitive(q);
//
//   const k = theta
//   const cost = Math.cos(k * y)
//   const sint = Math.sin(k * y)
//   // return v3.fromXYZ(cost * x + -sint * z, y, sint * x + cost * z)
//   return v3.fromXYZ(cost * x + sint * z, y, -sint * x + cost * z)
// }

const dfTwist = theta => point => dfRotate(theta * point.y)(point)

// Combinations

const dfUnion = dfs => point => Math.min(...dfs.map(df => df(point)))

// export const dfSubtract = dfs => point => Math.min(...dfs.map(df => df(point)))
const dfSubtract = ([a, ...b]) => point =>
  Math.max(a(point), ...b.map(df => -df(point)))
// { return max(-d1,d2); }

const dfIntersection = dfs => point =>
  Math.max(...dfs.map(df => df(point)))

const dfIntersect = material => dfs => distancefield_intersect(material)(dfs)

// DISPLACEMENT
const displace = v => ({ x, y, z }) =>
  Math.sin(v * x) * Math.sin(v * y) * Math.sin(v * z)

const dfDisplace = v => df => point => {
  const d = df(point)
  const displacement = displace(v)(point)
  return d + displacement
}

// REPETITION

// const dfMod2 = size => point => {
//   const halfSize = size * 0.5
//   const c = v3.floor(v3.scale(v3.addAll(point, halfSize), 1 / size))
//   return v3.mod(v3.scale(v3.addAll(point, halfSize),))
//   // c = floor((p + size*0.5)/size);
//   // p = mod(p + size*0.5,size) - size*0.5;
//   // return c;
// }

const dfRepeat = c => p => {
  // return v3.sub(v3.fromXYZ(p.x % c.x, p.y % c.y, p.z % c.z), v3.scale(c, 0.5))

  // return v3.sub(v3.mod(p, c.x), v3.scale(c, 0.5))
  // return v3.mod(v3.addAll(p, c.x * 0.5), c.x) - c.x * 0.5

  // const q = v3.fromXYZ((p.x % 1.0) - 0.5, p.y, p.z)
  // // const s = 1.0
  // // return v3.addAll(v3.abs(q), -s)
  // return v3.abs(q)

  // return v3.add(v3.mod(p, c), v3.scale(c, -0.5))
  // vec3 q = mod(p,c)-0.5*c;
  // return v3.mod(p, c)

  // return v3.add(v3.mod(p, c), v3.scale(c, -0.5))
  // return v3.mod(v3.add(p, v3.scale(c, -0.5)), c)
  // return v3.add(v3.mod(p, c), v3.scale(c, 0.5))

  const cHalf = scale(c, 0.5)
  return sub(mod(add(p, cHalf), c), cHalf)

  // return v3.mod(v3.add(p, v3.scale(c, 0.5)), c)
  // return v3.add(v3.mod(p, c), v3.scale(c, 0.5))
  // return v3.add(v3.mod(p, c), v3.scale(c, -0.5))

  // const q = v3.fromXYZ(p.x % c.x - c.x * 0.5, p.y % c.y, p.z % c.z)
  // const q = v3.fromXYZ((p.x % c.x) - c.x * 0.5, p.y, p.z)
  // return v3.sub(v3.abs(q), v3.fromXYZ(1, 1, 1))
  // return v3.abs(q)
  // return q
  // const q2 = v3.sub(v3.abs(q), v3.scale(c, 0.5))
  // return v3.abs(q2)
  // return v3.scale(q, 0.5)
  // return q
}



const dfRevolve = ({ distancefunction }) => ({ x, y, z }) => {
  const q = fromXY(vector2_length(fromXY(x, z)), y)
  return distancefunction(q)
  // float opRevolution( in vec3 p, in sdf2d primitive, float o )
  // {
  //     vec2 q = vec2( length(p.xz) - o, p.y );
  //     return primitive(q)
  // }
}

// CONCATENATED MODULE: ./loader.js













const load = json => {
  return JSON.parse(json, reviver)
}

const reviver = (key, value) => {
  switch (key) {
    case 'camera':
      return rayThrough(value)
    case 'position':
    case 'tangent':
    case 'bitangent':
    case 'normal':
    case 'center':
    case 'origin':
    case 'dimensions':
    case 'albedo':
    case 'emittance':
    case 'a':
    case 'b':
    case 'c':
      return fromXYZ(...value)

    case 'geometry':
      return Object.values(value)[0]
    case 'group':
      return intersectGroupRay(value.flatMap(Object.values))
    case 'bound': {
      let { test, intersect } = value
      return boundIntersectRay(test, intersect)
    }

    // Primitives
    case 'sphere':
      return intersectSphereRay(value)
    case 'plane':
      return intersectDirectedPlaneRay({
        // return plane.intersectPlaneRay({
        ...value,
        basis: arbitraryBasisForNormal(value.normal)
      })
    case 'triangle':
      return intersectTriangleRay(value)

    // Materials
    case 'lambertian':
      return lambertianMaterial(value)
    case 'specular':
      return specularMaterial(value)
    case 'fresnelSpecularTransmissive':
      return fresnelSpecularTransmissiveMaterial(value)
    case 'transmissive':
      return /* Cannot get final name for export "transmissiveMaterial" in "./src/material.js" (known exports: lambertianMaterial specularMaterial fresnelSpecularTransmissiveMaterial checkerCube checkerNormal proceduralGridTexture checkerTexture normalTexture sdf2dtexture sdf2dtexture_ sdf2dtexture__, known reexports: ) */ undefined(value)
    case 'normalTexture':
      return normalTexture()
    case 'checkerCube':
      return checkerCube(value)
    case 'checkerNormal':
      return checkerNormal(value)
    case 'proceduralGridTexture':
      return proceduralGridTexture(value)
    case 'checkerTexture':
      return checkerTexture(value)
    case 'sdf2dtexture':
      return sdf2dtexture(value)
    case 'material':
      return Object.values(value)[0]

    case 'distancefunction': {
      const dfs = value.map(v => Object.values(v)[0])
      return point => dfs.reduceRight((p, df) => df(p), point)
    }
    case 'implicit':
      return dfIntersect(value)(value.distancefunction)
    // Primitives
    case 'dfPlane':
      // return sdf3d.dfPlane(value)
      return dfPlane(normalize(fromXYZ(...value)))
    case 'dfSphere':
      return dfSphere(value)
    case 'dfBox':
      return dfBox(fromXYZ(...value))
    case 'dfTorus':
      return dfTorus(value)
    case 'dfCylinder':
      return dfCylinder(value)
    // return dfCylinder(v3.fromXYZ(...value))
    case 'dfOctahedron':
      return dfOctahedron(value)
    case 'dfRevolve':
      return dfRevolve(value)
    // Combinations
    case 'dfSubtract':
      return dfSubtract(value.map(v => v.distancefunction))
    case 'dfUnion':
      return dfUnion(value.map(v => v.distancefunction))
    case 'dfIntersection':
      return dfIntersection(value.map(v => v.distancefunction))
    // Modifiers
    case 'dRound':
      return dRound(value)
    case 'dShell':
      return dShell(value)
    // return dfDisplace(2)(dfSphere(value))
    case 'dfTranslate':
      return dfTranslate(fromXYZ(...value))
    case 'dfRotate':
      return dfRotate(value)
    case 'dfTwist':
      return dfTwist(value)
    case 'dfRepeat':
      return dfRepeat(fromXYZ(...value))

    // SDF 2D
    case 'sdf2d': {
      const dfs = value.map(v => Object.values(v)[0])
      return point => dfs.reduceRight((p, df) => df(p), point)
    }
    // Primitives
    case 'sdf2dLine': {
      return dLine(value)
    }
    case 'sdf2dCircle': {
      return dCircle(value)
    }
    case 'sdf2dRectangle':
      return dRectangle(fromXY(...value))
    // Modifiers
    case 'sdf2dTranslate':
      return fTranslate(fromXY(...value))
    // Combinations
    case 'sdf2dUnion': {
      return fUnion(value.map(v => v.distancefunction))
    }
    case 'sdf2dSubtract': {
      return fSubtract(value.map(v => v.distancefunction))
    }

    default:
      return value
  }
}

// CONCATENATED MODULE: ./worker.js





let renderRegion_ = () => {}

// const trace = cast
const worker_trace = iterative
// const trace = recursive

onmessage = ({ data: msg }) => {
  switch (msg.type) {
    case 'loadScene':
      {
        const {
          camera: cameraRayThrough,
          geometry: intersectRay,
          maxDepth = 8
        } = load(msg.data)
        renderRegion_ = renderRegion(
          worker_trace({ maxDepth })(intersectRay),
          cameraRayThrough
        )
      }
      break
    case 'renderRegion':
      {
        const { spp, x0, y0, x1, y1, width, height } = msg.data
        const samples = renderRegion_(spp, x0, y0, x1, y1, width, height)
        postMessage({ spp, x0, y0, x1, y1, width, height, samples }, [
          samples.buffer
        ])
      }
      break
    case 'terminate':
      close()
      break
  }
}


/***/ })
/******/ ]);