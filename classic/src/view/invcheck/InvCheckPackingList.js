Ext.define('GSmartApp.view.invcheck.InvCheckPackingList', {
    extend: 'Ext.form.Panel',
	xtype:'invcheckpackinglist',
	controller: 'invcheckpackinglist',
	master_record:null,
	layout:'vbox',
    items: [{
		xtype:'form',
		reference:'formPackinglist',
		layout:'vbox',
		margin:5,
		items:[{
			layout:'hbox',
			margin:2,
			items:[{
				 flex:1,
				 xtype: 'textfield',
				 name: 'skucode',
				 label: GSmartApp.Locales.ma_vattu[GSmartApp.Locales.currentLocale],
				 labelWidth:130,
				 readOnly:true
			 }, {
				 flex:1,
				 labelWidth:'150',
				 xtype: 'comboboxfield',
				 label: GSmartApp.Locales.thietbilamviec[GSmartApp.Locales.currentLocale],
				 store:'DeviceStore',
				 displayField: 'name',
				 valueField: 'id',
				 name:'deviceid',
				 readOnly:true
			 }]
		},{
			layout:'hbox',
			margin:2,
			items:[{
				 xtype: 'textfield',
				 name: 'skuname',
				 label: GSmartApp.Locales.ten_vattu[GSmartApp.Locales.currentLocale],
				 labelWidth:130,
				 flex:1,
				 readOnly:true
			 }]
		},{
			layout:'hbox',
			margin:2,
			items:[{
				 xtype: 'numberfield',
				 name: 'totalpackage',
				 labelWidth:130,
				 label:GSmartApp.Locales.sokien[GSmartApp.Locales.currentLocale],
				 flex:1,
				 readOnly:true
			 }, {
				 xtype: 'numberfield',
				 name: 'totalpackagecheck',
				 label: GSmartApp.Locales.so_yds[GSmartApp.Locales.currentLocale],
				 labelWidth:150,
				 flex:1,
				 readOnly:true
			 }]
		}]
	},{
		html:'<hr>'
	},{
		flex:1,
		xtype:'grid',
		reference:'gridPackinglist',
		store:'PackinglistStore',
		columns: [{
			text:GSmartApp.Locales.socay[GSmartApp.Locales.currentLocale],
			width:100,
			dataIndex:'packageid',
			xtype: 'numbercolumn',
			format:'0,0.00',
			align:'right'
		},{
			text:GSmartApp.Locales.yds[GSmartApp.Locales.currentLocale],
			width:100,
			dataIndex:'ydsorigin',
			xtype: 'numbercolumn',
			format:'0,0.00',
			align:'right'
		},{
			text:GSmartApp.Locales.khovai[GSmartApp.Locales.currentLocale],
			width:150,
			dataIndex:'width',
			xtype: 'numbercolumn',
			format:'0,0.00',
			align:'right'
		},{
			text:GSmartApp.Locales.epc[GSmartApp.Locales.currentLocale],
			flex:1,
			dataIndex:'epc'
		}]
	}],
	 buttons: [ {
        text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale],
		iconCls: 'x-fa fa-window-close',
        handler: 'onPackingListClose'
    }]
});

