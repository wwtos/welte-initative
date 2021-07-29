import config from '../../../config.js';

export function createWebsocket() {
    const ws = new WebSocket(config.wsAddress);

    return ws;
}

export function sendIceCandidate(ws, candidate, to) {
    ws.send(JSON.stringify({
        "type": "ice-candidate",
        "body": {
            "to": to,
            "candidate": candidate
        }
    }))
}
