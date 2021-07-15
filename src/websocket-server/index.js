import WebSocket from 'ws';
import {getSession} from '../lib/db/connect.js';

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
                case "organ-stream-offer":
                    organWebsocket.send(JSON.stringify({
                        "type": "organ-stream-offer",
                        "body": {
                            "sdp": request.body.sdp,
                            "from": ws.uid
                        }
                    }));
                break;
                case "organ-stream-answer":
                    websockets.find(websocket => websocket.uid === request.body.to).send(JSON.stringify({
                        "type": "organ-stream-answer",
                        "body": {
                            "sdp": request.body.sdp,
                            "from": ws.uid
                        }
                    }));
                break;
                case "organist-ice-candidate":
                    organWebsocket.send(JSON.stringify({
                        "type": "organist-ice-candidate",
                        "body": {
                            "candidate": request.body.candidate
                        }
                    }));
                break;
                case "organ-ice-candidate":
                    websockets.find(websocket => websocket.uid === request.body.to).send(JSON.stringify({
                        "type": "organ-ice-candidate",
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