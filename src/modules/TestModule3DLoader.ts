import ModuleLoader from "./ModuleLoader";
import Module from "./Module";
import TestModule from "./TestModule3D";
import Stage from "../renderer/Stage";
import MeshRenderer from "../nodes/MeshRenderer";
import GLTexture from "../gl/GLTexture";
import Material from "../renderer/Material";
import Cube from "../renderer/mesh/Cube";

export default class TestModule3DLoader extends ModuleLoader {



	public async load(gl: WebGL2RenderingContext, stage: Stage): Promise<Module> {
		const shader = await this._loadShader("vertex.glsl", "fragment.glsl")
		const image = await this._loadImage("sonny.jpg");
		const mesh = new Cube(gl);
		const material = new Material(shader);
		material.texture = new GLTexture(gl, image);
		const renderer = new MeshRenderer(gl, mesh, material);
		stage.rootNode = renderer;
		return new TestModule(renderer);


	}

}