<template>
    <div>
        <q-btn @click="fontSize='12pt'">12pt</q-btn>
        <div class="border flex items-center" @mouseover="btnShow = true" @mouseleave="btnShow = false">
            <div class="p-1 w-[32px]">
                <q-btn round size="xs" v-if="btnShow">
                    <Icon class="text-[12pt]" icon="mdi:dots-grid" />
                </q-btn>
            </div>
            <div class="flex-1 border rounded">
                <QuillEditor v-model:content="content" contentType="html" placeholder="placeholder" theme="bubble"
                    :toolbar="toolbar" />
            </div>
        </div>

        <div>
            {{ content }}
        </div>

    </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import { Icon } from "@iconify/vue"

export default {
    components: { Icon, QuillEditor },
    data() {
        return {
            toolbar: [ 'bold', 'italic', 'underline' ],
            options: {
                theme: 'bubble',
                modules: {
                    toolbar: ['bold', 'italic', 'underline']
                },
                placeholder: 'Compose an epic...'
            },
            btnShow: false,
            content: "",
            content2: 'oi <strong>gente</strong> bacana e bonita',
            menuShow: false,
            selecao: "",
            fontSize: "9pt"
        }
    },
    mounted() {
        let self = this
        console.log("mounted");
        console.log("caixa", this.$refs.caixa);

        this.$refs.caixa.onmouseup = function () {
            console.log("onmouseup");
            let selecao = window.getSelection().toString()
            console.log("selecao", selecao);
            if (self.selecao == selecao) {
                selecao = ""
            } else {

            }
            self.selecao = selecao
            self.menuShow = (selecao != "")
            console.log("self.menuShow", self.menuShow);
        }

        this.$refs.caixa.onkeyup = function () {
            console.log("onkeyup");
            let selecao = window.getSelection().toString()
            console.log("selecao", selecao);
            self.selecao = selecao
            self.menuShow = (selecao != "")
            console.log("self.menuShow", self.menuShow);
        }

        this.$refs.caixa.onselectionchange = function () {
            console.log("onselectionchange");
        }

    },
    methods: {

        aplicaBold() {
            console.log("AplicaBold");
            let range = window.getSelection().getRangeAt(0);
            range.deleteContents();
            let elem = document.createElement("strong")
            elem.appendChild(document.createTextNode("alguma coisa"))
            range.insertNode(elem);
        }
    }
}
</script>
<style>

.ql-editor {
    font-size: v-bind('fontSize');
}
</style>