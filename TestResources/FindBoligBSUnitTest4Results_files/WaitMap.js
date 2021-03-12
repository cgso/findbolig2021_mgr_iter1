var TextTranslation_PreviousResidence = "forrige";
var TextTranslation_Of = "af";
var TextTranslation_NextResidence = "næste";

var rentedhousingIcon = "/gfx/boligikon.png";
var youthRentedhousingIcon = "/gfx/boligikon.png";
var clusterIcon = "/gfx/boligikon-cluster.png";

var markersArray = []; 
var activeDialogBox = null;
var selectedClusterItem = null
var initMap = false;
var dragZoomObjectHasBeenUsed = false;

var ne = null;
var sw = null;
var map;
var zoomLevel;
var isMapSearch = true;
var mapLoaded = false;
//-------------------------------------------------------
// initialize WAIT map
//-------------------------------------------------------
function initializeWaitMapWithMarker(point, zoomLevel) {
    if (zoomLevel == null)
        zoomLevel = 17;

    SetFullHeight(document.getElementById('map_canvas'), -21);

    setTimeout(function () {
        var myOptions = {
            zoom: zoomLevel,
            center: point,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            panControl: true,
            zoomControl: true,
            scaleControl: true,
            streetViewControl: true,
            mapTypeControl: false
        };

        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

        //---- Poi Config ----//
        var config = {
            "jsonPath": "https://poi.maptoweb.dk/",
            "imagePath": "https://d1zqutybffyvms.cloudfront.net/gfx/poi/default/",
            "messages": {
                "toManyInArea": "(Der er for mange på kortet til at kunne blive vist. Prøv at zoome ind)",
                "noneInArea": "(Der er ingen i det viste kortudsnit. Prøv at zoome ud)"
            },
            "categories": [
                {
                    "name": "Børn & uddannelse",
                    "layers": [
                        { "layerId": 84, "title": "Børnepasning" },
                        { "layerId": 81, "title": "Skole" },
                        { "layerId": 82, "title": "Mellemlang uddannelse" },
                        { "layerId": 83, "title": "Lang uddannelse" }
                    ]
                },
                {
                    "name": "Sport & fritid",
                    "layers": [
                        { "layerId": 90, "title": "Sportsfaciliteter" },
                        { "layerId": 91, "title": "Svømmehal" },
                        { "layerId": 89, "title": "Golf" },
                        { "layerId": 94, "title": "Botanisk have" },
                        { "layerId": 93, "title": "Zoologisk have" },
                        { "layerId": 92, "title": "Seværdighed" },
                        { "layerId": 95, "title": "Biograf" },
                        { "layerId": 97, "title": "Teater" }
                    ]
                },
                {
                    "name": "Offentlig service",
                    "layers": [
                        { "layerId": 96, "title": "Bibliotek" },
                        { "layerId": 87, "title": "Hospital" },
                        { "layerId": 86, "title": "Offentlig bygning" },
                        { "layerId": 88, "title": "Politi" }
                    ]
                },
                {
                    "name": "Indkøb",
                    "layers": [
                        { "layerId": 85, "title": "Indkøb" }
                    ]
                },
                {
                    "name": "Transport",
                    "layers": [
                        { "layerId": 129, "title": "Bus", "max": 250 },
                        { "layerId": 130, "title": "Tog" },
                        { "layerId": 132, "title": "S-tog" },
                        { "layerId": 131, "title": "Metro" }
                    ]
                }
            ]
        };

        //---- Poi lag ----//
        var foliaPOI = new folia.maps.PointsOfInterest({ config: config, map: map, renderMethod: folia.maps.PointsOfInterest.RenderMethod.BUTTONS });
        //renderMethod: folia.maps.PointsOfInterest.RenderMethod.BUTTONS_WITH_TEXT
        
        map.controls[google.maps.ControlPosition.RIGHT_TOP].push(foliaPOI);

        var myMarker = new google.maps.Marker({
            position: point,
            map: map,
            icon: rentedhousingIcon
        });

    }, 300);

}

