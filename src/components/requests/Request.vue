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
            <a href="#" v-on:click="deleteRequest">delete</a>
        </div>
        <user-info class="col-md-2" :user="request.User"></user-info>
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
                <a v-link="'responses/edit/' + response.ID">edit</a>
                <a v-on:click="deleteResponse(response.ID)" href="#">delete</a>
            </div>
            <user-info class="col-md-2" :user="response.User"></user-info>
        </div>
        <div class="row response-accepted" v-if="response.Accepted">
            Accepted
        </div>
    </template>
    <div class="row">
        <textarea v-model="responseContent" name="response-content"></textarea>
        <input v-model="responseValue" title="response-value" type="number">
        <button v-on:click="respond">Respond</button>
    </div>
    </div>
</template>

<script type="text/babel">

    import UserInfo from '../users/UserInfo.vue'

    import vonji from '../../utils/ajax'//temp

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
                responseValue: 0
            };
        },
        route: {
            data({ to: { params: { id } } }) {
                return {
                    request: this.$http.get('http://localhost:1618/requests/' + id).then(({data}) => data)
                }
            }
        },
        methods: {
            toggleResponseAcceptance: function (response) {
                response.Accepted = !response.Accepted;

                vonji.put({//
                    url: 'responses',
                    data: JSON.stringify(response)
                });
            },
            respond: function () {
                vonji.post({//
                    url: 'responses',
                    reload: true,
                    data: JSON.stringify({
                        RequestID: this.request.ID,
                        UserID: parseInt(localStorage.userID),
                        Content: this.responseContent,
                        Value: parseInt(this.responseValue)
                    })
                });
            },
            deleteRequest: function () {
                vonji.delete({//
                    url: 'requests/' + id,
                    redirect: 'requests/requestlist.html'
                });
            },
            deleteResponse: function (responseId) {
                vonji.delete({//
                    url: 'responses/' + responseId,
                    reload: true
                });
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