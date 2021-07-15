<script>
    import Button from "./Button.svelte";
    import StopText from "./StopText.svelte";

    export let spriteSrcs;
    export let x;
    export let y;
    export let rotation = 0;

    export let name;
    export let length;
    export let abbreviation;

    export let textColor;

    const width = 72;
    const height = 90;

    const nameTextSize = 10;
    const lengthTextSize = 16;
    const abbreviationTextSize = 12;

    let spriteIndex = 0;
    $: textOffset = (spriteIndex === 1 ? 10 : 0);

    function toggle() {
        spriteIndex = spriteIndex ? 0 : 1;
    }
</script>

<Button {spriteIndex} {spriteSrcs} {x} {y} {width} {height} {rotation} on:click={toggle}></Button>

{#if length && abbreviation && name}
<g class="name">
    <StopText x={x + width / 2} y={y + 16 + textOffset} textSize={nameTextSize} text={name} ref="name" />
</g>
<text x={x + width / 2} y={y + 41 + textOffset} alignment-baseline="middle" fill={textColor} class="length" style="--text-size: {lengthTextSize}px">
    {length}
</text>
<text x={x + width / 2} y={y + 60 + textOffset} alignment-baseline="middle" fill={textColor} class="abbreviation" style="--text-size: {abbreviationTextSize}px">
    {abbreviation}
</text>
{/if}

<style>
.name {
    font-style: italic;
}

text {
    text-anchor: middle;
    user-select: none;
    pointer-events: none;
    font-size: var(--text-size);
}
</style>