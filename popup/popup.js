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