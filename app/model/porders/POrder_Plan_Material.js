Ext.define('GSmartApp.model.POrder_Plan_Material', {
    extend: 'GSmartApp.model.Base',

    fields: [
		'id',
		'porderid_link',
		'plan_date',
		'skuid_link',
		'unitid_link',
		'sku_code',
		'unit_code',
		'plan_amount',
		'comment',
		'usercreatedid_link',
		'timecreate'
    ]
});