function initializeWaitMap() {
    initMap = true;
    SetFullHeight(document.getElementById('map_canvas'), -21);

    setTimeout(function () {

        var myDefaultBounds = getDefaultBounds();

        var myOptions = {
            zoom: zoomLevel,
            center: myDefaultBounds.getCenter(),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            panControl: true,
            zoomControl: true,
            scaleControl: true,
            streetViewControl: true,
            mapTypeControl: false
        };



        //Init map
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

        //---- Poi Config ----//
        var config = {
            "jsonPath": "https://poi.maptoweb.dk/",
            "imagePath": "https://d1zqutybffyvms.cloudfront.net/gfx/poi/default/",
            "messages": {
                "toManyInArea": "(Der er for mange på kortet til at kunne blive vist. Prøv at zoome ind)",
                "noneInArea": "(Der er ingen i det viste kortudsnit. Prøv at zoome ud)"
            },
            "categories": [
                {
                    "name": "Børn & uddannelse",
                    "layers": [
                        { "layerId": 84, "title": "Børnepasning" },
                        { "layerId": 81, "title": "Skole" },
                        { "layerId": 82, "title": "Mellemlang uddannelse" },
                        { "layerId": 83, "title": "Lang uddannelse" }
                    ]
                },
                {
                    "name": "Sport & fritid",
                    "layers": [
                        { "layerId": 90, "title": "Sportsfaciliteter" },
                        { "layerId": 91, "title": "Svømmehal" },
                        { "layerId": 89, "title": "Golf" },
                        { "layerId": 94, "title": "Botanisk have" },
                        { "layerId": 93, "title": "Zoologisk have" },
                        { "layerId": 92, "title": "Seværdighed" },
                        { "layerId": 95, "title": "Biograf" },
                        { "layerId": 97, "title": "Teater" }
                    ]
                },
                {
                    "name": "Offentlig service",
                    "layers": [
                        { "layerId": 96, "title": "Bibliotek" },
                        { "layerId": 87, "title": "Hospital" },
                        { "layerId": 86, "title": "Offentlig bygning" },
                        { "layerId": 88, "title": "Politi" }
                    ]
                },
                {
                    "name": "Indkøb",
                    "layers": [
                        { "layerId": 85, "title": "Indkøb" }
                    ]
                },
                {
                    "name": "Transport",
                    "layers": [
                        { "layerId": 129, "title": "Bus", "max": 250 },
                        { "layerId": 130, "title": "Tog" },
                        { "layerId": 132, "title": "S-tog" },
                        { "layerId": 131, "title": "Metro" }
                    ]
                }
            ]
        };

        //---- Poi lag ----//
        var foliaPOI = new folia.maps.PointsOfInterest({ config: config, map: map, renderMethod: folia.maps.PointsOfInterest.RenderMethod.BUTTONS });
        //renderMethod: folia.maps.PointsOfInterest.RenderMethod.BUTTONS_WITH_TEXT

        map.controls[google.maps.ControlPosition.RIGHT_TOP].push(foliaPOI);

        var boundsChangedListener = google.maps.event.addListener(map, 'bounds_changed', function () {
            google.maps.event.removeListener(boundsChangedListener);

            if (showDenmarkAsStartupPosition) {
                //Show denmark by default
                showDenmark();

            } else if (needToFitBoundsOnInit) {
                //Fit map to the bounds (ne,sw)
                map.fitBounds(getDefaultBounds());
            }

            map.enableKeyDragZoom({
                key: "shift",
                boxStyle: {
                    border: "1px dashed black",
                    backgroundColor: "transparent",
                    opacity: 1.0
                },

                visualEnabled: true
            });

            initDragZoom();
            initGoogleMapEvents();


            mapLoaded = true;
        });
    }, 300);
}


//-------------------------------
// Init drag zoom
//-------------------------------
function initDragZoom() {
    var dz = map.getDragZoomObject();    
    google.maps.event.addListener(dz, 'dragend', function (bnds) {
    });


    google.maps.event.addListener(dz, 'drag', function (startPt, endPt, prj) {
        dragZoomObjectHasBeenUsed = true;
    });
}

