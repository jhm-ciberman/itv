import ModuleLoader from "./ModuleLoader";
import Module from "./Module";
import TestModule from "./TestModule3D";
import MeshRenderer from "../nodes/MeshRenderer";
import PerspectiveCamera from "../nodes/projection/PerspectiveCamera";
import Texture from "../resources/Texture";
import CubeMesh from "../resources/CubeMesh";
import Viewport from "../window/Viewport";

export default class TestModule3DLoader extends ModuleLoader {



	public async load(viewport: Viewport): Promise<Module> {
		const image1 = await this._loadImage("sonny.jpg");
		const image2 = await this._loadImage("atm_cash.png");

		const s = 2;
		const mesh = new CubeMesh();
		const texture1 = new Texture(image1);
		const texture2 = new Texture(image2);
		// Sonny
		const renderer = new MeshRenderer(mesh, texture1);
		renderer.setScale(s, s, s);
		renderer.setPosition(0, 0, 10);


		// Bill
		const renderer2 = new MeshRenderer(mesh, texture2);
		renderer2.setScale(s,s,s);
		renderer2.setPosition(2, 0, -10);

		const floor = new MeshRenderer(mesh, texture1);
		floor.setPosition(0, -2, 0).setScale(5, 1, 5);

		viewport.scene.addChild(renderer);
		viewport.scene.addChild(renderer2);
		viewport.scene.addChild(floor);

		const cam = new PerspectiveCamera(45);
		//const ss = 10;
		//const cam = new OrthographicCamera(-ss, ss, ss, -ss, -100, 100);

		viewport.camera = cam;
		return new TestModule(renderer, cam);


	}

}