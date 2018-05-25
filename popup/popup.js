window.onload=main;

function main()
{
    chrome.storage.local.get(null,(data)=>{
        document.querySelector(".output").innerText=JSON.stringify(data);
    });

    document.querySelector(".clear").addEventListener("click",(e)=>{
        e.preventDefault();

        chrome.storage.local.clear();
    });
}
