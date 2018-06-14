import SystemSymbols from "../SystemSymbols";
import { mat4 } from "gl-matrix";

export default class Node {

	protected _children: Node[] = [];


	constructor() {

	}

	[SystemSymbols.childItems]: Node[] = this._children;

	[SystemSymbols.renderItself](worldMatrix: mat4) {
		this._renderItself(worldMatrix);
	}

	protected _renderItself(worldMatrix: mat4) {
		this._renderChildren(worldMatrix);
	}

	protected _renderChildren(worldMatrix: mat4) {
		const size = this._children.length;
		for (let i = 0; i < size; i++) {
			this._children[i]._renderItself(worldMatrix);
		}
	}

	public [Symbol.iterator]() {
		return this._children[Symbol.iterator]();
	}

	get children() {
		return this._children[Symbol.iterator]();
	}

	public addChild(node: Node): void {
		this._children.push(node);
	}

	public removeChild(node: Node) {
		var n = this._children.indexOf(node);
		if (n >= 0) {
			this._children.splice(n, 1);
		}
	}


}