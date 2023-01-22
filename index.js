var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var stuDBName = "STU-DB";
var stuRelationName = "StuData";
var connToken = "90932375|-31949271675815142|90953937";

$("#sturno").focus();

function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
}

function getSturnoAsJsonObj() {
    var sturno = $("#sturno").val();
    var jsonStr = {
        id: sturno
    };
    return JSON.stringify(jsonStr);
}

function getStu() {
    var sturnoJsonObj = get StunoAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, stuDBName, stuRelationName, sturnoJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery .ajaxSetup({async: true});
    if (resJsonObj.status === 400) {
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#stuname").focus();
        
    } else if (resJsonObj.status === 200) {
        
        $("#sturno").prop("disabled", false);
        fillData(resJsonObj);
        
        $("#change").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#stuname").focus();
    }
}
function saveData() {
    var jsonStrObj = validateData();
    if (jsonStrObj ==='') {
        return "";
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, stuDBName, stuRelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#sturno").focus();
} 

function validateData() {
    var sturno, stuname, stuclass, stubd, stuaddress, stued;
    sturno = $("#sturno").val();
    stuname = $("#stuname").val();
    stuclass = $("#stuclass").val();
    stubd = $("#stubd").val();
    stuaddress = $("#stuaddress").val();
    stued = $("#stued").val();
    
    if(sturno === "") {
        alert("Student Roll-No missing");
        $("sturno").focus();
        return "";
    }
    if(stuname === "") {
        alert("Student Name missing");
        $("stuname").focus();
        return "";
    }
    if(stuclass === "") {
        alert("Student Class missing");
        $("stuclass").focus();
        return "";
    }
    if(stubd === "") {
        alert("Student Birth-Date missing");
        $("stubd").focus();
        return "";
    }
    if(stuaddress === "") {
        alert("Student Address missing");
        $("stuaddress").focus();
        return "";
    }
    if(stued === "") {
        alert("Student Enrollmetn Date missing");
        $("stued").focus();
        return "";
    }
    
    var jsonStrObj = {
       id: sturno,
       Name: stuname,
       Class: stuclass,
       birthdate: stubd,
       Address: stuaddress,
       Enrollmentdate: stued,
    };
    return JSON.stringify(jsonStrObj);


function changeData() {
    $("#change").prop("disabled", true);
    jsonChg = validateDate();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, stuDBName, stuRelationName, localStorage.getItem('recno'));
}
function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#stuname").val(record.name);
    $("#stuclass").val(record.class);
    $("#stubd").val(record.birthdate);
    $("#stuaddress").val(record.address);
    $("#stued").val(record.ed);
}
function resetForm() {
    $("#sturno").val("");
    $("#stuname").val("");
    $("#stuclass").val("");
    $("#stubd").val("");
    $("#stuaddress").val("");
    $("#stued").val("");
    $("#sturno").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#update").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#sturno").focus();
}
}






