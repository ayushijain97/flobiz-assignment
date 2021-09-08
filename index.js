$(function() {
    $("#login__btn").click(function() {
        let mobileNumber = $("#mobileNumber").val();
        localStorage.setItem("loggedInUser", mobileNumber);
        location.href = "/items.html";
    })
});