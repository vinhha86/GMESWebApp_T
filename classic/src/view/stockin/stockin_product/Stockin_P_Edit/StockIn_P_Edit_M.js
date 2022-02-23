Ext.define('GSmartApp.view.stockin.StockIn_P_Edit_M', {
	extend: 'Ext.container.Container',
	xtype: 'StockIn_P_Edit_M',
	itemId: 'StockIn_P_Edit_M',
	cls: 'StockIn_P_Edit_M',
	controller: 'StockIn_P_Edit_M_Controller',
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
			itemId: 'comboTypeStockin',
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
			// allowBlank: false,
			blankText: 'Không được để trống',
			labelWidth: 95,
			width: 370
		}, {
			margin: '0 5 0 5',
			xtype: 'textfield',
			bind: {
				value: '{stockin.stockincode}'
			},
			editable: false,
			readOnly: true,
			cls: 'notEditable',
			fieldLabel: "Số phiếu",
			width: 235,
            labelWidth: 85
		}, {
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
			margin: '0 5 0 5',
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
		]
	}, {
		layout: 'hbox',
		xtype: 'container',
		items: [{
			xtype: 'combo',
			itemId: 'combo_OrgFromStore',
			valueField: 'id',
			displayField: 'name_andParent',
			// displayField: 'name',
			bind: {
				value: '{stockin.orgid_from_link}',
				store: '{OrgFromStore}'
			},
			queryMode: 'local',
			anyMatch: true,
			margin: '0 5 0 5',
			fieldLabel: 'Nơi giao',					
			labelWidth: 95,					
			width: 370
		},{
			xtype: 'combo',
			valueField: 'id',
			displayField: 'name_andParent',
			// displayField: 'name',
			bind: {
				value: '{stockin.orgid_to_link}',
				store: '{OrgToStore}'
			},
			queryMode: 'local',
			anyMatch: true,
			anyMatch: true,
			margin: '0 5 0 5',
			width: 445,
			labelWidth: 85,
			fieldLabel: 'Nơi nhập',
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
				itemId:'linegiaohang',
				fieldLabel: 'Line giao hàng',
				width: 335,
				labelWidth: 95,
				hideLabel: false,			
				bind:{
					disabled: '{isEdit}',
					value: '{stockin.contract_number}',
					// hidden: '{isPOLineHidden}'
				},
                enableKeyEvents : true,
				hidden: true,
			},
			{
				xtype: 'button',
				tooltip: 'Tìm PO Line',
				margin: '0 5 0 3',
				itemId: 'btnTimPOLine',
				//text: 'Thêm thẻ vải',
				iconCls: 'x-fa fa-search',
				weight: 30,			
				bind:{
					disabled: '{isEdit}',
					// hidden: '{isPOLineHidden}'
				},
				hidden: true,
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
					// hidden: '{isPOLineHidden}'
				},
				queryMode: 'local',
				anyMatch: true,
				margin: '0 5 0 5',
				width: 445,
				labelWidth: 85,
				fieldLabel: 'Lệnh SX',
				hidden: true,
			},
			{
				margin: '0 0 0 5',
				xtype: 'textfield',
				itemId: 'productSearchStringField',
				bind: {
					value: '{productSearchString}'
				},
				fieldLabel: 'Sản phẩm',
				// editable: false,
				// readOnly: true,
				// cls: 'notEditable',
				// flex: 1,
				width: 335,
				labelWidth: 95,
				enableKeyEvents : true,
			},
			{
				xtype: 'button',
				tooltip: 'Tìm sản phẩm',
				margin: '0 5 0 3',
				itemId: 'btnTimSanPham',
				//text: 'Thêm thẻ vải',
				iconCls: 'x-fa fa-search',
				weight: 30,			
				// bind:{
				// 	disabled: '{isEdit}',
				// 	hidden: '{isPOLineHidden}'
				// }
				// handler: 'onSkuSearchTap'
			},
			{
				xtype: 'textfield',
				margin: '0 0 0 5',
				itemId:'stockoutcode',
				fieldLabel: 'Phiếu XK',
				width: 410,
				labelWidth: 85,
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
		]
	},
	]
});

