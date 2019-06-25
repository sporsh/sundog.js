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

const add = (a, b) => fromXYZ(a.x + b.x, a.y + b.y, a.z + b.z)

const cross = (a, b) => ({
  x: a.y * b.z - a.z * b.y,
  y: a.z * b.x - a.x * b.z,
  z: a.x * b.y - a.y * b.x
})

const dot = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z

const length2 = v => dot(v, v)

const vector3_length = v => Math.sqrt(length2(v))

const negate = ({ x, y, z }) => fromXYZ(-x, -y, -z)

const normalize = v => scale(v, 1 / vector3_length(v))

const scale = ({ x, y, z }, f) => fromXYZ(x * f, y * f, z * f)

const sub = (a, b) => fromXYZ(a.x - b.x, a.y - b.y, a.z - b.z)

const ZERO = fromXYZ(0, 0, 0)

const hadamard = (a, b) => fromXYZ(a.x * b.x, a.y * b.y, a.z * b.z)

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
  spp,
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

// CONCATENATED MODULE: ./src/trace.js


const RUSSIAN_ROULETTE_THRESHOLD = 2

const tracer = (intersect, maxDepth = 8) => {
  const trace = (ray, radiance, weight, depth) => {
    const intersection = intersect(ray)
    if (intersection) {
      const {
        point,
        basis,
        intersectable: {
          material: { pdf, emittance, scatter }
        }
      } = intersection
      const prob = pdf(ray.direction, basis)
      const pMax = Math.max(Math.max(prob.x, prob.y), prob.z)

      const newRadiance = add(
        radiance,
        hadamard(emittance(ray.direction), weight)
      )

      //  Russian roulette (after a couple of bounces)
      if (
        (pMax >= 1 && depth > maxDepth) ||
        pMax <= 0 ||
        (depth > RUSSIAN_ROULETTE_THRESHOLD && Math.random() > pMax)
      ) {
        return newRadiance
      }

      const newRay = {
        origin: point,
        direction: scatter(ray.direction, basis),
        tMin: ray.tMin,
        tMax: ray.tMax
      }
      const newWeight = hadamard(weight, scale(prob, 1 / pMax))
      return trace(newRay, newRadiance, newWeight, depth + 1)
    } else {
      return radiance
    }
  }
  return trace
}

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
  x: tangent.x * x + normal.x * y + bitangent.x * z,
  y: tangent.y * x + normal.y * y + bitangent.y * z,
  z: tangent.z * x + normal.z * y + bitangent.z * z
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
  return {
    x: z * f,
    y: 0,
    z: -x * f
  }
}

// CONCATENATED MODULE: ./src/camera.js



const EPSILON = 0.00001

const rayThrough = ({
  position,
  basis,
  aperture,
  fieldOfView,
  focalLength,
  tMin = EPSILON,
  tMax = Infinity
}) => (u, v) => {
  const origin = randomOriginWithinAperture({ position, aperture })
  const target = add(
    position,
    fromStandardBasis(basis, {
      x: u * fieldOfView * focalLength,
      y: v * fieldOfView * focalLength,
      z: focalLength
    })
  )
  const direction = normalize(sub(target, origin))
  return { origin, direction, tMin, tMax }
}

const randomOriginWithinAperture = ({ position, aperture }) => {
  if (aperture == 0) {
    return position
  } else {
    const { x, y } = randomPointOnDisc(aperture)
    return add(position, { x, y, z: 0 })
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



const intersectSphereRay = sphere => ({
  origin,
  direction,
  tMin = 0,
  tMax = Infinity
}) => {
  const { center, radius } = sphere
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
      intersectable: sphere
    }
  }
}

// CONCATENATED MODULE: ./src/material.js



const lambertianScatter = (incoming, surface) => {
  const u1 = Math.random()
  const u2 = Math.random()

  const sinTheta = Math.sqrt(u1)
  const cosTheta = Math.sqrt(1 - u1)

  const phi = 2 * Math.PI * u2

  return normalize(
    toStandardBasis(surface, {
      x: sinTheta * Math.cos(phi),
      y: cosTheta,
      z: sinTheta * Math.sin(phi)
    })
  )
}

const lambertianBsdf = albedo => {
  const distribution = scale(albedo, 1 / Math.PI)
  return (incoming, outgoing, { normal }) =>
    scale(distribution, dot(normal, incoming))
}

