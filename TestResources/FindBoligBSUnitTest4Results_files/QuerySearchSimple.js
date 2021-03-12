function QuerySearchSimple() {    
    this.membersOnly = false;
    this.where = "";
    this.freeSearch = null;    
    this.postalWhereClause = null;
    this.rentMin = null;
    this.rentMax = null;
    this.roomsMin = null;
    this.roomsMax = null;
    this.m2Min = null;
    this.m2Max = null;
    this.floorMin = null;
    this.floorMax = null;
    this.residenceFacilityList = "";
    this.buildingFacilityList = "";
    this.showRentedHousing = false;
    this.showYouthHousing = false;
    this.buildingID = null;
    this.zoom;
    this.xMin;
    this.xMax;
    this.yMin;
    this.yMax;

    this.queryString = "";
    this.lastQueryString = "";

}