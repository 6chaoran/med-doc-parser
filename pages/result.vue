<template>
    <p v-if="user" class="text-gray-600 font-semibold mb-6">Go to <a class="text-indigo-500" href="/data">data ingest page</a> to input more records</p>
    <p v-else class="text-gray-600 font-semibold"><span class="text-indigo-500"><a href="/login">Login In</a></span> to view your parsed results</p>
    <LabResult />
</template>

<script setup>
const user = useCurrentUser()
</script>