//-------------------------------
// Init Google map events
//-------------------------------
function initGoogleMapEvents() {
    var idleListener = google.maps.event.addListener(map, 'idle', function () {
        google.maps.event.removeListener(idleListener);
        if (map.getZoom() < 16 || initMap) {
            searchOnMap();
            initMap = false;
        }
    });

    google.maps.event.addListener(map, 'zoom_changed', function () {
        closeActiveDialogBox();
        if (dragZoomObjectHasBeenUsed) {
            dragZoomObjectHasBeenUsed = false;
            map.setZoom(map.getZoom() + 1);
        }
        else {
            if (map.getZoom() < 16 || initMap) {
                setTimeout(searchOnMap, 200);
                initMap = false;
            }
        }
    });

    google.maps.event.addListener(map, 'dragend', function () {
        setTimeout(searchOnMap, 200);
    });

    google.maps.event.addListener(map, 'click', function () {
        closeActiveDialogBox();
    });

}

//-------------------------------------------------------
// Show Denmark or LatLng from URL
//-------------------------------------------------------
function showDenmark() {
    //Reset to Default DK
    ne = new google.maps.LatLng(58.175126183679026, 15.384545898437522);
    sw = new google.maps.LatLng(53.90280761354595, 7.287622070312523);

    var boundsDK = getDefaultBounds();
    map.fitBounds(boundsDK);
    map.setZoom(map.getZoom() + 1);    
}

//-------------------------------------------------------
// Get default bounds (either the DK or URL defined bounds)
//-------------------------------------------------------
function getDefaultBounds()
{
    if (sw == null && ne == null)
        return null;

    return new google.maps.LatLngBounds(sw, ne);
}
//-------------------------------------------------------
// set bounds
//-------------------------------------------------------
function setBounds(swLat, swLng, neLat, neLng) {
    var ne = new google.maps.LatLng(swLat, swLng);
    var sw = new google.maps.LatLng(neLat, neLng);  

    var newBounds = new google.maps.LatLngBounds(sw, ne);
    map.fitBounds(newBounds);
    map.setZoom(map.getZoom() + 1);
}

//-------------------------------------------------------
// Create a maker to be displayed on map
//-------------------------------------------------------
function createMarkerSimple(point, residenceType) {
    var image = "";
    if (residenceType == 1) //ledige boliger
        image = rentedhousingIcon;
    else if (residenceType == 2)//ungdomsboliger
        image = youthRentedhousingIcon;
    else if (residenceType == -1)//contains many items and will be defined as cluster
        image = clusterIcon;

    var myMarker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: image
    });
}

function createMarker(myLatLng, residenceType, clusterItem) {
    var image = "";
    if (residenceType == 1) //ledige boliger
        image = rentedhousingIcon;
    else if (residenceType == 2)//ungdomsboliger
        image = youthRentedhousingIcon;
    else if (residenceType == -1)//contains many items and will be defined as cluster
        image = clusterIcon;
    
    var myMarker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: image//,
        //title: myLatLng.lat() + ',' + myLatLng.lng()
    });       

    var myOptions = {
        content: "lorem ipsum"
			, pixelOffset: new google.maps.Size(-110, -355)
			, boxStyle: {            
			    background: "#fff"
			   , opacity: 1.0
               ,padding: 7
			  , width: "235px"              
			}
    };

    var ib = new InfoBox(myOptions);
    google.maps.event.addListener(myMarker, 'click', function () {
        if (lastRequestedQuery.length > 0 && lastRequestedQuery.substring(0, 1) != '&') {
            lastRequestedQuery = "&" + lastRequestedQuery;
        }

        if (clusterItem.ids.length > 1) {
            selectedClusterItem = clusterItem;
        }
        else {
            selectedClusterItem = null;
        }

        closeActiveDialogBox();


        var selectedBounds = map.getBounds();
        var sw = selectedBounds.getSouthWest();
        var ne = selectedBounds.getNorthEast();

        var finalDialogUrl = dialogUrl + clusterItem.ids[0] + lastRequestedQuery;

        $.get(finalDialogUrl, function (data) {

            var boxText = null;

            //------------------
            // DIALOG, CLUSTER
            //------------------
            if (clusterItem.ids.length > 1) {
                boxText = GetMapdialogCluster(data, clusterItem.ids.length);

                myOptions = {
                    content: boxText.html()
			        , pixelOffset: new google.maps.Size(-110, -320)
                };

                //------------------
                // DIALOG, SINGLE
                //------------------
            } else {
                boxText = GetMapdialog(data);

                myOptions = {
                    content: boxText.html()
			        , pixelOffset: new google.maps.Size(-110, -295)
                };
            }

            ib.setOptions(myOptions);
            ib.open(map, myMarker);
            activeDialogBox = ib;
        });
    });   
    
    markersArray.push(myMarker);
}

