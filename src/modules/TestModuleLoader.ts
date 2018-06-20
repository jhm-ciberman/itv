import ModuleLoader from "./ModuleLoader";
import Module from "./Module";
import TestModule from "./TestModule";
import Material from "../renderer/Material";
import GLTexture from "../gl/GLTexture";
import MeshRenderer from "../nodes/MeshRenderer";
import Cube from "../renderer/mesh/Cube";
import Stage3D from "../renderer/Stage3D";

export default class TestModuleLoader extends ModuleLoader {



	public async load(gl: WebGL2RenderingContext, stage: Stage3D): Promise<Module> {
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