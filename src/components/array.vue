<template>
    <div>
        <div class="row">
            <div class="col-12 d-flex justify-content-end">
                <button class="btn btn-primary mr-1" @click="copy">
                    Copy
                </button>
            </div>
            <div class="col-12">
                <pre  v-html="prettyJSON"></pre>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            coords: [{"address":"Próspero García 100-98","lat":-26.821777,"lng":-65.192862},{"address":"Próspero García 100-98","lat":-26.821609,"lng":-65.193994},{"address":"Próspero García 25","lat":-26.821609,"lng":-65.193994},{"address":"Sta. Fe","lat":-26.821343,"lng":-65.195553},{"address":"DISTRIBUIDORA MULLER - SUCURSAL TUCUMAN","lat":-26.821017,"lng":-65.197197},{"address":"Sta. Fe 298-216","lat":-26.82082,"lng":-65.198256},{"address":"Sta. Fe 298-216","lat":-26.820696,"lng":-65.198891},{"lat":-26.820615,"lng":-65.199268,"address":"Sta. Fe 398-300"}]
        }
    },
    computed:{
        prettyJSON:function(){
            return this.pretty((this.coords));
        }
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
        copy:function(){
            this.copyToClipboard(JSON.stringify(this.coords))
        },
        copyToClipboard:function(text) {
            if (!navigator.clipboard) {
                fallbackCopyTextToClipboard(text);
                return;
            }
            navigator.clipboard.writeText(text).then(function() {
                console.log('Async: Copying to clipboard was successful!');
            }, function(err) {
                console.error('Async: Could not copy text: ', err);
            });
        }
    }
}
</script>

<style>
pre {outline: 1px solid #ccc; padding: 5px; margin: 5px; }
.string { color: green; }
.number { color: darkorange; }
.boolean { color: blue; }
.null { color: magenta; }
.key { color: red; }

</style>
