<!-- todo better layout -->

<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="row">
    <div class="row">
        <h1>{{request.Title}}</h1>
    </div>
    <hr>
    <div class="row">
        {{request.Content}}
    </div>

    <div class="row">
        <div class="col-md-8">
            <a v-link="'/requests/edit/' + request.ID">edit</a>
            <a v-on:click="deleteRequest">delete</a>
        </div>
        <user-info class="col-md-2" :user="request.User">asked {{ moment(request.UpdatedAt).fromNow() }}</user-info>
    </div>

    <template v-for="response in request.Responses">
        <div class="row">
            <div class="col-md-2">
                <button v-on:click="toggleResponseAcceptance(response)">{{response.Accepted ? 'unaccept' : 'accept'}}</button>
            </div>
            <div class="col-md-10">
                <div class="row response">
                    {{response.Content}}
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-2">
                Value: {{response.Value}} vCoin
            </div>
            <div class="col-md-6">
                <a v-link="'/responses/edit/' + response.ID">edit</a>
                <a v-on:click="deleteResponse(response.ID)">delete</a>
            </div>
            <user-info class="col-md-2" :user="response.User">posted {{ moment(response.UpdatedAt).fromNow() }}</user-info>
        </div>
        <div class="row response-accepted" v-if="response.Accepted">
            Accepted
        </div>
    </template>
    <div class="row">
        <textarea v-model="responseContent" title="response-content"></textarea>
        <input v-model="responseValue" title="response-value" type="number">
        <button v-on:click="respond">Respond</button>
    </div>
    </div>
</template>

<script type="text/babel">

    import UserInfo from '../users/UserInfo.vue'

    import Resources from '../../utils/resources'

    export default {
        components: {
            UserInfo
        },
        data() {
            return {
                request: {
                    User: {}//fix warning when page is loaded but data are not yet loaded
                },
                responseContent: "",
                responseValue: 0,
                moment: require('moment')
            };
        },
        route: {
            data({ to: { params: { id } } }) {
                return {
                    request: Resources.request.get({id: id})
                }
            }
        },
        methods: {
            toggleResponseAcceptance: function (response) {
                response.Accepted = !response.Accepted;
                Resources.response.put({ data: JSON.stringify(response) });
            },
            respond: function () {
                Resources.response.post({
                    data: JSON.stringify({
                        RequestID: this.request.ID,
                        UserID: parseInt(localStorage.userID),
                        Content: this.responseContent,
                        Value: parseInt(this.responseValue)
                    }),
                    reload: true
                });
            },
            deleteRequest: function () {
                Resources.request.delete({ id: id, redirect: '/requests' });
            },
            deleteResponse: function (responseId) {
                Resources.response.delete({ id: responseId, reload: true });
            }
        }
    }
</script>

<style>
    .response {
        margin-top: 20px;
    }
    .response-accepted {
        background-color: forestgreen;
    }
</style>

<style scoped>
    a {
        cursor: pointer;
    }
</style>