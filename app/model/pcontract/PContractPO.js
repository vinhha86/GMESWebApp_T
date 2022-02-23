Ext.define('GSmartApp.model.pcontract.PContractPO', {
	extend: 'Ext.data.Model',
	idProperty: 'idx',
	fields: [
		{ name: 'id', type: 'int' },
		{ name: 'idx', type: 'int' },
		{ name: 'orgrootid_link', type: 'int' },
		{ name: 'pcontractid_link', type: 'int' },
		{ name: 'code', type: 'string' },
		{ name: 'po_buyer', type: 'string' },
		{ name: 'po_vendor', type: 'string' },
		{ name: 'productid_link', type: 'int' },
		{ name: 'po_quantity', type: 'int' },
		{ name: 'po_quantity_sp', type: 'int' },
		{ name: 'unitid_link', type: 'int' },
		{ name: 'shipdate', type: 'date', dateFormat: 'c' },
		{
			name: 'shipdateString', type: 'string',
			convert: function (value, rec) {
				var shipdate = rec.get('shipdate');
				if(shipdate != null){
					var date = new Date(shipdate);
					var day = date.getDate();
					var month = date.getMonth()+1;
					var year = date.getYear() % 100;

					if(day < 10) day = '0' + day;
					if(month < 10) month = '0' + month;

					var result = day + '/' + month + '/' + year;
					return result;
				}
				return '';
			}
		},
		{ name: 'matdate', type: 'date', dateFormat: 'c' },
		{ name: 'actual_quantity', type: 'int' },
		{ name: 'actual_shipdate', type: 'date', dateFormat: 'c' },
		{ name: 'price_cmpt', type: 'number' },
		{ name: 'price_fob', type: 'number' },
		{ name: 'price_sweingtarget', type: 'number' },
		{ name: 'price_sweingfact', type: 'number' },
		{ name: 'price_add', type: 'number' },
		{ name: 'price_commission', type: 'number' },
		{ name: 'salaryfund', type: 'number' },

		{ name: 'currencyid_link', type: 'int' },
		{ name: 'exchangerate', type: 'number' },
		{ name: 'productiondate', type: 'date', dateFormat: 'c' },
		{ name: 'productiondays', type: 'int' },
		{ name: 'productiondays_ns', type: 'int' },
		{ name: 'packingnotice', type: 'string' },
		{ name: 'qcorgid_link', type: 'int' },
		{ name: 'qcorgname', type: 'string' },
		{ name: 'etm_from', type: 'int' },
		{ name: 'etm_to', type: 'int' },
		{ name: 'etm_avr', type: 'int' },
		{ name: 'usercreatedid_link', type: 'int' },
		{ name: 'datecreated', type: 'date', dateFormat: 'c' },
		{ name: 'status', type: 'int' },
		{ name: 'factories', type: 'string' },
		{ name: 'productbuyercode', type: 'string' },
		'totalpair'
	],
	hasMany: { model: 'PContractPO_Price', name: 'pcontract_price' },
	hasMany: { model: 'PContractPO', name: 'sub_po' }
});