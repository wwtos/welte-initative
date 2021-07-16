export function sendAnswer(ws, sdp, to) {
    ws.send(JSON.stringify({
        "type": "organ-stream-answer",
        "body": {
            "to": to,
            "sdp": sdp
        }
    }));
}
