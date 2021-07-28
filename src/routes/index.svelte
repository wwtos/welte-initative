<script>
	import Organ from "$lib/organ/Organ.svelte";
	import DeviceSelector from "$lib/midi/DeviceSelector.svelte";
	import OrganistCaller from "$lib/rtc/OrganistCaller.svelte";
</script>

<svelte:head>
	<title>Welcome</title>
</svelte:head>

<OrganistCaller />
<DeviceSelector listInputs="true" />
<Organ />
