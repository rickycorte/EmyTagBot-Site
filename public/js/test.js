
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


window.onload = function()
{
    setTimeout(function() {
        console.log("ok");
    },2000)
}