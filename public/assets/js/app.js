 console.log(`frontend app.js running`)
 
 // get reference to section on page
 const $gardensSection = $("#gardens-section");

// function to add a garden
function addGarden(e) {
   

   const gardenData = {
      name: $("#garden-name").val().trim(),
      location: $("#garden-location").val().trim(),
      plantedDate: $("#planted-date").val().trim()
   }
 
   console.log(gardenData)

   $.ajax({
     url: '/api/user',
     method: 'post',
     data: gardenData,
   })
     .then(function(response) {
       console.log(response);
     })
     .catch(function(err) {
       console.log(err);
       handleError(err.responseJSON);
     });
 }


 // function to GET gardens from 'api/gardens'
 function getGardenData () {
    $.ajax({
       url: '/api/gardens',
       method: 'GET'
    })
      .then(printGardens)
      .catch(err => {
         console.log(err);
      });
 }


// function to print gardenData to page
 function printGardens (gardenData) {
   $gardensSection.empty();
   console.log(`RUNNING: printGardens `)
   console.log(`gardenData: ${gardenData._id}`)

   for(let i = 0; i < gardenData.gardens.length; i++){
      $("<li>")
         .append(`<b>${gardenData.gardens[i].name}</b>`)
         .appendTo($gardensSection)
   }
 }




 $(document).ready(function() {
   getGardenData();
   $('#add-garden-form').on('submit', addGarden);
   
 });