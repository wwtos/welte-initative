export function createPeerConnection(config) {
    const myPeerConnection = new RTCPeerConnection({
        iceServers: []
    });

    myPeerConnection.onicecandidate = config.handleICECandidateEvent;
    myPeerConnection.ontrack = config.handleTrackEvent;
    myPeerConnection.onnegotiationneeded = config.handleNegotiationNeededEvent;
    myPeerConnection.onremovetrack = config.handleRemoveTrackEvent;
    myPeerConnection.oniceconnectionstatechange = config.handleICEConnectionStateChangeEvent;
    myPeerConnection.onicegatheringstatechange = config.handleICEGatheringStateChangeEvent;
    myPeerConnection.onsignalingstatechange = config.handleSignalingStateChangeEvent;

    return myPeerConnection;
}