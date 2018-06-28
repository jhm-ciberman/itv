import { ipcRenderer } from "electron";

declare global {
	interface HTMLCanvasElement {
		captureStream(frameRate?: number): CanvasCaptureMediaStream;
	}
	interface CanvasCaptureMediaStream extends MediaStream {
		canvas: HTMLCanvasElement;
	}
}


export default class LocalPeerConnection {

	public pc: RTCPeerConnection;

	constructor(stream: MediaStream) {
		this.pc = new RTCPeerConnection(null as any);
		this.pc.addStream(stream);
		console.log("ready!");
	}

	public async makeOffer(): Promise<string> {
		const promise = new Promise<string>((resolve) => {
			this.pc.addEventListener("icecandidate", (ev: RTCPeerConnectionIceEvent) => {
				console.log("icecandidate", ev);
				if (!ev.candidate && this.pc.localDescription && this.pc.localDescription.sdp) {
					// use SDP text with all candidate
					resolve(this.pc.localDescription.sdp);
				}
			});
		})
		const offer = await this.pc.createOffer();
		console.log("offer", offer);
		await this.pc.setLocalDescription(offer);
		return promise;
	}

	public close() {
		this.pc.close();
	}

	public async setRemoteDescription(sdp: string) {
		const answer = new RTCSessionDescription({ type: "answer", sdp: sdp });

		await this.pc.setRemoteDescription(answer as RTCSessionDescriptionInit);
	}


	public static async createConnection(canvas: HTMLCanvasElement): Promise<void> {
		const stream = canvas.captureStream(60);
		const localPeerConnection = new LocalPeerConnection(stream);
		const sdp = await localPeerConnection.makeOffer();
		return new Promise<void>((resolve) => {
			ipcRenderer.on("answer", (_e: Event, spd: string) => {
				localPeerConnection.setRemoteDescription(spd);
				resolve();
			});
			ipcRenderer.send("offer", sdp);
		});
	}
}