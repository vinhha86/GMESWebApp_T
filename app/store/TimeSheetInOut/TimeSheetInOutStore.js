Ext.define('GSmartApp.store.TimeSheetInOut.TimeSheetInOutStore', {
	extend: 'Ext.data.Store',
	alias: 'store.TimeSheetInOutStore',
	fields: [
		{ name: 'id' },
		{ name: 'name', type: 'string' },
		{ name: 'code', type: 'string' },
		{ name: 'timerecorded' },
		{
			name: 'hour',
			convert: function (value, rec) {
				var result = '';
				var timerecorded = new Date(rec.get('timerecorded'));
				var timerecorded_hour = timerecorded.getHours() < 10 ? '0' + timerecorded.getHours() : timerecorded.getHours();
				var timerecorded_minute = timerecorded.getMinutes() < 10 ? '0' + timerecorded.getMinutes() : timerecorded.getMinutes();
				result = timerecorded_hour + ':' + timerecorded_minute;
				return result;
			}
		}
	],
	loadStore: function (todate, fromdate, orgid_link) {
		var params = new Object();
		params.todate = todate;
		params.fromdate = fromdate;
		params.orgid_link = orgid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/timesheetinout/getall',
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
	}
});
