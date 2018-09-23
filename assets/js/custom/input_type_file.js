$(function() {
    // Attach the change event listener to change the label of all input[type=file] elements
    var els = document.querySelectorAll("input[type=file]"),
        i;
    for (i = 0; i < els.length; i++) {
        els[i].addEventListener("change", function() {
            var label = this.previousElementSibling;
            label.innerHTML = this.files[0].name;
        });
    }
    // Dynamically adds required * to the fake label
    $("input[type=file]").each(function(){
        if($(this).prop('required')){
            $(this).siblings('.is-label').addClass('required');
        }
    });
});