<template id="input-plate">
    <ul class="aui-list aui-media-list">
        <li class="aui-list-item aui-padded-0 border-b">
            <div class="aui-media-list-item-inner">
                <div class="aui-list-item-inner aui-padded-l-15 aui-padded-r-0">
                    <div class="aui-list-item-text">
                        <div class="aui-list-item-title tea-text-blue aui-font-size-14">车牌号码</div>
                    </div>
                    <slot name="car_type"></slot>
                    <div class="aui-info aui-padded-0 aui-margin-t-5">
                        <slot name="vip"></slot>
                        <div class="aui-list-item-label" style="width: 4rem;line-height: normal"  @click="openWinProvince">
                            <span class="tea-text-title aui-font-size-16 tea-text-arrow-down">{{ province }}</span>
                        </div>
                        <div class="aui-list-item-input aui-font-size-16">
                            <input type="text" placeholder="请输入车牌后5位数" maxlength="8"
                                   v-model="value"
                                   @input="updateValue($event.target.value)"
                                   @keyup.enter="downEnter">
                                   <!--:value="value"
                                   @blur="updateValue($event.target.value)">-->
                        </div>
                        <div class="tea-text-round" style="border: none;"  @click="openWinPlate"><img src="../../image/select.png"></div>
                        <!--<div class="tea-text-round tea-big"  @click="openWinPlate">选</div>-->
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
        props: ['province','value'],
        data: function() {
            return {
            }
        },
        computed: {

        },
        methods: {
            openWinProvince: function(){
                api.openWin({
                    name: 'plate_province_win',
                    url: '../car_plate/plate_province_win.html',
                });
            },
            openWinPlate: function(){
                api.openWin({
                    name: 'plate_num_win',
                    url: '../car_plate/plate_num_win.html',
                });
            },
            updateValue: function(value){
                value = $api.trimAll(value).toUpperCase();
                this.$emit('input',value);
                this.$emit('updata','is_vip',value);
            },
            downEnter: function(){
                this.$emit('updata','enter',this.value);
            }
        },
        watch: {

        },
        created: function(){
            let _this = this;
            api.addEventListener({
                name: 'selectPlateProvince'
            }, function(ret, err){
                _this.$emit('updata','prov',ret)
            });

            api.addEventListener({
                name: 'addOldCar'
            },  function(ret, err) {
//                _alert(ret);
                _this.$emit('updata','pla',ret)
            });
        }
    };

</script>
<style>

</style>