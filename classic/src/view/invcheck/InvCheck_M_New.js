Ext.define('GSmartApp.view.invcheck.InvCheck_M_New', {
    extend: 'Ext.form.Panel',
	xtype:'InvCheck_M_New',
	controller: 'InvCheck_M_New_Controller',
	viewModel: {
        type: 'InvCheck_M_New_ViewModel'
    },
	layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
	items:[{
		// height: 280,
		 layout: {
			type: 'hbox',
			pack: 'start',
			align: 'stretch'
		 },
		 reference:'formMaster',
		 items: [{
			 layout: {
				type: 'vbox',
				pack: 'start',
				align: 'stretch'
			 },
			 xtype:'form',
			 reference:'formInvCheck',
			 flex:1,
			 items:[{
				 layout:'hbox',
				 margin:2,
				 items: [{
					 xtype:'hiddenfield',
					 name:'id',
					 reference:'id',
				 },{
					 xtype:'hiddenfield',
					 name:'status'
				 },
				 {
					 xtype: 'container',
					 layout: 'hbox',
					 flex: 1,
					 items:[
						{
							width: 350,
							labelWidth:70,
							xtype: 'textfield',
							name:'invcheckcode',
							reference:'invcheckcode',
							fieldLabel: 'Số phiếu',
							readOnly:true
						}, {
							flex:1,
							margin:'0 0 0 5',
							labelWidth:90,
							xtype: 'datefield',
							format:'d/m/Y',
							name:'invcheckdatetime',
							reference:'invcheckdatetime',
							fieldLabel: 'Ngày kiểm kê',
							readOnly:true
						}
					 ]
				 },
				 {
					 flex:1,
					 margin:'0 0 0 5',
					 name:'orgcheckid_link',
					 reference:'orgcheckid_link',
					 labelWidth:90,
					 xtype: 'combobox',
					 fieldLabel: 'Kho kiểm kê',
					 queryMode: 'local',
					 anyMatch: true,
					 bind:{
						store: '{ListOrgStore}',
						readOnly:'{isEdit}'
					},			
					 displayField: 'name',
					 valueField: 'id',
					 allowBlank: false,
					 required: true
				 }]
			 },{
				layout:'hbox',
				margin:2,
				items:[
					{
						flex:1,
						labelWidth:70,
						name:'p_skuid_link',
						reference:'productcode',
						xtype: 'combobox',
						fieldLabel: 'Sản phẩm',
						queryMode: 'local',
						anyMatch: true,
					//  store:'SkuStore',
					//  displayField: 'name',
					//  valueField: 'id',
						bind:{
							readOnly:'{isEdit}'
						}
					},
					{
						flex:1,
						margin:'0 0 0 5',
						name:'extrainfo',
						labelWidth:90,
						xtype: 'textfield',
						fieldLabel: 'Ghi chú',
						bind:{
							readOnly:'{isEdit}'
						}
					}
				]
			}
			]
		 
		 },
		//  {
		// 	 width:240,
		// 	 layout: {
		// 		type: 'vbox',
		// 		align: 'center',
		// 		pack: 'center'
		// 	},
		// 	 items:[{
		// 		 id:'invCheckQrcode',
		// 	 }]
		//  }
		]
		 
	},{
		layout:'hbox',
		items: [{
			 margin:'0 5 0 5',
			 xtype:'button',
			 iconCls: 'x-fa fa-angle-double-up',
			  bind:{
				 hidden:'{IsformMaster}'
			 },
			 handler: 'onHidden'
		},{
			 margin:'0 5 0 5',
			 xtype:'button',
			 iconCls: 'x-fa fa-angle-double-down',
			 bind:{
				 hidden:'{!IsformMaster}'
			 },
			 handler: 'onHidden'
		},{
			flex:1
		 },{
			 margin:'0 5 0 0',
			 xtype:'button',
			 bind:{
				 hidden:'{isEdit}'
			 },
			 text: 'Tạo số liệu kiểm kê',
			 iconCls: 'x-fa fa-plus',
			 handler: 'onInvCheckCreate'
		 },{
			 margin:'0 5 0 0',
			 xtype:'button',
			 bind:{
				 hidden:'{!isEdit}'
			 },
			 text: 'Load dữ liệu',
			 handler: 'onInvCheckLoad'
		 }]
	},{
		html:'<hr>'
	},{
		xtype:'grid',
		reference:'gridInvCheck',
		columnLines:true,
		rowLines:true,
		flex:1,
		viewConfig: {
			enableTextSelection: true,
			stripeRows: false,
		},
        lockedViewConfig: {
            scroll: 'horizontal'
        },
		features: [{
			ftype: 'summary',
			dock: 'bottom'
		}], 
		store:'GSmartApp.store.invcheck.InvCheckDetailStore',
		columns: [{
				text:'Mã hàng', 
				dataIndex: 'skucode',
				width: 150,
				summaryRenderer:function (grid, context) {
					return 'Tổng cộng';
				}
			},
			{
				text:'Mô tả', 
				dataIndex: 'sku_desc',
				flex:1,
				// minWidth:120
			},
			{
				text:'Đơn vị tính', 
				dataIndex: 'unitname',
				width:80,
			},{
				text: 'Số sổ sách', 
				columns:[
					{
						xtype: 'numbercolumn',
						format:'0,000',
						text: 'Số cây', 
						dataIndex: 'totalpackage',
						width:80,
						align:'right',
						summaryType: 'sum', summaryRenderer: 'renderSumFloat'
					},
					{
						xtype: 'numbercolumn',
						format:'0,000.00',
						text: 'Số lượng', 
						dataIndex: 'met_origin',
						width:100,
						align:'right',
						summaryType: 'sum', summaryRenderer: 'renderSumFloat'
					},
					// {
					// 	xtype: 'numbercolumn',
					// 	format:'0,000',
					// 	text: 'Giá', 
					// 	dataIndex: 'unitprice',
					// 	width:80,
					// 	align:'right',
					// 	summaryType: 'sum', summaryRenderer: 'renderSum'
					// },
					// {
					// 	xtype: 'numbercolumn',
					// 	format:'0,000',
					// 	text: 'Thành tiền', 
					// 	dataIndex: 'totalamount',
					// 	width:105,
					// 	align:'right',
					// 	summaryType: 'sum', summaryRenderer: 'renderSum'
					// }
				]
			},{
				text: 'Số lượng thực tế', 
				columns:[
					{
						xtype: 'numbercolumn',
						format:'0,000',
						text: 'Số cây', 
						dataIndex: 'totalpackagecheck',
						width:80,
						align:'right',
						summaryType: 'sum', summaryRenderer: 'renderSumFloat'
					},					
					{
						xtype: 'numbercolumn',
						format:'0,000.00',
						text: 'Số lượng', 
						dataIndex: 'met_check',
						width:100,
						align:'right',
						summaryType: 'sum', summaryRenderer: 'renderSumFloat'
					},
					// {
					// 	xtype: 'numbercolumn',
					// 	format:'0,000',
					// 	text: 'Giá', 
					// 	dataIndex: 'unitprice',
					// 	width:80,
					// 	align:'right',
					// 	summaryType: 'sum', summaryRenderer: 'renderSum'
					// },
					// {
					// 	xtype: 'numbercolumn',
					// 	format:'0,000',
					// 	text: 'Thành tiền', 
					// 	dataIndex: 'totalamountcheck',
					// 	width:105,
					// 	align:'right',
					// 	summaryType: 'sum', summaryRenderer: 'renderSum'
					// }
				]
			},{
				text:'Chênh lệch', 
				columns:[
					{
						xtype: 'numbercolumn',
						format:'0,000',
						text: 'Số cây', 
						dataIndex: 'packagediff',
						width:80,
						align:'right',
						summaryType: 'sum', summaryRenderer: 'renderSumFloat'
					},	
					{
						xtype: 'numbercolumn',
						format:'0,000.00',
						text: 'Số lượng', 
						dataIndex: 'metdiff',
						width:100,
						align:'right',
						summaryType: 'sum', summaryRenderer: 'renderSumFloat'
					},
					// {
					// 	xtype: 'numbercolumn',
					// 	format:'0,000',
					// 	text: 'Giá', 
					// 	dataIndex: 'unitprice',
					// 	width:80,
					// 	align:'right',
					// 	summaryType: 'sum', summaryRenderer: 'renderSum'
					// },
					// {
					// 	xtype: 'numbercolumn',
					// 	format:'0,000',
					// 	text: 'Thành tiền', 
					// 	dataIndex: 'totalamountdiff',
					// 	width:105,
					// 	align:'right',
					// 	summaryType: 'sum', summaryRenderer: 'renderSum'
					// }
				]
			},
			// {
			// 	width: 40,
			// 	hideable: false,
			// 	cell: {
			// 		tools:[{
			// 			iconCls: 'fas fa-align-justify',
			// 			tooltip:GSmartApp.Locales.packinglist[GSmartApp.Locales.currentLocale], 
			// 			handler: 'onPackinglist'
			// 		}]
			// 	}
			// }
		]
	},{
		layout:'hbox',
		margin:5,
		items:[{
			width:100,
			xtype:'button',
			text:  'Quay lại',
			iconCls: 'x-fa fa-backward',
			handler: 'onUrlBack'
		}
	]
	}]
});

