<template>
    <div>
        <div class="row">
            <div class="col-12 d-flex justify-content-center mb-3">
                <button class="render btn btn-warning">GET</button>
            </div>
        </div>

        <div class="col-md-12 mt-2">
           <select class="form-control" v-model="url" id="">
                <option value="https://comprasmias.000webhostapp.com">webhost</option>
                <option value="http://localhost/cmapi">Localhost</option>
           </select>
        </div>
        <div class="col-md-12 mt-2">
           <input type="text" placeholder="order_id" v-model="order_id" class="form-control">
        </div>

        <div class="col-md-12 mt-2">
            <div v-if="sent" class="alert alert-success" role="alert">
              Coords sent
            </div>
        </div>

        <ul class="list-group">
            <li class="list-group-item" v-for="(coord, index) in coords" :key="index">
                <div class="row pt-5">
                    <div class="col-6">(lat: {{ coord.lat }}</div>
                    <div class="col-6">lng: {{ coord.lng }})</div>
                    <div class="col-12 mt-2">lng {{ coord.address }}</div>
                    <div v-if="true" class="col-12 mt-5 d-flex justify-content-end p-3">
                        <div v-if="true" class="spinner-grow spinner-border-sm text-primary mr-3" role="status">
                         <span class="sr-only">Loading...</span>
                        </div>
                        <span @click="endpoint(coord.lat,coord.lng)" class="btn btn-outline-primary">
                            <i class="far fa-paper-plane"></i>
                        </span>
                    </div>
                    <div v-if="true" class="col-12">
                        <div class="response p-3" v-html="prettyResponse"></div>
                    </div>
                </div>


            </li>
        </ul>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    data(){
        return {
            // coords: [{"address":"Próspero García 100-98","lat":-26.821777,"lng":-65.192862},{"address":"Próspero García 100-98","lat":-26.821609,"lng":-65.193994},{"address":"Próspero García 25","lat":-26.821609,"lng":-65.193994},{"address":"Sta. Fe","lat":-26.821343,"lng":-65.195553},{"address":"DISTRIBUIDORA MULLER - SUCURSAL TUCUMAN","lat":-26.821017,"lng":-65.197197},{"address":"Sta. Fe 298-216","lat":-26.82082,"lng":-65.198256},{"address":"Sta. Fe 298-216","lat":-26.820696,"lng":-65.198891},{"lat":-26.820615,"lng":-65.199268,"address":"Sta. Fe 398-300"}],
            sent:false,
            order_id: null,
            url:'',
            coords:[],
            res:{ status:200,message:"Response send",data:{ name:"test" } }
        }
    },
    computed:{
        prettyResponse:function(){ return this.pretty(this.res) }
    },
    mounted(){
       var btn = this.$el.getElementsByClassName("render")[0]
       self = this
       btn.addEventListener('click',function() {
           
            chrome.storage.local.get("coords", function(items){
                    console.log(items.coords)
                    self.render(items.coords)
            });


       })
    },
    methods:{
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
        endpoint:function(lat,lng){
            let url = this.url + '/cadetes/seguimiento?order_id='+this.order_id+'&lat='+lat+'&lng='+lng
            self = this
            axios.get(url)
            .then(function(res){
                self.sent = true
                setTimeout(function(){ self.sent = false },3000)
                console.log(res)
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
</style>