const lambertianMaterial = ({ albedo, emittance = ZERO }) => ({
  bsdf: lambertianBsdf(albedo),
  pdf: () => albedo,
  scatter: lambertianScatter,
  emittance: () => emittance
})

const specularMaterial = ({ albedo, emittance = ZERO }) => ({
  pdf: () => albedo,
  scatter: (incoming, { normal }) =>
    sub(incoming, scale(normal, 2 * dot(normal, incoming))),
  emittance: () => emittance
})

const transmissiveMaterial = ({
  albedo,
  emittance = ZERO,
  refractiveIndex
}) => ({
  pdf: () => albedo,
  scatter: (incoming, { normal }) => {
    const cosi = dot(normal, incoming)
    const eta =
      cosi < 0
        ? // Entering
          1 / refractiveIndex
        : // Exiting
          refractiveIndex / 1
    const normal_ =
      cosi < 0
        ? // Entering
          normal
        : // Exiting
          negate(normal)
    const cost2 = 1 - eta * eta * (1 - cosi * cosi)
    if (cost2 < 0) {
      // Total internal reflection
      return sub(incoming, scale(normal_, 2 * cosi))
    }
    return normalize(
      sub(
        scale(incoming, eta),
        scale(normal_, eta * Math.abs(cosi) + Math.sqrt(cost2))
      )
    )
  },
  emittance: () => emittance
})

const frDiel = (cosi, cost, etai, etat) => {
  const rParallel = (etat * cosi - etai * cost) / (etat * cosi + etai * cost)
  const rPerpendicular =
    (etai * cosi - etat * cost) / (etai * cosi + etat * cost)
  return (rParallel * rParallel + rPerpendicular * rPerpendicular) / 2
}

const fresnelSpecularTransmissiveMaterial = ({
  albedo,
  emittance = ZERO,
  refractiveIndex
}) => ({
  pdf: () => albedo,
  emittance: () => emittance,
  scatter: (incoming, { normal }) => {
    const cosi = dot(normal, incoming)
    const { etat, etai, normal_ } =
      cosi < 0
        ? // Entering
          { etat: refractiveIndex, etai: 1, normal_: normal }
        : // Exiting
          { etat: 1, etai: refractiveIndex, normal_: negate(normal) }
    const eta = etai / etat
    const sint = eta * Math.sqrt(Math.max(0, 1 - cosi * cosi))

    if (sint >= 1) {
      //  Total internal refraction
      return sub(incoming, scale(normal_, 2 * cosi))
    } else {
      const cost = Math.sqrt(Math.max(0, 1 - sint * sint))
      if (frDiel(Math.abs(cosi), cost, etai, etat) < Math.random()) {
        return normalize(
          sub(scale(incoming, eta), scale(normal_, eta * Math.abs(cosi) + cost))
        )
      } else {
        return sub(incoming, scale(normal_, 2 * cosi))
      }
    }
  }
})

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

const renderable = (intersectRay, material) => ({
  intersectRay: ray => {}
})

// CONCATENATED MODULE: ./src/plane.js


const intersectPlaneRay = plane => ({
  origin,
  direction,
  tMin = 0,
  tMax = Infinity
}) => {
  const { d, basis } = plane
  const { normal } = basis
  const t = (d - dot(normal, origin)) / dot(normal, direction)
  if (t > tMin && t < tMax) {
    const point = add(origin, scale(direction, t))
    return {
      t,
      point,
      basis,
      intersectable: plane
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
    case 'albedo':
    case 'emittance':
      return fromXYZ(...value)
    case 'sphere':
      return intersectSphereRay(value)
    case 'lambertian':
      return lambertianMaterial(value)
    case 'specular':
      return specularMaterial(value)
    case 'fresnelSpecularTransmissive':
      return fresnelSpecularTransmissiveMaterial(value)
    case 'transmissive':
      return transmissiveMaterial(value)
    case 'material':
      return Object.values(value)[0]
    case 'geometry':
      return Object.values(value)[0]
    case 'group':
      // return intersectGroupRay(Object.values(value))
      return intersectGroupRay(value.flatMap(Object.values))
    case 'bound': {
      let { test, intersect } = value
      return boundIntersectRay(test, intersect)
    }
    case 'plane':
      return intersectDirectedPlaneRay({
        ...value,
        basis: arbitraryBasisForNormal(value.normal)
      })
    default:
      return value
  }
}

// CONCATENATED MODULE: ./worker.js




let renderRegion_ = () => {}

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
          tracer(intersectRay, maxDepth),
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