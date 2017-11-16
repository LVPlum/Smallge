
<template id="billTemp">
    <div>
        <div v-if="status == 2" class="aui-content aui-margin-b-10">
            <ul class="aui-list aui-form-list">
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">
                            取保单
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner aui-col-xs-6" @click="toggleChecked()">
                        <div class="aui-list-item-title">
                            到店拿
                            <span class="aui-radio aui-margin-l-15" :class="[send_bill == 0 ? 'aui-checked' : 'aui-disabled']"></span>
                        </div>
                    </div>
                    <div class="aui-list-item-inner aui-col-xs-6 tea-border-l aui-padded-l-15" @click="toWrite()">
                        <div class="aui-list-item-title">
                            邮寄 <span class="tea-text-orange">{{send_bill_fee == 0 ? '免费': '¥' + send_bill_fee}}</span>
                            <div class="write aui-btn aui-btn-outlined aui-btn-sm tea-btn-blue aui-margin-l-10 tea-btn-radius">填写</div>
                        </div>
                    </div>
                </li>
            </ul>
            <ul v-show="send_bill != 0" class="aui-list aui-form-list">
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">
                            收件人
                        </div>
                        <div class="aui-list-item-input">
                            <input type="text" placeholder="请输入您的姓名" v-model="jname">
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">
                            联系电话
                        </div>
                        <div class="aui-list-item-input">
                            <input type="tel" placeholder="请输入您的手机号码" v-model="jtelphone">
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">
                            地址
                        </div>
                        <div class="aui-list-item-input">
                            <input type="text" placeholder="请输入您的地址" v-model="jaddress">
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div v-else class="aui-list aui-margin-b-10">
            <li class="aui-list-item">
                <div class="aui-list-item-inner aui-padded-t-10 aui-padded-b-10">
                    <div class="aui-list-item-title tea">
                        保单
                    </div>
                    <div class="aui-list-item-right tea">
                        <div v-if="send_bill != 1" class="tea-text-title">到店拿</div>
                        <template v-else>
                            <div class="tea-text-title">邮寄 {{send_bill_fee == 0 ? '免费': '¥' + send_bill_fee}}</div>
                            <div>{{jname}} {{jtelphone}}</div>
                            <div>{{jaddress}}</div>
                        </template>
                    </div>
                </div>
            </li>
        </div>
    </div>
</template>

<script>
export default {
    name: 'bill',
    template: '#billTemp',
    props: ['id','status', 'send_bill', 'send_bill_fee', 'jname', 'jtelphone', 'jaddress'],
    methods: {
        toggleChecked: function(){
            let send = this.send_bill == 0 ? 1 : 0;
            this.$emit('setbill', send);
            setTimeout(() => tea.scroll('bottom'), 300);
        },
        toWrite: function(){
            this.$emit('setbill', 1);
            setTimeout(() => tea.scroll('bottom'), 300);
        },
        submit: function(){
            if (this.send_bill != 1) {
                return false;
            }
            let rule = new tea.checkRule();
            rule.add(this.jname, [{
                condition: 'isNoEmpty',
                errorMsg: '请输入收件人姓名'
            }]);
            rule.add(this.jtelphone, [{
                condition: 'isPhone',
                errorMsg: '请输入正确的手机号码'
            }]);
            rule.add(this.jaddress, [{
                condition: 'isNoEmpty',
                errorMsg: '请输入收件地址'
            }]);
            let errorMsg = rule.start();
            if (errorMsg) {
                api.toast({
                    msg: errorMsg,
                    duration: 2000,
                    location: 'middle'
                });
                return false;
            };
            this.postBill();
        },
        postBill: function(){
            api.ajax({
                url: website + 'api_q.php?action=post_insurance_send_bill',
                method: 'post',
                timeout: 30,
                dataType: 'json',
                data: {
                    values: {
                        id: this.id,
                        userid: $api.getStorage('ID'),
                        jname: this.jname,
                        jtelphone: this.jtelphone,
                        jaddress: this.jaddress
                    }
                },
                returnAll:false
            },function(ret,err){
                if (ret.succ == 1) {
                    alert('保单信息保存成功');
                } else {
                    tea.toast('ajax');
                };
            });
        }
    },
    created: function(){
        let _this = this;
        api.addEventListener({
            name: 'orderPost'
        }, function(ret, err){
            _this.submit();
        });
    }
}
</script>