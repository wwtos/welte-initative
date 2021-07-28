export function sendAnswer(ws, sdp, to) {
    ws.send(JSON.stringify({
        "type": "organ-stream-answer",
        "body": {
            "to": to,
            "sdp": sdp
        }
    }));
}

export function sendIsOrgan(ws) {
    ws.send(JSON.stringify({
        "type": "am-organ"
    }))
}
