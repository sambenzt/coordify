chrome.storage.local.get("coords", function(items){
    
});



document.getElementById("myButton").addEventListener("click", render);

function render(){
    chrome.storage.local.get("coords", function(items){
        console.log(items.coords)
        list = document.getElementById("render")
        list.innerHTML = ''
        for(let coord of items.coords){
         
            list.innerHTML += '<li class="list-group-item">'+  coord.lat + ' ' + coord.lng +'</li>'
        }


    });
    
}