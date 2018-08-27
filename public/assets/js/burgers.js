$(function(){
    $(".addBurgerBtn").on("submit", function(event) {
      event.preventDefault();
      
      var newBurger = {
        burger_name: $("#burger-input").val().trim(),
        devoured: false
      };
                              
      $.ajax("/burgers", {
        type: "POST",
        data: newBurger
      }).then(function(){
        console.log("Created new burger" + newBurger.burger_name);
      });
  
    });
  
  
    /* $(".devour-btn").on("click", function() {
      console.log("working");
      var id = $(this).data("id");
      var isDevoured = $(this).data("devoured");
      
      var updatedBurger = {
        devoured = isDevoured
      };
      
      $.ajax("/burgers/" + id, {
        type: "PUT",
        data: updatedBurger
      }).then(function() {
        console.log("Updated burger id" + id + "as devoured");
      });
      
    }) */
    
    
    $(".remove-btn").on("click", function(event) {
      event.preventDefault();
      
      var id = $(this).data("id");
      
      $.ajax("/burgers", {
        type: "DELETE"
      }).then(function() {
        console.log("deleted burger" + id);
      });
    });
    
  });