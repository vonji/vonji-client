<template>
    <div class="row">
        <div class="col-md-12">
            <textarea title="content" v-model="response.Content"></textarea>
            <input type="number" title="value" v-model="response.Value">
        </div>
    </div>
    <button @click="save">Save edits</button>
</template>

<script type="text/babel">

    import Resources from '../../utils/resources'

    export default {
        data() {
            return {
                response: {}
            };
        },
        route: {
            data({ to: { params: { id } }}) {
                return {
                    response: Resources.response.get({ id: id })
                }
            }
        },
        methods: {
            save: function () {
                Resources.response.put({
                    data: JSON.stringify(this.response),
                    redirect: '/requests/view/' + this.response.RequestID
                });
            }
        }
    }
</script>