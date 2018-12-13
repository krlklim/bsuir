$(function() {
    setupButtons();
});

function setupButtons() {
    $('#insert-button').click(function() {
        handleInsertButtonClicked();
    })

    $('#good-button').click(function() {
        handleGoodButtonClicked();
    })

    $('#add-fruit-button').click(function() {
      handleAddFruitButtonClicked();
    })
}

function handleInsertButtonClicked() {
    transferList('a', 'h1');
    transferList('b', 'h2');
    transferList('c', 'h3');

    $('#insert-button')[0].setAttribute('disabled', 'disabled');
}


function handleGoodButtonClicked() {
    $('#fruit-groups li ul li').filter(':nth-child(2n)').toArray().forEach(listElement => {
        if (/good/i.test(listElement.textContent)) {
            $(listElement).addClass('good')
        }
    })
}

function transferList(letter, tag) {
    let listElement = $(`#fruit-groups li[data-letter=${letter}]`);
    listElement.html(`<${tag}>${listElement[0].textContent}</${tag}>`);
    listElement.append(generateInnerList(letter));
}

function generateInnerList(letter) {
    let list = $("<ul></ul>");
    let pattern = new RegExp(`^${letter}`, 'i');
    getSentencesFromList('#fruit-sentences', pattern).forEach(sentence => $(list).append(sentence));
    return list;
}

function getSentencesFromList(selector, pattern) {
    let sentencesReducer = (accumulator, sentence) => {
        if(pattern.test(sentence.textContent)) {
            accumulator.push($(sentence).clone())
        }
        return accumulator;
    };
    return $(selector).find('li').toArray().reduce(sentencesReducer, []);
}

function handleAddFruitButtonClicked() {
    let fruit = $('#new-fruit-input').val();
    let listsSelector = '.new-fruit-list'

    if ($(listsSelector).length === 0) {
      let list = $("<ul></ul>");
      list.addClass('new-fruit-list');
      $('#fruit-groups li:first ul li.good').toArray().forEach(listElement => {
        $(listElement).append(list);
      })
    }

    $(listsSelector).toArray().forEach(list => {
        $(list).append(`<li>${fruit}</li>`)
    })
}
