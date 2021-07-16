export function createWebsocket() {
    const ws = new WebSocket("ws://localhost:3001");

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
