var validateList;

function Validation(validateList) {
	this.validateList = validateList;
	
	// add a new item to the validateList
	this.Add = function Add(id, validationRuleId, required) {
		var isInListAlready = false;
		
		for (var i = 0; i < this.validateList.length; i++) {

			if (this.validateList[i][0] == id) {
				isInListAlready = true;
			}
		}

		if (isInListAlready == false) {
			this.validateList.push([id, validationRuleId, required, false]);
		}
	}
	
	// remove an item with a specific id from the list
	this.Remove = function Remove(id) {
		var newValidateList = new Array();
		for (var i = 0; i < this.validateList.length; i++) {

			if (this.validateList[i] != undefined && this.validateList[i][0] != id) {
				newValidateList.push(this.validateList[i]);
			}
		}
		this.validateList = newValidateList;
    }

    // changes the required field of an item in the validate list
    this.ChangeRequired = function ChangeRequired(id, required) {
        for (var i = 0; i < this.validateList.length; i++) {

			if (this.validateList[i] != undefined && this.validateList[i][0] == id) {
				this.validateList[i][2] = required;
                break;
			}
		}
    }


}

function AddItemToValidateList(id, validationRuleId, required) {
	new Validation(validateList).Add(id, validationRuleId, required);
}

function RemoveItemFromValidateListWithId(id) {
//	new Validation(validateList).Remove(id);
    var newValidateList = new Array();
    for (var i = 0; i < validateList.length; i++) {

        if (validateList[i] != undefined && validateList[i][0] != id) {
            newValidateList.push(validateList[i]);
        }
    }
    validateList = newValidateList;    
}

// Replace special caracters:

function toEnglish(txt) {
    txt2 = txt.replace('æ', 'e')
                    .replace('ø', 'o')
                    .replace('å', 'a')
                    .replace('Æ', 'E')
                    .replace('Ø', 'O')
                    .replace('Å', 'A')
                    .replace('é', 'e')
                    .replace('É', 'E')
                    .replace('ü', 'y')
                    .replace('Ü', 'Y')
                    .replace('ö', 'o')
                    .replace('Ö', 'O')
                    .replace('ß', 'z');                      
    return txt2;
}

// helper functions

function validatePage(buttonId) {

    var res = submitForm();
    if (res == true) {
        document.getElementById(buttonId).click();
    }
}

function validateTerms(checkbox, buttonId) {
    if (checkbox.checked) {
        $("#" + buttonId).attr("disabled", false);
    }
    else {
        $("#" + buttonId).attr("disabled", true);
    }
}



function insertAfter(newElm, elm) {
    var clone = elm.cloneNode(true);
    elm.parentNode.insertBefore(clone, elm);
    elm.parentNode.replaceChild(newElm, elm);
}

function IsValidDate(day, month, year) {
    var date = new Date(year, month - 1, day);
    var isValid = date.getDate() == day && date.getMonth() == month - 1 && date.getFullYear() == year;

    if (date.getFullYear() < 1753) {
        return false;   // Sql Server kan ikke klare datoer før 1754
    }

    return isValid;
}

function chkMOD11(val) {
    
    var isValied = false;

    // find control number (last in digit)
    var controlNum = val.substring(val.length - 1, val.length);

    // get the base number (total number minus last digit)
    var chkNum = val.substring(0, val.length - 1);

    // weight values
    var weightVals = [2, 3, 4, 5, 6, 7,
                    2, 3, 4, 5, 6, 7,
                    2, 3, 4, 5, 6, 7,
                    2, 3, 4, 5, 6, 7,
                    2, 3, 4, 5, 6, 7];

    // reverse the base number
    var tempVal = chkNum.split("");
    var tempValRev = tempVal.reverse();
    chkNum = tempValRev.join("");

    // get the sum of the weight numbers
    var modSum = 0;

    for (i = 0; i <= chkNum.length; i++) {

        modSum += (chkNum.substring(i, i - 0 + 1) - 0) * weightVals[i];
    }

    // div by 11
    modSum = modSum % 11;

    // Check modSum
    switch (modSum) {

        case 0:

            if (controlNum == 0) isValied = true;
            break;

        case 1:

            isValied = false;
            break;

        default:

            if ((11 - modSum) == controlNum) isValied = true;
            break;
    }

    return isValied;

}



