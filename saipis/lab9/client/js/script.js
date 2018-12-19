document.addEventListener("DOMContentLoaded", () =>
    setupButtons()
);

setupButtons = () => {
    $('#submitArrayButton').click(handleSubmitArrayButton);
    $('#showSourceButton').click(handleShowSourceButton);
    $('#showProcessedButton').click(handleShowProcessedButton);
};

handleSubmitArrayButton = (e) => {
    e.preventDefault();

	const textArea = $("#arraysInput");
    const textArrays = textArea.val();
    textArea.val('');

    $.ajax({
        method: 'POST',
        url: '/',
        data: { "arr": textArrays }
    })
};

handleShowSourceButton = () =>
    $.ajax({
        url: '/show'
    }).done(data => $('#sourceArrays').text(data));

handleShowProcessedButton = () =>
    $.ajax({
        url: '/second'
    }).done(data => window.open().document.write(data));
