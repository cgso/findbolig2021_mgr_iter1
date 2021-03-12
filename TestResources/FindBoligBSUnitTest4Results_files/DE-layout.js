var SEARCHRESULTADVERT = "SearchResult";
var DEFAULTCENTERHEIGHT = 372;

// detect if this is an MSIE 6 browser

var MSIE6 = (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) == 4 && navigator.appVersion.indexOf("MSIE 6.0") != -1);
var MSIE7 = (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.indexOf("MSIE 7") != -1);

// function to place class checkbox on all elements of input type checkbox, to fix border problem in IE6

function fixIE6() {

    if (MSIE7) {
        $("#swBox input[type=checkbox]").css("cssText", "background-image: url(/gfx/mapButton.gif); margin-top: -2px;");
        // $("#colLeft h2").css("cssText", "clear: both;");
        $("#colLeft .facilList img").css("cssText", "clear: both;");  
        $("#colLeft ul.facilList").css("cssText", "margin-bottom: -10px");

    }

    if (MSIE6) {
        
        // This line made the icons on the frontpage under the searchcriteria, go down under the image // $("#colLeft h2").css("cssText", "clear: both;");
        $("#colLeft .facilList img").css("cssText", "clear: both;");    
    
        $("form input:checkbox").css("border-style", "none");
        $("#swBox").css("padding-top", "1px");
        $("form input:radio").css("border-style", "none");        
        $("input[type=submit][class=hiddenSubmit]").remove();
        $("div.ButtonSubmit a").css("cssText", "margin-right: 0 !important;");
        $("div.ButtonNormal a").css("cssText", "margin-right: 0 !important;");
        $("div.ButtonDisabled a").css("cssText", "margin-right: 0 !important;");
        $("div.heighLighted").css("padding-bottom", "30px");
        $(".subInput input").css("margin-left", "-8px");
        $("#colCenter > p").css("width", "420px");
        $(".formGrid-double .heighLighted > p").css("width", "390px");
        $("#placeholdercontent_0_ctrl_SearchCriterias_but_SearchShadow").css("cssText", "display:inline-block; width:52px; margin-right: 0 !important;");
        $("#placeholdercontent_0_ctrl_SearchCriterias_but_SearchList").css("cssText", "display:inline-block; width:52px; margin-right: 0 !important;");
        $(".scfSingleLineGeneralPanel").css("cssText", "position: relative; left: -5px;");
        $(".scfDropListGeneralPanel").css("cssText", "position: relative; left: -5px;");
        $(".scfEmailGeneralPanel").css("cssText", "position: relative; left: -5px;");
        $(".scfMultipleLineGeneralPanel").css("cssText", "position: relative; left: -5px;");
        
        $("#butListSearch").css("cssText", "width:54px;");


        $("#errorBox").css("background-image", "url(/gfx/ikon-fejl.gif)");
        $("#savedBox").css("background-image", "url(/gfx/ikon-gemt.gif)");
        if (ActiveColor == "gron") {
            $(".formSectionSubmit input").css("background-image", "url(/gfx/knap-gron-120.gif)");
            $(".w190").css("background-image", "url(/gfx/knap-gron-190.gif)");
            $(".w120").css("background-image", "url(/gfx/knap-gron-120.gif)");
        }
        
        if (ActiveColor == "graa") {
            $(".formSectionSubmit input").css("background-image", "url(/gfx/knap-graa-120.gif)");
            $(".w190").css("background-image", "url(/gfx/knap-graa-190.gif)");
            $(".w120").css("background-image", "url(/gfx/knap-graa-120.gif)");              
        }

        if (ActiveColor == "blaa") {
            $(".formSectionSubmit input").css("background-image", "url(/gfx/knap-blaa-120.gif)");
            $(".w190").css("background-image", "url(/gfx/knap-blaa-190.gif)");
            $(".w120").css("background-image", "url(/gfx/knap-blaa-120.gif)");              
        }

        getCSSRule("#simplemodal-container a.modalCloseImg").style.left = "575px";
        getCSSRule("div.ButtonSubmit a:hover").style.backgroundPosition = "100% 0";
        getCSSRule("div.ButtonNormal a:hover").style.backgroundPosition = "100% 0";

    }

}



