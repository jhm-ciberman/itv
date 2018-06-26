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
		const image1 = await this._loadImage("sonny.jpg");
		const image2 = await this._loadImage("atm_cash.png");

		const sprite = new Sprite();


		const mesh = new CubeMesh(gl);
		const texture1 = new GLTexture(gl, image1);
		const texture2 = new GLTexture(gl, image2);
		const renderer = new MeshRenderer(mesh, texture1);

		renderer.setPosition(0, 0, -5);


		const renderer2 = new MeshRenderer(mesh, texture2);
		renderer2.setPosition(2, 0, -5);

		const floor = new MeshRenderer(mesh, texture1);
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