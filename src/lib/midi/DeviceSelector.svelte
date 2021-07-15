<script>
    import { onMount } from 'svelte';

    export let listInputs = false;
    export let listOutputs = false;

    let midi = null;

    let midiInputs = [];
    let midiOutputs = [];

    function initDeviceList() {
        if(listInputs) {
            midiInputs = [...midi.inputs];
        }

        if(listOutputs) {
            midiOutputs = [...midi.outputs];
        }
    }

    function onMIDISuccess(midiAccess) {
        midi = midiAccess;

        midi.addEventListener("statechange", initDeviceList);

        initDeviceList();
    }

    function onMIDIFailure() {
        alert("Cannot run this program without MIDI access.");
    }

    onMount(async () => {
        navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
    });
</script>

{#if listInputs}
    Inputs:
    <select>
        {#each midiInputs as device}
            <option>{ device.name }</option>
        {/each}
    </select>
{/if}

{#if listOutputs}
    Outputs:
    <select>
        {#each midiOutputs as device}
            <option value={device[0]}>{ device[1].name }</option>
        {/each}
    </select>
{/if}