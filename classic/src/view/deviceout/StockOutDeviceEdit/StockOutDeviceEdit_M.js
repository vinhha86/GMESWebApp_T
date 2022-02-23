Ext.define('GSmartApp.view.deviceout.StockOutDeviceEdit_M', {
	extend: 'Ext.container.Container',
	xtype: 'StockOutDeviceEdit_M',
	controller: 'StockOutDeviceEdit_MController',
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
				value: '{deviceout.id}'
			},
		}, {
			xtype: 'hiddenfield',
			bind: {
				value: '{deviceout.status}'
			},
		}, {
			xtype: 'combo',
			valueField: 'id',
			displayField: 'name',
			bind: {
				value: '{deviceout.deviceouttypeid_link}',
				store: '{DeviceOutTypeStore}'
			},
			queryMode: 'local',
			anyMatch: true,
			margin: '5 5 0 5',
			fieldLabel: 'Loại xuất',					
			allowBlank: false,
			blankText: 'Không được để trống',
            labelWidth: 85,
            flex: 1
		}, {
			margin: '5 5 0 5',
			xtype: 'textfield',
			bind: {
				value: '{deviceout.deviceout_code}'
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
				value: '{deviceout.deviceout_date}'
			},			
			editable: false,
			fieldLabel: "Ngày xuất",
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
				value: '{deviceout.orgid_from_link}',
				store: '{OrgFromStore}'
			},
			queryMode: 'local',
			anyMatch: true,
			margin: '5 5 0 5',
			fieldLabel: 'Nơi xuất',
			labelWidth: 85,
            flex: 1
		},{
			xtype: 'combo',
			valueField: 'id',
			displayField: 'name',
			bind: {
				value: '{deviceout.orgid_to_link}',
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
				value: '{deviceout.usercreateid_link}',
				store: '{UserStore}'
			},
			queryMode: 'local',
			anyMatch: true,
			margin: '5 5 0 5',
			// readOnly: true,
			flex: 1,
            labelWidth: 85,
			fieldLabel: 'Người xuất'
		}]
	},{
		layout: 'hbox',
		xtype: 'container',
		items: [{
			margin: '5 5 0 5',
			xtype: 'textfield',
			bind: {
				value: '{deviceout.invoice_code}'
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
				value: '{deviceout.invoice_date}'
			},
			editable: false,
			labelWidth: 85,
            flex: 1,
			fieldLabel: "Ngày Invoice"
		},{
			margin: '5 5 0 5',
			xtype: 'textfield',
			bind: {
				value: '{deviceout.shipperson}'
			},
			fieldLabel: 'Người giao',
			labelWidth: 85,
			flex: 1
		}]
	}]
});

