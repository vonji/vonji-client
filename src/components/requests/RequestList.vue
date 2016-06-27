<template>
    <div class="requests-list row">
        <div class="request row" v-for="request in requests">
            <div class="col-sm-4">
            </div>
            <div class="col-sm-6">
                <h3><a v-link="'requests/view/' + request.ID">{{ request.Title }}</a></h3>
            </div>
            <div class="col-sm-2">
                asked 1s ago by {{ request.User.FirstName }}
            </div>
        </div>
    </div>
</template>

<div class="row">
    <div class="col-md-12"><a v-link="'requests/add'">New request</a></div>
</div>

<script type="text/babel">

    import Resources from '../../utils/resources'

    export default {
        data() {
            return {
                requests: []
            };
        },
        route: {
            data() {
                return {
                    requests: Resources.request.get()
                }
            }
        }
    }
</script>

<style>
    .request {
        border-top: 1px solid black;
    }
    a {
        color: black;
    }
</style>