<template>
    <NuxtLoadingIndicator />
    <NuxtLayout name="blank">
        <p v-if="user" class="text-gray-600 font-semibold mb-6">Go to <a class="text-indigo-500" href="/result">result
                page</a> to view processed records</p>
        <p v-else class="text-gray-600 font-semibold"><span class="text-indigo-500"><a href="/login">Login In</a></span> to
            load your health report samples</p>

        <DataIngest class="mt-3" />
    </NuxtLayout>
</template>
<script setup>

const user = useCurrentUser()
// definePageMeta({
//     middleware: ['auth'],
// })

</script>