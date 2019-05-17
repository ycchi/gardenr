console.log('app.js running');

// function to add a garden
function addGarden(e) {
   
   e.preventDefault();

   const gardenData = {
      name: $("#garden-name").val().trim(),
      location: $("#garden-location").val().trim(),
      plantedDate: $("#planted-date").val().trim()
   }
 
   console.log(gardenData)

 
   
   $.ajax({
     url: '/api/gardens',
     method: 'post',
     data: gardenData,
   //   headers: {
   //     authorization: `Bearer ${token}`
   //   }
   })
     .then(function(response) {
       console.log(response);
     })
     .catch(function(err) {
       console.log(err);
       handleError(err.responseJSON);
     });
 }


 $(document).ready(function() {
   
   $('#add-garden-form').on('submit', addGarden);
   
 });