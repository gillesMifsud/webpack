// Show the activity depending on user select option
$(function() {

    function toggleOnSelectChange() {
        // Hide by default
        let target = $('[data-select-toogler-target]');
        target.hide();
        // Show and enable on change
        $('[data-select-toogler]').change(function () {
            $(this).val() === '' ? target.hide() : target.show();
        });
    }
    // Init
    toggleOnSelectChange();


    // Create account form
    // Hide and  disable by default
    $('.activity.column').hide();
    $('.activity.column input').prop( "disabled", true );
    // Show and enable on change
    $('.activity_select_toogler').change(function(){
        $('.activity.column').hide();
        $('.activity.column input').prop( "disabled", true );
        $('.' + $(this).val()).show();
        $('.' + $(this).val() + ' input').prop( "disabled", false );
    });
});