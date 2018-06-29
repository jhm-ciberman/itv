export class SlaveWindow {

	private _canvas: HTMLCanvasElement;
	private _ctx: CanvasRenderingContext2D;

	constructor(window: Window) {
		this._canvas = window.document.getElementById("canvas") as HTMLCanvasElement;
		this._ctx = this._canvas.getContext("2d", { alpha: false }) as CanvasRenderingContext2D;
	}

	public showCanvas(canvas: HTMLCanvasElement) {
		this._ctx.drawImage(canvas, 0, 0);
	}

	public resize(width: number, height: number) {
		this._canvas.width = width;
		this._canvas.height = height;
	}
}