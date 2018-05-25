class kanjibox
{
    constructor(box)
    {
        this.box=box;
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
            this.hboxes[x].index=x;
            this.kanjichars[x].index=x;
            this.hboxes[x].addEventListener("click",(e)=>{
                e.currentTarget.classList.toggle("selected");
                this.kanjichars[e.currentTarget.index].classList.toggle("selected");
            });

            this.kanjichars[x].addEventListener("click",(e)=>{
                e.currentTarget.classList.toggle("selected");
                this.hboxes[e.currentTarget.index].classList.toggle("selected");
            });
        }

        for (var x=0;x<this.meanings.length;x++)
        {
            this.meanings[x].addEventListener("click",(e)=>{
                e.currentTarget.classList.toggle("selected");
            });
        }
    }

    //split the kanji element into spans
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

    genjson()
    {
        var hiragana="";
        var rubys=[];
        for (var x=0;x<this.hboxes.length;x++)
        {
            if (this.hboxes[x].innerText)
            {
                hiragana+=this.hboxes[x].innerText;

                if (this.hboxes[x].classList.contains("selected"))
                {
                    rubys.push([x,this.hboxes[x].innerText]);
                }
            }

            else
            {
                hiragana+=this.kanjichars[x].innerText;
            }
        }

        var meanings="";
        var first=1;
        for (var x=0;x<this.meanings.length;x++)
        {
            if (this.meanings[x].classList.contains("selected"))
            {
                if (!first)
                {
                    meanings+=";";
                }

                meanings+=this.meanings[x].innerText;
                first=0;
            }
        }

        var res={maindata:[this.kanji,hiragana,meanings]};
        if (rubys.length)
        {
            res.rubys=rubys;
        }

        console.log(res);
    }
}

document.head.insertAdjacentHTML("beforeend",`<link rel="stylesheet" href="${chrome.runtime.getURL("jishosave-style.css")}">`);

var boxes=document.querySelectorAll(".concept_light");
var kboxes=[];
for (var x=0;x<boxes.length;x++)
{
    kboxes.push(new kanjibox(boxes[x]));
}