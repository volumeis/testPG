function storesCloser() {
    var list;
    return {
        set: function (address) {
            $.ajax({
                url: COMMONWEBSERVER + "/store/getJsonStoreList/" + address, //
                method: "GET",
                dataType: "json",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                success: function (JSONData, status) {
//                    list = (JSONData.storeMap.list);
                    list = (JSONData.storeMap);
                },
                complete: function () {

                },
                error: function (JSONData, status) {
                    //                alert("잘못된 요청입니다.");
                }
            });
        },
        get: function () {
            return list;
        }
    }
}
