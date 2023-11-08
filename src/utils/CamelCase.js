export const camelCase = (tag) => {
    const newList = []
    const list = tag.split(" ") || []
    for(let element of list){
        const tag = element.toLowerCase()
        const res = tag.replace(tag[0], tag[0].toUpperCase())
        newList.push(res)
    }
    return newList.join(" ")
}