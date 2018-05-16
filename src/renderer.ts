import RendererWindow from "./RendererWindow";

const r = new RendererWindow();
r.init().then(() => {
	r.render();
}).catch(e => {
	console.error(e);
})


