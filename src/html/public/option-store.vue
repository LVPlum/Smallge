<template id="store">
    <div class="aui-list">
        <div class="aui-list-item">
            <div class="aui-info aui-padded-0">
                <div class="aui-info-item aui-font-size-16 tea-text-title">
                    <span>店铺地址</span>
                    <span class="aui-margin-l-10">{{store}}</span>
                </div>
            </div>
        </div>
        <div class="aui-list-item">
            <div class="aui-info aui-padded-0">
                <div class="aui-info-item aui-font-size-16 tea-text-title">
                    <span>手机号码</span>
                    <span class="aui-margin-l-10">
                        <input type="tel" placeholder="请输入您的手机号码" maxlength="11"
                               v-model = "tel">
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'store',
        template: '#store',
        props: ['store','tel'],
        data: function() {
            return {
                store: '',
                tel: ''
            }
        },
        computed: {

        },
        methods: {

        },
        created: function(){

        }
    };

</script>
