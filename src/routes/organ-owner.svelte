<script>
	import { writable } from 'svelte/store';

	import Organ from "$lib/organ/Organ.svelte";
	import DeviceSelector from "$lib/midi/DeviceSelector.svelte";
	import LocalAV from "$lib/rtc/LocalAV.svelte";
	import OrganCaller from "$lib/rtc/OrganCaller.svelte";

	const outputMidiDeviceStore = writable();
	const mediaStreamStore = writable();
	const incomingMidiStore = writable();

	let midiDeviceToSendTo;

	function handleMidi(midi) {
		if(midiDeviceToSendTo) {
			midiDeviceToSendTo.send(midi);
		}
	}

	incomingMidiStore.subscribe(midi => {
		if(midi) {
			handleMidi(new Uint8Array(midi));
		}
	});

	outputMidiDeviceStore.subscribe(outputMidiDevice => {
		if(outputMidiDevice) {
			midiDeviceToSendTo = outputMidiDevice;
			midiDeviceToSendTo.open();
		}
	});
</script>

<svelte:head>
	<title>Welcome</title>
</svelte:head>

<OrganCaller {mediaStreamStore} {incomingMidiStore} />
<LocalAV {mediaStreamStore} />
<DeviceSelector {outputMidiDeviceStore} listOutputs="true" />
<Organ />
