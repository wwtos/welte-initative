import {createPeerConnection} from "./util.js";

import {sendAnswer, sendIsOrgan} from "../ws/organ-ws.js";
import {sendIceCandidate} from "../ws/ws.js";

const OrganConnection = function(ws, localStream) {
    this.ws = ws;
    this.peerConnection = null;
    this.peerId = -1;
    this.localStream = localStream;

    this.dataTrack;

    this.handleICECandidateEvent = this.handleICECandidateEvent.bind(this);
    this.handleRemoteICECandidateEvent = this.handleRemoteICECandidateEvent.bind(this);

    this.handleTrackEvent = this.handleTrackEvent.bind(this);
    this.handleRemoveTrackEvent = this.handleRemoveTrackEvent.bind(this);
};

OrganConnection.prototype.identifyAsOrgan = function() {
    sendIsOrgan(this.ws);
};

OrganConnection.prototype.handleOfferMsg = async function(msg) {
    this.peerId = msg.from;

    this.peerConnection = createPeerConnection(this);

    const desc = new RTCSessionDescription(msg.body.sdp);

    await this.peerConnection.setRemoteDescription(desc);
    await this.localStream.getTracks().forEach(track => this.peerConnection.addTrack(track, this.localStream));

    this.dataTrack = this.peerConnection.createDataChannel("MIDI");

    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);

    sendAnswer(this.ws, this.peerConnection.localDescription, msg.from);
};

OrganConnection.prototype.handleICECandidateEvent = function(event) {
    if (event.candidate) {
        sendIceCandidate(this.ws, event.candidate, this.peerId);
    }
};

OrganConnection.prototype.handleRemoteICECandidateEvent = function(msg) {
    const candidate = new RTCIceCandidate(msg.body.candidate);

    this.peerConnection.addIceCandidate(candidate); // TODO: catch errors
};

OrganConnection.prototype.handleTrackEvent = function(event) {
    
};

OrganConnection.prototype.handleRemoveTrackEvent = function() {
    // var stream = document.getElementById("received_video").srcObject;
    // var trackList = stream.getTracks();
  
    // if (trackList.length === 0) {
    //   closeVideoCall();
    // }
};

export { OrganConnection };
