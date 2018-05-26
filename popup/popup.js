window.onload=main;

var _data;

function main()
{
    chrome.storage.local.get(null,(data)=>{
        _data=data;
        var kanjiwords=Object.keys(data);
        document.querySelector(".output").innerText=JSON.stringify(kanjiwords);
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
            res.push(_data[x]);
        }

        document.querySelector(".output").innerText=JSON.stringify({kcards:res});
    });
}
