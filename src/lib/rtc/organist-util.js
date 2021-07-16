import {sendOffer} from "../ws/organist-ws.js";
import {sendIceCandidate} from "../ws/ws.js";

import {createPeerConnection} from "./util.js";

const OrganistConnection = function(ws) {
    this.ws = ws;
    this.peerConnection = null;
    this.peerId = -1;

    this.handleICECandidateEvent = this.handleICECandidateEvent.bind(this);
    this.handleRemoteICECandidateEvent = this.handleRemoteICECandidateEvent.bind(this);
};

OrganistConnection.prototype.open = function() {
    this.peerConnection = createPeerConnection({
        handleICECandidateEvent: this.handleICECandidateEvent
    });
};

OrganistConnection.prototype.sendOffer = async function() {
    const offer = await this.peerConnection.createOffer({
        'mandatory': {
            'OfferToReceiveAudio': true,
            'OfferToReceiveVideo': true
        }
    });
    
    await myPeerConnection.setLocalDescription(offer);

    sendOffer(this.ws, myPeerConnection.localDescription);
};

OrganistConnection.prototype.handleICECandidateEvent = function(event) {
    if (event.candidate) {
        sendIceCandidate(this.ws, event.candidate, this.peerId);
    }
};

OrganistConnection.prototype.handleRemoteICECandidateEvent(wsMessage) {
    const candidate = new RTCIceCandidate(wsMessage.body.candidate);


};

function handleTrackEvent() {

}

function handleNegotiationNeededEvent() {

}

function handleRemoveTrackEvent() {

}

function handleICEConnectionStateChangeEvent() {

}

function handleICEGatheringStateChangeEvent() {

}

function handleSignalingStateChangeEvent() {

}

export async function createOffer(ws, connectionConfig) {
    


}

export function handleAnswer(ws, answer) {

}