<template>
    
    <div class="flex space-x-3">
        <v-select v-model="selected.category" class="w-1/2" label="Category" variant="outlined" density="compact"
            :items="Object.keys(categoryNames)"></v-select>
        <v-select v-model="selected.name" class="w-1/2" label="Name" variant="outlined" density="compact"
            :items="categoryNames[selected.category]" :disabled="!selected.category"></v-select>
    </div>
    <LineChart v-if="selected.name" 
        :selectedValues="selectedValues" 
        :name="selected.name" 
        id="chart"/>
    
</template>
<script setup>

const props = defineProps({
    testResult: Object
})
const selected = ref({
    category: null,
    name:  null 
})
const categoryNames = computed(() => {
    const values = props.testResult.map(x => {
        const v = Object.values(x)
        const out = v.map((i) => ({ category: i.category, name: i.name }))
        let mapper = {}
        for (const elm of out) {
            const k = elm.category
            if (mapper[k]) {
                mapper[k].push(elm.name)
            } else {
                mapper[k] = [elm.name]
            }
        }
        return mapper
    })
    const mapper = values.reduce((a, v) => ({ ...a, ...v }), {})
    return mapper
})

const selectedValues = computed(() => {
    const values = props.testResult.map(x => {
        const v = Object.values(x)
        const date = x.id
        const out = v.map((i) => ({
            date: x.id,
            category: i.category,
            name: i.name,
            value: i.value,
            unit: i.unit
        }))
        return out.filter(i => i.name === selected.value.name)
    })
    return values.reduce((a, v) => (a.concat(v)), [])
})

const filterName = (arr, name) => {
    return arr.filter(i => i.name === name)
}







</script>