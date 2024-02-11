<template>
    <a href="/result">Go To Result</a>
    <pdfView />
</template>
<script setup>

definePageMeta({
    middleware: ['auth'],
})

</script>