import {mat4, quat, vec3 } from "gl-matrix";
import Vector3 from "../math/Vector3";
import SystemSymbols from "../SystemSymbols";
import { EventEmitter } from "events";

export default class DisplayObject3D extends EventEmitter {

	private static readonly DEG2RAD: number = Math.PI / 180;
	//private static readonly RAD2DEG: number = 180 / Math.PI;

	protected _children: DisplayObject3D[] = [];

	protected _parent: DisplayObject3D | null = null;

	protected readonly _localMatrix: mat4 = mat4.create();

	protected readonly _worldMatrix: mat4 = mat4.create();

	private _dirtyWorldMatrix: boolean = false;
	private _dirtyLocalMatrix: boolean = false;
	private _rotation: quat = quat.create();
	private _position: vec3 = vec3.fromValues(0, 0, 0);

	private _scale: vec3 = vec3.fromValues(1, 1, 1);

	[SystemSymbols.childNodes]: DisplayObject3D[] = this._children;


	public [Symbol.iterator]() {
		return this._children[Symbol.iterator]();
	}

	get children() {
		return this._children[Symbol.iterator]();
	}

	public addChild(node: DisplayObject3D): void {
		this._children.push(node);
	}

	public removeChild(node: DisplayObject3D) {
		var n = this._children.indexOf(node);
		if (n >= 0) {
			this._children.splice(n, 1);
		}
	}

	public get localMatrix(): mat4 {
		if (this._dirtyLocalMatrix) {
			mat4.fromRotationTranslationScale(
				this._localMatrix,
				this._rotation,
				this._position,
				this._scale
			);
		}
		return this._localMatrix;
	}

	public get worldMatrix(): mat4 {
		return this._worldMatrix;
	}

	public rotateX(deg: number): DisplayObject3D {
		quat.rotateX(this._rotation, this._rotation, deg * DisplayObject3D.DEG2RAD);
		this._dirtyWorldMatrix = this._dirtyLocalMatrix = true;
		return this;
	}

	public rotateY(deg: number): DisplayObject3D {
		quat.rotateY(this._rotation, this._rotation, deg * DisplayObject3D.DEG2RAD);
		this._dirtyWorldMatrix = this._dirtyLocalMatrix = true;
		return this;
	}

	public rotateZ(deg: number): DisplayObject3D {
		quat.rotateZ(this._rotation, this._rotation, deg * DisplayObject3D.DEG2RAD);
		this._dirtyWorldMatrix = this._dirtyLocalMatrix = true;
		return this;
	}

	public setScale(scaleX: number, scaleY: number, scaleZ: number) {
		vec3.set(this._scale, scaleX, scaleY, scaleZ);
	}

	public render(_matrix: mat4) {}

	protected updateWorldMatrix(parentWorldMatrix: mat4, dirty: boolean): void {
		if (dirty || this._dirtyWorldMatrix) {
			mat4.multiply(this._worldMatrix, parentWorldMatrix, this._localMatrix);
		}
		const size = this._children.length;
		for (let i = 0; i < size; i++) {
			this._children[i].updateWorldMatrix(this._worldMatrix, dirty);
		}
	}

	[SystemSymbols.updateWorldMatrix] = this.updateWorldMatrix;
}