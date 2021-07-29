<script>
    import { onMount } from 'svelte';

    export let inputMidiDeviceStore;
    export let outputMidiDeviceStore;

    export let listInputs = false;
    export let listOutputs = false;

    let midi = null;

    let midiInputs = [];
    let midiOutputs = [];

    let inputDeviceId;
    let outputDeviceId;

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

    function midiInputChanged() {
        if(listInputs) {
            inputMidiDeviceStore.update(_ => midi.inputs.get(inputDeviceId));
        }
    }

    function midiOutputChanged() {
        if(listOutputs) {
            outputMidiDeviceStore.update(_ => midi.outputs.get(outputDeviceId));
        }
    }

    onMount(async () => {
        navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
    });
</script>

{#if listInputs}
    Inputs:
    <select bind:value={inputDeviceId} on:change={midiInputChanged}>
        {#each midiInputs as device}
            <option value={device[0]}>{ device[1].name }</option>
        {/each}
    </select>
{/if}

{#if listOutputs}
    Outputs:
    <select bind:value={outputDeviceId} on:change={midiOutputChanged}>
        {#each midiOutputs as device}
            <option value={device[0]}>{ device[1].name }</option>
        {/each}
    </select>
{/if}