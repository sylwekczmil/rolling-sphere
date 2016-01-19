import { CameraHelper, DirectionalLight } from 'three'

export const light = new DirectionalLight(0xffffff, 1)

light.name = 'Dir. Light'
light.position.set(-200, 300, -200)
light.castShadow = true
const d = 200
light.shadow.camera.near = d / 2
light.shadow.camera.far = d * 3
light.shadow.camera.right = d
light.shadow.camera.left = -d
light.shadow.camera.top = d
light.shadow.camera.bottom = -d
light.shadow.mapSize.width = 8192
light.shadow.mapSize.height = 8192
export const shadowCameraHelper = new CameraHelper(light.shadow.camera)