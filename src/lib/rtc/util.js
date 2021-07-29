export function createPeerConnection(config) {
    const myPeerConnection = new RTCPeerConnection({
        iceServers: [     // Information about ICE servers - Use your own!
          {
            urls: "stun:stun.stunprotocol.org"
          }
        ]
    });

    myPeerConnection.onicecandidate = config.handleICECandidateEvent;
    myPeerConnection.ontrack = config.handleTrackEvent;
    myPeerConnection.ondatachannel = config.handleDataChannelEvent;
    myPeerConnection.onnegotiationneeded = config.handleNegotiationNeededEvent;
    myPeerConnection.onremovetrack = config.handleRemoveTrackEvent;
    myPeerConnection.oniceconnectionstatechange = config.handleICEConnectionStateChangeEvent;
    myPeerConnection.onicegatheringstatechange = config.handleICEGatheringStateChangeEvent;
    myPeerConnection.onsignalingstatechange = config.handleSignalingStateChangeEvent;

    return myPeerConnection;
}