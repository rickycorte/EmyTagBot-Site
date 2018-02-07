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



function set_title()
{
    var item = document.getElementById("pg_title")
    item.innerHTML = "Nyaaaaa!";
}

function set_name(name)
{

    var item = document.getElementById("you");
    item.innerHTML = name;

}

function set_stats(data)
{
    var item = document.getElementById("stats");
    var i = 0;
    var usages = 0;
    for(i in data["tags"])
    {
        usages += data["tags"][i]["use"];
    }
    item.innerHTML = item.innerHTML.replace("{total_uses}",usages.toString());
    item.innerHTML = item.innerHTML.replace("{tag_count}",(parseInt(i)).toString());
}

function set_top_tags(data)
{
    var item = document.getElementById("top_list");
    var result = ""
    for(i in data["tags"])
    {
        if(i > 2) break
        //scrivi solo i primi 3 (perche la lista passata come parametro e' ordinata)

        result += data["tags"][i]["tag"]+"<br>";
    }
    item.innerHTML = result
}


function getElemHtml(pos, tag, use, creation, type, last)
{

    var htm = `<div class="col s12 m6 l6 xl4">
    <ul class="collapsible popout" data-collapsible="accordion">
        <li><div class="collapsible-header">{tag}<span class="badge">{pos}</span></div><div class="collapsible-body">
                <ul class="collection"><li class="collection-item">Use: {use}</li><li class="collection-item">Type: {type}</li>
                    <li class="collection-item">Creation: {creation}</li><li class="collection-item">Expire: {last}</li></ul></div></li></ul></div>`;
    htm = htm.replace("{tag}",tag);
    htm = htm.replace("{pos}",pos.toString());
    htm = htm.replace("{use}",use.toString());
    htm = htm.replace("{type}",type);
    htm = htm.replace("{creation}",creation);
    htm = htm.replace("{last}", last);

    
    htm = htm.replace("{icon}","");

    return htm;
}

window.onload =  function()
{
    var id = grabID();
    //id errato, redirect alla home
    if(id == null || isNaN(id) || id == undefined) 
    {
        console.log("its a trap :3")
        window.location.replace("index.html?error");
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
                set_title();

                //ordine decrescente
                data["tags"].sort(function (a,b){ return b["use"] - a["use"] } );

                var container = document.getElementById("tags");

                //crea gli elementi della tabella
                for(i in data["tags"])
                {
                   container.innerHTML += getElemHtml(
                        parseInt(i)+1,data["tags"][i]["tag"],
                        data["tags"][i]["use"],
                        data["tags"][i]["creation"],
                        data["tags"][i]["type"],
                        data["tags"][i]["expire"]
                    ) 
                }

                set_name(data["name"]);
                set_stats(data);
                set_top_tags(data);
                
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
                window.location.replace("index.html?error");
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

    }
}