//-------------------------------------------
// Close dialog
//-------------------------------------------
function closeActiveDialogBox() {
    if (activeDialogBox != null) {
        activeDialogBox.close();
    }
}

//-------------------------------------------
// Render map dialog
//-------------------------------------------
function GetMapdialog(data) {
    var boxText = $('<div/>');
    boxText.attr("id", "mapDialogBox");    

    boxText.append("<div id='mapDialogBoxContent'>" + data + "</div>");

    return boxText;
}

//---------------------------------------------------
// Render map dialog for a multi/clustered residence
// "previousResidence, nextResidence, of is located
// MapTranslationElements.ascx"
//---------------------------------------------------
function GetMapdialogCluster(data, pageing) {
    var boxText = $('<div/>');
    boxText.attr("id", "mapDialogBox");

    boxText.append("<div style='border-bottom: solid 1px #eee;width:235px;padding-top:8px;padding-bottom:2px;'>"                  
                  +"<a href='#' onclick='clusterDialogPrevious(document.getElementById(\"currentNum\"))'> < " + TextTranslation_PreviousResidence + " </a> <span id='currentNum'>1</span> " + TextTranslation_Of + " <span id='totalNum'> " + pageing + " </span> <a href='#' onclick='clusterDialogNext(document.getElementById(\"currentNum\"), document.getElementById(\"totalNum\"))'> " + TextTranslation_NextResidence + " > </a>"
                  + "</div>"
                  +"<div></div>"
                  +"<div id='mapDialogBoxContent' style='padding-top:3px;'>" + data + "</div>");
    
    return boxText;                   
}


// Deletes all markers in the array by removing references to them 
function deleteOverlays() {
    if (markersArray) {
        for (i in markersArray) {
            markersArray[i].setMap(null);
        }        
    }
}

function printdebug(txt) {
    var debugText = $("#debug").html();

    debugText += txt;

    $("#debug").html(debugText);
}

//-----------------------------------------------
// Related to dialog when showing a
// clustered element
//-----------------------------------------------
function clusterDialogPrevious(currentNum) {
    var minNum = currentNum.innerHTML * 1;

    if (minNum > 1) {
        if (selectedClusterItem != null) {
            minNum = minNum - 1;
            var URL = dialogUrl + selectedClusterItem.ids[minNum - 1] + '&' + lastRequestedQuery;
            $.get(URL, function (data) {
                $("#mapDialogBoxContent").html(data);
                $("#currentNum").html(minNum + "");
            });
        }
    }
}

//-----------------------------------------------
// Related to dialog when showing a
// clustered element
//-----------------------------------------------
function clusterDialogNext(currentNum, totalNum) {
    var minNum = currentNum.innerHTML * 1;
    var maxNum = totalNum.innerHTML * 1;

    if (minNum < maxNum) {
        if (selectedClusterItem != null) {
            minNum = minNum + 1;

            //var URL = dialogUrl + "?&showrented=1&showyouth=1&bid=" + selectedClusterItem.ids[minNum - 1];
            var URL = dialogUrl + selectedClusterItem.ids[minNum - 1] + '&' + lastRequestedQuery;
            $.get(URL, function (data) {
                $("#mapDialogBoxContent").html(data);
                $("#currentNum").html(minNum + "");
            });
        }
    }
}