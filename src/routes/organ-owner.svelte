<script>
	import Organ from "$lib/organ/Organ.svelte";
	import DeviceSelector from "$lib/midi/DeviceSelector.svelte";
</script>

<svelte:head>
	<title>Welcome</title>
</svelte:head>

<DeviceSelector listOutputs="true" />
<Organ />
