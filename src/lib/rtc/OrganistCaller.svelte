<script>
    import { OrganistConnection } from '$lib/rtc/organist-util.js';

    import config from '../../../config.js';

    export let nextMidiMessage;

    let connection;

    function offer() {
        connection.createPeerConnection();
        connection.addTracks();
    }

    nextMidiMessage.subscribe(message => {
        if(message) {
            const data = message.data;
            
            if(connection && connection.midiChannel) {
                connection.midiChannel.send(data);
            }
        }
    });

    function prime() {
        const ws = new WebSocket(config.wsAddress);

        ws.onopen = () => {
            connection = new OrganistConnection({
                send: message => {
                    ws.send(message);
                }
            }, document.getElementById("remote-video"));

            connection.askForOrganId();
        };
        
        ws.onmessage = (event) => {
            const msg = JSON.parse(event.data);

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
    <video id="remote-video" autoplay></video>
    <button on:click={prime}>Start call</button>
</div>

<style>
div {
    border: 1px solid #aaa;
}
</style>