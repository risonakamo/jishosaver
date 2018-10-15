window.onload=main;

function main()
{
    ReactDOM.render(React.createElement(PopupRoot),document.querySelector(".root"));
}

//show the whole extension storage
function showStorage()
{
    chrome.storage.local.get(null,(data)=>{
        console.log(data);
    });
}