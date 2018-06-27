import { quat, glMatrix, vec3 } from "gl-matrix";
import Vector3 from "./Vector3";

export default class Quaternion {

	private _quat: quat;

	constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 1) {
		this._quat = quat.fromValues(x, y, z, w);
	}

	public get rawData(): quat {
		return this._quat;
	}

	public rotateX(deg: number): this {
		quat.rotateX(this._quat, this._quat, glMatrix.toRadian(deg));
		return this;
	}

	public rotateY(deg: number): this {
		quat.rotateY(this._quat, this._quat, glMatrix.toRadian(deg));
		return this;
	}

	public rotateZ(deg: number): this {
		quat.rotateZ(this._quat, this._quat, glMatrix.toRadian(deg));
		return this;
	}

	public normalize(): this {
		quat.normalize(this._quat, this._quat);
		return this;
	}

	public setEuler(euler: Vector3): this {
		quat.fromEuler(this._quat, euler.x, euler.y, euler.z);
		return this;
	}

	public setLookRotation(dirVector: Vector3, forwardVector: Vector3 = Vector3.FORWARD): this {
		//const right = target.cross();
		//quat.setAxes(this._quat, target.rawData, right.rawData, upVector.rawData);

		// Source: https://stackoverflow.com/questions/12435671/quaternion-lookat-function
		const forwardVector2: vec3 = vec3.create();
		const rotAxis: vec3 = vec3.create();
		vec3.normalize(forwardVector2, dirVector.rawData);

		vec3.cross(rotAxis, forwardVector.rawData, forwardVector2);
		const dot: number = vec3.dot(forwardVector.rawData, forwardVector2);

		quat.set(this._quat, rotAxis[0], rotAxis[1], rotAxis[2], dot + 1);
		quat.normalize(this._quat, this._quat);
		return this;
	}

}