// run functions when document ready

$(document).ready(function() {
    fixIE6();
    //$(document).pngFix();
});

function writeNewCom(onOff) {

    if (onOff == "on") {
        if (document.getElementById("writeNew0")) document.getElementById("writeNew0").style.display = "none";
        if (document.getElementById("writeNew1")) document.getElementById("writeNew1").style.display = "block";
        if (document.getElementById("writeNew2")) document.getElementById("writeNew2").style.display = "block";
        if (document.getElementById("writeNew3")) document.getElementById("writeNew3").style.display = "block";
        if (document.getElementById("writeNew4")) document.getElementById("writeNew4").style.display = "block";
        if (document.getElementById("writeNew5")) document.getElementById("writeNew5").style.display = "block";
        if (document.getElementById("writeNew6")) document.getElementById("writeNew6").style.display = "block";                
    }
    else {
        if (document.getElementById("writeNew0")) document.getElementById("writeNew0").style.display = "block";
        if (document.getElementById("writeNew1")) document.getElementById("writeNew1").style.display = "none";
        if (document.getElementById("writeNew2")) document.getElementById("writeNew2").style.display = "none";
        if (document.getElementById("writeNew3")) document.getElementById("writeNew3").style.display = "none";
        if (document.getElementById("writeNew4")) document.getElementById("writeNew4").style.display = "none";
        if (document.getElementById("writeNew5")) document.getElementById("writeNew5").style.display = "none";
        if (document.getElementById("writeNew6")) document.getElementById("writeNew6").style.display = "none";
    }
    setColHeight();
}

// access style sheet selectors

function getCSSRule(ruleName, deleteFlag) {
    ruleName = ruleName.toLowerCase();
    if (document.styleSheets) {
        for (var i = 0; i < document.styleSheets.length; i++) {
            var styleSheet = document.styleSheets[i];
            var ii = 0;
            var cssRule = false;
            do {
                if (styleSheet.cssRules) {
                    cssRule = styleSheet.cssRules[ii];
                } else {
                    cssRule = styleSheet.rules[ii];
                }
                if (cssRule) {
                    if (cssRule.selectorText.toLowerCase() == ruleName) {
                        if (deleteFlag == 'delete') {
                            if (styleSheet.cssRules) {
                                styleSheet.deleteRule(ii);
                            } else {
                                styleSheet.removeRule(ii);
                            }
                            return true;
                        } else {
                            return cssRule;
                        }
                    }
                }
                ii++;
            } while (cssRule)
        }
    }
    return false;
}



var timer = null; //used with timeCall

var timerCall = function() {
    return function(callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    }
} ();

function cancelTimeCall() {
    if (timer) {
        window.clearTimeout(timer);
        timer = null;
    }
}

function findPos(obj) {
    var curleft = curtop = 0;
    if (obj.offsetParent) {
        curleft = obj.offsetLeft;
        curtop = obj.offsetTop;
        while (obj == obj.offsetParent) {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        }
    }
    return [curleft, curtop];
}

/* set paging on Grid view */

function setGridView() {


    var gridPages;
    if ($("#grid table table").length > 0) {
        gridPages = $("#grid table table").get(0).innerHTML;
        $("#grid table tr:eq(0)").addClass("noDisplay");
        $("#grid table:eq(0) tr:last").addClass("noDisplay");
    
    }
    else {
        gridPages = "<tr><td></td></tr>";
        $("#gridPagesBottom").addClass("noDisplay");

    }
    gridPages = "<table cellpaddin=\"0\" cellspacing=\"0\" border=\"0\">" + gridPages + "</table>";
    gridPages = "<table cellpaddin=\"0\" cellspacing=\"0\" border=\"0\" width=\"100%\"><tr><td class=\"gridLabelLeftTop\"><div>" + document.getElementById("gridLabelLeftTop").innerHTML + "</div></td><td width=\90%\">" + gridPages;
    gridPages = gridPages + "</td><td class=\"gridLabelRightTop\"><div>" + document.getElementById("gridLabelRightTop").innerHTML + "</div></td></tr></table>";
    document.getElementById("gridPagesTop").innerHTML = gridPages;
    document.getElementById("gridPagesBottom").innerHTML = gridPages;

     
}

