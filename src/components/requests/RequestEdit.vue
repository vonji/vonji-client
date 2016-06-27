<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div>
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
        <button v-on:click="save">Save edits</button>
    </div>
</template>

<script type="text/babel">

    import Resources from '../../utils/resources'

    export default {
        data() {
            return {
                request: {}
            };
        },
        route: {
            data({ to: {params: { id } } }) {
                return {
                    request: Resources.request.get({ id: id })
                }
            }
        },
        methods: {
            save: function () {
                Resources.request.put({
                    data: JSON.stringify(this.request),
                    redirect: '/requests/view/' + this.request.ID
                });
            }
        }
    }
</script>