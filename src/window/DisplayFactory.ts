import { DisplayWindow } from "./DisplayWindow";
import Shader from "../resources/Shader";

export class DisplayWindowFactory {

	private _defaultShader: Shader;
	constructor(defaultShader: Shader) {
		this._defaultShader = defaultShader;
	}

	public open(htmlCanvasToShow: HTMLCanvasElement): Promise<DisplayWindow> {

		return new Promise((resolve) => {

			const newWindow = window.open("other.html") as Window;

			newWindow.addEventListener("load", () => {
				const dw = new DisplayWindow(htmlCanvasToShow, this._defaultShader);
				dw.window = newWindow;
				resolve(dw);
			});

		});
	}
}