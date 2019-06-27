<template>
    <div>
        <div v-if="coords.length > 0" class="col-12 mb-2">
            <div class="custom-control custom-switch">
                    <input @click="array = !array" type="checkbox" class="custom-control-input" id="customSwitch1">
                    <label class="custom-control-label" for="customSwitch1"></label>
            </div>
        </div>
        <div v-if="array" class="col-12 mt-2 pt-2  d-flex flex-column">
            <i class="far fa-copy align-self-end c-pointer" @mousedown="clipboard(JSON.stringify($data.coords),$event)" @mouseup="up($event)"></i>
            <pre v-html="prettyResponse"></pre>
        </div>
        <div v-if="!array" class="col-12 mt-2 mb-2">
            <div class="card text-white bg-primary mb-3" v-for="(coord, index) in coords" :key="index">
                <div class="card-header">
                    <i class="fas fa-map-marked-alt"></i>
                    <b>{{ coord.address }}</b>
                </div>
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <div>
                            <b>latitude:</b> <span>{{ coord.lat }}</span>
                        </div>
                        <div>
                            <i class="far fa-copy c-pointer" @mousedown="clipboard(coord.lat,$event)" @mouseup="up($event)"></i>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between mt-2">
                        <div>
                            <b>longitude:</b> <span>{{ coord.lng }}</span>
                        </div>
                        <div>
                            <i class="far fa-copy c-pointer" @mousedown="clipboard(coord.lng,$event)" @mouseup="up($event)"></i>
                        </div>
                    </div>
                    <div class="mt-3" v-if="false">
                        <h6>Response:</h6>
                        <pre></pre>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-end">
                    <span>
                        <div :id="'sp-'+index" class="spinner-border spinner-border-sm text-info mr-2 d-none" role="status"></div>
                        <i :id="'ch-'+index" class="far fa-check-circle mr-2 text-ok d-none"></i>
                        <i @click="send(index,coord.lat,coord.lng)" class="far fa-paper-plane c-pointer"></i>
                    </span>
                </div>
            </div>
            <div v-if="coords.length == 0" class="col-12 mt-2 text-center">
                <h5><b>No coordinates selected</b></h5>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    data(){
        return {
            loading:false,
            ok:false,
            order_id: null,
            url:'',
            coords:[],
            res:{ status:200,message:"Response send",data:{ name:"test" } },
            array:false
        }
    },
    computed:{
        prettyResponse:function(){ return this.pretty(this.coords) }
    },
    mounted(){
       self = this
       chrome.storage.local.get("coords", function(items){
            self.render(items.coords)
       });
    },
    methods:{
        clipboard:function(str,event) {
            var el = document.createElement('textarea');
            el.value = str;
            el.setAttribute('readonly', '');
            el.style = {position: 'absolute', left: '-9999px'};
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            event.target.classList.remove("far")
            event.target.className += " fas";
        },
        up:function(event){
            console.log("up")
            event.target.classList.remove("fas")
            event.target.className += " far";
        },
        pretty:function syntaxHighlight(json) {
            if (typeof json != 'string') {
                json = JSON.stringify(json, undefined, 2);
            }
            json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                var cls = 'number';
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'key';
                    } else {
                        cls = 'string';
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'boolean';
                } else if (/null/.test(match)) {
                    cls = 'null';
                }
                return '<span class="' + cls + '">' + match + '</span>';
            });
        },
        render:function(coords){
            this.coords = coords
        },
        send(index,lat,lng){
            var method

            document.getElementById('sp-'+index).classList.remove("d-none")

            switch(localStorage.getItem('method'))
            {
                case 'put' : method = 'put'; break;
                default: method = 'post'; break;
            }

            let endpoint = localStorage.getItem('endpoint');
            let headers  = { headers:{ Authorization:localStorage.getItem('token')}}

            axios[method](endpoint,{lat,lng},headers)
            .then(res => {
                document.getElementById('sp-'+index).classList.add("d-none");
                document.getElementById('ch-'+index).classList.remove("d-none")
            })

        }
    }

}
</script>

<style>
    .response{
        background:#060606;
        height: 150px;
        color:#4caf50;
        overflow-y: scroll
    }
    pre { padding: 0px; margin: 0px; }
    .string { color: green; }
    .number { color: darkorange; }
    .boolean { color: blue; }
    .null { color: magenta; }
    .key { color: red; }

</style>