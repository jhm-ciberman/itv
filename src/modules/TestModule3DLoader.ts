import ModuleLoader from "./ModuleLoader";
import Module from "./Module";
import TestModule from "./TestModule3D";
import Stage from "../renderer/Stage";
import MeshRenderer from "../nodes/MeshRenderer";
import GLTexture from "../gl/GLTexture";
import CubeMesh from "../renderer/mesh/CubeMesh";
import Sprite from "../nodes/Sprite";
import DisplayObject from "../nodes/DisplayObject";
import PerspectiveCamera from "../nodes/projection/PerspectiveProjection";

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


		const renderer2 = new MeshRenderer(mesh, texture);
		renderer2.setPosition(2, 0, -5);

		const floor = new MeshRenderer(mesh, texture);
		floor.setPosition(0, -2, 0).setScale(5, 1, 5);

		const root = new DisplayObject();
		root.addChild(renderer);
		root.addChild(renderer2);
		root.addChild(floor);

		stage.rootNode = root;

		const cam = new PerspectiveCamera(45, 800 / 600);

		stage.camera = cam;
		return new TestModule(renderer, cam);


	}

}