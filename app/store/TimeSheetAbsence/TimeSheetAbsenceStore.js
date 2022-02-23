Ext.define('GSmartApp.store.TimeSheetAbsence.TimeSheetAbsenceStore', {
	extend: 'Ext.data.Store',
	alias: 'store.TimeSheetAbsenceStore',
	storeId: 'TimeSheetAbsenceStore',
	fields: [
		{ name: 'id', type: 'int' },
		{ name: 'orgrootid_link', type: 'int' },
		{ name: 'personnelid_link', type: 'int' },
		{ name: 'absencedate_from', type: 'date', dateFormat: 'c' },
		{ name: 'absencedate_to', type: 'date', dateFormat: 'c' },
		{ name: 'absence_reason', type: 'string' },
		{ name: 'absencetypeid_link', type: 'int' },
		{ name: 'usercreatedid_link', type: 'int' },
		{ name: 'timecreate', type: 'date', dateFormat: 'c' },
		{ name: 'userapproveid_link', type: 'int' },
		{ name: 'timeapprove', type: 'date', dateFormat: 'c' },
	],
	pageSize: 25,
	groupField: 'timesheetAbsenceType',
	loadStore: function (datefrom, dateto) {
		var me = this;
		var params = new Object();
		params.datefrom = datefrom;
		params.dateto = dateto;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			// url: config.getAppBaseUrl()+'/api/v1/pcontract/getbypaging',
			url: config.getAppBaseUrl() + '/api/v1/timesheetabsence/getAllTimeSheetAbsence',
			paramsAsJson: true,
			extraParams: params,
			noCache: false,
			headers: {
				'Accept': "application/json",
				'Content-Type': "application/json"
			},
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		this.loadPage(1, {
			scope: this,
			callback: function (records, operation, success) {
				if (!success) {
					// this.fireEvent('logout');
				} else {
					console.log(records);
				}
			}
		});
	},
	loadByOrgAndDate: function (date, orgid_link) {
		var me = this;
		var params = new Object();
		params.date = date;
		params.orgid_link = orgid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/timesheetabsence/getbyorg_and_date',
			paramsAsJson: true,
			extraParams: params,
			noCache: false,
			headers: {
				'Accept': "application/json",
				'Content-Type': "application/json"
			},
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		this.load();
	},
	loadStore_ByPage: function (limit, page,
		orgFactory, personnelCode, personnelName, datefrom, dateto, timeSheetAbsenceType
	) {
		var me = this;
		var params = new Object();
		params.orgFactory = orgFactory;
		params.personnelCode = personnelCode;
		params.personnelName = personnelName;
		params.datefrom = datefrom;
		params.dateto = dateto;
		params.timeSheetAbsenceType = timeSheetAbsenceType;
		me.pageSize = limit;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/timesheetabsence/getbypaging',
			paramsAsJson: true,
			extraParams: params,
			noCache: false,
			headers: {
				'Accept': "application/json",
				'Content-Type': "application/json"
			},
			reader: {
				type: 'json',
				rootProperty: 'data',
				totalProperty: 'totalCount'
			}
		});
		this.loadPage(page, {
			scope: this,
			callback: function (records, operation, success) {
				if (!success) {
					// this.fireEvent('logout');
				}
				// else{
				// 	console.log(records);
				// }
			}
		});
	},
	getForBaoCaoNS: function(date){
		var me = this;
		var params = new Object();
		params.date = date;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/timesheetabsence/getForBaoCaoNS',
			paramsAsJson: true,
			extraParams: params,
			noCache: false,
			headers: {
				'Accept': "application/json",
				'Content-Type': "application/json"
			},
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		this.load();
	},
});
