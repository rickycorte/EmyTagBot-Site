
  $('#err_modal').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '4%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
  }
);



function grabID()
{
    var url = window.location.href;
    var mark = url.indexOf("?");
    if(mark == -1) return null;
    var id = url.substring(mark+1);
    return id;
}

window.onload = function()
{
  var id = grabID();

  console.log(id);

  if(id == "error")
    $('#err_modal').modal('open');
}