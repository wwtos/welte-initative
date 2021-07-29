<script>
    import { onMount } from 'svelte';

    export let mediaStreamStore;

    let audioSources = [];
    let videoSources = [];

    let audioSource;
    let videoSource;

    $: requestMedia(audioSource, videoSource);

    async function requestMedia(audioId, videoId) {
        const mediaConstraints = {
            audio: audioId ? {deviceId: audioId} : true,
            video: /*videoId ? {deviceId: videoId} : true*/ false
        };

        const devices = await navigator.mediaDevices.enumerateDevices();

        audioSources = devices.filter(device => device.kind === "audioinput");
        //videoSources = devices.filter(device => device.kind === "videoinput");

        navigator.mediaDevices.getUserMedia(mediaConstraints).then(localStream => {
            mediaStreamStore.update(_ => localStream);
            document.getElementById("local_video").srcObject = localStream;
        });
    }

    onMount(async () => {
        await requestMedia();

        navigator.mediaDevices.addEventListener("devicechange", async () => {
            const devices = await navigator.mediaDevices.enumerateDevices();

            audioSources = devices.filter(device => device.kind === "audioinput");
            videoSources = devices.filter(device => device.kind === "videoinput");
        });
    });
</script>

<video id="local_video" autoplay muted>
</video>

Audio:
<select bind:value={audioSource}>
    {#each audioSources as audioSource}
        <option value={audioSource.deviceId}>{audioSource.label}</option>
    {/each}
</select>
Video:
<select bind:value={videoSource}>
    {#each videoSources as videoSource}
        <option value={videoSource.deviceId}>{videoSource.label}</option>
    {/each}
</select>