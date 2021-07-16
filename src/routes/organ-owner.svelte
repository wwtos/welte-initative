<script>
	import Organ from "$lib/organ/Organ.svelte";
	import DeviceSelector from "$lib/midi/DeviceSelector.svelte";
	import LocalAV from "$lib/rtc/LocalAV.svelte";
</script>

<svelte:head>
	<title>Welcome</title>
</svelte:head>

<LocalAV />
<DeviceSelector listOutputs="true" />
<Organ />
