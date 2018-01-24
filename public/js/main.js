var config = {
    apiKey: "AIzaSyAzZZ9YSqhGF_SrVsPFF6JRDseVJ2_NkCE",
    authDomain: "emytagbot.firebaseapp.com",
    databaseURL: "https://emytagbot.firebaseio.com",
    projectId: "emytagbot",
  };
firebase.initializeApp(config);
  
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
    item.innerHTML = "Welcome "+name
    if(username != "") item.innerHTML+=" @" + username
}

function addElement(tag, use)
{
    var table = document.getElementById("hashtable");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = tag;
    cell2.innerHTML = use;
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
                data["tags"].sort(function (a,b){ return a["use"] - b["use"] } );

                //crea gli elementi della tabella
                for(i in data["tags"])
                {
                   addElement(data["tags"][i]["tag"], data["tags"][i]["use"]) 
                }
                
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