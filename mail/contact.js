$(function () {
    // Initialize EmailJS with your User ID
    emailjs.init("YOUR_USER_ID"); // 🔑 Add this line

    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function () {
            // Handle error if needed
        },
        submitSuccess: function (_, event) {
            event.preventDefault();
            const $this = $("#sendMessageButton"); // ✅ Use const/let
            let name = $("input#name").val().trim();
            let email = $("input#email").val().trim();
            let subject = $("input#subject").val().trim();
            let message = $("textarea#message").val().trim();

            $this.prop("disabled", true);

            // EmailJS parameters correction
            emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", { // 🔑 Use real IDs
                from_name: name,
                email_id: email,
                subject: subject,
                message: message
            })
            .then(
                function(response) {
                    $('#success').html(`
                        <div class='alert alert-success'>
                            <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
                            <strong>Your message has been sent.</strong>
                        </div>
                    `);
                    $('#contactForm').trigger("reset");
                },
                function(error) {
                    $('#success').html(`
                        <div class='alert alert-danger'>
                            <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
                            <strong>Sorry ${name}, our mail server is not responding. Please try again later!</strong>
                        </div>
                    `);
                    $('#contactForm').trigger("reset");
                }
            )
            .finally(function() {
                setTimeout(() => $this.prop("disabled", false), 1000);
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

$('#name').focus(function () {
    $('#success').html('');
});