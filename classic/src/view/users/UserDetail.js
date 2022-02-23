Ext.define('GSmartApp.view.users.UserDetail', {
    extend: 'Ext.form.Panel',
	xtype:'UserDetail',
	id: 'UserDetail',
	controller: 'UserDetail_Controller',
	viewModel: {
        type: 'UserDetail_ViewModel'
    },
	layout: 'border',
	items:[{
		region: 'north',
        title: 'Thông tin người dùng',
        xtype: 'User_Info',
		height: 160,
		margin: 1,
		border: true
	},
	{
		region: 'center',
		layout: 'border',
		items: [
			{
				region: 'west',
				width: '30%',
				xtype: 'UserGroup',
				margin: 1,
				border: true
			},
			{
				region: 'center',
				layout: 'border',
				items: [
					{
						region: 'west',
						xtype: 'User_Org_BuyerView',
						margin: 1,
						width: '33%',
						border: true
					},{
						region: 'center',
						xtype: 'User_Org_VendorView',
						margin: 1,
						border: true
					},
					{
						region: 'east',
						xtype: 'User_Org_FactoryView',
						width: '33%',
						margin: 1,
						border: true
					}
				]
			}
		]
	}

	],
	dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[{
            xtype:'button',
            text: 'Quay lại',
            margin: 3,
            itemId:'btnQuayLai',
            iconCls: 'x-fa fa-backward'
        },{
            flex:1,
            border: false
        },{
            xtype:'button',
            text: 'Lưu',
            margin: 3,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save',
            formBind: true
        }]
    }] 
});