// set the correct error msg array, based on current language

var errorMsg = eval("errorMsg" + currentLang);

// Validation function

var errorForm = false;
var errorText = "";
const PASSWORD_MIN_LENGTH = 8;

function validateForm(elementID, validateRule, requiredField, arrayIndex) {

    var fieldValue = "";
    var fieldObj;
    var valueError = false;
    errorTxt = "";
    var elem = document.getElementById(elementID);

    // get the value of the field

    if (elem) {
        if (elem.type == "select" || elem.type == "select-one") 
        {
            if(elem.options.length > 0)
            {
                fieldValue = elem.options[elem.selectedIndex].value;
            }
            else
            {
                fieldValue = "";
            }

        }
        else 
        {
            if (elem.type == "textarea") {
                try {
                    tinyMCE.triggerSave();
                }
                catch (e) {
                    // element wasnt a tinyMCE WYSIWYG element
                }
            }
            fieldValue = elem.value;
        }
        fieldObj = elem;
    }

    var re;

    switch (validateRule) {
        case 1:
            if (requiredField && fieldValue.length == 0) {
                valueError = true;
                break;
            }
            else if(!requiredField && fieldValue.length == 0) {
                break;
            }
            valueError = validateDate(fieldValue, currentLang);
            break;

        case 2:
            // Time formate: hh:mm

            if (fieldValue.length != 5) valueError = true;
            if (fieldValue.substring(2, 3) != ":") valueError = true;
            if (fieldValue.substring(0, 2) > 24) valueError = true;
            if (fieldValue.substring(3, 5) > 59) valueError = true;

            break;

        case 3:
            // Integer, max 8 chr.

            if (isNaN(fieldValue)) valueError = true;
            if (fieldValue.length > 8) valueError = true;
            if (fieldValue.indexOf('.') > -1) valueError = true;
            if (fieldValue.indexOf(',') > -1) valueError = true;
            break;

        case 4:
            // Text - letters, numbers, ".", ",", and "-"

            // These three lines are removed, as validation rule 4, now is all text. Length validation is provided by maxlength on
            // the input-fields and the server validation also enforces the length-validation.
            
            //            re = /^[a-zA-Z0-9\s.,-]*$/;
            //            if (!toEnglish(fieldValue).match(re)) valueError = true;
            //            if (fieldValue.length > 250) valueError = true;


            break;

        case 5:
            // Text, no HTML

            if (fieldValue.indexOf("<") > -1 && fieldValue.indexOf(">") > -1) {
                if (fieldValue.indexOf("<") < fieldValue.indexOf(">")) valueError = true;
            }

            break;

        case 6:
            // Phone number: only numbers and "+", no spaces, max 19 numbers (0-9).
            if (!requiredField && fieldValue.length == 0) {
                break;
            }

            if (fieldValue.indexOf("+") == 0) {
                fieldValue = fieldValue.substring(1, fieldValue.length);
            }

            if (isNaN(fieldValue)) valueError = true;
            if (fieldValue.length > 19) valueError = true;
            if (fieldValue.length < 8) valueError = true;

            break;

        case 7:
            // E-mail: Must contain letters and/or numbers, ".", and "@". Can contain "_" and "-"

            re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            
            re2 = /^([a-zA-Z0-9_.@-]*)$/    // Email cannot contain other chars than this (no æøå)
            
            if (!fieldValue.match(re) || !fieldValue.match(re2)) valueError = true;

            break;

        case 8:
            // Username: can contain letters, numbers, "-", "_", "@", and "."

            re = /^[a-zA-Z0-9æøåÆØÅ_.@ -]*$/;            

            if (!toEnglish(fieldValue).match(re)) valueError = true;

            break;

        case 9:
            // Password: min. 8 chr, no spaces.

            if (fieldValue.indexOf(" ") > -1) valueError = true;
            if (!fieldValue.match(/[0-9]/)) valueError = true;
            if (!fieldValue.match(/[a-zA-Z]/)) valueError = true;
            if (fieldValue.length < PASSWORD_MIN_LENGTH) valueError = true;

            break;

        case 10:
            // Postal-code: Letters, numbers, "-", and space. Max. 8 chr.

            re = /^[a-zA-Z0-9\s-]*$/;

            if (!fieldValue.match(re)) valueError = true;
            if (fieldValue.length > 8) valueError = true;

            break;

        case 11:
            // Initials: letters, max. 4 chr. No spaces

            re = /^[a-zA-Z]*$/;

            if (!fieldValue.match(re)) valueError = true;
            if (fieldValue.length > 4) valueError = true;

            break;

        case 12:
            // CVR modulus 11

            if (fieldValue.length != 8) valueError = true;
            if (!chkMOD11(fieldValue)) valueError = true;

            break;

        case 13:
            // Text, no HTML, max. 100 chr.

            if (fieldValue.length > 100) valueError = true;
            if (fieldValue.indexOf("<") > -1 && fieldValue.indexOf(">") > -1) {
                if (fieldValue.indexOf("<") < fieldValue.indexOf(">")) valueError = true;
            }

            break;

        case 14:
            //            try {
            //                var content = tinyMCE.getInstanceById(elementID).getContent();

            //                if (content != null && content != undefined) {
            //                    fieldValue = content;
            //                }


            // HTML (only <A>, <OL>, and <UL>)
            var fld = fieldValue.replace("&lt;", "<").replace("&gt;", ">").toUpperCase();
            //alert(fld);
            var validHTML = new Array('<EM', '</EM', '<SPAN', '</SPAN', '<STRONG', '</STRONG', '<U', '<A ', '</A', '<OL', '</O', '<UL', '</U', '<LI', '</L', '<BR', '<P>', '</P');
            var isValidHTMLFound = false;
            if (fld.indexOf('<') >= 0 || fld.indexOf('>') >= 0) {
                for (var i = 0; i < fld.length; i++) {
                    var theChar = fld.substring(i, i + 1);
                    if (theChar == '<' && !valueError) {
                        if (fld.substring(i, fld.length).length > 2) {
                            for (var j = 0; j < validHTML.length; j++) {

                                if ((fld.substring(i, i + validHTML[j].length) == validHTML[j])) {
                                    isValidHTMLFound = true;
                                }
                            }
                            if (!isValidHTMLFound) {
                                valueError = true;
                            }
                            isValidHTMLFound = false;
                        }
                    }
                }
            }
            else {
                //No HTML
            }

            break;

        case 15:
            // Currency: Numbers, ".", and ",". Max 2 decimals

            switch (currentLang) {
                case "en":  // English xxx,xxx.xxx - Numbers, ".", and ",". Max 2 decimals
                    re = /^[0-9.,]*$/;

                    if (!fieldValue.match(re)) valueError = true;

                    if (fieldValue.indexOf(".") > -1) {
                        if (fieldValue.length != (fieldValue.indexOf(".") - 0 + 3)) valueError = true;
                    }
                    break;

                case "da":  // Danish xxx.xxx,xxx - Numbers, ".", and ",". Max 2 decimals
                    re = /^[0-9.,]*$/;

                    if (!fieldValue.match(re)) valueError = true;

                    if (fieldValue.indexOf(",") > -1) {
                        if (fieldValue.length != (fieldValue.indexOf(",") - 0 + 3)) valueError = true;
                    }
                    break;
            }
            
            

            break;

        case 16:
            // Must be selected (must contain a value)

            if (requiredField && fieldValue == "") valueError = true;

            break;

        case 18:
            // URL must be valid.
            var regExpURL = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
               
            if(!regExpURL.test(fieldValue)) { 
                valueError = true;
            }
            break;

        case 20:
            // Currency (allowing negative): Numbers, ".", and ",". Max 2 decimals

            switch (currentLang) {
                case "en":  // English xxx,xxx.xxx - Numbers, ".", and ",". Max 2 decimals
                    re = /^-?[0-9.,]*$/;

                    if (!fieldValue.match(re)) valueError = true;

                    if (fieldValue.indexOf(".") > -1) {
                        if (fieldValue.length != (fieldValue.indexOf(".") - 0 + 3)) valueError = true;
                    }
                    break;

                case "da":  // Danish xxx.xxx,xxx - Numbers, ".", and ",". Max 2 decimals
                    re = /^-?[0-9.,]*$/;

                    if (!fieldValue.match(re)) valueError = true;

                    if (fieldValue.indexOf(",") > -1) {
                        if (fieldValue.length != (fieldValue.indexOf(",") - 0 + 3)) valueError = true;
                    }
                    break;
            }

            break;
        

        case 21:
            // Valid year format if not null.
            if (isNaN(fieldValue)) valueError = true;
            if (fieldValue != "" && fieldValue.length != 4) valueError = true;
            break;
        case 22:
            // String must be an integer or a fload with max two digits after the decimal comma.
            re = /^[1-9]?\d+(,\d{1,2})?$/
            if (!fieldValue.match(re)) valueError = true;
            break;
        case 23:
            // String must be an integer or a fload with no limit of digits after the decimal comma.
            // /^ match beginning of string
            // \d* optional digits
            // \,{0,1} optional decimal point
            // \d+ at least one digit
            // $/ match end of string
            re = /^\d*\,{0,1}\d+$/
            if (!fieldValue.match(re)) valueError = true;
            break;
        case 24:
            if (requiredField && fieldValue.length == 0) {
                valueError = true;
                break;
            }

            var oldDueDateId = $("#DivOldDueDateValidate input")[0];
            var oldDueDate = oldDueDateId.value;

            //var oldDueDate = $("#Fc1_placeholdercontent_0_hid_OldDueDateValidate").val();

            var dayNew = fieldValue.split('-')[0];
            var monthNew = fieldValue.split('-')[1];
            var yearNew = fieldValue.split('-')[2];

            var dayOld = oldDueDate.split('-')[0];
            var monthOld = oldDueDate.split('-')[1];
            var yearOld = oldDueDate.split('-')[2];

            if ((dayNew < 1 || dayNew > 31) || (monthNew < 1 && monthNew > 12) && (yearNew.length != 4)) {
                valueError = true;
            } else {
                var newDate = new Date(yearNew, monthNew - 1, dayNew);
                var oldDate = new Date(yearOld, monthOld - 1, dayOld);

                if ((newDate.getDate() != dayNew) || (newDate.getMonth() != monthNew - 1) || (newDate.getFullYear() != yearNew) || (newDate < oldDate)) {
                    valueError = true;
                }
            }
            break;
        case 25:
            if (fieldValue.length > 0 && fieldValue.length < 6) {
                valueError = true;
                break;
            }
            break;
        case 26:
            // Dropdown list validation. DDL must be selected if it contains data items.
            // DDL will always contain a default empty item. Therefore we say ddlCount > 1.
            var ddlCount = $('#' + elementID + ' option').length;

            if (ddlCount > 1 && fieldValue == "" && fieldValue == 0) {
                valueError = true;
            }

            break;
        case 27:
            // Name validation to only contain letters and no numbers, otherwise show a error msg
            //re = /^[a-zA-Z0-9æøåÆØÅ_.@ -]*$/;
            re = /^[0-9]*$/;

            if (fieldValue.match(re)) valueError = true;

            break;
    }

    if (valueError) errorForm = true;

    // Check if the field is required
  
    if (requiredField && fieldValue.length == 0 && validateRule != 16) {
        valueError = true;
        errorTxt = errorMsg[0][1];
        errorForm = true;
 
    } 
    else if (validateRule == 16) 
    {
        errorTxt = "";
    }

    // if value error, set the correct error text, display the error box, and mark the fields with the error text

    if (valueError) {

        // set the error text width the value from the array, if not already set (if the required value not filed)

        if (errorTxt == "") errorTxt = errorMsg[validateRule][1];

        // display the error box

        document.getElementById("errorBox").style.display = "block";
        
        var savedBox = document.getElementById("savedBox");
        if (savedBox != null) {
            savedBox.style.display = "none";
        }

        // set the text of the errorbox
        
        errorBoxMsgIsSet = false;
        
        for(var i=0; i < errorBoxMsg.length; i++)           // (length - 1) as we have an extra ',' in the list
        {
            if(errorBoxMsg[i][0] == currentLang)
            {
                $("#errorBox").html(errorBoxMsg[i][1]);
                errorBoxMsgIsSet = true;
                break;
            }
        }

        // mark field in validation array as currently having an error
        validateList[arrayIndex][3] = true;

        // set error text at field
        markErrorField(fieldObj, errorTxt, arrayIndex);
    }
}

