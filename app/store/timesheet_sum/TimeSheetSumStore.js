Ext.define('GSmartApp.store.TimeSheetSumStore', {
	extend: 'Ext.data.Store',
	storeId: 'TimeSheetSumStore',
	alias: 'store.TimeSheetSumStore',
	idProperty: 'idx',
	fields: [
		'idx',
		{ name: 'id', type: 'int' },
		{ name: 'personnelid_link', type: 'int' },
		{ name: 'year', type: 'int' },
		{ name: 'month', type: 'int' },
		{ name: 'fromdate', type: 'date' },
		{ name: 'todate', type: 'date' },
		{ name: 'sumcolid_link', type: 'int' },
		{ name: 'sumcoltypeid_link', type: 'int' },
		{ name: 'sumvalue', type: 'number' },
	],
	sorters: [{
		property: 'sumcolid_link',
		direction: 'ASC'
	}],
	loadStore: function (orgid_link, year, month, m) {
		var params = new Object();
		params.orgid_link = orgid_link;
		params.year = year;
		params.month = month;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/timesheetsum/timesheet_sum_byorg',
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
		// this.load();
		this.load({
			scope: this,
			callback: function (records, operation, success) {
				m.setLoading(false);
				if (!success) {
					// this.fireEvent('logout');
				} else {
					// console.log(records);
				}
			}
		});
	},
	calWorkTable: function (orgid_link, year, month, m) {
		var params = new Object();
		params.orgid_link = orgid_link;
		params.year = year;
		params.month = month;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/timesheetsum/timesheet_sum_calculate',
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
		this.load({
			scope: this,
			callback: function (records, operation, success) {
				m.setLoading(false);
			}
		});
	}
});
