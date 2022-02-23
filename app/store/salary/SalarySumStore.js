Ext.define('GSmartApp.store.SalarySumStore', {
	extend: 'Ext.data.Store',
	storeId: 'SalarySumStore',
	alias: 'store.SalarySumStore',
	idProperty: 'idx',
    fields: [
		'idx',
		{name: 'id', type: 'int'},
		{name: 'personnelid_link',   type: 'int'},
		{name: 'year',   type: 'int'},
		{name: 'month',   type: 'int'},
		{name: 'fromdate',   type: 'date'},
		{name: 'todate',   type: 'date'},
		{name: 'sumcolid_link',   type: 'int'},
		{name: 'sumcoltypeid_link',   type: 'int'},
		{name: 'sumvalue',   type: 'number'},
		{name: 'personel_fullname',   type: 'string'},
		{name: 'personel_saltypecode',   type: 'string'},
		{name: 'personel_sallevelcode',   type: 'string'},
		{name: 'sumcol_code',   type: 'string'},
		{name: 'sumcoltype_name',   type: 'string'},
		{name: 'luongsp_sl',   type: 'int'},
		{name: 'luongsp_tien',   type: 'int'},
		{name: 'luongtg_sl',   type: 'int'},
		{name: 'luongtg_tien',   type: 'int'},
		{name: 'nghi_sl',   type: 'int'},
		{name: 'nghi_tien',   type: 'int'},
		{name: 'phucap_chucvu',   type: 'int'},
		{name: 'phucap_khac',   type: 'int'},
		{name: 'tongluong',   type: 'int'},
		{name: 'ky1_tien',   type: 'int'},
		{name: 'ky2_tien',   type: 'int'},
		{name: 'giamtru_bhxh',   type: 'int'},
		{name: 'giamtru_bhyt',   type: 'int'},
		{name: 'giamtru_bhtn',   type: 'int'},
		{name: 'giamtru_kpcd',   type: 'int'},
		{name: 'giamtru_tong',   type: 'int'}
	],
	sorters: [{
        property: 'sumcolid_link',
        direction: 'ASC'
	}],
	loadStore:function(orgid_link,year,month,m){
        var params = new Object();
        params.orgid_link = orgid_link;
        params.year = year;
        params.month = month;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/salarysum/salary_sum_byorg',
			paramsAsJson:true,
			extraParams : params,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		// this.load();
		this.load({
			scope: this,
			callback: function(records, operation, success) {
				m.setLoading(false);
				if(!success){
					 // this.fireEvent('logout');
				} else {
					// console.log(records);
				}
			}
		});
	},
	calSalTable:function(orgid_link,year,month,m){
        var params = new Object();
        params.orgid_link = orgid_link;
        params.year = year;
        params.month = month;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/salarysum/salary_sum_calculate',
			timeout: 120000,
			paramsAsJson:true,
			extraParams : params,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		this.load({
			scope: this,
			callback: function(records, operation, success) {
				m.setLoading(false);
				if(!success){
					 // this.fireEvent('logout');
				} else {
					// console.log(records);
				}
			}
		});
	}
});
