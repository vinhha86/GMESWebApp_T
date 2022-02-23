Ext.define('GSmartApp.model.POrder_Grant', {
    extend: 'GSmartApp.model.Base',

    fields: [
		'id',
		'orgrootid_link',
		'porderid_link',
		'ordercode',
		'granttoorgid_link',
		'grantdate',
		'grantamount',
		'amountcutsum',
		'status',
		'usercreatedid_link',
		'timecreated',
    ]
});
