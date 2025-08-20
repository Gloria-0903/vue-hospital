<template>
    <div v-if="route.query.orderId">
        <Detail/>
    </div>
    <div v-else>
        <AllOrder/>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import Detail from '@/page/user/order/detail/index.vue'
import AllOrder from '@/page/user/order/allOrder/index.vue'

let route = useRoute()
</script>

<style scoped>

</style>