<template id="coupon">
    <ul class="aui-list aui-list-in aui-form-list aui-margin-t-10">
        <li class="aui-list-item">
            <div class="aui-list-item-inner aui-list-item-arrow aui-margin-r-15">
                <div class="aui-list-item-label" style="width: 4rem">
                    <span class="tea-text-title">{{title}}</span>
                </div>
                <div class="aui-font-size-14 tea-text-gray aui-margin-r-15" :class="contentKlass">
                    {{content}}
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'coupon',
        template: '#coupon',
        props: ['title', 'content', 'contentKlass'],
        computed: {
        },
        methods: {
        },
        created: function(){
        }
    };

</script>

<style>
</style>