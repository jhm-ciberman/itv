import RendererWindow from "./RendererWindow";

const r = new RendererWindow();
r.init().catch(e => {
	console.error(e);
})


