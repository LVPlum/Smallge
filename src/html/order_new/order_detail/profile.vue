
<template id="profileTemp">
    <div class="aui-list aui-card-list aui-list-noborder">
        <div class="aui-card-list-header aui-border-b">
            <div>
                <i class="aui-iconfont" :class="typeobj.icon" :style=" 'color:' + typeobj.color"></i>
                <span class="aui-list-item-title">{{typeobj.title}}</span>
            </div>
            <!-- 无操作时不显示 -->
            <div v-if="action" class="aui-list-item-right tea-text-blue" @click="actionObj[action].handler()">{{actionObj[action].text}}</div>            
        </div>
        <div class="aui-card-list-content-padded">
            <div class="aui-list-item-title" v-for="(item, index) in list">{{item}}</div>
        </div>
    </div>
</template>

<script>
import BuyAgain from '../buy_again.js'

export default {
    name: 'profile',
    template: '#profileTemp',
    props: ['info', 'typeobj', 'type'],
    data: function(){
        let _this = this;
        return {
            actionObj: {
                change: {
                    text: '修改订单',
                    handler: function() {
                        let buyAgain = new BugAgain(_this.info, _this.type);
                        buyAgain.openWin('change');
                    }
                },
                cancel: {
                    text: '取消订单',

                },
                cancelApply: {
                    text: '申请取消',
                },
                comment: {
                    text: '评价订单',
                    handler: () => {
                        vm.openWinComment();
                    }
                },
                buyAgain: {
                    text: '再次购买',
                    handler: function() {
                        let buyAgain = new BuyAgain(this.info, this.type);
                        buyAgain.openwin();
                    }
                }
            }
        };
    },
    computed: {
        list: function(){
            return this.typeobj.profile();
        },
        action: function(){
            // 已完成的订单-判断是否已评价
            if (this.info.status == 1) {
                //return this.info.commented ? false : 'comment';
                return false;
            }
            //  已取消的订单-提示再次购买
            if (this.info.status == 3) {
                return 'bugAgain';
            }
            // 未完成的订单-不可直接修改的订单-判断是否需要申请才能取消（已接单需要申请）
            if (this.info.changeAble) {
                return this.info.accepted? 'cancelApply' : 'cancel'; 
            }
            // 未完成的订单-可修改
            return 'change';
        }
    },
    methods: {
    }
}
</script>
