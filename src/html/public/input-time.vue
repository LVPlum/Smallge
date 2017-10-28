<template id="input-plate">
    <ul class="aui-list aui-media-list">
        <li class="aui-list-item aui-padded-0 aui-list-item-arrow"  @click="openWinTime">
            <div class="aui-media-list-item-inner">
                <div class="aui-list-item-inner aui-padded-l-15">
                    <div class="aui-list-item-text aui-margin-b-5">
                        <div class="aui-list-item-title tea-text-blue aui-font-size-14">预约时间</div>
                    </div>
                    <div class="aui-info aui-padded-0">
                        <div class="aui-font-size-16 tea-text-title">{{ time }}</div>
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
        props: ['time'],
        data: function() {
            return {
                time: '',
            }
        },
        computed: {

        },
        methods: {
            openWinTime: function(){
                api.openWin({
                    name: 'date_select_win',
                    url: '../unit/date_select_win.html',
                    pageParam: {
                        winName: api.winName
                    }
                });
            },
        },
        created: function(){
            let _this = this;
            api.addEventListener({
                name: 'selectretime'
            }, function(ret, err){
//                vm.time = ret.value.strtime;
                _this.$emit('updata','time',ret)
            });
        }
    };

</script>
