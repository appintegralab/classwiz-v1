<template>
    <div>
        <contenteditable ref="caixa" class="p-1 text-lg leading-3" tag="div" :contenteditable="isEditable" v-model="message"
            :no-nl="false" :no-html="true" @returned="enterPressed" />
        <div>
            {{ message }}
        </div>
        <div ref="textEdit" v-html="content" contenteditable="true" class="p-1 border rounded" @input="onInput"
            @mouseup="onMouseUp">

        </div>
        <q-btn @click="aplicaBold">
            bold
        </q-btn>
        <div class="mt-2 p-2 border rounded">
            {{ contentHtml }}
        </div>
    </div>
</template>

<script>
import { Icon } from "@iconify/vue"
import selTool from "./selection-tool"
import contenteditable from 'vue-contenteditable'
import { marked } from "marked"
import TurndownService from "turndown"

export default {
    components: { Icon, contenteditable },
    data() {
        return {
            content: 'oi <strong>gente</strong> um teste <strong>bacana e bonita</strong> aquela moça',
            contentHtml: "",
            menuShow: false,
            selecao: "",
            fontSize: "9pt",
            isEditable: true,
            message: "<p>hello <strong>oi gente um teste bacana</strong> e <em><strong>bonita</strong></em> aquela moça</p>"
        }
    },
    mounted() {
        let self = this
        console.log("mounted");

        this.$refs.caixa.$el.innerHTML = "<p>hello <strong>oi gente um teste bacana</strong> e <em><strong>bonita</strong></em> aquela moça</p>"


        console.log(marked('hello **world** of mark down!'));

        let turndownService = new TurndownService()
        let mdText = turndownService.turndown("hello <b>oi gente um teste bacana</b> e bonita aquela moça")
        console.log("mdText", mdText);

    },
    methods: {
        enterPressed() {
            alert('Enter Pressed');
        },
        onInput(e) {
            let content = e.target.innerHTML
            content = content.replaceAll("&nbsp;", "")
            this.content = content
            this.contentHtml = content
        },

        onMouseUp(e) {
            console.log("MouseUp");

        },

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
            console.log("aplicaBold");
            let selection = window.getSelection()
            console.log("selection", selection);
            document.execCommand('bold')
            let caixa = this.$refs.caixa
            console.log(caixa.$el);
            let content = this.$refs.caixa.$el.innerHTML
            console.log("content", content);
            let turndownService = new TurndownService()
            let mdText = turndownService.turndown(content)
            console.log("mdText", mdText);
            console.log(marked(mdText));

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