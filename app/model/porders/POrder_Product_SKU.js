Ext.define('GSmartApp.model.POrder_Product_SKU', {
    extend: 'GSmartApp.model.Base',

    fields: [
		'id',
		'orgrootid_link',
		'porderid_link',
		'productid_link',
		'skuid_link',
		'pquantity_sample',
		'pquantity_porder',
		'pquantity_total',
        {name: 'skuName',   type: 'string'},
        {name: 'skuCode',   type: 'string'},
        {name: 'mauSanPham',   type: 'string'},
		{name: 'coSanPham', type: 'string'},		
    ]
});
