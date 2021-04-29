$( document ).ready(function() {
    $("#expanding-button").click(function(){
        if($("#expandable-skinny--nemo-expanded-container").hasClass("expandable-skinny--nemo-expanded-hidden")){
            $("#expandable-skinny--chevron").removeClass("expandable-skinny--expand-chevron");
            $("#expandable-skinny--chevron").addClass("expandable-skinny--reduce-chevron");
            $("#expandable-skinny--nemo-expanded-container").removeClass("expandable-skinny--nemo-expanded-hidden");
            $("#expand-banner-button").text("Close");
            $("#animated-non--five").addClass("hidden");
            $("#animated-non--six").addClass("hidden");
            $("#animated-non--seven").addClass("hidden");
            $("#animated-non--eight").addClass("hidden");
        } else{
            $("#expandable-skinny--chevron").addClass("expandable-skinny--expand-chevron");
            $("#expandable-skinny--chevron").removeClass("expandable-skinny--reduce-chevron");
            $("#expandable-skinny--nemo-expanded-container").addClass("expandable-skinny--nemo-expanded-hidden");
            $("#expand-banner-button").text("Find Nemo");
            $("#animated-non--five").removeClass("hidden");
            $("#animated-non--six").removeClass("hidden");
            $("#animated-non--seven").removeClass("hidden");
            $("#animated-non--eight").removeClass("hidden");
        }
    });
});
