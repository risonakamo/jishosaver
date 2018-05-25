class kanjibox
{
    constructor(box)
    {
        this.kanjichars=box.querySelector(".concept_light-representation .text");
        this.kanji=this.kanjichars.innerText;
        this.kanjisplit();

        this.hboxes=box.querySelectorAll(".concept_light-representation .furigana span");
        this.meanings=box.querySelectorAll(".meaning-meaning");

        this.initEvents();
    }

    initEvents()
    {
        for (var x=0;x<this.hboxes.length;x++)
        {
            this.hboxes[x].addEventListener("click",(e)=>{
                e.currentTarget.classList.toggle("selected");
            });
        }

        for (var x=0;x<this.meanings.length;x++)
        {
            this.meanings[x].addEventListener("click",(e)=>{
                e.currentTarget.classList.toggle("selected");
            });
        }
    }

    kanjisplit()
    {
        var kchars=this.kanji.split("");
        var res="";
        for (var x=0;x<kchars.length;x++)
        {
            res+=`<span>${kchars[x]}</span>`;
        }

        this.kanjichars.innerHTML=res;
        this.kanjichars=this.kanjichars.children;
    }
}

document.head.insertAdjacentHTML("beforeend",`<link rel="stylesheet" href="${chrome.runtime.getURL("jishosave-style.css")}">`);

var boxes=document.querySelectorAll(".concept_light");
var kboxes=[];
for (var x=0;x<boxes.length;x++)
{
    kboxes.push(new kanjibox(boxes[x]));
}