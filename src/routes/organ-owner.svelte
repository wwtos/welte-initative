<script>
	import { writable } from 'svelte/store';

	import Organ from "$lib/organ/Organ.svelte";
	import DeviceSelector from "$lib/midi/DeviceSelector.svelte";
	import LocalAV from "$lib/rtc/LocalAV.svelte";
	import OrganCaller from "$lib/rtc/OrganCaller.svelte";

	const mediaStreamStore = writable();
</script>

<svelte:head>
	<title>Welcome</title>
</svelte:head>

<OrganCaller {mediaStreamStore} />
<LocalAV {mediaStreamStore} />
<DeviceSelector listOutputs="true" />
<Organ />
