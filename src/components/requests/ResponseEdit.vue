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

    import Resources from '../../utils/resources'

    export default {
        data() {
            return {
                requests: []
            };
        },
        route: {
            data({ to: { params: { id } }}) {
                return {
                    requests: Resources.response.get({ id: id })
                }
            }
        },
        methods: {
            save: function () {
                Resources.response.put({
                    data: JSON.stringify(this.request),
                    redirect: '/requests/view/' + this.request.RequestID
                });
            }
        }
    }
</script>