/* Onfocus clear field */

function clearField(obj,startVal,onFocusSet) {

    obj.style.color = "black";
    if (obj.value == startVal && onFocusSet) obj.value = "";

    if (!onFocusSet) {
        if (obj.value == startVal || obj.value == "") {
            clearAndResetField(obj, startVal);
        }
    }
}

function clearAndResetField(obj, startVal) {    
    obj.value = startVal;
    obj.style.color = "rgb(150,150,150)";
}
/* object hide */

function hideObj(id) {
    document.getElementById(id).style.display = "none";

}

/* section on/off */

function setSection(turnOn, turnOff) {

            for (var i in turnOn) {
                if (document.getElementById(turnOn[i])) document.getElementById(turnOn[i]).style.display = "block";
            }

            for (var z in turnOff) {
                if (document.getElementById(turnOff[z])) document.getElementById(turnOff[z]).style.display = "none";

            }
}


function textCounter(ele, maxlimit) {
    var charcount = ele.value.length;
    var diff = (ele.value.split(/\r/).length - 1) + (ele.value.split(/\n/).length - 1);
    var length = charcount - (ele.value.split(/\r/).length - 1) + (ele.value.split(/\n/).length - 1);


    if (length > maxlimit) {
//        alert("browsercount: " + charcount + "\n" +
//              "diff: " + diff + "\n" +
//              "realcount: " + length + "\n" +
//              "Text: " + ele.value + "\n" +
//              "Cut Text: " + ele.value.substring(0, (charcount - (length - maxlimit))));

        ele.value = ele.value.substring(0, (charcount - (length - maxlimit)));
    }
}


/* Sub tab function */


        function setTab(turnOn, turnOff, tabOff, tabOn) {
              
            // turnOff = array of form sections to turn off
            // turnOn = array of form section to turn on
            // tabOff = array of tabs to turn off
            // tabOn = array of tabs to turn on

            for (var i in turnOff) {
                if (document.getElementById(turnOff[i])) document.getElementById(turnOff[i]).style.display = "none";
            }

            for (var z in turnOn) {
                if (document.getElementById(turnOn[z])) document.getElementById(turnOn[z]).style.display = "block";
            }

            for (var n in tabOff) {
                if (document.getElementById(tabOff[n])) document.getElementById(tabOff[n]).className = "";
            }

            for (var x in tabOn) {
                if (document.getElementById(tabOn[x])) document.getElementById(tabOn[x]).className = "subTabCurrent";
            }

            ajustErrorPlace();
            setColHeight();
        }



