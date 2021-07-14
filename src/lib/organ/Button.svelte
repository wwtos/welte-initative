<script>
    export let spriteSrcs;
    export let spriteIndex = 0;
    export let x;
    export let y;
    export let width;
    export let height;
    export let rotation = 0;
</script>

<image href={spriteSrcs[spriteIndex]} {x} {y} {width} {height} transform="rotate({rotation} {x + width / 2} {y + height / 2})" preserveAspectRatio="none" style="cursor: pointer;" on:click />
