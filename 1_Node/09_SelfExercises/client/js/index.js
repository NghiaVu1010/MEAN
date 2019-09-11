/*
* Description: Add basic functions
*
* Author: Neo
*/
"use strict";

$(function() {
    // Call to get all divisions and dynamically build DDL
    let divisionData;

    $.getJSON("/api/leagues", (data) => {
        divisionData = data;
        buildList($("#divisionDDL"), divisionData);

        if(divisionPicked != "none") {
            $.getJSON("/api/teams/byleague/" + $("#divisionDDL").val(), (data) => {
                displayData(data);
                $("#teamTable").show();
            });

            for(let i = 0; i < divisionData.length; i++) {
                if($("#divisionDDL").val() == divisionData[i].Code)
                    $("#divisionDetails").text(divisionData[i].Description);
            }
        }
    });
    
    // Populate table based on selection
    $("#teamTable").hide();
    $("#divisionDDL").on("change", () => {
        $("#teamBody").empty();

        if($("#divisionDDL").val() == "") {
            $("#teamTable").hide();
            $("#divisionDetails").empty();
            return false;
        }
        else $("#teamTable").show();

        // Show description based on selection
        for(let i = 0; i < divisionData.length; i++) {
            if($("#divisionDDL").val() == divisionData[i].Code)
                $("#divisionDetails").text(divisionData[i].Description);
        }
        
        // Call to display all teams in that divison
        $.getJSON("/api/teams/byleague/" + $("#divisionDDL").val(), (data) => {
            displayData(data);
        });
    });
    
    // Preload all teams
    let allData;
    $.getJSON("/api/teams", function(data) {
        allData = data;
    });

    // Button redirects to add a team
    $("#addTeamBtn").on("click", function() {
        location.href = "add_team.html";
    });

    // Displays all teams when clicked
    $("#viewAllBtn").on("click", function() {
        $("#teamBody").empty();
        $("#teamTable").show();
        displayData(allData);
    });

    // Modal confirm button to delete the team
    $("#confirmModalBtn").on("click", function() {
        deleteTeam(sessionStorage.getItem("teamid"));
    });

    // Bind Click Event Handler to Reset Buttom

    $("#searchForm").on("reset", function(e) {
        e.preventDefault();
        $("#teamBody").empty();
        $("#teamTable").hide();
        $("#emptyDiv").empty();
        $("#divisionDetails").empty();
        $("#divisionDDL").val("0");
    });
});