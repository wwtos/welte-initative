<script>
    import { createEventDispatcher } from 'svelte';

    import Button from "./Button.svelte";
    import StopText from "./StopText.svelte";

    const dispatch = createEventDispatcher();

    export let config = {
        spriteSrcs: [],
        name: "",
        length: "",
        abbreviation: "",
        textColor: ""
    };

    let {
        spriteSrcs,
        name,
        length,
        abbreviation,
        textColor
    } = config;

    export let x;
    export let y;
    export let rotation = 0;
    export let id;

    const width = 72;
    const height = 90;

    const nameTextSize = 10;
    const lengthTextSize = 16;
    const abbreviationTextSize = 12;

    let spriteIndex = 0;
    $: textOffset = (spriteIndex === 1 ? 10 : 0);

    function toggle() {
        spriteIndex = spriteIndex ? 0 : 1;

        dispatch("change", {
            state: !!spriteIndex,
            id
        });
    }
</script>

<g class="stop">
    <Button {spriteIndex} {spriteSrcs} {x} {y} {width} {height} {rotation} on:click={toggle}></Button>

    {#if length && abbreviation && name}
    <g class="name" fill={textColor}>
        <StopText x={x + width / 2} y={y + 16 + textOffset} textSize={nameTextSize} text={name} ref="name" />
    </g>
    <text x={x + width / 2} y={y + 41 + textOffset} alignment-baseline="middle" fill={textColor} class="length" style="--text-size: {lengthTextSize}px">
        {length}
    </text>
    <text x={x + width / 2} y={y + 60 + textOffset} alignment-baseline="middle" fill={textColor} class="abbreviation" style="--text-size: {abbreviationTextSize}px">
        {abbreviation}
    </text>
    {/if}
</g>

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