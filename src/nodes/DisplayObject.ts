import {mat4, quat, vec3, glMatrix } from "gl-matrix";
import { EventEmitter } from "events";
import SystemSymbols from "../SystemSymbols";
import GLRasterizer from "../gl/GLRasterizer";

export default class DisplayObject extends EventEmitter {
	
	protected _children: DisplayObject[] = [];

	protected _parent: DisplayObject | null = null;

	protected readonly _localMatrix: mat4 = mat4.create();

	protected readonly _worldMatrix: mat4 = mat4.create();

	private _dirtyWorldMatrix: boolean = false;
	private _dirtyLocalMatrix: boolean = false;
	private _rotation: quat = quat.create();
	private _position: vec3 = vec3.fromValues(0, 0, 0);

	private _scale: vec3 = vec3.fromValues(1, 1, 1);

	[SystemSymbols.childNodes]: DisplayObject[] = this._children;


	public [Symbol.iterator]() {
		return this._children[Symbol.iterator]();
	}

	get children(): IterableIterator<DisplayObject> {
		return this._children[Symbol.iterator]();
	}

	public addChild(node: DisplayObject): void {
		this._children.push(node);
	}

	public removeChild(node: DisplayObject) {
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
			this._dirtyLocalMatrix = false;
		}
		return this._localMatrix;
	}

	public get worldMatrix(): mat4 {
		return this._worldMatrix;
	}


	public setPosition(x: number, y: number, z: number): void {
		vec3.set(this._position, x, y, z);
		this._dirtyWorldMatrix = this._dirtyLocalMatrix = true;
	}

	public rotateX(deg: number): DisplayObject {
		quat.rotateX(this._rotation, this._rotation, glMatrix.toRadian(deg));
		this._dirtyWorldMatrix = this._dirtyLocalMatrix = true;
		return this;
	}

	public rotateY(deg: number): DisplayObject {
		quat.rotateY(this._rotation, this._rotation, glMatrix.toRadian(deg));
		this._dirtyWorldMatrix = this._dirtyLocalMatrix = true;
		return this;
	}

	public rotateZ(deg: number): DisplayObject {
		quat.rotateZ(this._rotation, this._rotation, glMatrix.toRadian(deg));
		this._dirtyWorldMatrix = this._dirtyLocalMatrix = true;
		return this;
	}

	public setScale(scaleX: number, scaleY: number, scaleZ: number) {
		vec3.set(this._scale, scaleX, scaleY, scaleZ);
		this._dirtyWorldMatrix = this._dirtyLocalMatrix = true;
		return this;
	}

	public render(_rasterizer: GLRasterizer, _matrix: mat4) {}

	protected updateWorldMatrix(parentWorldMatrix: mat4, dirty: boolean): void {
		if (dirty || this._dirtyWorldMatrix) {
			mat4.multiply(this._worldMatrix, parentWorldMatrix, this._localMatrix);
			this._dirtyWorldMatrix = false;
		}
		const size = this._children.length;
		for (let i = 0; i < size; i++) {
			this._children[i].updateWorldMatrix(this._worldMatrix, dirty);
		}
	}

	[SystemSymbols.updateWorldMatrix] = this.updateWorldMatrix;
}