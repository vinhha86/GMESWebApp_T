Ext.define('GSmartApp.view.devicein.StockInDeviceEdit_M', {
	extend: 'Ext.container.Container',
	xtype: 'StockInDeviceEdit_M',
	controller: 'StockInDeviceEdit_MController',
	requires: ['Ext.form.field.Hidden', 'Ext.form.field.Date'],
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	items: [{
		layout: 'hbox',
		xtype: 'container',
		items: [{
			xtype: 'hiddenfield',
			bind: {
				value: '{devicein.id}'
			},
		}, {
			xtype: 'hiddenfield',
			bind: {
				value: '{devicein.status}'
			},
		}, {
			xtype: 'combo',
			valueField: 'id',
			displayField: 'name',
			bind: {
				value: '{devicein.deviceintypeid_link}',
				store: '{DeviceInTypeStore}'
			},
			queryMode: 'local',
			anyMatch: true,
			margin: '5 5 0 5',
			fieldLabel: 'Loại nhập',					
			allowBlank: false,
			blankText: 'Không được để trống',
            labelWidth: 85,
            flex: 1
		}, {
			margin: '5 5 0 5',
			xtype: 'textfield',
			bind: {
				value: '{devicein.devicein_code}'
			},
			// readOnly: true,
			fieldLabel: "Số phiếu",
            labelWidth: 85,
            flex: 1
		}, {
			margin: '5 5 0 5',
			xtype: 'datefield',
			format: GSmartApp.util.State.get('dataFormat'),
			altFormats: "Y-m-d\\TH:i:s.uO",
			bind: {
				value: '{devicein.devicein_date}'
			},			
			editable: false,
			fieldLabel: "Ngày nhập",
            labelWidth: 85,
            flex: 1
		}]
	}, {
		layout: 'hbox',
		xtype: 'container',
		items: [{
			xtype: 'combo',
			valueField: 'id',
			displayField: 'name',
			bind: {
				value: '{devicein.orgid_from_link}',
				store: '{OrgFromStore}'
			},
			queryMode: 'local',
			anyMatch: true,
			margin: '5 5 0 5',
			fieldLabel: 'Nơi giao',
			labelWidth: 85,
            flex: 1
		},{
			xtype: 'combo',
			valueField: 'id',
			displayField: 'name',
			bind: {
				value: '{devicein.orgid_to_link}',
				store: '{OrgToStore}'
			},
			queryMode: 'local',
			anyMatch: true,
			margin: '5 5 0 5',
			labelWidth: 85,
            flex: 1,
			fieldLabel: 'Nơi nhận'
		}, {
			xtype: 'combo',
			valueField: 'id',
			displayField: 'fullName',
			bind: {
				value: '{devicein.usercreateid_link}',
				store: '{UserStore}'
			},
			queryMode: 'local',
			anyMatch: true,
			margin: '5 5 0 5',
			// readOnly: true,
			flex: 1,
            labelWidth: 85,
			fieldLabel: 'Người nhập'
		}]
	},{
		layout: 'hbox',
		xtype: 'container',
		items: [{
			margin: '5 5 0 5',
			xtype: 'textfield',
			bind: {
				value: '{devicein.invoice_code}'
			},
			fieldLabel: 'Số Invoice',					
			labelWidth: 85,
            flex: 1
		},{
			margin: '5 5 0 5',
			xtype: 'datefield',
			format: GSmartApp.util.State.get('dataFormat'),
			altFormats: "Y-m-d\\TH:i:s.uO",
			bind: {
				value: '{devicein.invoice_date}'
			},
			editable: false,
			labelWidth: 85,
            flex: 1,
			fieldLabel: "Ngày Invoice"
		},{
			margin: '5 5 0 5',
			xtype: 'textfield',
			bind: {
				value: '{devicein.shipperson}'
			},
			fieldLabel: 'Người giao',
			labelWidth: 85,
			flex: 1
		}]
	}]
});

