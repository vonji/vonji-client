<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="row">
        <div class="col-md-12">
            <input type="text" title="title" v-model="request.Title">
        </div>
    </div>
    <hr>
    <div class="row">
        <div class="col-md-12">
            <textarea title="content" v-model="request.Content"></textarea>
        </div>
    </div>
    <button v-on:click="save">Post request</button>
</template>

<script type="text/babel">

    import vonji from '../../utils/ajax'

    export default {
        data() {
            return {
                request: {}
            };
        },
        methods: {
            save: function () {
                vonji.post({
                    url: 'requests',
                    data: JSON.stringify(this.request),
                    //redirect: 'requests/request.html?id=' + id
                });
            }
        }
    }
</script>