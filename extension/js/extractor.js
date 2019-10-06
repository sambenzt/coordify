window.onload = function() {
   
    chrome.storage.local.set({ "coords": [] }, function(){});
    
    setTimeout(() => {
      let canvas = document.getElementsByClassName("widget-scene-canvas");
      canvas[0].addEventListener("click", function() {
        setTimeout(() => {
          let widget = document.getElementsByClassName("widget-reveal-card");
          let address = document.querySelectorAll('.widget-reveal-card-address-line')[0].innerText;
          if ( widget.length > 0 && address.length > 0 ){
           let coords_str = document.querySelectorAll('.widget-reveal-card .widget-reveal-card-lat-lng')[0].innerText;
           let coords_arr = coords_str.split(",")
           let lat = parseFloat(coords_arr[0].trim())
           let lng = parseFloat(coords_arr[1].trim())
           let coords = { lat,lng, address }
           console.log(coords)
           add(coords)
          }
        }, 600);
      });
    }, 200);

    function add(coords){

        var storage = chrome.storage.local;
        var arr     = [];

        storage.get("coords", function (items){   

            if(items.coords != undefined) {
                arr = items.coords
                arr.push(coords)
                sessionStorage.clear();
                sessionStorage.setItem('coords', JSON.stringify(arr));
                storage.remove("coords", function (){
                  console.log(arr)
                });
                storage.set({"coords":arr}, function (){
                  console.log(JSON.stringify(arr))
                });
            }
            else {
                arr.push(coords)
                storage.set({"coords":arr}, function (){
                    console.log(arr)
                });
            }
            
        });
    }
  };

