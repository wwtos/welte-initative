<script>
    import { onMount } from 'svelte';

    import { OrganConnection } from '$lib/rtc/organ-util.js';

    export let mediaStreamStore;

    let connection;

    function prime() {
        const ws = new WebSocket("ws://localhost:3001");

        ws.onopen = () => {
            mediaStreamStore.subscribe(stream => {
                if(!stream) return;

                connection = new OrganConnection(ws, mediaStreamStore);

                connection.identifyAsOrgan();
            });
        };
        
        ws.onmessage = (event) => {
            const request = JSON.parse(event.data);

            switch(request.type) {
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