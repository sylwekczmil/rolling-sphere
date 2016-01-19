import {expect} from "chai";
import {
    basisOfRightTriangleBasedOnSphereOnGroundPoint,
    heightOfSphericalSector,
    midpointVector3,
    radiusOfSphereSectorBaseFromRightTriangle,
    radiusOfSphericalSectorBase
} from "../../src/functions/Util";
import {Vector3} from "three";

describe("Util heightOfSphericalSector", () => {
    context("when sphere radius and sphere base radius are both equals 4", () => {
        it("then return height of spherical sector  equal to 4", () => {
            expect(heightOfSphericalSector(4, 4)).to.equal(4);
        });
    });
    context("when sphere radius and sphere base radius are both equals 2.5", () => {
        it("then return height of spherical sector equal to 2.5", () => {
            expect(heightOfSphericalSector(2.5, 2.5)).to.equal(2.5);
        });
    });
});


describe("Util radiusOfSphereSectorBaseFromRightTriangle", () => {
    context("when height is equal to 6 and basis is equals 8", () => {
        it("then return radius of sphere sector equal to 5", () => {
            expect(radiusOfSphereSectorBaseFromRightTriangle(6, 8)).to.equal(5);
        });
    });
});

describe("Util radiusOfSphericalSectorBase", () => {

    context("when radius of sphere is equal to 4 and  height of spherical sector is equal to 4", () => {
        it("then return radius of spherical sector base equal to 4", () => {
            expect(radiusOfSphericalSectorBase(4, 4)).to.equal(4);
        });
    });

    context("when radius of sphere is equal to 2.5 and  height of spherical sector is equal to 2.5", () => {
        it("then return radius of spherical sector base equal to 2.5", () => {
            expect(radiusOfSphericalSectorBase(2.5, 2.5)).to.equal(2.5);
        });
    });

});

describe("Util basisOfRightTriangleBasedOnSphereOnGroundPoint", () => {

    context("when radius of sphere is equal to 4 and  height of triangle is equal to 4", () => {
        it("then return base of triangle equal to 4", () => {
            expect(basisOfRightTriangleBasedOnSphereOnGroundPoint(4, 4)).to.equal(4);
        });
    });

});

describe("Util midpoint", () => {

    context("when has two vectors (0, 0, 0) and (2, 2, 2)", () => {
        it("then return vector (1, 1, 1)", () => {
            const midV = midpointVector3(new Vector3(0, 0, 0), new Vector3(2, 2, 2));
            expect(midV.x).to.equal(1);
            expect(midV.y).to.equal(1);
            expect(midV.z).to.equal(1);
        });
    });

});