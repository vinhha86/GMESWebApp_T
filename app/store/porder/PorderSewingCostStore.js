Ext.define('GSmartApp.store.porder.PorderSewingCostStore', {
    extend: 'Ext.data.Store',
    storeId: 'PorderSewingCostStore',
    alias: 'store.PorderSewingCostStore',

    model: 'GSmartApp.model.PorderSewingCost',
       
    sorters: [{
        property: 'workingprocess_name',
        direction: 'ASC'
    }],

    loadby_porder: function(porderid_link){
        var me=this;
		var params = new Object();
		params.porderid_link = porderid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/pordersewingcost/getby_porder',
			paramsAsJson:true,
			noCache: false,
			extraParams : params,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		this.load();
	},
	loadByPorderUnused: function(porderid_link){
        var me=this;
		var params = new Object();
		params.porderid_link = porderid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/pordersewingcost/getby_porder_notin_porder_balance',
			paramsAsJson:true,
			noCache: false,
			extraParams : params,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		this.load();
	},
	loadForPProcessProductivity: function(
		personnelid_link, processingdate, shifttypeid_link, porderid_link, pordergrantid_link
		){
        var me=this;
		var params = new Object();
		params.personnelid_link = personnelid_link;
		params.processingdate = processingdate;
		params.shifttypeid_link = shifttypeid_link;
		params.porderid_link = porderid_link;
		params.pordergrantid_link = pordergrantid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/pordersewingcost/getForPProcessProductivity',
			paramsAsJson:true,
			noCache: false,
			extraParams : params,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		this.load();
    }
});
