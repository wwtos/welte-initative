<script>
    import { OrganistConnection } from '$lib/rtc/organist-util.js';

    let connection;

    function offer() {
        connection.createPeerConnection();
        connection.addDataTrack();

        console.log(connection.peerConnection);
    }

    function prime() {
        const ws = new WebSocket("ws://localhost:3001");

        ws.onopen = () => {
            console.log("ws opened");

            connection = new OrganistConnection({
                send: message => {
                    console.log("sending", message);
                    ws.send(message);
                }
            }, document.getElementById("remote-video"));

            connection.askForOrganId();
        };
        
        ws.onmessage = (event) => {
            const msg = JSON.parse(event.data);

            console.log("got ", msg);

            switch(msg.type) {
                case "organ-id":
                    connection.peerId = msg.body;

                    offer();
                break;
                case "organ-stream-answer":
                    connection.handleAnswerMsg(msg);
                break;
                case "ice-candidate":
                    connection.handleRemoteICECandidateEvent(msg);
                break;
            }
        };
    }
</script>

<div>
    Call area
    <video id="remote-video"></video>
    <button on:click={prime}>Start call</button>
</div>

<style>
div {
    border: 1px solid #aaa;
}
</style>