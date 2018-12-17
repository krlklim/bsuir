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

    $('#loadCountryXMLButton').click((event) => {
      event.preventDefault();
      $(event.target).blur();

      let xhr = new XMLHttpRequest();
      xhr.open('GET', `../resources/${selectedCountry()}.txt`);
      xhr.onload = function() {
        if (xhr.status === 0) {
          populateCountryInfoXHR(xhr.responseText)
        }
        else {
          alert('Request failed.  Returned status of ' + xhr.status);
        }
      };
      xhr.send();
    })
}

selectedCountry = () => $('#countrySelect').val();
populateCountryInfo = (data) => $('#par').text(data);
populateCountryInfoXHR = (data) => $('#parXHR').text(data);
writeAjaxLog = (message) => $('#ajaxLog').append(`<span>${message}</span><br/>`);

populateLandmarksInfo = (info) => {
    $('#landmarks').text(info.landmarks.join(', '));
    $('#population').text(info.population);
    $('#capital').text(info.capital);
}

