/*
* Description: Add basic functions
*
* Author: Neo
*/
"use strict";
function getInfo(info) {
    $.ajax({
    type: "GET",
    url: `http://localhost:3000/${info}`
    })
    .done(function(data) {
        console.log(data);
    })
    .fail(function() {});
    return false;
}

function getInfo2(info) {
    $.getJSON(`http://localhost:3000/${info}`, () => {})
    .done(function(data) {
        console.log(data);
        $("#infoList").empty();
        if(info == "leagues")
            data.forEach(displayLeagueInfo);
        else
            data.forEach(displayTeamInfo);
    })
    .fail(function(e) {
        console.log(e);
    });
    return false;
}

function displayLeagueInfo(item, index) {
    let newEle = $("<li>", {html: item.Name});
    $("#infoList").append(newEle);
}

function displayTeamInfo(item, index) {
    let newEle = $("<li>", {html: item.TeamName});
    $("#infoList").append(newEle);
}

$(function() {
    $("#leagueBtn").on("click", () =>  getInfo2("leagues"));
    $("#teamsBtn").on("click", () =>  getInfo2("teams"));
});