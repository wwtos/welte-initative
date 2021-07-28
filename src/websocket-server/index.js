import WebSocket from 'ws';

const wss = new WebSocket.Server({
    port: 3001
});

let websockets = [];

let organWebsocket = null;

let uid = 0;

wss.on('connection', ws => {
    ws.uid = uid++;
    websockets.push(ws);

    ws.on('message', message => {
        const request = JSON.parse(message);

        if(request.type) {
            switch(request.type) {
                case "organist-stream-offer":
                    organWebsocket.send(JSON.stringify({
                        "type": "organist-stream-offer",
                        "from": ws.uid,
                        "body": {
                            "sdp": request.body.sdp
                        }
                    }));
                break;
                case "organ-stream-answer":
                    websockets.find(websocket => websocket.uid === request.body.to).send(JSON.stringify({
                        "type": "organ-stream-answer",
                        "from": ws.uid,
                        "body": {
                            "sdp": request.body.sdp
                        }
                    }));
                break;
                case "ice-candidate":
                    websockets.find(websocket => websocket.uid === request.body.to).send(JSON.stringify({
                        "type": "ice-candidate",
                        "from": ws.uid,
                        "body": {
                            "candidate": request.body.candidate
                        }
                    }));
                break;
                case "am-organ":
                    organWebsocket = ws;
                break;
            }
        }

        console.log('received: %s', request);
    });

    ws.on("close", () => {
        websockets = websockets.filter(websocket => websocket !== ws);
    })

    ws.send('something');
});