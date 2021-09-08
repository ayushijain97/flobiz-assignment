 let $table = $('#table')
 let currentUserKey = "";

 $(function() {
     console.log("ready!");
     // 1. Checking if user is loggedIn
     const loggedInUser = getLoggedInUser();
     $("#loggedInUser").text(loggedInUser);

     // 2. Creating unique key For User
     currentUserKey = `items-${loggedInUser}`;

     // 3. Checking if existing items are present
     let existingItems = JSON.parse(localStorage.getItem(currentUserKey));

     // 4. initializing the  items in the table
     var data = existingItems;
     $table.bootstrapTable({
         data: data ? data : [],
         onClickRow: function(arg1, arg2) {
             console.log(arg1);
             console.log(arg2);
         }
     })
 });

 $("#item-save-button").click(function() {
     const item = {
         "name": $("#item-name").val(),
         "code": $("#item-code").val(),
         "unit": $("#item-unit").val(),
         "date": $("#item-date").val(),
         "salesPrice": $("#item-sales-price").val(),
         "purchasePrice": $("#item-purchase-price").val()
     }

     // Create uniqueId for this new Item.
     // 1. Check globalId counter from localStorage
     // 2. if exist increment and reuse
     // 3. Store the incremented value in localStorage
     const itemID = parseInt(localStorage.getItem("itemId"));
     localStorage.setItem("itemId", !itemID ? 1 : itemID + 1);
     item["id"] = localStorage.getItem("itemId");

     //  Pushing item to localStorage 
     let existingItems = JSON.parse(localStorage.getItem(currentUserKey));
     if (!existingItems) {
         existingItems = [];
     }
     existingItems.push(item);
     localStorage.setItem(currentUserKey, JSON.stringify(existingItems));

     // Let's append this new record to the table
     $table.bootstrapTable('append', item);

     // Also clear the form
     clearForm();
 });
 //loggingOut clicking on Logout
 $("#logout-button").click(function() {
     logOut();
 });

 const editItemRow = () => {
     const counter = 1;
     if (!counter) {
         localStorage.setItem("itemId", counter);
     } else {
         localStorage.setItem("itemId", counter++);
     }

 }

 const getLoggedInUser = () => {
     const loggedInUser = localStorage.getItem("loggedInUser");
     if (!loggedInUser) {
         location.href = "/index.html";
     }
     return loggedInUser;
 }

 const logOut = () => {
     localStorage.removeItem("loggedInUser");
     location.href = "/index.html";
 }

 const clearForm = () => {
     $("#item-name").val("");
     $("#item-code").val("");
     $("#item-unit").val("");
     $("#item-date").val("");
     $("#item-sales-price").val("");
     $("#item-purchase-price").val("");
 }

 const clickMe = function() {
     alert("Hello");
 }