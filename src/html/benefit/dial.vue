
<template id="dial">
    <div>
        <div class="tea-text-blue tea-font-weight-bold aui-font-size-20">dial12313</div>
        <div @click="testText" class="tea-text-blue tea-font-weight-bold aui-font-size-20">妈卖批</div>
        <div>{{ formText }}</div>
        <div class="closeBtn" tapmode @click="closeFrm"><i class="aui-iconfont aui-icon-close tea-font-weight-bold aui-text-white"></i></div>
        <div class="tea-dial-circle">
            <div id="rotate" class="tea-dial-award">
                <img :src="award ? award : '../../image/benefit/benefit_dial_award@2x.png' ">
            </div>
            <div class="tea-dial-start" tapmode @click="dialStart"></div>
        </div>
        <div v-show="result" class="success" id="result" tapmode @click="closeFrm">
            <div class="aui-font-size-16 tea-text-title">
                <span id="msg" class="aui-font-size-14" style="color: #41271e;font-weight: bold">{{ result }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'dial',
    template: '#dial',
    props: ['test'],
    data: function() {
        return {
            dq: '',
            award: ''
        }
    },
    methods: {
        testText: function(){
            _alert(this.award);
        },
        closeFrm: function(){
            api.closeFrame();
        },
        dialStart:function(){

        }
    },
    computed: {
        formText: function(){
            let str = this.dq;
            let test = this.test;
            return str = test;
        }
    },
    created: function(){
        _alert('asd');
        $api.post(website + 'api_cj.php?action=get_lottery_item', {
            values: {
                lottery_item: '7',
                ID: $api.getStorage('ID')
            }
        }, (ret,err) => {
            _alert(ret);
            this.award = ret.lottery_img;
        });
    }
}
</script>