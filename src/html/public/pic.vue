<template id="pic">
    <img onload="tea.loadImage(this)" :src="src || '../../image/holder_car.png'" :data-url="website + url">
</template>

<script>
export default {
    name: 'pic',
    template: '#pic',
    props: ['src', 'url']
}
</script>
