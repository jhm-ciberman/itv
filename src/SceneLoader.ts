import Material from "./renderer/Material";
import GLTexture from "./gl/GLTexture";
import MeshRenderer from "./nodes/MeshRenderer";
import Cube from "./renderer/mesh/Cube";
import PerspectiveCamera from "./renderer/PerspectiveCamera";
import ShaderLoader from "./loading/ShaderLoader";

export default class SceneLoader {
	constructor() {
		
	}

	private async _loadImage(src: string): Promise<HTMLImageElement> {
		return new Promise<HTMLImageElement>((resolve) => {
			const image = new Image();
			image.src = src;  // MUST BE SAME DOMAIN!!!
			image.onload = function () {
				resolve(image);
			}
		});
	}

	public async load(gl: WebGL2RenderingContext) {
		const shaderLoader = new ShaderLoader(gl);
		const shader = await shaderLoader.load("./res/vertex.glsl", "./res/fragment.glsl");
		const image = await this._loadImage("../res/sonny.jpg");
		const mesh = new Cube(gl);
		const material = new Material(shader);
		material.texture = new GLTexture(gl, image);
		const node = new MeshRenderer(gl, mesh, material);
		return node;
	}


	public createCamera(gl: WebGL2RenderingContext): PerspectiveCamera {
		return new PerspectiveCamera(gl);
	}
	
}