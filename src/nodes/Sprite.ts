import { mat4 } from "gl-matrix";
import GLTexture from "../gl/GLTexture";
import DisplayObject from "./DisplayObject";
import GLRasterizer from "../gl/GLRasterizer";

export default class Sprite extends DisplayObject {

	public texture: GLTexture | null = null;

	constructor() {
		super();
	}

	public render(rasterizer: GLRasterizer, matrix: mat4) {
		if (this.texture) {
			rasterizer.drawQuad(matrix, this.texture);
		}
	}
}