function validateDate(fieldValue, currentLang) {

    var valueError = false;
    
    // Date formate:  
    switch (currentLang) {
        case "en":  // English dateformat: mm/dd/yyyy

            if ((fieldValue.length > 10) || (fieldValue < 8)) valueError = true;

            re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
            if (!fieldValue.match(re)) valueError = true;

            break;
        case "da":  // Danish dateformat: dd-mm-yyyy

            if (fieldValue.length != 10) valueError = true;
            if (fieldValue.substring(2, 3) != "-") valueError = true;
            if (fieldValue.substring(5, 6) != "-") valueError = true;
            if (!IsValidDate(fieldValue.substring(0, 2), fieldValue.substring(3, 5), fieldValue.substring(6, 10))) valueError = true;

            break;
    }

    return valueError;
}

// Has the validation been run before?

var valRun = false;

// function to remove error texts, markings, and box, on a resubmit

function clearError() {

    if (valRun) {

        // Run through the array of fields to validate, in order to remove the error notes if needed
        for (var i in validateList) {

            var fieldObj;
            var ErrorNoteObj;

            if (validateList[i][3]) {

                if (document.getElementById(validateList[i][0])) {

                    fieldObj = $(document.getElementById(validateList[i][0]));

                    var isTinyMCE = elementIsTinyMCE(fieldObj);

                    if (isTinyMCE) {
                        fieldObj = $(fieldObj).siblings(".mceEditor").find("table.mceLayout");
                    }

                    fieldObj.css("margin-bottom", "0px");
                    fieldObj.css("border", "solid 1px rgb(172,172,172)");
                    fieldObj.css("background-color", "white");

                    // remove the error notes
                    $("#errorNote_" + fieldObj[0].id).remove()
                }
                validateList[i][3] = false;
                
                document.getElementById("errorBox").style.display = "none";
            }
        }

        valRun = false;        
    }
}

