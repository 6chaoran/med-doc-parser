<template>
    <div class="flex space-x-3" id="top">
        <v-autocomplete v-model="selected.category" class="w-1/2" label="Category" variant="outlined" density="compact"
            @update:modelValue="showCharts=true" :items="Object.keys(categoryNames)"></v-autocomplete>
    </div>
    <div id="charts" v-if="showCharts && Object.keys(selectedCatValues).length > 0" class="relative py-1">
        <div class="absolute right-3 top-1"><v-icon color="indigo" size="20" @click="showCharts=false">mdi-close</v-icon></div>
        
        <div v-for="v, idx in selectedCatValues">
            <LineChart v-if="typeof (v[0].value) === 'number'" :selectedValues="v" :name="idx" :id="idx" />
        </div>

        <div class="absolute right-1 bottom-[-5px]"><a href="#top" class="text-blue-500 underline">Back to top</a></div>

    </div>
</template>
<script setup>

const props = defineProps({
    testResult: Object
})
const selected = ref({
    category: null,
    name: null
})
const showCharts = ref(true)

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

const selectedCatValues = computed(() => {
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
        return out.filter(i => i.category === selected.value.category)
    }).reduce((a, v) => a.concat(v), [])

    let out = {}
    for (const v of values) {
        if (v.name in out) {
            out[v.name].push(v)
        } else {
            out[v.name] = [v]
        }
    }
    return out
})

const filterName = (arr, name) => {
    return arr.filter(i => i.name === name)
}







</script>