<template id="card">
    <section class="aui-content-padded tea-content-radius-10">
        <div class="aui-card-list">
            <div class="aui-card-list-header aui-padded-r-15" :class="head.klass">
                <slot>
                    <span class="aui-text-center aui-font-size-16">{{head.text}}</span>
                </slot>
                <i class="aui-iconfont aui-text-gray" :class="head.icon" @click="headIcon"></i>   
            </div>
            <div class="aui-card-list-content-padded aui-font-size-16" :class="content.klass">
                <div class="aui-margin-t-15 aui-margin-b-15" v-for="(item, index) in content.list">
                    <i class="aui-iconfont aui-margin-r-5 aui-font-size-16" :class="item.icon"></i>
                    {{item.text}}
                </div>
            </div>
            <div class="aui-card-list-footer" :class="foot.klass" @click="footClick" v-if="foot">
                <div class="aui-text-center aui-font-size-16 tea-text-title" :class="foot.color">{{foot.text}}</div>     
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'card',
    template: '#card',
    props: ['head', 'content', 'foot', 'index'],
    methods: {
        footClick: function(e){
            this.$emit('foot', this.index);
        },
        headIcon: function(){
            this.$emit('headIcon')
        }
    },
    created: function(){

    }
}    
</script>

<style>
    .aui-text-center {
        width: 100%;
    }
    .tea-icon-cross {
        position: absolute;
        right: 0.5rem;
    }
</style>