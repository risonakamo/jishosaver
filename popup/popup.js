window.onload=main;

function main()
{
    chrome.storage.local.get(null,(data)=>{
        ReactDOM.render(React.createElement(PopupRoot,{data}),document.querySelector(".root"));
    });
}

//show the whole extension storage
function showStorage()
{
    chrome.storage.local.get(null,(data)=>{
        console.log(data);
    });
}

//attach an object to a link element
function attachJSON(data,link,filename)
{
    link.href=`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;
    link.download=`${filename}.json`;
}