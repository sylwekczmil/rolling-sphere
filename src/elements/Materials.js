import { MeshBasicMaterial } from 'three'

export let yellowTransparentMaterial = new MeshBasicMaterial({
  color: 0xffff00, transparent: true, opacity: 0.1,
})

export let redMaterial = new MeshBasicMaterial({
  color: 0xff0000,
})