<template id="buttons">
    <div>
        <span class="aui-btn" :class="item.klass" v-for="(item, index) in activeBtns" :data-action="item.action">{{item.text}}</span>
    </div>
</template>

<script>
    export default {
        name: 'Buttons',
        template: '#buttons',
        props: ['type', 'status', 'money'],
        data: function(){
            var data = {
                btns: {
                    pay: {
                        action: 'pay',
                        text: '去支付',
                        klass: 'btn-blue',
                    },
                    cancel: {
                        action: 'cancel',
                        text: '取消',
                        klass: ''
                    },
                    comment: {
                        action: 'comment',
                        text: '评价',
                        klass: 'btn-blue'
                    }
                }
            };
            return data;
        },
        computed: {
            activeBtns: function(){
                var arr = [];
                //  订单有价格且还未完成则出现支付按钮
                if (this.money && this.status == 2) {
                    arr.push(this.btns.pay);
                }
                // 完成且还未评价的订单提示评价
                if (this.status == 1 ) {
                    arr.push(this.btns.comment);
                }
                return arr;
            }
        }
    };

</script>

<style>
    .coupon-active {
        font-size: 0.8rem !important;
        color: #FF6600 !important;
    }
</style>