<!--
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-07-11 11:08:55
 * @LastEditors: henggao
 * @LastEditTime: 2021-07-11 11:12:46
-->
<template>
    <div class="wangeditor">
        <div ref="editor"></div>
    </div>
</template>

<script>
    import {onMounted, onBeforeUnmount,reactive, ref, toRefs} from 'vue'
    import WangEditor from 'wangeditor'

    export default {
        setup() {
            const editor = ref()
            const state = reactive({
                html: '',
                text: '',
            })

            let instance
            onMounted(() => {
                instance = new WangEditor(editor.value)
                Object.assign(instance.config, {
                    onchange() {
                        console.log('change')
                    }
                })
                instance.create()
            })

            onBeforeUnmount(() => {
                instance.destroy()
                instance = null;
            })

            return {
                ...toRefs(state),
                editor
            }
        }
    }
</script>

<style lang="scss">
.wangeditor{

}
</style>