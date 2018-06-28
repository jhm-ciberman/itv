export default class RemotePeerConnection {

	public pc: RTCPeerConnection;
	constructor(video: HTMLVideoElement) {
		this.pc = new RTCPeerConnection(null as any);
		this.pc.addEventListener("addstream", (e) => {
			console.log("On addstream!!");
			video.srcObject = e.stream;
		});
	}


	public async makeAnswer(sdp: string): Promise<string> {
		const offer = new RTCSessionDescription({ type: "offer", sdp: sdp });
		await this.pc.setRemoteDescription(offer as RTCSessionDescriptionInit);
		const promise = new Promise<string>((resolve) => {
			console.log("remote");
			this.pc.addEventListener("icecandidate", ev => {
				console.log("icecandidate", ev);
				if (!ev.candidate && this.pc.localDescription && this.pc.localDescription.sdp) {
					// use SDP text with all candidate
					resolve(this.pc.localDescription.sdp)
				}
			});
		});
		const answer = await this.pc.createAnswer();
		console.log("answer");
		this.pc.setLocalDescription(answer);
		return promise;
	}

	public close() {
		this.pc.close();
	}

}

/*
import RemotePeerConnection from './RemotePeerConnection';
import { ipcRenderer } from 'electron';
const video = document.getElementById("video") as HTMLVideoElement;


const remotePeerConnection = new RemotePeerConnection(video);
ipcRenderer.on("offer", async (_e: Event, spd: string) => {
	const answerSpd = await remotePeerConnection.makeAnswer(spd);
	ipcRenderer.send("answer", answerSpd);
});

*/