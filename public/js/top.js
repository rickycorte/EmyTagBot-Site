var config = {
    apiKey: "AIzaSyAzZZ9YSqhGF_SrVsPFF6JRDseVJ2_NkCE",
    authDomain: "emytagbot.firebaseapp.com",
    databaseURL: "https://emytagbot.firebaseio.com",
    projectId: "emytagbot",
};
firebase.initializeApp(config);

$('#load_modal').modal({
    dismissible: false, // Modal can be dismissed by clicking outside of the modal
    opacity: .9, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '4%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
}
);

$('#load_modal').modal('open');

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();


function set_title() {
    var item = document.getElementById("pg_title")
    item.innerHTML = "Top Tags";
}


function getElemHtml(pos, tag, use, creation, type, last) {

    var htm = `<div class="col s12 m6 l6 xl4">
    <ul class="collapsible popout" data-collapsible="accordion">
        <li><div class="collapsible-header">{tag}<span class="badge">{pos}</span></div><div class="collapsible-body">
                <ul class="collection"><li class="collection-item">Use: {use}</li></ul></div>`;
    htm = htm.replace("{tag}", tag);
    htm = htm.replace("{pos}", pos.toString());
    htm = htm.replace("{use}", use.toString());

    return htm;
}

window.onload = function () {

    var docRef = db.collection("more").doc("top");

    //recupera i dati dal db
    docRef.get().then(function (doc) {
        if (doc.exists) {
            var data = doc.data()

            //importa titolo pagina
            set_title();

            //ordine decrescente
            data["tags"].sort(function (a, b) { return b["use"] - a["use"] });

            var container = document.getElementById("tags");

            //crea gli elementi della tabella
            for (i in data["tags"]) {
                container.innerHTML += getElemHtml(
                    parseInt(i) + 1, 
                    data["tags"][i]["tag"],
                    data["tags"][i]["use"],
                )
            }

            $('#load_modal').modal('close');

            $('.collapsible').each(
                function (index) {
                    $(this).collapsible();
                }
            );
        }
        else {
            window.location.replace("index.html?error");
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });

}