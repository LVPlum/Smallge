
<template id="profileTemp">
    <div class="aui-list aui-card-list aui-list-noborder">
        <div class="aui-card-list-header aui-border-b" tapmode onclick="change()">
            <div>
                <i class="aui-iconfont" :class="typeobj.icon"></i>
                <span class="aui-list-item-title">{{typeobj.title}}</span>
            </div>
            <div v-if="info.able" class="aui-list-item-right tea-text-blue">修改 ></div>
        </div>
        <div class="aui-card-list-content-padded">
            <div class="aui-list-item-title" v-for="(item, index) in list">{{item}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'profile',
    template: '#profileTemp',
    props: ['info', 'typeobj'],
    computed: {
        list: function(){
            return this.typeobj.profile();
        }   
    }
}
</script>
