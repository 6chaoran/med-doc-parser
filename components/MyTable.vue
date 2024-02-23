<template>
    <div class="px-4 sm:px-6 lg:px-8"> 
        <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table class="w-full divide-y divide-gray-300 table-auto">
                        <caption class="text-left font-semibold mb-3">{{ title }}</caption>
                        <thead>
                            <tr>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"></th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Value</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Unit</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden sm:inline">Updated</th>
                                
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr v-for="person, idx in people" :key="idx">
  
                                <td class="sm:whitespace-nowrap px-3 py-4 text-sm text-gray-500 w-1/5"> 
                                   {{ person.name }}
                                </td>
                                <td class="sm:whitespace-nowrap px-3 py-4 text-sm text-gray-500 w-1/5">
                                    {{ person.value }}
                                </td>
                                <td class="sm:whitespace-nowrap px-3 py-4 text-sm text-gray-500 w-1/5">
                                    {{ person.unit }}
                                </td>
                                <td class="sm:whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:block">{{ person.ingested_time }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
// const people = [
//     // { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
//     { category: 'A', name: 'B', value: 'C', unit: 'D' }
//     // More people...
// ]

const props = defineProps({
    people: Object,
    title: String
})



</script>
