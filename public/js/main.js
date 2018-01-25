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


function grabID()
{
    var url = window.location.href;
    var mark = url.indexOf("?");
    if(mark == -1) return null;
    var id = url.substring(mark+1);
    return parseInt(id);
}



function set_title(name,username)
{
    item = document.getElementById("pg_title")
    item.innerHTML = "Hey "+name+"!";
}


function getElemHtml(pos, tag, use)
{

    htm = `<div class="col s12 m6 l6 xl4">
    <ul class="collapsible popout" data-collapsible="accordion">
        <li><div class="collapsible-header">{tag}<span class="badge">{pos}</span></div><div class="collapsible-body">
                <ul class="collection"><li class="collection-item">Use: {use}</li><li class="collection-item">Type: {type}</li>
                    <li class="collection-item">Creation: {creation}</li><li class="collection-item">Expire: {last}</li></ul></div></li></ul></div>`;
    htm = htm.replace("{tag}",tag);
    htm = htm.replace("{pos}",pos.toString());
    htm = htm.replace("{use}",use.toString());
    htm = htm.replace("{type}","N.A.");
    htm = htm.replace("{creation}","N.A.");
    htm = htm.replace("{last}", "N.A.");
    

    return htm;
}

window.onload =  function()
{
    var id = grabID();
    //id errato, redirect alla home
    if(id == null || isNaN(id) || id == undefined) 
    {
        console.log("its a trap :3")
        //window.location.replace("index.html");
    }
    else
    {
        var docRef = db.collection("users").doc(id.toString());
        
        //recupera i dati dal db
        docRef.get().then(function(doc) {
            if (doc.exists) 
            {
                var data = doc.data()

                //importa titolo pagina
                set_title(data["name"], data["username"]);

                //ordine decrescente
                data["tags"].sort(function (a,b){ return b["use"] - a["use"] } );

                container = document.getElementById("tags");

                //crea gli elementi della tabella
                for(i in data["tags"])
                {
                   container.innerHTML += getElemHtml(parseInt(i)+1,data["tags"][i]["tag"], data["tags"][i]["use"]) 
                }
                
                $('#load_modal').modal('close');

                $('.collapsible').each(
                    function(index)
                    {
                        $(this).collapsible();
                    }
                );
            }
            else
            {
                //window.location.replace("index.html");
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

    }
}