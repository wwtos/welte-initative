<script>
    import Button from "./Button.svelte";

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

    const textSize = 10;

    let spriteIndex = 0;

    function toggle() {
        spriteIndex = spriteIndex ? 0 : 1;
    }
</script>

<Button {spriteIndex} {spriteSrcs} {x} {y} {width} {height} {rotation} on:click={toggle}></Button>

{#if length && abbreviation && name}
    <text x={x + width / 2} y={y + 10} alignment-baseline="hanging" fill={textColor} stroke="none" style="--text-size: {textSize}px">
        {#each name.split("\n") as line}
            <tspan x={x + width / 2} dy="1.1em">
                {line}
            </tspan>
        {/each}
    </text>
{/if}

<style>
    text {
        text-anchor: middle;
        user-select: none;
        pointer-events: none;
        font-size: var(--text-size);
        font-style: italic;
    }
</style>