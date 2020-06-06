// Dynamically populate the date   
// <select> with options for a range  
// of today through 6 weeks from now
function populate_date_select() {

    var pickup_date_select = $("select.pickup-date-select");

    // Using the Chicago Manual of Style 
    // abbre­vi­ations for day and month 
    // https://bit.ly/1JVilBm
    var days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
    var months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
    var dates = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th", "21st", "22nd", "23rd", "24th", "25th", "26th", "27th", "28th", "29th", "30th", "31st"];
    
    var today = new Date().getTime();
    
    var todaysDay = days[new Date().getDay()];
    var todaysMonth = months[new Date().getMonth()];
    var todaysDate = dates[new Date().getDate()] - 1;
  
    
    // Add a disabled option at the start
    $(pickup_date_select).append("<option disabled>Choose your pickup date</option><option disabled></option>");
    

    // Options for today's date,
    // using 'Today' instead of the date string
    // NOTE: need to add the current date in the value attr
    $(pickup_date_select).append("<option value='Today' selected>Today</option>");
    
    var counter = 1;
    var countUp = 24 * 60 * 60 * 1000;

    // Counting up to 6 weeks (42 days)
    for(counter; counter < 43; counter++) {
        today = new Date(new Date().getTime() + (countUp * counter)).getTime();
        todaysDay = days[new Date(new Date().getTime() + (countUp * counter)).getDay()];
        todaysMonth = months[new Date(new Date().getTime() + (countUp * counter)).getMonth()];
        todaysDate = dates[new Date(new Date().getTime() + (countUp * counter)).getDate() - 1];
        
      $(pickup_date_select).append("<option value='" + todaysMonth + " " + todaysDate + "'>" + todaysDay + ", " + todaysMonth + " " + todaysDate + "</option>");
    
    }
    
    // Add a disabled option at the end,
    // call instructions for further out
    $(pickup_date_select).append("<option disabled></option><option disabled>Call to order at a later date.</option>");
  
    // Add a break between weeks
    // to make the list more scanable
    var mondays = $( "option:contains('Mon')" );
    $(mondays).before("<option disabled></option>");


}
populate_date_select();





function faux_select_update() {

    // update the rendered value 
    // of any faux-select element when
    // its paired real select changes

    $('.faux-select select').change(function(){

        var real_select = $(this);
        var option_selected = $(this).find('option:selected').text();
        var faux_select_rendered = $(this).siblings('.faux-select-rendered');
        var faux_select_placeholder = $(this).attr("data-placeholder-name");

        if( $(this).val() == ""){
            $(faux_select_rendered).html(faux_select_placeholder);
        } else {
            $(faux_select_rendered).html(option_selected);
        }

    });


}
faux_select_update();