import {sendOffer, askForOrganId} from "../ws/organist-ws.js";
import {sendIceCandidate} from "../ws/ws.js";

import {createPeerConnection} from "./util.js";

const OrganistConnection = function(ws, videoElement) {
    this.ws = ws;
    this.videoElement = videoElement;
    this.peerConnection = null;
    this.peerId = -1;

    this.handleNegotiationNeededEvent = this.handleNegotiationNeededEvent.bind(this);

    this.handleICECandidateEvent = this.handleICECandidateEvent.bind(this);
    this.handleRemoteICECandidateEvent = this.handleRemoteICECandidateEvent.bind(this);

    this.handleTrackEvent = this.handleTrackEvent.bind(this);
    this.handleRemoveTrackEvent = this.handleRemoveTrackEvent.bind(this);
};

OrganistConnection.prototype.askForOrganId = function() {
    askForOrganId(this.ws);
};

OrganistConnection.prototype.createPeerConnection = function() {
    this.peerConnection = createPeerConnection(this);
};

OrganistConnection.prototype.addDataTrack = function() {
    this.peerConnection.createDataChannel("MIDI");
};

OrganistConnection.prototype.handleNegotiationNeededEvent = async function() {
    console.log("negotiation needed");

    const offer = await this.peerConnection.createOffer({
        'mandatory': {
            'OfferToReceiveAudio': true,
            'OfferToReceiveVideo': true
        }
    });
    
    await this.peerConnection.setLocalDescription(offer);

    sendOffer(this.ws, this.peerConnection.localDescription);
};

OrganistConnection.prototype.handleAnswerMsg = async function(msg) {
    const description = new RTCSessionDescription(msg.body.sdp);

    this.peerId = msg.from;

    await this.peerConnection.setLocalDescription(description);
};

OrganistConnection.prototype.handleICECandidateEvent = function(event) {
    if (event.candidate) {
        sendIceCandidate(this.ws, event.candidate, this.peerId);
    }
};

OrganistConnection.prototype.handleRemoteICECandidateEvent = function(msg) {
    const candidate = new RTCIceCandidate(msg.body.candidate);

    this.peerConnection.addIceCandidate(candidate); // TODO: catch errors
};

OrganistConnection.prototype.handleTrackEvent = function(event) {
    this.videoElement.srcObject = event.streams[0];
};

OrganistConnection.prototype.handleRemoveTrackEvent = function() {
    // var stream = document.getElementById("received_video").srcObject;
    // var trackList = stream.getTracks();
  
    // if (trackList.length === 0) {
    //   closeVideoCall();
    // }
};

export { OrganistConnection };
