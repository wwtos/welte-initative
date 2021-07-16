export function sendOffer(ws, sdp) {
    ws.send(JSON.stringify({
        "type": "organ-strem-offer",
        "body": {
            "sdp": sdp
        }
    }))
}
