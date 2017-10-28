<template id="coupon">
    <ul class="aui-list aui-list-in aui-form-list aui-margin-t-5">
        <li class="aui-list-item">
            <div class="aui-list-item-inner aui-list-item-arrow aui-margin-r-15" @click="openWinCouponList()">
                <div class="aui-list-item-label" style="width: 4rem">
                    <span class="tea-text-title">优惠券</span>
                </div>
                <div id="coupon" class="aui-font-size-14 tea-text-gray aui-margin-r-15" :class="{'coupon-active': couponFee}">
                    {{couponFee? '- ¥ ' + tea.formatMoney(couponFee) : '暂无可用优惠券'}}
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'coupon',
        template: '#coupon',
        props: ['type'],
        data: function() {
            return {
                couponList: [],
                index: 0
            }
        },
        computed: {
            list: function() {
                let arr = [...this.couponList];
                let type = this.type;
                // 按类型和金额排序
                arr = arr.sort(function(a,b){
                    if (a.coupon_type == type && b.coupon_type != type) {
                        return -1;
                    }
                    if (a.coupon_type != type && b.coupon_type == type) {
                        return 1;
                    }
                    return parseFloat(a.coupon_m) > parseFloat(b.coupon_m) ? -1 : 1;
                });
                return arr;
            },
            couponFee: function(){
                let fee = 0;
                if (this.list.length > 0) {
                    let item = this.list[this.index];
                    fee = item.coupon_type == this.type ? item.coupon_m : 0;
                }
                vm.couponFee = fee;
                return fee;
            }
        },
        methods: {
            openWinCouponList: function() {
                api.openWin({
                    name: 'coupon_list_win',
                    url: '../unit/coupon_list_win.html',
                    pageParam: {
                        coupons: this.list,
                        couponType: this.type,　　　//本页面对应的优惠券的类型
                        couponsIndex: this.index,
                    }
                });
            }
        },
        created: function(){
            let _this = this;
            //获取优惠券列表信息
            $api.post(website + 'coupon_api.php?action=list',{
                values: {
                    ID : $api.getStorage('ID'),
                    state : '2', //2为可用优惠券状态
                }
            }, (ret, err) => {
                if (!ret) {
                    tea.toast('ajax');
                    return false
                }
                if (ret.succ == 1 && ret.data.length > 0) {
                    _this.couponList = ret.data;
                    return true;
                }
                // 无优惠券
                if (ret.succ == 0) {
                    return false;
                }
            });
            
            api.addEventListener({
                name: 'selectCoupon'
            }, function(ret, err){
                _this.index = ret.value.couponsIndex;
            });
        }
    };

</script>

<style>
    .coupon-active {
        font-size: 0.8rem !important;
        color: #FF6600 !important;
    }
</style>