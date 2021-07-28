export function sendOffer(ws, sdp) {
    ws.send(JSON.stringify({
        "type": "organist-stream-offer",
        "body": {
            "sdp": sdp
        }
    }));
}

export function askForOrganId(ws) {
    ws.send(JSON.stringify({
        "type": "get-organ-id"
    }));
}