/* Set the hight of the side cols */


        function setColHeight() {
            if (!setColHeightRun) return;

            if (document.getElementById("colCenter")) {

                document.getElementById("colCenter").style.height = "auto";

                var centerHeight = document.getElementById("colCenter").offsetHeight;
                var centerTop = findPos(document.getElementById("colCenter"))[1];
                var leftHeight = 0;
                var leftTop = 0;
                var rightHeight = 0;
                var rightTop = 0;
                var maxHeight = 0;
                
                if (centerHeight < DEFAULTCENTERHEIGHT) {

                    document.getElementById("colCenter").style.height = DEFAULTCENTERHEIGHT + "px";
                    centerHeight = DEFAULTCENTERHEIGHT;
                }

                if (setColHeightRun) {
                  
                    if (document.getElementById("colRight")) {

                        rightHeight = document.getElementById("colRight").offsetHeight;
                        rightTop = findPos(document.getElementById("colRight"))[1];
                    }

                    if (document.getElementById("colLeft")) {

                        leftHeight = document.getElementById("colLeft").offsetHeight;
                        leftTop = findPos(document.getElementById("colLeft"))[1];
                    }

                    if (maxHeight < (centerHeight - 0 + centerTop)) {
                        maxHeight = (centerHeight - 0 + centerTop);
                    }

                    if (maxHeight < (leftHeight - 0 + leftTop)) {
                        maxHeight = (leftHeight - 0 + leftTop);
                    }

                    if (maxHeight < (rightHeight - 0 + rightTop)) {
                        maxHeight = (rightHeight - 0 + rightTop);
                    }

                    if (document.getElementById("colRight")) {
                       
                        document.getElementById("colRight").style.height = (maxHeight - rightTop) + "px";
                    }

                    if (document.getElementById("colLeft")) {                        
                       document.getElementById("colLeft").style.height = (maxHeight - leftTop) + "px";
                    }
                }
            }
       }

       function SetFullHeight(obj, ajustInPixels) {
           var newHeight = 0;

           var winHeight = $(window).height();
           var objHeight = $(obj).height();           
           var hovedfaneblade = $(".hovedfaneblade").height();

           sizeheight = objHeight + hovedfaneblade;

           if (sizeheight < winHeight) {
               newObjHeight = winHeight - hovedfaneblade;
               if (ajustInPixels) {
                   $(obj).height((newObjHeight -35) + ajustInPixels);
               }
               else {
                   $(obj).height(newObjHeight - 35);
               }
           }                                 
       }


/* Hover effect for top menu */
		$(
			function()
			{
				$("#topfaner p a img").hover(
					function()
					{
						this.src = this.src.replace(".gif","-h.gif");
					},

					function()
					{
						this.src = this.src.replace("-h.gif",".gif");
					}
				);
			}
		)

		$(
			function()
			{
				$("#topmenu p.menu a").hover(
					function()
					{
						this.style.backgroundImage = "url(/gfx/topmenu-bg-" + ActiveColor + "-h.gif)";
					},

					function()
					{
						this.style.backgroundImage = "url(/gfx/topmenu-bg-" + ActiveColor + ".gif)";						
					}
				);
			}
		)
		
/* disable/enable formelements */

			function enableObj(obj2Chk, obj2Set, lable2Set) {

			    //obj2Chk contains an array of element IDs to check (one of these has to be checked in order to enable the form elements)
			    //obj2Set contains an array of element IDs to enable or disable
			    //lable2Set contains an array of para IDs to dim or show as normal

			    var EnableObj2Set = false;

			    // run through the elements to check if one is selelcted

			    for (var i in obj2Chk) {

			        if (document.getElementById(obj2Chk[i]).checked) EnableObj2Set = true;
			    }	
			    
			    // run through the form elements to enable/disable		    

			    for (var z in obj2Set) {

			        if (EnableObj2Set) {
			            document.getElementById(obj2Set[z]).disabled = false;
			        }
			        else {
			            document.getElementById(obj2Set[z]).disabled = true;
			        }
			    }

			    // run through the lables to enable/disable		    

			    for (var x in lable2Set) {

			        if (EnableObj2Set) {
			            document.getElementById(lable2Set[x]).style.color = "rgb(0,0,0)";
			        }
			        else {
			            document.getElementById(lable2Set[x]).style.color = "rgb(100,100,100)";
			        }
			    }
			}

			//script to place a drop shadow 
