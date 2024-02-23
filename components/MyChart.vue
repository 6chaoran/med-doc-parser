<template>
    Chart<br>
    <div class="flex space-x-3">
        <v-select v-model="selected.category" 
            label="Category" variant="outlined" density="compact"
            :items="Object.keys(categoryNames)"></v-select>
        <v-select v-model="selected.name" 
            label="Name" variant="outlined" density="compact"
            @update:model-value="updateValues"
            :items="categoryNames[selected.category]" :disabled="!selected.category"></v-select>
    </div>

    <hr>
    {{ selectedValues }}
</template>
<script setup>
const props = defineProps({
    testResult: Object
})
const selected = ref({
    category: null,
    name: null
})
const categoryNames = computed( () => {
    const values = props.testResult.map( x => {
        const v = Object.values(x)
        const out = v.map( (i) => ({category: i.category, name: i.name}))
        let mapper = {}
        for (const elm of out){
            const k = elm.category
            if ( mapper[k] ){
                mapper[k].push(elm.name)
            } else {
                mapper[k] = [elm.name]
            }
        }
        return mapper
    })
    const mapper = values.reduce((a,v) => ({...a,  ...v}) , {})
    return mapper
})

const selectedValues = computed(() => {
        const values = props.testResult.map(x => {
        const v = Object.values(x)
        const out = v.map((i) => ({ category: i.category, name: i.name, value: i.value }))
        return out
    })
    return values.reduce( (a, v) => (a.concat(v)), [])
})


console.log(selectedValues)

</script>