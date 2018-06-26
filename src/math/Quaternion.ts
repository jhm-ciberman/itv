import { quat, glMatrix } from "gl-matrix";
import Vector3 from "./Vector3";

export default class Quaternion {

	private _quat: quat;

	constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 1) {
		this._quat = quat.fromValues(x, y, z, w);
	}

	public get rawData(): quat {
		return this._quat;
	}

	public rotateX(deg: number): Quaternion {
		quat.rotateX(this._quat, this._quat, glMatrix.toRadian(deg));
		return this;
	}

	public rotateY(deg: number): Quaternion {
		quat.rotateY(this._quat, this._quat, glMatrix.toRadian(deg));
		return this;
	}

	public rotateZ(deg: number): Quaternion {
		quat.rotateZ(this._quat, this._quat, glMatrix.toRadian(deg));
		return this;
	}

	public setLookRotation(target: Vector3, upVector: Vector3 = Vector3.UP): Quaternion {
		const right = upVector.cross(target);
		console.log(right);
		quat.setAxes(this._quat, target.rawData, right.rawData, upVector.rawData);
		return this;
	}

}