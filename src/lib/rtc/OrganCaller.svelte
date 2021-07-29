<script>
    import { onMount } from 'svelte';

    import { OrganConnection } from '$lib/rtc/organ-util.js';

    export let mediaStreamStore;
    export let incomingMidiStore;

    let connection;

    function handleMidi(midi) {
        incomingMidiStore.update(_ => midi.data);
    }

    function prime() {
        const ws = new WebSocket("ws://localhost:3001");

        ws.onopen = () => {
            mediaStreamStore.subscribe(stream => {
                if(!stream) return;

                connection = new OrganConnection(ws, stream);

                connection.identifyAsOrgan();

                connection.on("datachannel", channel => {
                    channel.addEventListener("message", handleMidi);
                });
            });
        };
        
        ws.onmessage = (event) => {
            const msg = JSON.parse(event.data);

            switch(msg.type) {
                case "organist-stream-offer":
                    connection.handleOfferMsg(msg);
                break;
            }
        };
    }
</script>

<div>
    <button on:click={prime}>Connect to server</button>
</div>

<style>
div {
    border: 1px solid #aaa;
}
</style>