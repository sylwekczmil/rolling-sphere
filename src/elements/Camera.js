import { PerspectiveCamera } from 'three'

export const camera = new PerspectiveCamera(45,
  window.innerWidth / window.innerHeight, 0.1, 2000)

const x = 3
camera.position.x = -10 * x
camera.position.z = 4 * x
camera.position.y = 7 * x