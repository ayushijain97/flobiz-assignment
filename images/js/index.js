$(() => {
    let mobileNumber = $("#mobile_Number").val();
    $("#continueBtn").click(function() {
        if (mobileNumber.length === 10) {
            changingStyles();
            gettingOTP(mobileNumber);
            resendOTP();
            $("#login__btn").click(loggingIn);
            enableToaster();
        }
    });


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
const resendOTP = () => {
    let timer = 58;
    var otpInterval = setInterval(() => {
        $("#resend_otp").html(timer);
        timer--;
        if (timer == 0) {
            clearInterval(otpInterval);
            $("#otp_btn").css({ display: "flex" });
            $("#mobileHelp").css({ display: "none" });
            $("#otp_btn").click(() => {
                $("#otp_btn").css({ display: "none" });
                $("#mobileHelp").css({ display: "flex" });
                let mobileNumber = $("#mobile_Number").val();
                gettingOTP(mobileNumber);
                resendOTP();
            })
        }
    }, 1000)
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