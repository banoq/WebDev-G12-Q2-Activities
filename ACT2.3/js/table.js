$(document).ready(function() {
    // Global variable to keep track of the submitted data
    var submittedData = [];

    // Check if at least one checkbox is checked for otherProducts
    function checkOtherProducts() {
        var checkboxes = $('input[name="otherProducts"]:checked');
        if (checkboxes.length === 0) {
            alert("Please choose at least one tech-related product.");
            return false;
        }
        return true;
    }

    function submitForm() {
        // Check if the form is valid before submitting
        if ($('#survey_form')[0].checkValidity() && checkOtherProducts()) {
            // Get form data
            var formData = {
                name: $('#txtName').val(),
                email: $('#txtEmail').val(),
                date: $('#txtDate').val(),
                gender: $('#selectGender').val(),
                product: $('#selectProduct').val(),
                country: $('#selectCountry').val(),
                rating: $('input[name="radioRating"]:checked').val(),
                shipping: $('input[name="radioShipping"]:checked').val(),
                recommendation: $('input[name="radioRecommendation"]:checked').val(),
                otherProducts: getCheckedValues('otherProducts'),
                satisfaction: $('#datalistExperience').val(),
                feedback: $('#txtareaFeedback').val(),
            };


            // Add the current form data to the submittedData array
            submittedData.push(formData);

            // Display data in table
            displayTable(submittedData);

            // Reset the form
            $('#survey_form')[0].reset();
        } else {
            // If the form is incomplete, it triggers the form validation
            $('#survey_form')[0].reportValidity();
        }
    }

    // function to get checked values for checkboxes
    function getCheckedValues(name) {
        var checkboxes = $('input[name="' + name + '"]:checked');
        var values = [];
        checkboxes.each(function() {
            values.push($(this).val());
        });
        return values;
    }

    //  function to display data in the table
    function displayTable(dataArray) {
        var dataTable = $('#data_table_body');

        // Clear the table rows
        dataTable.empty();

        // repeat through the submitted data and add rows to the table
        dataArray.forEach(function(data) {
            var newRow = dataTable[0].insertRow(dataTable[0].rows.length);
            for (var key in data) {
                var cell = newRow.insertCell();
                cell.appendChild(document.createTextNode(data[key]));
            }
        });

        // Show the submitted data table
        $('#submitted_data_table').removeClass('hidden');
    }

    //  function to reset the form and clear the table
    function resetForm() {
        // Reset the form
        $('#survey_form')[0].reset();

        // Clear the submittedData array
        submittedData = [];

        // Clear the table
        var dataTable = $('#data_table_body');
        dataTable.empty();

        // Hide the submitted data table
        $('#submitted_data_table').addClass('hidden');
    }

    // event handlers for submit button and reset
    $('.submit_btn').on('click', submitForm);
    $('.reset_btn').on('click', resetForm);
});


// code by Izac Gonda from 12-PROG 2