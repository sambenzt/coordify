/**
 * Coordify extracts coordinates from Google Maps 
 * by Sambenzt
 * Github repo: https://github.com/sambenzt/coordify
 */


import Clipboard from './Clipboard';

var copyArray  = document.getElementById('copy-array')
var cleanArray = document.getElementById('clean-array')
var list       = document.getElementById('list')
var listItems  = ''

chrome.storage.local.get("coords", function(items){

    if(items.coords == undefined || items.coords.length == 0)
    {
        listItems += `
            <li class="list-group-item mt-2 text-center">
                No items selected
            </li>
        `
    }
    else
    {
        var coords = items.coords

        for(let coord of coords)
        {
            listItems += `
                <li class="list-group-item mt-2">
                    <div class="d-flex justify-content-between mt-1">
                    <span>Address</span>
                    <span> <i class="text-primary">${coord.address}</i></span>
                    </div>
                    <div class="d-flex justify-content-between mt-2">
                    <span>Latitude</span>
                    <span> <i class="text-info">${coord.lat}</i></span>
                    </div>
                    <div class="d-flex justify-content-between mt-1">
                    <span>Longitude</span>
                    <span> <i class="text-info">${coord.lng}</i></span>
                    </div>
                    <div class="d-flex justify-content-end mt-1">
                        <i class="far fa-copy c-pointer copy" data='${(JSON.stringify(coord))}' ></i>
                    </div>
                </li>
            `
        }
    }

    list.innerHTML = listItems

    copyArray.addEventListener('click',() => {
        Clipboard(JSON.stringify(coords,null,2))
        let i = copyArray.children[0];
        i.classList.remove('far')
        i.classList.add('fas')
        setTimeout(()=>{
            i.classList.remove('fas')
            i.classList.add('far')
        },150)
    })


    cleanArray.addEventListener('click',() => {
        chrome.storage.local.set({"coords":[]}, function (){
            console.log('deleted')
        });
        list.innerHTML = `
            <li class="list-group-item mt-2 text-center">
                No items selected
            </li>
        `
    })

    Array.from(document.getElementsByClassName('copy')).forEach(function(element) {
        element.addEventListener('click', function(){
            let json = JSON.parse(element.getAttribute('data'))
            Clipboard(JSON.stringify(json,null,2))
            element.classList.remove('far')
            element.classList.add('fas')
            setTimeout(()=>{
                element.classList.remove('fas')
                element.classList.add('far')
            },150)
        });
    });


});