/*
			function setDropShadow(objID) {
			    
			    document.getElementById("dropShadow").style.display = "block";
			    document.getElementById("dropShadow").style.left = document.getElementById(objID).style.left;			    
			    document.getElementById("dropShadow").style.top = document.getElementById(objID).style.top;
			    
			}
*/
			var plArray = new Array();
			
			function preLoadImg() {
			    var containerObj = $("#PropertyThumbs")
			    var imgArray = $("img", containerObj);
			    var totalSize = $("img", containerObj).length;			    

		        for (x = 0; x < totalSize; x++) {
		            plArray[x] = new Image();
		            plArray[x].src = imgPath + imgArray[x].id;
		        }

			}


			function swpPropertyImg(imgObj, imgPath) {
			    $("#PropertyThumbs li").each(function(idx, item) {
			        item.className = "";
			    });

			    if (imgObj != null && imgObj.alt != null)
			    {
			        $("#PropertyDescription").html(imgObj.alt);

			        imgObj.parentNode.className = "selected";

			        if (!MSIE6) {
			            $("#PropertyImage").attr("style", "background-image:url(" + imgPath + imgObj.id + ");");
			        }
			        else {
			            document.getElementById("PropertyImage").innerHTML = "<center><image src='" + imgPath + imgObj.id + "'/></center>";
			        }
			    }			    
			}

			function browsePropertyImg(dir, imgPath) {
			    var containerObj = $("#PropertyThumbs")
			    var imgArray = $("img", containerObj);
			    var totalSize = $("img", containerObj).length;
			    var currentItem;
			    for (var i = 0; i <= totalSize; i++) {
			        if (imgArray[i].parentNode.className == "selected") {
			            switch (dir) {
			                case "next":
			                    if (i != totalSize - 1) {
			                        swpPropertyImg(imgArray[i + 1], imgPath)
			                        break;
			                    }
			                    break;
			                case "prev":
			                    if (i != 0) {
			                        swpPropertyImg(imgArray[i - 1], imgPath)
			                        break;
			                    }
			            }
			            break;
			        }
			    }
			}
			function RemovePictureElement(myObject) {

			    if (myObject == null) {			        
			        return;
			    }

			    if (myObject.className == "PictureElement") {			        
			        myObject.parentElement.removeChild(myObject);
			    }

			    RemovePictureElement(myObject.parentElement);
			}

			function CreateNewPictureElement(containerObject, filePath, picID) {			    
			    var newField = containerObject.children[0].cloneNode(true);
			    newField.style.display = 'block';

			    containerObject.appendChild(newField);
			    getElementsByClass(newField, "img_residenceImage", "img")[0].src = filePath;
			    getElementsByClass(newField, "PictureID", "input")[0].value = picID;			    			    
			}
			
			function GenerateJsonElement(tagName, value) {
			    var mystring = "";
			    mystring = "\"" + tagName + "\":\"" + escape(value) + "\"";
			    return mystring;
			}

			function getElementsByClass(node, searchClass, tag) {
			    var classElements = new Array();
			    if (node == null)
			        node = document;
			    if (tag == null)
			        tag = '*';
			    var els = node.getElementsByTagName(tag);
			    var elsLen = els.length;
			    var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
			    for (i = 0, j = 0; i < elsLen; i++) {
			        if (pattern.test(els[i].className)) {
			            classElements[j] = els[i];
			            j++;
			        }
			    }
			    return classElements;
			}
			
			
			function SetUniqueRadioButton(containerName, groupName, current)
			{			    			    
			    for(i = 0; i < document.forms[0].elements.length; i++)   
			    {
			        elm = document.forms[0].elements[i]
			        if (elm.type == 'radio') 
			        {
			            if (elm.name.indexOf(containerName) == 0)//we got a matching continer
			            {

			                var elemGroupName = elm.name.substring(elm.name.length - 2);			                
			                if (elemGroupName == groupName)//we got a matching group
                            {
                                elm.checked = false;
                            }                                
			            }    			            			            
			        }
			    }

			    current.checked = true;
			}

			function doFocus(input) {
			    input.select();
			    if (input.value.indexOf('Evt') != -1) {
			        input.value = "";
			        return;

			    }
			    if (input.value == input.defaultValue) {
			        //input.value = "";
			    } else {
			        //input.select();
			    }
			}


			function reload() {
			    window.location.reload();
			}

			isHandlingTimeout = false;

			function AjaxPostSetup() {
			    $.ajaxSetup({
			        type: "POST",
			        contentType: "application/json; charset=utf-8",
			        data: "{}",
			        error: function () {
			            // if an ajax call returns an error - redirect the user to the login page (as if the session times out)
			            // This has no effect if the ajax-call overrides this error-closure

			            if (isHandlingTimeout == false) {   // on ex. publisher mypage, this will be flooded with ajax error calls, as multiple ajax calls are updated in one go.
			                isHandlingTimeout = true;

			                $.ajax({
			                    url: "/Services/Users.asmx/HandleTimeout",
			                    data: "{returnUrl: \"" + location.href + "\"}",
			                    success: function (msg) {
			                        if (msg) {
			                            location.href = "/logind.aspx?return=" + location.href;
			                        }
			                        else {
			                            location.href = "/logind.aspx?ajaxerror";
			                        }
			                    },
			                    error: function (msg) {
			                        location.href = "/logind.aspx?ajaxhandletimeouterror";
			                    }
			                });
			            }
			        }
			    });


//                 $.ajax({
//			        //-------- DEFAULT AJAX POST -----------
//			        type: "POST",
//			        contentType: "application/json; charset=utf-8",
//			        //-------- DEFAULT AJAX POST -----------        
//			        url: "/Services/CompanyService.asmx/GetLandingPageActivationInfo",
//			        data: "{\"referenceID\": " + referenceID + "}",
//			        success: function (msg) {
			}


            /*This function is used within the company configuration section*/
			function initCheckboxRules() {
			    //All input fileds with class "dateInputField" will be added a date picker
			    initDateInputFields();

			    //enable or disable input fields witin in each set of rules
			    var listOfCheckboxRule = $(".checkboxRule input[type=checkbox]");
			    $.each(listOfCheckboxRule, function () {
			        checkboxRuleClick(this);
			    });

			    //Set event "click" on alle checkboxes with class type checkboxRule
			    $(".checkboxRule input[type=checkbox]").click(function () {
			        checkboxRuleClick(this);
			    });
			}

			/*function called by event when a check box is cheked or un-checked. 
			This function is used within the company configuration section */
			function checkboxRuleClick(checkBox) {
			    var parentElem = $(checkBox).parents("div.formSection");
			    var configurationSection = $(parentElem).find('div.configurationSection');

			    if ($(checkBox).prop("checked")) {
			        $(configurationSection).removeAttr("disabled");
			        enableFormFields(configurationSection);			        
			    }
			    else {
			        $(configurationSection).attr("disabled", true);
			        disableFormFields(configurationSection);                    			        
			    }
			}

			function disableFormFields(area) {
			    var inputFields = $(area).find("input");
			    var selects = $(area).find("select");			    
			    var links = $(area).find("a");

			    $(inputFields).each(function () {
			        var hasDatepickerClass = $(this).hasClass("hasDatepicker");
			        if (hasDatepickerClass) {
			            $(this).datepicker('disable');
			        }
			        $(this).attr("disabled", true);
			    });

			    $(selects).each(function () {
			        $(this).attr("disabled", true);
			    });

			    $(links).each(function () {
			        $(this).attr("disabled", true);
			        var button = $(this).parents('.ButtonNormal');
			        $(button).css("display", "none");

			        if ($(this).hasClass("deleteLink")) {
			            $(this).css("display", "none");
			        }
			    });

			    		    
			}

			function enableFormFields(area) {
			    var inputFields = $(area).find("input");
			    var selects = $(area).find("select");
                var links = $(area).find("a");

			    $(inputFields).each(function () {
			        var hasDatepickerClass = $(this).hasClass("hasDatepicker");
			        if (hasDatepickerClass) {
			            $(this).datepicker('enable');
			        }
			        $(this).removeAttr("disabled");
			    });

			    $(selects).each(function () {
			        $(this).removeAttr("disabled");
			    });

			    $(links).each(function () {
			        $(this).removeAttr("disabled");
			        var button = $(this).parents('.ButtonNormal');
			        $(button).css("display", "block");

			        if ($(this).hasClass("deleteLink")) {
			            $(this).css("display", "block");
			        }			        
			    });
			}

			/*All fileds within the page with class "dateInputField" will
			be added a datePicker */
			function initDateInputFields() {

			    //Init date input
			    var dateInputFields = $(".dateInputField");

			    $.each(dateInputFields, function () {
			        $(this).datepicker();
			    });
			}


			// Called from the landing-pages when the user clicks on 'find bolig nu', 
            // and handles login-logic, openes pension questions (tilknytning)
            // and redirects to the correct search-page (wait or tildeling/prioritet)
			function ActivateLandingPageForCompany(referenceID) {
			    $.ajax({
			        //-------- DEFAULT AJAX POST -----------
			        type: "POST",
			        contentType: "application/json; charset=utf-8",
			        //-------- DEFAULT AJAX POST -----------        
			        url: "/Services/CompanyService.asmx/GetLandingPageActivationInfo",
			        data: "{\"referenceID\": " + referenceID + "}",
			        success: function (msg) {
			            if (msg.d.LoggedIn == false) {
			                location.href = "/logind.aspx?return=" + location.href;
			            }
			            else {
			                var redirectUrl;

			                switch (msg.d.AssignmentPrincipalType) {
			                case 2:
			                    if (msg.d.CompanyID == 191) {
			                        redirectUrl = "/ventelisteboliger/liste.aspx?showrented=1&showyouth=1&membersonly=1";
			                    }
			                    else {
			                        redirectUrl = "/ventelisteboliger/liste.aspx?showrented=1&showyouth=1";
			                    }
			                    break;
			                case 3:
			                default:
			                    redirectUrl = "/ledigeboliger/liste.aspx?showrented=1&showyouth=1";
			                    break;
			                }


			                if (msg.d.AskAssignmentQuestions) {
			                    if ($("#IframePopupAssignemntQuestions").length == 0) {
			                        $("BODY").append('<div id="IframePopupAssignemntQuestions" class="noDisplay">' +
	                                '  <div class="outerpair1"><div class="outerpair2"><div class="shadowbox"><div class="innerbox"><div id="IframePopupAssignemntQuestions_iframeContent">' +
                                    ' </div></div></div></div></div></div>');
			                    }

			                    ShowIframePopup('IframePopupAssignemntQuestions', '/Findbolig/Findbolig-nu/Find%20bolig/Opret%20tilknytning.aspx?companyId=' + msg.d.CompanyID + '&redirectUrl=' + encodeURIComponent(redirectUrl));
			                }
			                else {
			                    location.href = redirectUrl;
			                }
			            }
			        },
			        error: function (msg) {
			            alert('Failed' + msg.responseText);
			        }
			    });


			}

			function parseCurrencyToFloat(amount) {

			    if (currentLang == "da") {
			        amount = amount.replace(".", "");
			        amount = amount.replace(",", ".");
			    }

			    return parseFloat(amount);
			}


			function parseFloatToCurrency(nStr) {
			    nStr = nStr.toFixed(2);

			    if (currentLang = "da") {
			        nStr += '';
			        var x = nStr.split('.');
			        var x1 = x[0];
			        var x2 = x.length > 1 ? ',' + x[1] : '';
			        var rgx = /(\d+)(\d{3})/;
			        while (rgx.test(x1)) {
			            x1 = x1.replace(rgx, '$1' + '.' + '$2');
			        }
			        return x1 + x2;
			    }
			    else {
			        nStr += '';
			        var x = nStr.split('.');
			        var x1 = x[0];
			        var x2 = x.length > 1 ? '.' + x[1] : '';
			        var rgx = /(\d+)(\d{3})/;
			        while (rgx.test(x1)) {
			            x1 = x1.replace(rgx, '$1' + ',' + '$2');
			        }
			        return x1 + x2;
			    }
			}

			function isNumber(val) {
			    var reg = new RegExp(/^\s*\d+\s*$/);
			    return (reg.test(val));
			}

			function isNegativeNumber(val) {
			    var reg = new RegExp(/^\s*-\d+\s*$/);
			    return (reg.test(val));
			}

			function CloseIframePopup() {
			    $('.simplemodal-close').click();
			}

            function AdvertBackToSearchResult(s) {
                var cookieData = $.cookie(SEARCHRESULTADVERT);

                if (cookieData != null) {
                    cookieData = encodeURI(cookieData);
                    if (s == 1)
                        document.location.href = "/ledigeboliger/kort.aspx?" + cookieData;
                    else
                        document.location.href = cookieData;  
                }
            }

            function ReidrectToResidenceAdvert(residenceID) {
                var url = getQueryString().queryString;
                setBaseCookie(SEARCHRESULTADVERT, decodeURIComponent(url))                
                document.location.href = "/bolig.aspx?aid=" + residenceID + "&s=1";
            }

            function setBaseCookie(name, value) {                
                $.cookie(name, decodeURIComponent(value), { expires: 7, path: '/' });
            }

            // Setup text fields (with class or id matching the input parameter) to allow nummeric values only.
            // 8 = backspace.
            // 9 = tab.
            // 35 = end.
            // 36 = home.
            // 37 = left arrow.
            // 39 = right arrow.
            // 46 = delete.
            // 48 = 0.
            // 57 = 9. 
            // 96 = numpad 0.
            // 105 = numpad 9.
            function setNummeric(id) {
                $(id).keydown(function (event) {
                    
                    if (event.shiftKey) {
                        event.preventDefault();
                    }

                    if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 35 || event.keyCode == 36 || event.keyCode == 37 || event.keyCode == 39) {
                        // Key accepted. Skip error.
                    } else {
                        if (event.keyCode < 95) {
                            if (event.keyCode < 48 || event.keyCode > 57) {
                                event.preventDefault();
                            }
                        } else {
                            if (event.keyCode < 96 || event.keyCode > 105) {
                                event.preventDefault();
                            }
                        }
                    }
                });
            }


