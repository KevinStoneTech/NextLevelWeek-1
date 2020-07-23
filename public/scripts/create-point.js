function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) =>  { return res.json() })
    .then( states => {

        for ( const state of states ) {
                    ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`

        }
    } )
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true


    fetch(url)
    .then( (res) => { return res.json() })
    .then( cities => {

        for ( const city of cities ) {
                    citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        
        citySelect.disabled = false
    } )
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

    
// INICIO DO ITEM DE COLETA
// Itens para coleta
// pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}


const collectedItems = document.querySelector("input[name=items")



let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    // adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // Verificar se existem itens selecionados, se sim
    // pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex( function(item) {
        const itemFound = item == itemId // Isso será true ou false
        return itemFound
    })

    // se ja tiver selecionado,
    if( alreadySelected >= 0 ) {
    //  tirar da selecao
        const filteredItems = selectedItems.filter( function(item) {
            const itemIsDifferent = item != itemId // false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
    // se nao tiver selecionado, 
    // adicionar a selecao
    selectedItems.push(itemId)
    }

    // atualizar o campo com os itens ja selecionados
    collectedItems.value = selectedItems
}
// FIM DO ITEM DE COLETA