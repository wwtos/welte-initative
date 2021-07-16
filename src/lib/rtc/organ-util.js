import {createPeerConnection} from "./util.js";

import {sendAnswer, sendIceCandidate} from "../ws/organ-ws.js";

export function getConnectionConfig(state) {
    return {
        handleICECandidateEvent(event) {
            if (event.candidate) {
                sendIceCandidate({
                    type: "new-ice-candidate",
                    target: targetUsername,
                    candidate: event.candidate
                });
            }
        }
    };
}

function handleOrganistOffer(ws, wsMessage, stream) {
    let localStream;

    const myPeerConnection = createPeerConnection({});

    const desc = new RTCSessionDescription(wsMessage.body.sdp);

    myPeerConnection.setRemoteDescription(desc).then(() => {
        localStream = stream;

        localStream.getTracks().forEach(track => myPeerConnection.addTrack(track, localStream));
    }).then(() => {
        return myPeerConnection.createAnswer();
    }).then(answer => {
        return myPeerConnection.setLocalDescription(answer);
    }).then(() => {
        sendAnswer(ws, wsMessage.body.sdp, wsMessage.body.to);
    })


}