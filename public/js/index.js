$(document).ready(function () {
    searchBoxFirebase();
});

function searchBoxInit() {
    $('.ui.search')
        .search({
            source: content1
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