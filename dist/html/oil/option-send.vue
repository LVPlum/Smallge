<template id="site">
    <div class="aui-list aui-media-list" tapmode @click="openWinAddressList(address.addrid)">
        <div class="aui-list-item aui-list-item-arrow">
            <div class="aui-media-list-item-inner">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-text aui-margin-b-5">
                        <div v-if="address" class="aui-font-size-16 tea-text-title">{{ address.name }} {{ address.tel ? address.tel.replace(/^(\d{3})(\d{4})(\d{4})$/, "$1 $2 $3") : '' }}</div>
                        <div v-else class="aui-font-size-16 tea-text-light-gray">请添加新地址</div>
                    </div>
                    <div v-if="address" class="aui-info" style="padding:0">
                        <div class="aui-font-size-16 tea-text-title aui-ellipsis-2">{{  address.region+' '+address.detail }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'address',
        template: '#site',
        props: ['address'],
        computed: {

        },
        methods: {
            openWinAddressList: function(addrid){
                api.openWin({
                    name: 'address_list_win',
                    url: '../address/address_list_win.html',
                    pageParam: {
                        addrid: addrid,
                        origin: api.winName
                    }
                });
            }
        },
        created: function(){
            let _this = this;
            api.addEventListener({
                name: 'selectAddress'
            }, function (ret, err) {
                _this.$emit('updata','selectAddress',ret)
            });
            api.addEventListener({
                name: 'saveOk'
            }, function (ret, err) {
                _this.$emit('updata','saveOk',ret)
            });
            api.addEventListener({
                name: 'editorOk'
            }, function (ret, err) {
                _this.$emit('updata','editorOk',ret)
            });
        }
    };

</script>
