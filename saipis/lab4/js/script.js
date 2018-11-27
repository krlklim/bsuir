document.getElementById('MainForm').onsubmit = function (event) {
    event.preventDefault();

    var tr = document.createElement('tr');
    var names = getData('name', 'input');
    var table = document.getElementById('mainTable');

    tr.appendChild(generateData(names));
    tr.appendChild(generateData(getData('date', 'input')));
    tr.appendChild(generateData(getData('os', 'input')));
    tr.appendChild(generateData(getData('brand', 'select')));
    tr.appendChild(generateData(getData('isGreat', 'input')));
    tr.appendChild(generateData(getData('otzyv', 'textarea')));
    tr.appendChild(generateData(getData('tel', 'input')));
    tr.appendChild(generateData(getData('email', 'input')));

    table.appendChild(tr);

    var namesOuterList = document.getElementById('namesOuterList');
    var namesList = document.getElementById('namesList');
    if (namesList == null) {
        namesList = document.createElement('ol');
        namesList.setAttribute('id', 'namesList');

        var namesOuterMember = document.createElement('li');
        namesOuterMember.appendChild(namesList);
        namesOuterList.appendChild(namesOuterMember);
    }

    var li = document.createElement('li');
    li.classList.add('orderedName');
    li.innerText = names[0].value;
    namesList.appendChild(li);

    if(document.getElementsByName("ifSend")[0].checked == true) {

        openWindow(table.outerHTML) ;
    }


    function getData(inputName, elType) {
        return document.querySelectorAll(elType + '[name=\"' + inputName + '\"]');
    }

    function generateData(data) {
        var td = document.createElement('td');
        console.log(data);
        if (data.length === 1) {
            td.innerText = data[0].value;
        } else if (data.length > 1) {
            var ul = document.createElement('ul');
            for (var i = 0; i < data.length; i++) {
                if (data[i].type === 'radio' && !data[i].checked)
                    continue;
                if (data[i].type === 'checkbox' && !data[i].checked)
                    continue;
                var li = document.createElement('li');
                li.innerText = data[i].value;
                ul.appendChild(li);
            }
            td.appendChild(ul);
        }
        return td;
    }

    function openWindow(data) {

            console.log('if');
            var newWindow = window.open('about::blank', 'Результаты', 'width = 1024px, height = 480px, top = 100vh, left = 150vw, scrollbars = yes');
            newWindow.document.write('<script src="../js/script.js"></script><div><h2> Результаты: </h2></div>');
            newWindow.document.write(data);
            newWindow.document.write('<br><br><input class="button" type="button" value="Закрыть" onClick = "closeWindow()"></div></div></body></html>');
    }
}



function closeWindow()
{
    var thisWindow = window.close();
}
