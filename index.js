
// 現在時刻を取得して出力する関数
let writeToday = function () {
    //曜日取得
    let today = new Date();
    let week = today.getDay();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    let year = today.getFullYear();
    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();
    let time = today.getTime();
    let timeLeft = Math.floor((1000 * 60 * 60 * 24 - (time + 9 * 60 * 60 * 1000) % (1000 * 60 * 60 * 24)) / 1000)

    //曜日を入れる変数
    let str;

    //条件分岐
    switch (week) {
        case 0: str = "日"; break;
        case 1: str = "月"; break;
        case 2: str = "火"; break;
        case 3: str = "水"; break;
        case 4: str = "木"; break;
        case 5: str = "金"; break;
        default: str = "土"; break;
    }

    document.getElementById("time").innerHTML = (
        year + "年" + month + "月" + date + "日" + str + "曜日<br>" +
        hour + "時" + min + "分" + sec + "秒<br>今日は残り" + timeLeft + "秒です"
    );
}
writeToday();
setInterval(writeToday, 500);


//ToDoを削除　関数
const delToDo = () => {
    let checks = document.getElementsByClassName("checked");
    for (let i = checks.length - 1; i > -1; i--) {
        checks[i].outerHTML = "";
    }
}

//全てのclassをnotCheckedに 関数
const checkReset = (id) => {
    let checks = document.getElementById(id).getElementsByClassName("checked");
    for (let i = checks.length - 1; i > -1; i--) {
        checks[i].className = "notChecked";
    }
}

//リストに新しいtodoを追加　関数
const addToDo = () => {
    let toDo = document.getElementById("toDo");
    const ElAddToDo = document.getElementById("addToDo");
    const text = ElAddToDo.value;
    if (text != "") {
        toDo.insertAdjacentHTML('beforeend', '<div class="notChecked" onClick="toggleClass(event)">' + text + '</div>');
        ElAddToDo.value = "";
        ElAddToDo.focus();
        checkReset("toDo");
        checkReset("comp");
    }
}

//Enterキーを押されたら追加ボタンをクリック
document.getElementById("addToDo").addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        addToDo();
    }
});

// Deleteキーを押されたら削除ボタンをクリック
document.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 46) {
        if (document.activeElement.id != "addToDo") {
            delToDo();
        };
    }
});

//divタグをクリックされたらchecked/notCheckedクラスを切り替える　関数
const toggleClass = (e) => {
    if (e.target.className === "notChecked") {
        e.target.className = "checked";
    } else if (e.target.className === "checked") {
        e.target.className = "notChecked";
    };
}

//todoリストから完了リストへ移動　関数
const complete = () => {
    let toDoChecks = document.querySelectorAll("#toDo .checked");
    let comp = document.getElementById("comp");
    for (let i = 0; i < toDoChecks.length; i++) {
        comp.insertAdjacentHTML('beforeend', toDoChecks[i].outerHTML);
    }
    checkReset("comp");
    delToDo();
}

//完了リストからtodoリストへ移動　関数
const back = () => {
    let compChecks = document.querySelectorAll("#comp .checked");
    let toDo = document.getElementById("toDo");
    for (let i = 0; i < compChecks.length; i++) {
        toDo.insertAdjacentHTML('beforeend', compChecks[i].outerHTML);
    }
    checkReset("toDo");
    delToDo();
}