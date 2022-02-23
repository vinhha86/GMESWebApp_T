Ext.define('GSmartApp.view.users.User_Info', {
    extend: 'Ext.form.Panel',
	xtype:'User_Info',
    id: 'User_Info',
	controller: 'User_Info_Controller',
	layout: 'vbox',
	items:[{
        layout: 'hbox',
        items:[{
            xtype: 'textfield',
            fieldLabel: 'Họ và tên',
            labelWidth: 100,
            bind: {
                value: '{User.firstname}'
            },
            margin: '5 1 0 5',
            width: 240
        },{
            xtype: 'textfield',
            labelWidth: 0,
            bind: {
                value: '{User.middlename}'
            },
            margin: '5 1 0 0',
            width: 150
        },{
            xtype: 'textfield',
            bind: {
                value: '{User.lastname}'
            },
            labelWidth: 0,
            margin: '5 5 0 0',
            width: 140
        },{
            xtype: 'textfield',
            fieldLabel: 'Tên đăng nhập',
            labelWidth: 100,
            flex: 1,
            bind: {
                value: '{User.username}',
                readOnly: '{isReadOnly}'
            },
            margin: '5 5 0 1'
        }
        ,{
            xtype:'textfield',
            fieldLabel:'Mã nhân viên',
            flex:1,
            margin:'5 5 0 0 ',
            bind:'{User.personnel_code}'
        }
    ]
    },
    {
        layout: 'hbox',
        items:[{
            xtype: 'textfield',
            fieldLabel: 'Email',
            labelWidth: 100,
            bind: {
                value: '{User.email}'
            },
            margin: '5 1 0 5'
        },{
            xtype: 'combo',
            bind: {
                store: '{OrgStore}',
                value: '{User.orgid_link}'
            },
            displayField: 'code',
            valueField: 'id',
            margin: '5 5 0 1',
            labelWidth: 80,
            fieldLabel: 'Đơn vị',
            itemId: 'cmbOrg'
        },{
            xtype: 'combo',
            bind: {
                store: '{OrgGrantStore}',
                value: '{User.org_grant_id_link}'
            },
            displayField: 'code',
            valueField: 'id',
            margin: '5 5 0 1',
            labelWidth: 100,
            flex: 1,
            queryMode: 'local',
            anyMath: true,
            fieldLabel: 'Đơn vị con'
        }]
    },
    {
        layout: 'hbox',
        items:[{
            xtype: 'textfield',
            fieldLabel: 'Số di động',
            labelWidth: 100,
            bind: {
                value: '{User.tel_mobile}'
            },
            margin: '5 1 0 5'
        },{
            xtype: 'textfield',
            fieldLabel: 'Số máy bàn',
            bind: {
                value: '{User.tel_office}'
            },
            labelWidth: 80,
            margin: '5 5 0 1'
        },{
            xtype: 'combo',
            bind: {
                store: '{StatusUserStore}',
                value: '{User.status}'
            },
            displayField: 'name',
            valueField: 'id',
            margin: '5 5 0 1',
            labelWidth: 100,
            fieldLabel: 'Trạng thái',
            flex: 1
        }]
    }]
		 
});

