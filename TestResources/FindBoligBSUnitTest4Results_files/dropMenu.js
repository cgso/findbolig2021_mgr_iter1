// Function to hide and show drop menus
function showDropMenu(submenu, show, index) { 
    if (show) {
        
        $(submenu).css("display", "block");
    }
    else {
        //setTimeout(function () {
            $(submenu).css("display", "none");
        //}, 30);       
    }
}


// Function to position dropmenus and attach hover event
function posDropMenus() {
    $("#topmenu div").each(function (index) {
              
        if ($("p", $(this)).hasClass("menu") || $("p", $(this)).hasClass("menuActive")) {            

            var submenu = $(this).children('div .dropMenu');

            if (submenu != null) {
                $(submenu).css("top", ($(this).position().top - 0 + 25) + "px");
                $(submenu).css("left", $(this).position().left + "px");
                $(submenu).hover(
                        function () {
                            showDropMenu(submenu, true, index);
                        },
                        function () {
                            showDropMenu(submenu, false, index);
                        }
                );
                $("p", $(this)).hover(
                        function () {
                            showDropMenu(submenu, true, index);
                        },
                        function () {
                            showDropMenu(submenu, false, index);
                        }
                );
            }

        }




    });
}


$(document).ready(function () {
    posDropMenus();
});

$(window).resize(function () {
    posDropMenus();
});