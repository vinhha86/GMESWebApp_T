Ext.define('GSmartApp.model.POrder_Req', {
    extend: 'GSmartApp.model.Base',

    fields: [
		'id',
		'orgrootid_link',
		'granttoorgid_link',
		'pcontractid_link',
		'pcontract_poid_link',
		'productid_link',
		'sizesetid_link',
		'orderdate',
		'totalorder',
		'usercreatedid_link',
		'timecreated',
		'status',
		'po_Productiondate',
		'shipdate',
		'granttoorgname',
		'is_calculate',
		'product_code',
		'amount_inset',
		'productinfo'
    ]
});
