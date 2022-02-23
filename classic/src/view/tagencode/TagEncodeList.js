Ext.define('GSmartApp.view.tagencode.TagEncodeList', {
	extend: 'Ext.Panel',
	xtype:'TagEncodeList',
    controller: 'tagencodelist',
	viewModel: {
        type: 'tagencodelist'
    },
	cls: 'tagencodelist',
	layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
	items:[{
		layout: {
			type: 'hbox',
			pack: 'start',
			align: 'stretch'
		},
		items:[{
			flex:1,
			items:[{
				margin:5,
				 xtype:'form',
				 reference:'formTagEncode',
				 layout:'hbox',
				 items:[{
					 labelWidth:100,
					 margin:'0 5 0 0',
					 xtype: 'combobox',
					 fieldLabel: GSmartApp.Locales.thietbilamviec[GSmartApp.Locales.currentLocale],
					 store:'DeviceEncodeStore',
					 displayField: 'name',
					 valueField: 'id',
					 name:'deviceid',
					 reference:'device',
					 listeners:{
						 change :'onDeviceChange'
					 }
				 },{
					 name:'encodedateto_from',
					 xtype: 'textfield',
					 fieldLabel: 'Ngày encode',
					 value:new Date().toLocaleDateString(),
					 format:'d/m/Y',
					 readOnly:true
				 }]
			},{
				 xtype:'form',
				 layout:'hbox',
				
				 items:[{
					 width:120,
					 margin:'5 5 0 5',
					 text: "Start",
					 iconCls: 'x-fa fa-play',
					 xtype: 'button',
					 handler:'onStart',
					 bind:{
						disabled:'{isStart}',
						userCls:'{clsbtnStart}'
					}
				  },{
					 width:120,
					 margin:'5 5 0 5',
					 text: "Stop",
					 iconCls: 'x-fa fa-stop',
					 xtype: 'button',
					 handler:'onStop',
					 userCls:'red-button'
				  }]
			}]
		},{
			width:300,
			margin:'0 15 0 5',
			xtype: 'textfield',
			bind:{
				value:'{tagnumber}'
			},
			readOnly:true,
			fieldCls: 'tagencode-number'
		}]
	},{
		flex:1,
		margin:'10 2 2 2',
		xtype:'grid',
		bind: {
			store: '{TagEncodeListStore}'
		},
		reference:'gridTagEncode',
		columnLines:true,
		rowLines:true,
		columns: [{ 
			text: GSmartApp.Locales.sanpham[GSmartApp.Locales.currentLocale], 
			dataIndex: 'skuname', 
			flex:1
		},{ 
			text: GSmartApp.Locales.epc[GSmartApp.Locales.currentLocale], 
			dataIndex: 'epc', 
			flex:1
		},
		{ 
			text: 'TID', 
			dataIndex: 'tid', 
			flex:1
		}
		]
	}]
});

