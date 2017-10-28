<template id="input-plate">
    <ul class="aui-list aui-media-list">
        <li class="aui-list-item aui-padded-0">
            <div class="aui-media-list-item-inner">
                <div class="aui-list-item-inner aui-padded-l-15">
                    <div class="aui-list-item-text aui-margin-b-10">
                        <div class="aui-list-item-title tea-text-blue aui-font-size-14">{{config.title}}</div>
                    </div>
                    <div class="aui-font-size-16 tea-text-title">
                        <span style="width: 40%" v-for="(val,i) in config.way" @click="check(val.id)">
                            {{val.title}}
                            <span v-if="val.money">￥{{val.money}}</span>
                            <label :class="checked == val.id ? 'aui-checked' : '' " class="aui-radio btn"></label>
                        </span>
                        <!--<span class="aui-margin-l-15" @click="check('2')">邮寄<span>￥10</span><label :class="checked == '2' ? 'aui-checked' : '' " class="aui-radio btn"></label></span>-->
                    </div>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>

    export default {
        name: 'input-plate',
        template: '#input-plate',
        props: ['checked','config'],
        methods: {
            check: function(type){
                this.$emit('checked',type)
            }
        },
        computed: {

        },
        components: {

        },
        created: function(){

        }
    };

</script>
<style>
    .btn{
        width: 1rem !important;
        height: 1rem !important;
        vertical-align: sub !important;
        margin-left: 0.5rem;
    }
</style>