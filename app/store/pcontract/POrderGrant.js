Ext.define('GSmartApp.store.POrderGrant', {
    extend: 'Ext.data.Store',
    alias: 'store.POrderGrant',
    fields: [
		{name: 'id', type: 'int'},
		{name: 'porderid_link', type: 'int'},
		{name: 'ordercode',   type: 'string'},
		{name: 'granttoorgid_link',   type: 'int'},
		{name: 'granttoorg_name',   type: 'string'},
		{name: 'granttolineid_link',   type: 'int'},
		{name: 'granttoline_name',   type: 'string'},		
		{name: 'grantamount',   type: 'int'},
	],
	data:[
		{id:1,porderid_link:1,ordercode:'LSX_01',granttoorgid_link:1,granttoorg_name:'Nhà máy 1',granttolineid_link:11,granttoline_name:'Tổ 1',grantamount: 100},
		{id:2,porderid_link:1,ordercode:'LSX_02',granttoorgid_link:2,granttoorg_name:'Nhà máy 2',granttolineid_link:23,granttoline_name:'Tổ 3',grantamount: 200}
	]
});
