Ext.define('GSmartApp.store.TimeSheetLunch.TimeSheetLunchStore', {
	extend: 'Ext.data.Store',
	alias: 'store.TimeSheetLunchStore',
	storeId: 'TimeSheetLunchStore',
	fields: [
		{ name: 'personnelid_link', type: 'int' },
		{ name: 'personnelCode', type: 'string' },
		{ name: 'personnelFullname', type: 'string' },
		{ name: 'lunchShift1', type: 'boolean' },
		{ name: 'lunchShift2', type: 'boolean' },
		{ name: 'lunchShift3', type: 'boolean' },
		{ name: 'workingShift1', type: 'boolean' },
		{ name: 'workingShift2', type: 'boolean' },
		{ name: 'workingShift3', type: 'boolean' },
	],
	sorters: [{
		property: 'personnelCode',
		direction: 'ASC'
	}],
	loadStore: function (orgid_link, date) {
		var me = this;
		var params = new Object();
		params.orgid_link = orgid_link;
		params.date = date;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/timesheetlunch/getForTimeSheetLunch',
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
				this.fireEvent('TimeSheetLunchStore_Done');
				if (!success) {
					// this.fireEvent('logout');
				}
			}
		});
	}
});
