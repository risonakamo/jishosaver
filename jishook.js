class kanjibox
{
    constructor(box)
    {
        this.kanji=box.querySelector(".concept_light-representation .text").innerText;
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
}