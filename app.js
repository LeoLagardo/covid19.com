let jsondata = [];

fetch("https://api.covid19india.org/data.json").then(function (response) {
    return response.json();
}).then(function (data) {
    //console.log(data.statewise[0].confirmed);

    let Initjsondata = [];
    for (var i in data)
        Initjsondata.push([i, data[i]]);

    jsondata = Initjsondata[1][1];
    pushData(jsondata);
    totalData(jsondata);
});

totalData = (data) => {
    let totalConfirmed = data[0].confirmed;
    let totalDeaths = data[0].deaths;
    let totalRecovered = data[0].recovered;
    let totalActive = data[0].active;

    document.getElementById('totalConf').innerHTML = Number(totalConfirmed).toLocaleString("en-IN");
    document.getElementById('totalDea').innerHTML = Number(totalDeaths).toLocaleString("en-IN");
    document.getElementById('totalRec').innerHTML = Number(totalRecovered).toLocaleString("en-IN");
    document.getElementById('totalAct').innerHTML = Number(totalActive).toLocaleString("en-IN");

}

//setTimeout(function(){ console.log(jsondata[1][1][0].state); }, 3000);

//sort function

$('th').on('click', function () {

    let column = $(this).data('column');
    let order = $(this).data('order');


    if (order == 'desc') {
        $(this).data('order', 'asc');
        jsondata = jsondata.sort((a, b) => a[column] > b[column] ? 1 : -1);
    } else {
        $(this).data('order', 'desc');
        jsondata = jsondata.sort((a, b) => a[column] < b[column] ? 1 : -1);
    }
    pushData(jsondata);
});

/****************************** */


pushData = (data) => {
    let table = document.getElementById('casesTable');
    table.innerHTML = '';
    for (let i = 1; i < data.length; i++) {
        let row = `
            <tr>
                <td>${data[i].state}</td>             
                <td>${Number(data[i].confirmed).toLocaleString("en-IN")}</td>
                <td>${Number(data[i].active).toLocaleString("en-IN")}</td>
                <td>${Number(data[i].recovered).toLocaleString("en-IN")}</td>
                <td>${Number(data[i].deaths).toLocaleString("en-IN")}</td>
                
            </tr>`
        table.innerHTML += row;
    }

}


function updateTime(){

    setTimeout('updateTime()',1000);

    const date = new Date()
    const dateTimeFormat = new Intl.DateTimeFormat('en-IN', { year: 'numeric', month: 'short',
    day: '2-digit',hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false}) 
    const [{ value: month },,{ value: day },,{ value: hour12 },,{value: hour},,{value: minute},,{value: second}] = dateTimeFormat .formatToParts(date ) 

    document.getElementById('showTime').innerHTML = (` ${day} ${month}, ${hour}:${minute}:${second}`);
}

updateTime();

/*

var dt = new Date();
var h =  dt.getHours(), m = dt.getMinutes(), s = dt.getSeconds();
var _time = (h > 12) ? (h-12 + ':' + m + ':' + s +' PM') : (h + ':' + m + :' + s +' AM');

*/