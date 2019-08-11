# A physically based path tracer written in JavaScript

Live demo: https://sporsh.github.io/sundog.js/

## Test renders:

![Example (39)](https://user-images.githubusercontent.com/1416154/62839658-0dd53d00-bc8d-11e9-89f9-0df89a054b28.png)
![Example (43)](https://user-images.githubusercontent.com/1416154/62839660-19c0ff00-bc8d-11e9-8e98-1ff139f36436.png)
![Example (45)](https://user-images.githubusercontent.com/1416154/62839662-1f1e4980-bc8d-11e9-9dca-f255b88da288.png)
![Example (47)](https://user-images.githubusercontent.com/1416154/62839663-23e2fd80-bc8d-11e9-9e1a-319cf541d26c.png)
![Example (49)](https://user-images.githubusercontent.com/1416154/62839666-2ba2a200-bc8d-11e9-9bdd-1218eb2b2c31.png)
![Example (52)](https://user-images.githubusercontent.com/1416154/62839667-2f362900-bc8d-11e9-9600-b265672b037c.png)
![Example (54)](https://user-images.githubusercontent.com/1416154/62839669-33fadd00-bc8d-11e9-93fb-0df490fde85b.png)
![Example (56)](https://user-images.githubusercontent.com/1416154/62839670-3bba8180-bc8d-11e9-9f2a-45481e800e5e.png)
![Example (57)](https://user-images.githubusercontent.com/1416154/62839671-3e1cdb80-bc8d-11e9-9bf6-7bfaf41cb91f.png)
![Example ~20k spp](https://user-images.githubusercontent.com/1416154/59981015-3da58400-95fe-11e9-8595-039a84a39b0e.png)

## Features

* [x] Geometry
    * [x] Spheres
    * [x] Planes
    * [x] Triangles
    * [x] Signed distance fields
    * [ ] Acceleration structures
    * [ ] Object instancing
* [x] Camera
    * [x] Perspective camera
    * [ ] Orthographic camera
    * [x] Depth of Field
* [x] Monte Carlo integration
* [x] Distributed rendering
* [x] Progressive rendering
* [ ] Spectral rendering
* [ ] Motion blur
* [x] Importance sampling
    * [x] Lambert
    * [x] Specular reflection
    * [x] Specular transmission
    * [x] Fresnel dielectric
    * [ ] Fresnel conductive
