class kanjibox
{
    constructor(box)
    {
        this.kanjichars=box.querySelector(".concept_light-representation .text");
        this.kanji=this.kanjichars.innerText;
        this.kanjisplit();

        this.hboxes=box.querySelectorAll(".concept_light-representation .furigana span");
        this.meanings=box.querySelectorAll(".meaning-meaning");

        this.initEvents(box);
        this.insertSavebutton(box);
    }

    initEvents(box)
    {
        for (var x=0;x<this.hboxes.length;x++)
        {
            //data bind the corresponding element for hiraganas and kanji
            this.hboxes[x].otherchar=this.kanjichars[x];
            this.kanjichars[x].otherchar=this.hboxes[x];

            this.hboxes[x].addEventListener("click",(e)=>{
                e.currentTarget.classList.toggle("selected");
                e.currentTarget.otherchar.classList.toggle("selected");
            });

            this.kanjichars[x].addEventListener("click",(e)=>{
                e.currentTarget.classList.toggle("selected");
                e.currentTarget.otherchar.classList.toggle("selected");
            });
        }

        var meaningselectors=box.querySelectorAll(".meaning-definition-section_divider");
        for (var x=0;x<meaningselectors.length;x++)
        {
            meaningselectors[x].meaning=this.meanings[x];
            meaningselectors[x].addEventListener("click",(e)=>{
                e.currentTarget.meaning.classList.toggle("selected");

                if (e.currentTarget.meaning.contentEditable=="true")
                {
                    e.currentTarget.meaning.contentEditable=false;
                }

                else
                {
                    e.currentTarget.meaning.contentEditable=true;
                }
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

        return res;
    }

    insertSavebutton(box)
    {
        var savebutton=document.createElement("a");
        savebutton.innerHTML=`<a class="light-details_link" href="">save</a>`;
        savebutton.addEventListener("click",(e)=>{
            e.preventDefault();
            var addkanji={};
            addkanji[this.kanji]=this.genjson();
            chrome.storage.local.set(addkanji);
        });

        box.querySelector(".light-details_link").insertAdjacentElement("afterend",savebutton);
    }
}

document.head.insertAdjacentHTML("beforeend",`<link rel="stylesheet" href="${chrome.runtime.getURL("jishosave-style.css")}">`);

var boxes=document.querySelectorAll(".concept_light");
var kboxes=[];
for (var x=0;x<boxes.length;x++)
{
    kboxes.push(new kanjibox(boxes[x]));
}