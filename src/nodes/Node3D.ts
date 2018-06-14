import { mat4, quat, vec3 } from "gl-matrix";
import Node from "./Node";

export default class Node3D extends Node {

	protected readonly _localMatrix: mat4 = mat4.create();

	protected readonly _worldMatrix: mat4 = mat4.create();

	protected readonly _quaternion: quat = quat.create();

	protected readonly _translation: vec3 = vec3.create();

	protected readonly _scale: vec3 = vec3.create();


	protected _updateWorldMatrix(matrix: mat4) {
		const sc = .7;
		vec3.set(this._scale, sc, sc, sc);
		quat.rotateY(this._quaternion, this._quaternion, Math.PI * 5 / 180);
		vec3.set(this._translation, 0, 0, 3);
		mat4.fromRotationTranslationScale(
			this._localMatrix,
			this._quaternion,
			this._translation,
			this._scale
		);

		//mat4.fromTranslation(this._localMatrix, this._translation);
		//this._quaternion
		//const m = mat4.create();
		//quat.rotateZ(this._quaternion, this._quaternion, 90 * Math.PI / 180);
		//mat4.fromQuat(m, this._quaternion);
		//mat4.mul(this._localMatrix, this._localMatrix, m);
		mat4.multiply(this._worldMatrix, matrix, this._localMatrix);
		
	}

	protected _renderItself(matrix: mat4) {
		this._updateWorldMatrix(matrix)
		super._renderChildren(this._worldMatrix);
	}
}