function clearErrorStyling(id) {
    var fieldObj = $('#' + id);
    var ErrorNoteObj;

    var isTinyMCE = elementIsTinyMCE(fieldObj);

    if (isTinyMCE) {
        fieldObj = fieldObj.siblings(".mceEditor").find("table.mceLayout");
    }

    if (fieldObj.length > 0) {
       fieldObj.css("margin-bottom", "0px");
       fieldObj.css("border", "solid 1px rgb(172,172,172)");
       fieldObj.css("background-color", "white");

        // remove the error notes
       $("#errorNote_" + fieldObj.id).remove()
    }

    document.getElementById("errorBox").style.display = "none";
}
// Error text offeset placement from field

var errorTxtTop = 20;
var errorTxtLeft = 7;

function testDom() {
    $("#testDiv").append("<div id=\"error\" class=\"errorNote\">testtest</div>");

}

function elementIsTinyMCE(obj) {
    if (obj.siblings(".mceEditor").length > 0) {
        return true;
    }
    else {
        return false
    }
}

// function to place the error text and mark the field
function markErrorField(obj, txt, arrayIndex) {

    if (obj) {
        obj = $(obj);
        var isTinyMCE = elementIsTinyMCE(obj);

        if (isTinyMCE) {
            obj = obj.siblings(".mceEditor").find("table.mceLayout");
        }

        // mark the input field
        obj.css("border", "solid 2px #8b0e13");
        obj.css("margin-bottom", "20px");

        var position = obj.position();
        
        // create a box to place under the field
        var newBox = "<div ";
        newBox += "id=\"errorNote_" + obj[0].id + "\"";
        newBox += " style=\"left:" + position.left + "px;top:" + position.top + "px; width:" + obj[0].offsetWidth + "px\"";
        newBox += " class=\"errorNote\">";
        newBox += txt;
        newBox += "</div>";

        // insert the box in the DOM
        obj.parent().append(newBox);
        
        // ajust the margin of the parent obejct, to fit the height of the error box.
        obj.css("margin-bottom", (document.getElementById("errorNote_" + obj[0].id).offsetHeight - 0 + 3) + "px");

        if (isTinyMCE) {
            obj.css("margin-bottom", "2px");
            obj.siblings(".errorNote").removeClass("errorNote").addClass("errorNoteTinyMCE");
        }
    }

    // ajust current location of error notes
    ajustErrorPlace();
}

