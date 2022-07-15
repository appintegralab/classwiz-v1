<template>
    <div>
        <div class="flex items-center" @mouseover="mouseOver" @mouseleave="MouseLeave">
            <div class="w-[32px] handle">
                <q-btn round size="xs" v-if="btnShow">
                    <Icon class="text-[12pt]" icon="mdi:dots-grid" />
                    <q-menu v-model="menuShow">
                        <q-btn @click="fontSize = '12pt'">12pt</q-btn>
                        <q-btn @click="fontSize = '14pt'">14pt</q-btn>
                        <q-btn @click="fontSize = '18pt'">18pt</q-btn>
                    </q-menu>
                </q-btn>
            </div>
            <div class="flex-1 m-0 p-0">
                <QuillEditor ref="editor" v-model:content="content" contentType="html" placeholder="placeholder"
                    theme="bubble" :toolbar="toolbar">
                </QuillEditor>
            </div>
        </div>
        <div v-if="false">
            {{ content }}
        </div>
    </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import MagicUrl from 'quill-magic-url'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import { Icon } from "@iconify/vue"
//import { toolbarStore } from "../toolbar-store"

export default {
    components: { Icon, QuillEditor },
    data() {
        return {
            toolbarOpen: false,
            toolbar: ['bold', 'italic', 'underline', 'link'],
            options: {
                theme: 'bubble',
                modules: {
                    toolbar: ['bold', 'italic', 'underline'],
                    magicUrl: {
                        name: 'magicUrl',
                        module: MagicUrl,
                    },
                },
                placeholder: 'Compose an epic...'
            },
            btnShow: false,
            content: "Olá",
            content2: 'oi <strong>gente</strong> bacana e bonita',
            menuShow: false,
            selecao: "",
            fontSize: "9pt"
        }
    },
    mounted() {
        let self = this
        console.log("mounted");


    },
    methods: {

        mouseOver() {
            this.btnShow = true
        },

        MouseLeave() {
            if (!this.menuShow) {
                this.btnShow = false
            }
        },

        keyDown(event) {
            console.log("keyDown");
            if (event.keyCode === 17) {          // when 
                console.log("ctrl is pressed");
                console.log(this.$refs.editor.editor.firstChild);
                this.$refs.editor.editor.firstChild.contentEditable = false
            }
        },

        keyUp(event) {
            console.log("keyUp");
            if (event.keyCode === 17) {          // when 
                console.log("ctrl is pressed");
                console.log(this.$refs.editor.editor.firstChild);
                this.$refs.editor.editor.firstChild.contentEditable = true
            }
        },

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
    font-family: 'Raleway' !important;
    padding: 8px;
}

.ql-tooltip {
    z-index: 1000 !important;
}

.ql-container.ql-bubble:not(.ql-disabled) a::before {
    display: none !important;
}
.ql-container.ql-bubble:not(.ql-disabled) a::after {
    display: none !important;
}
</style> 