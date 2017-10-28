<template id="tab">
    <section class="aui-tab aui-border-b" style="border-bottom: 1px solid #ededed" @click="setIndex($event)">
        <div v-for="(item, i) in list" class="aui-tab-item" :class="{ 'aui-active' : i == index }" :index="i">
            {{item}}
        </div>
    </section>
</template>

<script>
export default {
    name: 'tab',
    template: '#tab',
    props: ['list', 'index'],
    methods: {
        setIndex: function(e){
            let target = e.target;
            let index = $api.attr(target, 'index');
            this.$emit('set-tab-index', index);
        }
    },
    created: function(){
        let _this = this;
        api.addEventListener({
            name: 'setTabIndex'
        }, function(ret, err){
            this.$emit('settabindex', ret.value.index);
        });
    }
}    
</script>

<style>
    .aui-tab-item {
        background-color: #333 !important;
        color: #999 !important;
        font-size: 0.68rem;
    }
</style>