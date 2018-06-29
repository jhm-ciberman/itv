import { EventEmitter } from "events";
import GLRasterizer from "../renderer/gl/GLRasterizer";
import Transform from "../math/Transform";


export default class DisplayObject extends EventEmitter {
	protected _children: DisplayObject[] = [];
	protected _parent: DisplayObject | null = null;
	public readonly transform: Transform = new Transform(this);

	public [Symbol.iterator]() {
		return this._children[Symbol.iterator]();
	}

	get children(): IterableIterator<DisplayObject> {
		return this._children[Symbol.iterator]();
	}

	get parent(): DisplayObject | null {
		return this._parent;
	}

	public addChild(node: DisplayObject): void {
		if (node._parent !== null) {
			throw new Error("The node already has a parent. You must remove it first");
		}
		node._parent = this;
		node.transform.worldMatrixIsDirty = true;
		this._children.push(node);
	}

	public removeChild(node: DisplayObject) {
		var n = this._children.indexOf(node);
		if (n >= 0) {
			node._parent = null;
			this._children.splice(n, 1);
		}
	}

	public render(_rasterizer: GLRasterizer) {}



	public setPosition(x: number, y: number, z?: number): this {
		this.transform.position = this.transform.position.set(x, y, z);
		return this;
	}

	public setScale(scaleX: number, scaleY: number, scaleZ?: number): this {
		this.transform.scale = this.transform.scale.set(scaleX, scaleY, scaleZ);
		return this;
	}

	public rotateX(deg: number): this {
		this.transform.rotation = this.transform.rotation.rotateX(deg);
		return this;
	}

	public rotateY(deg: number): this {
		this.transform.rotation = this.transform.rotation.rotateY(deg);
		return this;
	}

	public rotateZ(deg: number): this {
		this.transform.rotation = this.transform.rotation.rotateZ(deg);
		return this;
	}

}