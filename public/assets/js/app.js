 console.log(`frontend app.js running`)

 // get reference to section on page
 const $plantSection = $("#plant-section");

 // function to add a Plant
 function addPlant(e) {

   const plantData = {
     name: $("#plant-name").val().trim(),
     location: $("#plant-location").val().trim(),
     plantedDate: $("#planted-date").val().trim()
   }

   console.log(plantData)

   $.ajax({
       url: '/api/plants',
       method: 'post',
       data: plantData,
     })
     .then(function (response) {
       console.log(response);
     })
     .catch(function (err) {
       console.log(err);
       handleError(err.responseJSON);
     });
 }


 // function to GET plants from 'api/plants'
 function getPlantData() {
   $.ajax({
       url: '/api/plants',
       method: 'GET'
     })
     .then(printPlants)
     .catch(err => {
       console.log(err);
     });
 }


 // function to print plantData to page
 function printPlants(plantData) {
   $plantSection.empty();
   console.log(`RUNNING: printPlants `)
   console.log(`plantData: ${plantData}`)
   console.log(JSON.stringify(plantData))

   for (let i = 0; i < plantData.plants.length; i++) {
     $("<a>")
      .addClass(`list-group-item list group-item-action text-dark`)
      .text(`${plantData.plants[i].name}`)
      .attr("href", "#")
      //  .append(`<button class="delete-plant" data-id="${plantData.plants[i]._id}">Remove</button>`)
       .appendTo($plantSection)
   }
 }



 function removePlant() {

   const plantId = $(this).attr("data-id");
   console.log(`RUNNING: removePlant`)
   $.ajax({
       url: `/api/plants/${plantId}`,
       method: "DELETE"
       // data: {
       //   _id: plantId
       // }
     })
     .then(() => location.reload())
     .catch(err => console.log(err))
 }




 $(document).ready(function () {
   getPlantData();
   $('#add-plant-form').on('submit', addPlant);

   //  $('.delete-plant').on('click', removePlant)
   $(document).on('click', ".delete-plant", removePlant)

 });