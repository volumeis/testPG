$(document).on("pageinit", "#storeList", function () {
    $(document).on("swipeleft swiperight", "#storeList", function (e) {
        // We check if there is no open panel on the page because otherwise
        // a swipe to close the left panel would also open the right panel (and v.v.).
        // We do this by checking the data that the framework stores on the page element (panel: open).
        if ($.mobile.activePage.jqmData("panel") !== "open") {
            if (e.type === "swipeleft") {
                $("#cartPanel").panel("open");
            } else if (e.type === "swiperight") {
                $("#menuPanel").panel("open");
            }
        }
    });
});