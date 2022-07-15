
const selTool = {

    getElemContent(node) {
        if (node.nodeType == 1) {
            return node.outerHTML
        } else {
            return node.textContent
        }
    },

    getInitPosition(root) {
        let selection = window.getSelection()
        let anchorNode = selection.anchorNode
        //console.dir(anchorNode);
        let range = selection.getRangeAt(0);
        //console.log("range", range);
        let rangeTxt = range.toString()

        
        let filhos = [...root.childNodes]
        //console.log("filhos",filhos);

        let html = ""
        let selected = null
        let inicio = 0
        for (let i = 0; i < filhos.length; i++) {
            const filho = filhos[i];
            //console.log("filho " + i + "[" + filho.nodeType + "]", filho);
            if (filho.isEqualNode(anchorNode)) {
                //console.log("^^ start");
                selected = filho
            } else {
                let child = filho.firstChild
                if (child && child.isEqualNode(anchorNode)) {
                    //console.log("^^ start");
                    selected = filho
                }
            }
            let content = selTool.getElemContent(filho)
            if (filho == selected) {
                //console.log("selected", selected);
                let offset = 0
                if(filho.tagName == "STRONG") {
                    offset = 8
                }
                inicio = offset + inicio + range.startOffset                    
                html = html + content
            } else {
                if (!selected) {
                    let len = content.length
                    inicio = inicio + len
                }
                html = html + content
            }
        }
        //console.log("html", html);
        //console.log("inicio", inicio);
        //console.log(html.substring(0,inicio))
        return inicio
    },

    getEndPosition(root) {
        let selection = window.getSelection()
        let range = selection.getRangeAt(0);
        //console.log("range", range);
        let anchorNode = range.endContainer
        //console.log("anchorNode",anchorNode);
        let rangeTxt = range.toString()
        let filhos = [...root.childNodes]
        //console.log("filhos",filhos);

        let html = ""
        let selected = null
        let inicio = 0
        for (let i = 0; i < filhos.length; i++) {
            const filho = filhos[i];
            //console.log("filho " + i + "[" + filho.nodeType + "]", filho);
            if (filho.isEqualNode(anchorNode)) {
                //console.log("^^ start");
                selected = filho
            } else {
                let child = filho.firstChild
                if (child && child.isEqualNode(anchorNode)) {
                    //console.log("^^ start");
                    selected = filho
                }
            }
            let content = selTool.getElemContent(filho)
            if (filho == selected) {
                //console.log("selected", selected);
                let offset = 0
                if(filho.tagName == "STRONG") {
                    offset = 8
                }
                inicio = offset + inicio + range.endOffset                    
                html = html + content
            } else {
                if (!selected) {
                    let len = content.length
                    inicio = inicio + len
                }
                html = html + content
            }
        }
        //console.log("html", html);
        //console.log("inicio", inicio);
        //console.log(html.substring(inicio))
        return inicio
    },

    isBold(inicio,meio) {
        let ini = inicio.trim()
        let lastStrongOpen = ini.lastIndexOf("<strong>")
        let lastStrongClose = ini.lastIndexOf("</strong>")
        if(lastStrongClose < lastStrongOpen) {
            return true
        }
        return false
    },

    aplicaBold(root) {

        let content = root.innerHTML
        console.log("content", content);

        let inicio = selTool.getInitPosition(root)
        let fim = selTool.getEndPosition(root)
        console.log(`inicio: ${inicio} fim:${fim}`);

        let txtInicio = content.substring(0,inicio)
        let txtMeio = content.substring(inicio,fim)
        let txtFim = content.substring(fim)

        console.log("trechos",{txtInicio,txtMeio,txtFim});
        
        let lastStrongOpen = txtInicio.lastIndexOf("<strong>")
        let lastStrongClose = txtInicio.lastIndexOf("</strong>")
        let firstStrongOpen = txtFim.indexOf("<strong>")
        let firstStrongClose = txtFim.indexOf("</strong>")
        let inicioBold = lastStrongClose < lastStrongOpen
        let fimBold = firstStrongClose < firstStrongOpen
        if(firstStrongOpen == -1) {
            fimBold = true
            if(firstStrongClose == -1) {
               fimBold = false 
            }    
        } 

        let txtFinal = ""
        if(inicioBold) {
            console.log("inicio bold");
            if(fimBold) {
                console.log("fim bold");
                txtMeio = txtMeio.replaceAll("<strong>","")
                txtMeio = txtMeio.replaceAll("</strong>","")
                txtFinal = txtInicio + "</strong>" + txtMeio + "<strong>" + txtFim
            } else {
                console.log("fim SEM bold");
                txtMeio = txtMeio.replaceAll("<strong>","")
                txtMeio = txtMeio.replaceAll("</strong>","")
                txtFinal = txtInicio + txtMeio + "</strong>" + txtFim
            }
        } else {
            console.log("inicio SEM bold");
            if(fimBold) {
                console.log("fim bold");
                txtMeio = txtMeio.replaceAll("<strong>","")
                txtMeio = txtMeio.replaceAll("</strong>","")
                txtFinal = txtInicio + "<strong>" + txtMeio + txtFim
            } else {
                console.log("fim SEM bold");
                txtMeio = txtMeio.replaceAll("<strong>","")
                txtMeio = txtMeio.replaceAll("</strong>","")
                txtFinal = txtInicio + "<strong>" + txtMeio + "</strong>" + txtFim
            }
        }
        
        txtFinal = txtFinal.replaceAll("<strong></strong>","")
        txtFinal = txtFinal.replaceAll("<strong> </strong>","")
        console.log("txtFinal",txtFinal);
        root.innerHTML = txtFinal
    }
}

export default selTool