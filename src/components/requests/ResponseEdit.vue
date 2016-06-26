<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="row">
        <div class="col-md-12">
            <textarea title="content" v-model="response.Content"></textarea>
            <input type="number" title="value" v-model="response.Value">
        </div>
    </div>
    <button v-on:click="save">Save edits</button>
</template>

<script type="text/babel">

    import Vonij from '../../utils/ajax'

    export default {
        data() {
            return {
                requests: []
            };
        },
        route: {
            data({ to: { params: { id } }}) {
                return {
                    requests: this.$http.get('http://localhost:1618/responses/' + id).then(({data}) => data)
                }
            }
        },
        methods: {
            save: function () {
                vonji.put({
                    url: 'responses',
                    data: JSON.stringify(this.request),
                    //redirect: 'requests/requestlist.html'
                });
            }
        }
    }
</script>