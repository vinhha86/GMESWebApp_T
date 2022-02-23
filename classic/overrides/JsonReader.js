
Ext.define("GSmartApp.override.JsonReader", {
    override:"Ext.data.reader.Json",
    /**
     * Make additional processing available on the raw response.
     */
    processRawResponse:null,
    getResponseData:function(response) {
        if(this.processRawResponse) this.processRawResponse(response);
        //this.callParent(arguments);
        var data = this.callParent([response]);
        return data;
    }
});