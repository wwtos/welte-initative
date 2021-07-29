<script>
	import { writable } from 'svelte/store';

	import Organ from "$lib/organ/Organ.svelte";
	import DeviceSelector from "$lib/midi/DeviceSelector.svelte";
	import OrganistCaller from "$lib/rtc/OrganistCaller.svelte";

	const inputMidiDeviceStore = writable();
	const nextMidiMessage = writable();

	let lastInputMidiDevice;

	function handleMidi(midi) {
		nextMidiMessage.update(_ => midi);
	}

	inputMidiDeviceStore.subscribe(inputMidiDevice => {
		if(inputMidiDevice) {
			if(lastInputMidiDevice) {
				lastInputMidiDevice.removeEventListener("midimessage", handleMidi);
			}

			inputMidiDevice.addEventListener("midimessage", handleMidi);

			lastInputMidiDevice = inputMidiDevice;
		}
	});
</script>

<svelte:head>
	<title>Welcome</title>
</svelte:head>

<OrganistCaller {nextMidiMessage} />
<DeviceSelector {inputMidiDeviceStore} listInputs="true" />
<Organ />
