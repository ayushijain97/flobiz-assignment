$(() => {
    $("#continueBtn").click(function() {
        let mobileNumber = $("#mobile_Number").val();
        if (mobileNumber.length === 10) {
            changingStyles();
            gettingOTP(mobileNumber);
            $("#login__btn").click(loggingIn);
        } else {
            enableToaster();
        }
    })
});
const gettingOTP = async(mobileNumber) => {

    try {
        const result = await fetch("https://niobooks.in/api/web/request_otp", {
            method: "POST",
            headers: {
                'Accept': 'application/JSON',
                'Content-type': 'application/JSON',
                'client': 'web'
            },
            body: JSON.stringify({
                'mobile_number': mobileNumber,
            })
        });

        const data = await result.json();
        console.log(data);
    } catch (err) {
        alert(err);
    }
}
const changingStyles = () => {
    $("#continueBtn").css({ display: "none" });
    $("#inputOTP").css({ display: "block" });
    $("#login__btn").css({ display: "block" });
}

const loggingIn = async() => {
    let otp = $("#otpInput").val();
    let mobileNumber = $("#mobile_Number").val();
    if (otp.length === 6) {
        try {
            const result = await fetch("https://niobooks.in/api/web/authenticate", {
                method: "POST",
                headers: {
                    'Accept': 'application/JSON',
                    'Content-type': 'application/JSON',
                    'client': 'web'
                },
                body: JSON.stringify({
                    mobile_number: mobileNumber,
                    otp_code: otp
                })
            });
            const userDetails = await result.json();
            // enter you logic when the fetch is successful
            localStorage.setItem("loggedInUser", JSON.stringify(userDetails));
            location.href = "/items.html";
        } catch (err) {
            alert(err);
        }

    } else {
        $("#Toast").toast('show');
        setTimeout(function() {
            $("#Toast").toast('hide');
        }, 5000)
    }
}
const enableToaster = () => {
    $("#myToast").toast('show');
    setTimeout(function() {
        $("#myToast").toast('hide');
    }, 5000)
}