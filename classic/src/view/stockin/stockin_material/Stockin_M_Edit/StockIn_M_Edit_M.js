Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.Stockin_M_Edit_M', {
	extend: 'Ext.container.Container',
	xtype: 'Stockin_M_Edit_M',
	itemId: 'Stockin_M_Edit_M',
	cls: 'Stockin_M_Edit_M',
	controller: 'Stockin_M_Edit_M_Controller',
	requires: ['Ext.form.field.Hidden', 'Ext.form.field.Date'],
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	items: [{
		layout: 'hbox',
		xtype: 'container',
		items: [
			{
				xtype: 'hiddenfield',
				bind: {
					value: '{stockin.id}'
				},
			}, 
			{
				xtype: 'hiddenfield',
				bind: {
					value: '{stockin.status}'
				},
			}, 
			{
				xtype: 'combo',
				readOnly: true,
				editable: false,	
				cls: 'notEditable',
				valueField: 'id',
				displayField: 'name',
				bind: {
					value: '{stockin.stockintypeid_link}',
					store: '{StockinTypeStore}'
				},
				queryMode: 'local',
				anyMatch: true,
				margin: '5 5 0 5',
				fieldLabel: 'Loại nhập',					
				allowBlank: false,
				blankText: 'Không được để trống',
				labelWidth: 80,
				width: 375
			}, 
			{
				margin: '5 5 0 5',
				xtype: 'textfield',
				bind: {
					value: '{stockin.stockincode}'
				},
				readOnly: true,
				editable: false,	
				cls: 'notEditable',
				fieldLabel: "Số phiếu",
				width: 235,
				labelWidth: 85
			}, 
			{
				margin: '5 5 0 5',
				xtype: 'datefield',
				format: GSmartApp.util.State.get('dataFormat'),
				altFormats: "Y-m-d\\TH:i:s.uO",
				bind: {
					value: '{stockin.stockindate}'
				},			
				editable: false,
				fieldLabel: "Ngày nhập",
				width: 200,
				labelWidth: 70
			}, 
			{
				margin: '5 5 0 5',
				xtype: 'textfield',
				bind: {
					value: '{stockin.usercreate_name}'
				},
				fieldLabel: 'Người lập',
				editable: false,
				readOnly: true,
				cls: 'notEditable',
				flex: 1,
				labelWidth: 85,
			},
			{
				margin: '5 5 0 5',
				xtype: 'textfield',
				itemId: 'statusString',
				bind: {
					value: '{stockin.statusString}'
				},
				readOnly: true,
				editable: false,	
				cls: 'notEditable',
				// fieldLabel: "Trạng thái",
				// labelWidth: 85,
				// flex: 1,
				width: 150,
			}
		]
	}, {
		layout: 'hbox',
		xtype: 'container',
		margin: '1 0 0 0',
		items: [
			// {
			// 	xtype: 'combo',
			// 	valueField: 'id',
			// 	displayField: 'name',
			// 	bind: {
			// 		value: '{stockin.orgid_from_link}',
			// 		store: '{OrgFromStore}'
			// 	},
			// 	queryMode: 'local',
			// 	anyMatch: true,
			// 	margin: '0 5 0 5',
			// 	fieldLabel: 'Nơi giao('+ '<span style="color:red">*</span>' + ')',
			// 	labelWidth: 80,					
			// 	width: 375,
			// 	bind: {
			// 		hidden: '{isTypeMuaMoiNguyenPhuLieu}'
			// 	}
			// },
			{
				layout: 'hbox',
				xtype: 'container',
				margin: '0 5 0 5',
				border: false,
				width: 375,
				items:[
					{
						xtype: 'combo',
						valueField: 'id',
						displayField: 'name',
						bind: {
							value: '{stockin.orgid_from_link}',
							store: '{OrgFromStore}',
							width: '{isTypeMuaMoiNguyenPhuLieu}'
						},
						queryMode: 'local',
						anyMatch: true,
						// margin: '0 5 0 5',
						fieldLabel: 'Nơi giao('+ '<span style="color:red">*</span>' + ')',
						labelWidth: 80,					
						// width: 343
					},
					{
						xtype:'button',
						margin: '0 0 0 2',
						itemId:'btnAddNoiGiao',
						iconCls: 'x-fa fa-plus',
						width: 30,
						bind: {
							hidden: '{isBtnAddNoiGiaoHidden}'
						}
					}
				],
				// bind: {
				// 	hidden: '{!isTypeMuaMoiNguyenPhuLieu}'
				// }
			},
			{
				xtype: 'combo',
				valueField: 'id',
				displayField: 'name',
				bind: {
					value: '{stockin.orgid_to_link}',
					store: '{OrgToStore}'
				},
				queryMode: 'local',
				anyMatch: true,
				margin: '0 5 0 5',
				width: 445,
				labelWidth: 85,
				fieldLabel: 'Nơi nhận('+ '<span style="color:red">*</span>' + ')',
			},
			{
				margin: '0 5 0 5',
				xtype: 'textfield',
				bind: {
					value: '{stockin.userApprove_name}'
				},
				fieldLabel: 'Người duyệt',
				editable: false,
				readOnly: true,
				cls: 'notEditable',
				flex: 1,
				labelWidth: 85,
			},
			// {
			// 	margin: '0 5 0 5',
			// 	xtype: 'textfield',
			// 	bind: {
			// 		value: '{stockin.shipperson}'
			// 	},
			// 	fieldLabel: 'Người giao',
			// 	labelWidth: 85,
			// 	flex: 1
			// }
		]
	}, 

	// here
	{
		layout: 'hbox',
		xtype: 'container',
		margin: '1 0 0 0',
		items: [
			{
				margin: '0 5 0 5',
				xtype: 'textfield',
				bind: {
					value: '{stockin.totalpackage}'
				},
				fieldLabel: 'Tổng số kiện',					
				labelWidth: 80,
				width: 155,
				maskRe: /[0-9]/
			},
			{
				margin: '0 5 0 5',
				xtype: 'datefield',
				format: GSmartApp.util.State.get('dataFormat'),
				altFormats: "Y-m-d\\TH:i:s.uO",
				bind: {
					value: '{stockin.invoice_date}'
				},
				editable: false,
				labelWidth: 85,
				width: 210,
				fieldLabel: "Ngày Invoice"
			},
			{
				margin: '0 5 0 5',
				xtype: 'textfield',
				bind: {
					value: '{stockin.reason}'
				},
				fieldLabel: 'Lý do nhập',					
				labelWidth: 85,
				width: 445
			},
			{
				margin: '0 5 0 5',
				xtype: 'textfield',
				bind: {
					value: '{stockin.extrainfo}'
				},
				fieldLabel: 'Kèm theo',
				flex: 1,
				labelWidth: 85
			},
		]
	},
	{
		layout: 'hbox',
		xtype: 'container',
		margin: '1 0 0 0',
		items: [
			{
				layout: 'hbox',
				xtype: 'container',
				margin: '0 5 0 5',
				border: false,
				width: 375,
				items:[
					{
						xtype: 'textfield',
						bind: {
							value: '{stockin.invoice_number}'
						},
						fieldLabel: 'Số Invoice',					
						labelWidth: 80,
						width: 343,
						enableKeyEvents : true,
						listeners: {
							keypress: 'onPressEnterBtnInvoice_Search'
						}
					},
					// {
					// 	xtype:'button',
					// 	margin: '0 0 0 2',
					// 	itemId:'btnInvoice_Plus',
					// 	iconCls: 'x-fa fa-plus',
					// 	width: 30
					// },
					{
						xtype:'button',
						margin: '0 0 0 2',
						itemId:'btnInvoice_Search',
						iconCls: 'x-fa fa-search',
						width: 30
					}
				]
			},
			{
				xtype:'combo',
				itemId: 'UnitStoreCombo',
				fieldLabel: 'Đ/vị nhập',
				bind:{
					store: '{UnitStore}',
					value: '{stockin.unitid_link}'
				},
				valueField: 'id',
				displayField: 'name',
				margin: '0 5 0 5',
				width: 225,
            	labelWidth: 85,
				queryMode: 'local',
				anyMatch: true,
				editable: false
			},
			{
				xtype:'combo',
				itemId: 'UnitStoreWidthCombo',
				fieldLabel: 'Đ/vị khổ',
				bind:{
					store: '{UnitWidthStore}',
					value: '{stockin.width_unitid_link}'
				},
				valueField: 'id',
				displayField: 'name_width',
				margin: '0 5 0 5',
				width: 210,
            	labelWidth: 70,
				queryMode: 'local',
				anyMatch: true,
				editable: false
			},
			{
				margin: '0 5 0 5',
				xtype: 'datefield',
				format: GSmartApp.util.State.get('dataFormat'),
				altFormats: "Y-m-d\\TH:i:s.uO",
				bind: {
					value: '{stockin.expected_date}'
				},			
				editable: false,
				fieldLabel: "Dự kiến về",
				flex: 1,
				labelWidth: 85
			}, 
			// {
			// 	margin: '0 5 0 5',
			// 	xtype: 'textfield',
			// 	itemId: 'statusString',
			// 	bind: {
			// 		value: '{stockin.statusString}'
			// 	},
			// 	readOnly: true,
			// 	editable: false,	
			// 	cls: 'notEditable',
			// 	fieldLabel: "Trạng thái",
			// 	labelWidth: 85,
			// 	flex: 1
			// }
		]
	}]
});

