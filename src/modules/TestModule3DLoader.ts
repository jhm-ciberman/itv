import ModuleLoader from "./ModuleLoader";
import Module from "./Module";
import TestModule from "./TestModule3D";
import Stage from "../renderer/Stage";
import MeshRenderer from "../nodes/MeshRenderer";
import GLTexture from "../gl/GLTexture";
import CubeMesh from "../renderer/mesh/CubeMesh";
import PerspectiveProjection from "../renderer/projection/PerspectiveProjection";
import Sprite from "../nodes/Sprite";
import OrthoProjection from "../renderer/projection/OrthoProjection";

export default class TestModule3DLoader extends ModuleLoader {



	public async load(gl: WebGL2RenderingContext, stage: Stage): Promise<Module> {
		const image = await this._loadImage("sonny.jpg");

		const sprite = new Sprite();

		sprite.setPosition(400, 300, 0);
		sprite.setScale(400, 300, 1);
		sprite.texture = new GLTexture(gl, image);


		const mesh = new CubeMesh(gl);
		const texture = new GLTexture(gl, image);
		const renderer = new MeshRenderer(mesh, texture);
		renderer.setPosition(0, 0, -5);


		stage.rootNode = renderer;
		stage.projection = new PerspectiveProjection();
		return new TestModule(renderer);


	}

}