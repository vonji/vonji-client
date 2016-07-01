<template>
    <div> <!-- single root level so the component is not a fragment -->
        <template v-for="alert in alerts">
            <div @click="alertDismiss($index)" class="alert alert-{{alert.type}}">
                {{alert.message}}
            </div>
        </template>
    </div>
</template>

<script type="text/babel">

    import { alertDismiss } from '../vuex/actions'

    export default {
        date() {
            return {
            }
        },
        vuex: {
            getters: {
                alerts: (state) => state.alerts
            },
            actions: {
                alertDismiss
            }
        }
    }
</script>