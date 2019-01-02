$(document).ready(function () {
    searchBoxFirebase();

    $("#createButton").click(function () {
        passDeckName($("#createInput").val());
        var nametoCreate = $("#createInput").val();
        firebase.database().ref('/' + nametoCreate + '/').set({
            "question1": "No question entered",
        }).then(function () {
            window.location.href = "create.html";
        })

    });
});

function searchBoxInit() {
    $('.ui.search')
        .search({
            source: content1,
            //User clicks a search result, it is returned in result variable.
            onSelect: function (result) {
                passDeckName(result.title);
                window.location.href = "review.html"
            }
        });
}
var content1 = [];

function searchBoxFirebase() {

    firebase.database().ref().once("value").then(function (snapshot) {
        snapshot.forEach(function (childsnapshot) {
            console.log(childsnapshot.key);
            var addition = {
                title: childsnapshot.key
            };
            content1.push(addition);
        })

    }).then(searchBoxInit);
}

function passDeckName(name) {
    sessionStorage.setItem('deckName', name);
}