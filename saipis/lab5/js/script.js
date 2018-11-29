document.addEventListener("DOMContentLoaded", function() {
    setupButtons();
    setupModal();
});

function setupButtons() {
    document.getElementById('clear-button').onclick = function(){
        handleClearButtonClicked();
    }

    document.getElementById('info-button').onclick = function(){
        handleInfoButtonClicked();
    }

    document.getElementById('add-button').onclick = function(){
        handleAddButtonClicked();
    }
    document.getElementById('delete-button').onclick = function(){
        deleteCats();
    }
}

function setupModal() {
    let modal = document.getElementById('cats-modal');
    document.getElementById("close-modal").onclick = function() {
        modal.style.display = "none";
        clearCatsList();
    }
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
            clearCatsList();
        }
    }
}

function handleClearButtonClicked() {
    let inputs = document.getElementsByClassName('form-control');
    arrayFromInputs(inputs).forEach(function (input) {
        input.value = '';
        input.classList.add('button-expanded');
        input.setAttribute('placeholder', 'Пожалуйста, заполните поле')
    });
}

function handleInfoButtonClicked() {
    document.getElementById("cats-modal").style.display = "block";
    appendCatsList(collectCats());
}

function handleAddButtonClicked() {
    let catRow = document.getElementById('cat-input-row');
    let newRow = catRow.cloneNode(true);
    document.getElementById('form-dynamic-rows').append(newRow);
    newRow.setAttribute('id', '');
}

function collectCats() {
    let inputs = document.getElementsByClassName('cat-input');
    return compactArray(arrayFromInputs(inputs).map(input => input.value));
}

function appendCatsList(cats) {
    let ol = createCatsOl();
    populateCatsList(cats, ol);
}

function createCatsOl() {
    let wrapper = document.createElement('div');
    let ol = document.createElement('ol');

    ol.classList.add('list-group');
    document.getElementById('cats-list').appendChild(wrapper);
    wrapper.appendChild(ol);
    styleWrapper(wrapper);

    return ol
}

function styleWrapper(wrapper) {
    wrapper.style.fontSize = document.getElementById('font-size').value + 'px';
    wrapper.style.color = document.getElementById('font-color').value;
}

function populateCatsList(cats, ol) {
    cats.forEach(function (item) {
        let li = document.createElement('li');
        li.classList.add('list-group-item');
        ol.appendChild(li);
        li.innerHTML += item;
    });
}

function clearCatsList() {
    document.getElementById('cats-list').innerHTML = '';
}

function arrayFromInputs(inputs) {
    return Array.prototype.slice.call(inputs);
}

function compactArray(array) {
    return array.filter(function (element) {
        return (element != null && element !== '');
    });
}

function deleteCats() {
    let inputs = document.getElementsByClassName('form-control');
    let allCats = arrayFromInputs(inputs);
    for (var i = 0; i < allCats.length; i += 2) {
        document.getElementById('form-dynamic-rows').removeChild(allCats[i]);
    }
}