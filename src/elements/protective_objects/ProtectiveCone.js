import { LatheGeometry, Mesh, SplineCurve } from 'three'
import { calculateContactPoints } from '../../functions/Util'

export class ProtectiveCone {

  static calculateGeometryFor (peak, radiusOfSphere, segments) {
    let points = calculateContactPoints(peak.y, radiusOfSphere, segments)
    return new LatheGeometry(new SplineCurve(points).getPoints(segments),
      segments)
  }

  static getMeshFor (peak, radiusOfSphere, segments, material) {
    let mesh = new Mesh(
      this.calculateGeometryFor(peak, radiusOfSphere, segments), material)
    mesh.position.z = peak.z
    mesh.position.x = peak.x
    return mesh
  }
}