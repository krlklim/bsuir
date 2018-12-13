$(() => {
    setupAjaxHooks();
    setupButtons();
});

setupAjaxHooks = () => {
    $(document).ajaxStart(() => writeAjaxLog('Начало отправки AJAX-запроса'));
    $(document).ajaxSend(() => writeAjaxLog('Отправка AJAX-запроса'));
    $(document).ajaxStop(() => writeAjaxLog('Конец отправки AJAX-запроса'));
    $(document).ajaxSuccess(() => writeAjaxLog('Получен ответ на AJAX-запрос'));
    $(document).ajaxError(() => writeAjaxLog('Ошибка AJAX-запроса'));
}

setupButtons = () => {
    $('#loadCountryButton').click((event) => {
        event.preventDefault();
        $(event.target).blur();
        $.ajax({url: `../resources/${selectedCountry()}.txt`, success: populateCountryInfo});
        $.getJSON(`../resources/${selectedCountry()}.json`, populateLandmarksInfo)
    })
}

selectedCountry = () => $('#countrySelect').val();
populateCountryInfo = (data) => $('#par').text(data);
writeAjaxLog = (message) => $('#ajaxLog').append(`<span>${message}</span><br/>`);

populateLandmarksInfo = (info) => {
    $('#landmarks').text(info.landmarks.join(', '));
    $('#population').text(info.population);
    $('#capital').text(info.capital);
}
