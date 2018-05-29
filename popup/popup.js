window.onload=main;

var _data;

function main()
{
    chrome.storage.local.get(null,(data)=>{
        _data=data;

        var res="";
        for (var x in _data)
        {
            if (x=="kanjilist")
            {
                continue;
            }

            res+=`<div class="kanjibox"><div class="hiragana">${_data[x].maindata[1]}</div><div class="kanji">${x}</div></div>`;
        }

        document.querySelector(".output2").innerHTML=res;
    });

    document.querySelector(".clear").addEventListener("click",(e)=>{
        e.preventDefault();

        chrome.storage.local.clear();
    });

    document.querySelector(".gen-output").addEventListener("click",(e)=>{
        e.preventDefault();

        var res=[];
        for (var x in _data)
        {
            if (x=="kanjilist")
            {
                continue;
            }

            res.push(_data[x]);
        }

        document.querySelector(".output").innerText=JSON.stringify({kcards:res});
    });
}