// function to ajust the error notes if needed

function ajustErrorPlace() {
    
    // Run through the array of fields to validate, in order to ajust the error notes if needed

    for (var i in validateList) {

        var fieldObj;
        var ErrorNoteObj;

        if (validateList[i][3]) {

            // get the field object

            if (document.getElementById(validateList[i][0])) {
                
                // get the objects


                fieldObj = document.getElementById(validateList[i][0]);
                
                ErrorNoteObj = document.getElementById("errorNote_" + fieldObj.id);

                //get pos of fieldObj

                var position = $("#" + fieldObj.id).position();

                // ajust error in postion if scrolled in the

                if (document.getElementById("iframebox")) {
                  
                    position.top = position.top - 0 + $("#iframebox").scrollTop() - 0;

                }


                // set the ajusted values for placing the error text

                var fieldHeight = errorTxtTop;
                

                if (fieldObj.offsetHeight > fieldHeight) {
                    fieldHeight = fieldObj.offsetHeight-0+2;
                }

                if (ErrorNoteObj) {
                    ErrorNoteObj.style.left = (position.left) + "px";
                    ErrorNoteObj.style.top = (position.top - 0 + fieldHeight) + "px";
                    ErrorNoteObj.style.width = fieldObj.offsetWidth + "px";

                    fieldObj.style.marginBottom = (ErrorNoteObj.offsetHeight - 0 + 3) + "px";
                }

            }
        }
    }

    // if iframe call resizeIframePopup()

    resizeIframePopup();
}

