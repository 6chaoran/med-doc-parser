
const getUnique = (array) => {
    const isUnique = (value, index ,array) => {
        return array.indexOf(value) === index;
    }
    return array.filter(isUnique(array))
}