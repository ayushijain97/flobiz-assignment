 let $table = $('#table');
 let $itemName = $("#item-name");
 let $itemCode = $("#item-code");
 let $itemUnit = $("#item-unit");
 let $itemDate = $("#item-date");
 let $itemSalesPrice = $("#item-sales-price");
 let $itemPurchasePrice = $("#item-purchase-price");
 let currentUserKey = "";
 let existingItems;
 let itemsForm;

 $(function() {
     console.log("ready!");
     // 1. Checking if user is loggedIn
     const loggedInUser = getLoggedInUser();
     const number = loggedInUser.mobile_number;
     console.log(number);
     $("#loggedInUser").text(number);

     // 2. Creating unique key For User
     currentUserKey = `items-${number}`;

     // 3. Checking if existing items are present
     let existingItems = JSON.parse(localStorage.getItem(currentUserKey));


     // 4. initializing the  items in the table
     var data = existingItems;
     $table.bootstrapTable({
         data: data ? data : [],
         onClickRow: function(arg1) {
             console.log(arg1);
             editItemsRow(arg1);
         }
     });


     // Fetch all the forms we want to apply custom Bootstrap validation styles to
     var forms = document.getElementsByClassName('needs-validation');
     // Loop over them and prevent submission
     var validation = Array.prototype.filter.call(forms, function(form) {
         itemsForm = form;
         form.addEventListener('submit', function(event) {
             if (form.checkValidity() === false) {
                 event.preventDefault();
                 event.stopPropagation();
                 form.classList.add('was-validated');
             } else {
                 onSubmit();
             }
         }, false);
     });

 });

 const onSubmit = () => {
     let item = {
         "name": $itemName.val(),
         "code": $itemCode.val(),
         "unit": $itemUnit.val(),
         "date": $itemDate.val(),
         "salesPrice": $itemSalesPrice.val(),
         "purchasePrice": $itemPurchasePrice.val()
     }


     // Check if update or create flow
     const itemID = $("#item-id").val();

     if (itemID) {
         // Update Item flow
         updateItem(item, itemID);
     } else {
         // Create newItem flow
         createNewItem(item);
     }

     // Also clear the form
     //  clearForm();
     itemsForm.reset();
     itemsForm.classList.remove('was-validated');
 }

 const validForm = () => {

     if ($itemName.val() === "" || $itemCode.val() === "" || $itemUnit.val() === "" ||
         $itemDate.val() === "" || $itemSalesPrice.val() === "" || $itemPurchasePrice.val() === "") {
         $("#myToast").toast('show');
         setTimeout(function() {
             $("#myToast").toast('hide');
         }, 5000)
         return false;
     }
     return true;
 }

 //loggingOut clicking on Logout
 $("#logout-button").click(function() {
     logOut();
 });

 const editItemsRow = (rowData) => {
     $itemName.val(rowData.name);
     $itemCode.val(rowData.code);
     $itemUnit.val(rowData.unit);
     $itemDate.val(rowData.date);
     $itemSalesPrice.val(rowData.salesPrice);
     $itemPurchasePrice.val(rowData.purchasePrice);
     $("#item-id").val(rowData.id);
 }

 const getLoggedInUser = () => {
     const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
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

 const updateItem = (item, itemID) => {

     const items = JSON.parse(localStorage.getItem(currentUserKey));
     let index;
     for (index = 0; index < items.length; index++) {
         if (items[index].id === itemID) {
             break;
         }
     }

     // Now we have the item Row in table
     $table.bootstrapTable('updateRow', {
         index: index,
         row: item
     });

     // Now update localStorage as well
     item["id"] = itemID;
     items[index] = item;

     localStorage.removeItem(currentUserKey);
     localStorage.setItem(currentUserKey, JSON.stringify(items));

 }

 const createNewItem = (item) => {
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
 }