// Attach the ajustErrorPlace on the resize event (requires JQuery)
$(window).bind('resize', function() {
    if (validateList != null) {
        ajustErrorPlace();
    }
});

// function to initiate validation function

var errorTxt = "";


///
// this class is used so that we form components can plugin validation changes like (AddItemToValidateList or RemoveItemFromValidateList)
// dynamically by looking at the dom.
// 
// Example: formValidation.addPreValidationSetup(function () { alert("lots of fine validation setup here" });
///
function validation() {
    var methods = new Array();

    this.addPreValidationSetup = function (methodToAdd) {
        methods.push(methodToAdd);
    }

    this.executePreValidationSetup = function () {
        for (var i in methods) {
            if (typeof (methods[i]) == "function") {
                methods[i]();
            }
            else {
                // debug
                //alert("setup type wasnt a function, but a: '" + typeof (methods[i]) + "'" + (typeof(methods[i]) == "string" ? " (" + methods[i] + ")" : ""));
            }
        }
    }
}

formValidation = new validation();

function submitForm() {
    // setup additional validation (from other usercontrols)
    formValidation.executePreValidationSetup();



    // remove error texts, markings, and box, on a resubmit
    clearError(); 


    // reset errorTxt and errorForm, in case this is a resubmit

    errorTxt = ""
    errorForm = false;

    // validate fields

    for (var i in validateList) {

        validateForm(validateList[i][0], validateList[i][1], validateList[i][2], i);
    }

    // reset the height of the cols

    setColHeight();
    
    // indicate that the form has been validated
    
    valRun = true;

    // If the errors are found, the errorForm will be true, and the form should not be submitted.

    if (errorForm) return false;
    else return true;
}

// function to asign submitForm to all forms on the page.

function setSubmit(formID) {

    if(setSubmitRun) document.getElementById(formID).onsubmit = function() { return submitForm() }
}


//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
// Validation for WAIT
//

function waitSubmitForm() {

    // remove error texts, markings, and box, on a resubmit
    clearError();

    // reset errorTxt and errorForm, in case this is a resubmit
    errorTxt = ""
    errorForm = false;

    // validate fields
    for (var i in validateList) {
        //               ClientID            ValidationRule      IsRequired          RegEx               
        waitValidateForm(validateList[i][0], validateList[i][1], validateList[i][2], validateList[i][4], i);
    }

    // reset the height of the cols
    setColHeight();

    // indicate that the form has been validated
    valRun = true;

    // If the errors are found, the errorForm will be true, and the form should not be submitted.
    if (errorForm) return false;
    else return true;
}

