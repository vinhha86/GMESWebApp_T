Ext.define('GSmartApp.view.handover.HandoverPackToStock_Edit_M', {
	extend: 'Ext.container.Container',
	xtype: 'HandoverPackToStock_Edit_M',
	itemId: 'HandoverPackToStock_Edit_M',
	cls: 'HandoverPackToStock_Edit_M',
	controller: 'HandoverPackToStock_Edit_M_Controller',
	requires: ['Ext.form.field.Hidden', 'Ext.form.field.Date'],
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	items: [
		{
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
				valueField: 'id',
				displayField: 'name',
				bind: {
					value: '{stockin.stockintypeid_link}',
					store: '{StockinTypeStore}'
				},
				queryMode: 'local',
				anyMatch: true,
				margin: '0 5 0 5',
				fieldLabel: 'Loại phiếu',	
				editable: false,
				readOnly: true,
				cls: 'notEditable',	
				allowBlank: false,
				blankText: 'Không được để trống',
				labelWidth: 95,
				width: 370
			}, 
			{
				margin: '0 5 0 5',
				xtype: 'textfield',
				bind: {
					value: '{stockin.stockincode}'
				},
				fieldLabel: "Số phiếu",
				editable: false,
				readOnly: true,
				cls: 'notEditable',
				width: 235,
				labelWidth: 85
			}, 
			{
				margin: '0 5 0 5',
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
				xtype: 'combo',
				valueField: 'id',
				displayField: 'fullName',
				bind: {
					value: '{stockin.usercreateid_link}',
					store: '{UserStore}'
				},
				queryMode: 'local',
				anyMatch: true,
				margin: '0 5 0 5',
				editable: false,
				readOnly: true,
				cls: 'notEditable',
				flex: 1,
				labelWidth: 85,
				fieldLabel: 'Người lập'
			}
		]
	}, {
		layout: 'hbox',
		xtype: 'container',
		items: [
			{
				xtype: 'combo',
				valueField: 'id',
				displayField: 'name',
				bind: {
					value: '{stockin.orgid_from_link}',
					store: '{OrgFromStore}'
				},
				queryMode: 'local',
				anyMatch: true,
				margin: '0 5 0 5',
				fieldLabel: 'Nơi giao ('+ '<span style="color:red">*</span>' + ')',					
				labelWidth: 95,					
				width: 370
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
				fieldLabel: 'Nơi nhận'
			},
			{
				xtype: 'combo',
				valueField: 'id',
				displayField: 'fullName',
				bind: {
					value: '{stockin.approverid_link}',
					store: '{UserStore}'
				},
				queryMode: 'local',
				anyMatch: true,
				margin: '0 5 0 5',
				editable: false,
				readOnly: true,
				cls: 'notEditable',
				flex: 1,
				labelWidth: 85,
				fieldLabel: 'Người duyệt'
			}
		]
	}, {
		layout: 'hbox',
		xtype: 'container',
		items: [
			{
				margin: '0 5 0 5',
				xtype: 'textfield',
				bind: {
					value: '{stockin.reason}'
				},
				fieldLabel: 'Lý do nhập',					
				labelWidth: 95,
				width: 370
			},
			{
				margin: '0 5 0 5',
				xtype: 'textfield',
				bind: {
					value: '{stockin.extrainfo}'
				},
				fieldLabel: 'Kèm theo',
				width: 445,
				labelWidth: 85,
			},
			{
				margin: '0 5 0 5',
				xtype: 'textfield',
				bind: {
					value: '{stockin.statusString}'
				},
				fieldLabel: 'Trạng thái',
				editable: false,
				readOnly: true,
				cls: 'notEditable',
				flex: 1,
				labelWidth: 85,
			}
		]
	},
	{
		layout: 'hbox',
		xtype: 'container',
		items: [
			{
				xtype: 'textfield',
				margin: '0 0 0 5',
				itemId:'stockoutcode',
				fieldLabel: 'Phiếu XK',
				width: 335,
				labelWidth: 95,
				hideLabel: false,			
				bind:{
					disabled: '{isEdit}',
					value: '{stockin.stockout_code}',
					hidden: '{isStockoutHidden}'
				}  
			},
			{
				xtype: 'button',
				tooltip: 'Tìm Phiếu XK',
				margin: '0 5 0 3',
				itemId: 'btnTimStockout',
				iconCls: 'x-fa fa-search',
				weight: 30,			
				bind:{
					disabled: '{isEdit}',
					hidden: '{isStockoutHidden}'
				}
			}, 	
			{
				xtype: 'textfield',
				margin: '0 0 0 5',
				itemId:'linegiaohang',
				fieldLabel: 'Line giao hàng',
				width: 335,
				labelWidth: 95,
				hideLabel: false,			
				bind:{
					disabled: '{isEdit}',
					value: '{stockin.contract_number}',
					hidden: '{isPOLineHidden}'
				},
                enableKeyEvents : true,
			},
			{
				xtype: 'button',
				tooltip: 'Tìm PO Line',
				margin: '0 5 0 3',
				itemId: 'btnTimPOLine',
				iconCls: 'x-fa fa-search',
				weight: 30,			
				bind:{
					disabled: '{isEdit}',
					hidden: '{isPOLineHidden}'
				},
			},
			{
				xtype: 'combo',
				itemId: 'cbo_POrder_ListStore',
				valueField: 'id',
				displayField: 'ordercode',
				bind: {
					value: '{stockin.porderid_link}',
					store: '{POrder_ListStore}',
					disabled: '{isEdit}',
					hideTrigger: '{isEdit}',
					hidden: '{isPOLineHidden}'
				},
				queryMode: 'local',
				anyMatch: true,
				margin: '0 5 0 5',
				width: 445,
				labelWidth: 85,
				fieldLabel: 'Lệnh SX'
			},
			// {
			// 	xtype: 'combo',
			// 	itemId: 'cbo_POrder_ListGrantStore',
			// 	valueField: 'id',
			// 	displayField: 'granttoorgname',
			// 	bind: {
			// 		value: '{stockin.porder_grantid_link}',
			// 		store: '{POrder_ListGrantStore}',
			// 		disabled: '{isEdit}',
			// 		hideTrigger: '{isEdit}',
			// 		hidden: '{isPOLineHidden}'
			// 	},
			// 	queryMode: 'local',
			// 	anyMatch: true,
			// 	margin: '0 5 0 5',
			// 	flex: 1,
			// 	labelWidth: 85,
			// 	fieldLabel: 'Tổ chuyền'
			// },
		]
	},
	]
});

