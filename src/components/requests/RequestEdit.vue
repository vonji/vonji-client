<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div>
        <div class="row">
            <div class="col-md-12">
                <input type="text" v-model="request.Title" title="title">
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-12">
                <textarea title="content" v-model="request.Content"></textarea>
            </div>
        </div>
        <button v-on:click="save">Save edits</button>
    </div>
</template>

<script type="text/babel">
    export default {
        data() {
            return {
                request: {}
            };
        },
        route: {
            data({ to: {params: { id } } }) {
                return {
                    request: this.$http.get('http://localhost:1618/requests/' + id).then(({data}) => data)
                }
            }
        },
        methods: {
            save: function () {
                vonji.put({
                    url: 'requests',
                    data: JSON.stringify(this.request),
                    //redirect: 'requests/request.html?id=' + id
                });
            }
        }
    }
</script>