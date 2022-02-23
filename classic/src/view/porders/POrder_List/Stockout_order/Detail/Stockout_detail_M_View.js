Ext.define('GSmartApp.view.porders.POrder_List.Stockout_order.Detail.Stockout_detail_M_View', {
	extend: 'Ext.container.Container',
	xtype: 'Stockout_detail_M_View',
	controller: 'Stockout_detail_M_ViewController',
	requires: ['Ext.form.field.Hidden', 'Ext.form.field.Date'],
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	items: [{
		layout: 'hbox',
		xtype: 'container',
		items: [{
			xtype: 'combo',
			valueField: 'id',
			displayField: 'name',
			bind: {
				store: '{Stockout_order_type_Store}',
				value: '{order.stockouttypeid_link}',
				disabled: '{isCreate}'
			},
			// readOnly: true,
			labelWidth: 80,
			width: 375,
			margin: '0 5 0 5',
			queryMode: 'local',
			anyMatch: true,
			fieldLabel: 'Loại nhập'
		}, {
			xtype: 'textfield',
			fieldLabel: 'Số YCX',
			margin: '0 5 0 5',
			labelWidth: 85,
			bind: {
				value: '{order.stockout_order_code}',
				disabled: '{isCreate}'
			},
			editable: false,
			flex: 1
		}]
	}, {
		layout: 'hbox',
		xtype: 'container',
		items: [{
			xtype: 'combo',
			valueField: 'id',
			displayField: 'name_andParent',
			bind: {
				value: '{order.orgid_from_link}',
				store: '{OrgFromStore}',
				disabled: '{isCreate}'
			},
			queryMode: 'local',
			anyMatch: true,
			margin: '0 5 0 5',
			fieldLabel: "Nơi giao (<span style = 'color: red'>*</span>)",
			labelWidth: 80,
			width: 375,
			allowBlank: false,
			blankText: 'Trường phải nhập',
		}, {
			xtype: 'combo',
			valueField: 'id',
			displayField: 'name_andParent',
			bind: {
				value: '{order.orgid_to_link}',
				store: '{OrgToStore}'
			},
			queryMode: 'local',
			anyMatch: true,
			margin: '0 5 0 5',
			flex: 1,
			labelWidth: 85,
			allowBlank: false,
			blankText: 'Trường phải nhập',
			fieldLabel: "Nơi nhận (<span style = 'color: red'>*</span>)"
		}]
	}, {
		layout: 'hbox',
		xtype: 'container',
		items: [{
			margin: '0 5 0 5',
			xtype: 'combo',
			bind: {
				value: '{order.usercreateid_link}',
				store: '{UserStore}'
			},
			valueField: 'id',
			displayField: 'fullName',
			fieldLabel: 'Người lập',
			labelWidth: 80,
			readOnly: true,
			width: 375
		}, {
			margin: '0 5 0 5',
			xtype: 'datefield',
			format: GSmartApp.util.State.get('dataFormat'),
			altFormats: "Y-m-d\\TH:i:s.uO",
			bind: {
				value: '{order.orderdate}'
			},
			editable: false,
			labelWidth: 85,
			flex: 1,
			fieldLabel: "Ngày xuất"
		}]
	}, {
		layout: 'hbox',
		xtype: 'container',
		items: [{
			margin: '0 5 0 5',
			xtype: 'combo',
			bind: {
				value: '{order.unitid_link}',
				store: '{UnitStore}'
			},
			valueField: 'id',
			displayField: 'name',
			queryMode: 'local',
			anyMatch: true,
			fieldLabel: 'Đơn vị tính',
			itemId: 'cmbDonViTinh',
			labelWidth: 80,
			width: 375
		}, {
			margin: '0 5 0 5',
			xtype: 'textfield',
			bind: {
				value: '{order.extrainfo}'
			},
			fieldLabel: 'Ghi chú',
			flex: 1,
			labelWidth: 85
		},]
	}]
});

