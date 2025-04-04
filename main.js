async function fetchJson(url) {
    const response = await fetch(url)
    const obj = await response.json()
    return obj
}

const getChefBirthday = async (id) => {
    let recipe;
    try {
        recipe = await fetchJson(`https://dummyjson.com/recipes/${id}`)
    } catch (error) {
        throw new Error(`Errore nel fetch della ricetta con id ${id}`)
    }

    if (recipe.message) {
        throw new Error(recipe.message)
    }

    let chef;
    try {
        chef = await fetchJson(`https://dummyjson.com/users/${recipe.userId}`)
    } catch (error) {
        throw new Error(`Errore nel fetch dello chef con userId ${recipe.userId}`)
    }
    
    if (recipe.message) {
        throw new Error(recipe.message)
    }
    return (chef.birthDate)
}

(async () => {
    try {
        const birthday = await getChefBirthday(1)
        console.log(`Data di nascita dello chef: ${birthday}`)
    } catch (error) {
        console.error(error)
    }
})()