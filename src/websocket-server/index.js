import WebSocket from 'ws';

const wss = new WebSocket.Server({
    port: 3001
});

let websockets = [];

let organWebsocket = null;

let uid = 0;

function respond(to, message) {
    console.log("sent", JSON.stringify(message), "to ", to.uid);
    to.send(JSON.stringify(message));
}

wss.on('connection', ws => {
    ws.uid = uid++;
    websockets.push(ws);

    console.log("connection");

    ws.on('message', message => {
        const request = JSON.parse(message);

        console.log(request);

        if(request.type) {
            switch(request.type) {
                case "organist-stream-offer":
                    respond(organWebsocket, {
                        "type": "organist-stream-offer",
                        "from": ws.uid,
                        "body": {
                            "sdp": request.body.sdp
                        }
                    });
                break;
                case "organ-stream-answer":
                    respond(websockets.find(websocket => websocket.uid === request.body.to), {
                        "type": "organ-stream-answer",
                        "from": ws.uid,
                        "body": {
                            "sdp": request.body.sdp
                        }
                    });
                break;
                case "ice-candidate":
                    respond(websockets.find(websocket => websocket.uid === request.body.to), {
                        "type": "ice-candidate",
                        "from": ws.uid,
                        "body": {
                            "candidate": request.body.candidate
                        }
                    });
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