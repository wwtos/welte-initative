export function sendOffer(ws, sdp) {
    ws.send(JSON.stringify({
        "type": "organ-stream-offer",
        "body": {
            "sdp": sdp
        }
    }))
}