function waitValidateForm(elementID, validationRule, requiredField, regularExpression, arrayIndex) {

    var fieldValue = "";
    var fieldObj;
    var valueError = false;
    errorTxt = "";

    // get the value of the field
    if (document.getElementById(elementID)) {
        if (document.getElementById(elementID).type == "select" || document.getElementById(elementID).type == "select-one") {
            fieldValue = document.getElementById(elementID).options[document.getElementById(elementID).selectedIndex].value;
        }
        else {
            fieldValue = document.getElementById(elementID).value;
        }
        fieldObj = document.getElementById(elementID);
    }

    var re;

    if (requiredField && fieldValue.length == 0) {
        valueError = true;
    }

    if(regularExpression && regularExpression != "" && fieldValue.length > 0) {
        if (!fieldValue.match(regularExpression)) {
            valueError = true;
            errorTxt = errorMsg[17][1]; 
        }
    }

    var valValueError = false;

    if (fieldValue.length > 0) {
        switch (validationRule) {
            case 1:
                valValueError = validateDate(fieldValue, currentLang);
                
                
                break;
            case 3:
                // Integer
                if (isNaN(fieldValue)) valValueError = true;
                break;
          }

          if (valValueError) {
            errorTxt = errorMsg[validationRule][1];
            valueError = valValueError;
          }
    }



    if (valueError) errorForm = true;

    if (requiredField && fieldValue.length == 0) {
        valueError = true;
        errorTxt = errorMsg[0][1];
        errorForm = true;
    }

    // if value error, set the correct error text, display the error box, and mark the fields with the error text
    if (valueError) {

        // set the error text width the value from the array, if not already set (if the required value not filed)
        if (errorTxt == "" && validationRule) errorTxt = errorMsg[validationRule][1];

        // display the error box
        document.getElementById("errorBox").style.display = "block";

        var savedBox = document.getElementById("savedBox");
        if (savedBox != null) {
            savedBox.style.display = "none";
        }

        // set the text of the errorbox
        errorBoxMsgIsSet = false;

        for (var i = 0; i < errorBoxMsg.length; i++)           // (length - 1) as we have an extra ',' in the list
        {
            if (errorBoxMsg[i][0] == currentLang) {
                $("#errorBox").html(errorBoxMsg[i][1]);
                errorBoxMsgIsSet = true;
                break;
            }
        }

        // mark field in validation array as currently having an error
        validateList[arrayIndex][3] = true;

        // set error text at field
        markErrorField(fieldObj, errorTxt, arrayIndex);
    }
}

// This is used on questions enable/disable and reset the points for manual validation fields (only for admin + publisher)
//
function TextControlManualPointsValidation(filledEnable, filledPoints, notfilledEnable, notfilledPoints, txtControlId, pointsControlId) {
    var filledEnable = filledEnable;
    var filledPoints = filledPoints;
    var notfilledEnable = notfilledEnable;
    var notfilledPoints = notfilledPoints;
    var txtControl = $("#" + txtControlId);
    var pointsControl = $("#" + pointsControlId);
    var lastFilled = (txtControl.val().length == 0);

    txtControl.bind('keyup change', function () {
        if ($(this).val().length == 0) {
            if (lastFilled) {
                if (notfilledPoints != null) {
                    pointsControl.val(notfilledPoints);
                }

                if (notfilledEnable) {
                    pointsControl.prop("disabled", false);
                    AddItemToValidateList(pointsControl[0].id, 3, false);
                }
                else {
                    pointsControl.prop("disabled", true);
                    pointsControl.val("");
                    RemoveItemFromValidateListWithId(pointsControl[0].id)
                }

            }

            lastFilled = false;
        }
        else {
            if (filledEnable && !lastFilled && filledPoints != null) {
                pointsControl.val(filledPoints);
            }

            if (filledEnable) {
                pointsControl.prop("disabled", false);
                AddItemToValidateList(pointsControl[0].id, 3, false);
            }
            else {
                pointsControl.prop("disabled", true);
                pointsControl.val("");
                RemoveItemFromValidateListWithId(pointsControl[0].id)
            }

            lastFilled = true;
        }
    });

    txtControl.change();
}