// adds a points parser for the tableSorter, so that it can be sorted, even though its got danish decimal and thousands seperator
function tablesorterAddPointsParser() {
    $.tablesorter.addParser({
        id: 'points',
        is: function (s) {
            return false;
        },
        format: function (s) {
            return s.replace(",", "").replace(".", ""); // remove , and . so that the column can be sorted as numbers
        },
        type: 'numeric'
    });
}

function removeHTMLTags(str) {
    str = str.replace(/&(lt|gt);/g, function (strMatch, p1) {
        return (p1 == "lt") ? "<" : ">";
    });
    var strTagStrippedText = str.replace(/<\/?[^>]+(>|$)/g, "");

    return strTagStrippedText;
}

// Opens a new window, keeping a hold of the opened, window so that its reused and reloaded, if another openWindow is called
function openWindow(url, windowName) {
    if (typeof openWindow.winRefs == 'undefined') {
        openWindow.winRefs = {};
    }
    if (typeof openWindow.winRefs[windowName] == 'undefined' || openWindow.winRefs[windowName].closed) {
        var l_width = screen.availWidth;
        var l_height = screen.availHeight;

        var l_params = 'status=1' +
                           ',resizable=1' +
                           ',scrollbars=1' +
                           ',width=' + l_width +
                           ',height=' + l_height +
                           ',left=0' +
                           ',top=0';

        openWindow.winRefs[windowName] = window.open(url, windowName);
        openWindow.winRefs[windowName].location.reload(true);           // Make sure the window is reloaded, because the list of window references, isn't kept cross pages..
        openWindow.winRefs[windowName].moveTo(0, 0);
        openWindow.winRefs[windowName].resizeTo(l_width, l_height);
    } else {
        openWindow.winRefs[windowName].location.reload(true);
        openWindow.winRefs[windowName].focus();
    }
}

function hidePublicArea() {
    $(document).ready(function () {
        $("#fm1_panel_PublicArea").hide();
    });
}