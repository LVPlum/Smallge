
<template id="detailTemp">
    <div class="aui-list aui-card-list aui-list-noborder">
        <div class="aui-card-list-header aui-border-b">
            <div class="aui-list-item-title">
                {{config.title}}
            </div>
        </div>
        <div class="aui-card-list-content-padded">
            <div class="aui-list-item-text" v-for="(item, index) in config.content">
                <div class="aui-list-item-text" :class="item.leftClass">{{item.left}}</div>
                <div class="aui-list-item-right tea-text-title" :class="item.rightClass">
                    <span v-if="!item.type">{{item.right}}</span>
                    <pic class="insure-img" v-if="item.type == 'img'" :url="item.right"></pic>
                    <!-- <img class="insure-img" v-if="item.type == 'img'" onload="tea.loadImage(this)" :src="img" :data-url="website + item.right"> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import pic from 'public/pic.vue'

export default {
    name: 'detailList',
    template: '#detailTemp',
    props: ['config'],
    computed: {
        list: function(){
            return this.typeobj.profile();
        }   
    },
    components: {
        'pic': h => h(pic)
    }
}
</script>

<style>
    .insure-img {
        max-width: 5rem;
        max-height: 5rem;
    }
</style>