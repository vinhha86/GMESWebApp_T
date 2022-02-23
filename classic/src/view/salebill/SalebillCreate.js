Ext.define('GSmartApp.view.salebill.SalebillCreate', {
	extend: 'Ext.form.Panel',
	xtype: 'SalebillCreate',
	controller: 'SalebillCreateController',
	viewModel: {
		type: 'SalebillCreateViewModel'
	},
	layout: {
		type: 'vbox',
		pack: 'start',
		align: 'stretch'
	},
	items: [{
		layout: {
			type: 'hbox',
			pack: 'start',
			align: 'stretch'
		},
		flex: 1,
		items: [{
			width: 300,
			margin: 5,
			border: false,
			layout: {
				type: 'vbox',
				pack: 'start',
				align: 'stretch'
			},
			xtype: 'form',
			reference: 'formMaster',
			items: [{
				margin: '5 5 0 0',
				// labelWidth:'130',
				xtype: 'combobox',
				fieldLabel: GSmartApp.Locales.thietbilamviec[GSmartApp.Locales.currentLocale],
				store: 'DevicePayStore',
				displayField: 'name',
				valueField: 'id',
				name: 'deviceid',
				reference: 'device',
				listeners: {
					change: 'onDeviceChange'
				}
			}, {
				margin: '5 5 0 0',
				// labelWidth:'130',
				xtype: 'combo',
				readOnly: true,
				fieldLabel: GSmartApp.Locales.cuahang[GSmartApp.Locales.currentLocale]
			}, {
				margin: '5 5 0 0',
				// labelWidth:'130',
				xtype: 'textfield',
				name: 'billcode',
				readOnly: true,
				fieldLabel: GSmartApp.Locales.sohoadon[GSmartApp.Locales.currentLocale]
			}, {
				margin: '5 5 0 0',
				// labelWidth:'130',
				xtype: 'datefield',
				dateFormat: GSmartApp.util.State.get('dataFormat'),
				name: 'billdate',
				readOnly: true,
				fieldLabel: GSmartApp.Locales.ngayhoadon[GSmartApp.Locales.currentLocale],
			}, {
				html: '<hr>'
			}, {
				xtype: 'hiddenfield',
				name: 'customerid_link'
			}, {
				layout: 'hbox',
				margin: '0 5 5 0',

				items: [{
					flex: 1,
					// labelWidth:'130',
					xtype: 'textfield',
					name: 'customercode',
					reference: 'customercode',
					fieldLabel: GSmartApp.Locales.mathe_kh[GSmartApp.Locales.currentLocale],
					listeners: {
						keypress: 'onCustomerEnter'
					}
				}, {
					margin: '0 0 0 5',
					xtype: 'button',
					iconCls: 'x-fa fa-address-card',
					handler: 'onCustomer'
				}]
			}, {
				margin: '5 5 0 0',
				// labelWidth:'130',
				xtype: 'textfield',
				name: 'customername',
				readOnly: true,
				fieldLabel: GSmartApp.Locales.ten_kh[GSmartApp.Locales.currentLocale]
			}, {
				margin: '5 5 0 0',
				// labelWidth:'130',
				xtype: 'datefield',
				dateFormat: GSmartApp.util.State.get('dataFormat'),
				name: 'customerbirday',
				readOnly: true,
				fieldLabel: GSmartApp.Locales.ngaysinh[GSmartApp.Locales.currentLocale]
			}, {
				margin: '5 5 0 0',
				// labelWidth:'130',
				xtype: 'textfield',
				name: 'customermobile',
				readOnly: true,
				fieldLabel: GSmartApp.Locales.sodienthoai[GSmartApp.Locales.currentLocale]
			}, {
				html: '<hr>'
			}, {
				margin: '0 5 0 0',
				// labelWidth:'130',
				xtype: 'textfield',
				bind: {
					value: '{bill.salename}'
				},
				readOnly: true,
				fieldLabel: GSmartApp.Locales.nhanvien_banhang[GSmartApp.Locales.currentLocale]
			}, {
				margin: '5 5 0 0',
				// labelWidth:'130',
				xtype: 'textareafield',
				name: 'extrainfo',
				fieldLabel: GSmartApp.Locales.ghichu[GSmartApp.Locales.currentLocale]
			}, {
				flex: 1,
			}, {
				width: 80,
				margin: '0 200 5 5',
				xtype: 'button',
				text: GSmartApp.Locales.btn_quaylai[GSmartApp.Locales.currentLocale],
				handler: 'onBlack',
				iconCls: 'x-fa fa-backward',
			}]
		}, {
			flex: 1,
			bodyStyle: 'background:#404040; padding-left:1px;',
			margin: '5',
			layout: {
				type: 'vbox',
				pack: 'start',
				align: 'stretch'
			},
			xtype: 'form',
			items: [{
				layout: 'hbox',
				items: [{
					width: 100,
					margin: '0 5 5 5',
					text: "Start",
					iconCls: 'x-fa fa-play',
					xtype: 'button',
					handler: 'onStart',
					bind: {
						disabled: '{isStart}',
						userCls: '{clsbtnStart}'
					}
				}, {
					width: 100,
					margin: '0 5 5 5',
					text: "Stop",
					iconCls: 'x-fa fa-stop',
					xtype: 'button',
					handler: 'onStop',
					userCls: 'red-button'
					/* bind:{
						disabled:'{!isStart}',
						userCls:'{clsbtnStop}'
					}*/
				}, {
					margin: '0 5 5 5',
					xtype: 'textfield',
					reference: 'txtSkucode',
					placeholder: GSmartApp.Locales.mahang[GSmartApp.Locales.currentLocale],
					listeners: {
						keypress: 'onAddSkuEnter'
					}
				}, {
					margin: '0 5 5 5',
					xtype: 'button',
					iconCls: 'x-fa fa-plus',
					text: GSmartApp.Locales.btn_themsanpham[GSmartApp.Locales.currentLocale],
					handler: 'onAddSku'
				}, {
					flex: 1
				}, {
					margin: '0 0 5 5',
					text: "Sản phẩm theo SKU",
					iconCls: 'x-fa fa-shopping-basket',
					xtype: 'button',
					handler: 'onIsTabEpc',
					bind: {
						disabled: '{isTabEpc}',
					}
				}, {
					margin: '0 5 5 5',
					text: "Sản phẩm theo EPC",
					iconCls: 'x-fa fa-microchip',
					xtype: 'button',
					handler: 'onIsTabEpc',
					bind: {
						disabled: '{!isTabEpc}',
					}
				}]
			}, {
				flex: 1,
				xtype: 'grid',
				reference: 'gridSalebill',
				columnLines: true,
				rowLines: true,
				bind: {
					store: '{SalebillDetailStore}',
					hidden: '{!isTabEpc}'
				},
				columns: [{
					text: GSmartApp.Locales.mahang[GSmartApp.Locales.currentLocale],
					dataIndex: 'skucode',
					width: 120,
					summaryRenderer: function (grid, context) {
						return 'Tổng cộng';
					}
				}, {
					text: GSmartApp.Locales.tenhang[GSmartApp.Locales.currentLocale],
					dataIndex: 'skuname',
					flex: 1
				}, {
					text: GSmartApp.Locales.donvitinh[GSmartApp.Locales.currentLocale],
					dataIndex: 'unitname',
					align: 'center',
					width: 80
				}, {
					text: GSmartApp.Locales.soluong[GSmartApp.Locales.currentLocale],
					dataIndex: 'totalpackage',
					xtype: 'numbercolumn',
					format: '0,000',
					width: 90,
					align: 'right',
					summary: 'sum'
				}, {
					xtype: 'numbercolumn',
					format: '0,000',
					text: GSmartApp.Locales.dongia[GSmartApp.Locales.currentLocale],
					dataIndex: 'unitprice',
					width: 100,
					align: 'right'
				}, {
					xtype: 'numbercolumn',
					format: '0,0.00',
					text: GSmartApp.Locales.vat[GSmartApp.Locales.currentLocale] + '(%)',
					dataIndex: 'vatpercent',
					width: 100,
					align: 'right',
					summary: 'sum'
				}, {
					xtype: 'numbercolumn',
					format: '0,0.00',
					text: GSmartApp.Locales.chietkhau[GSmartApp.Locales.currentLocale] + '(%)',
					dataIndex: 'discountpercent',
					width: 100,
					align: 'right',
					summary: 'sum'
				}, {
					xtype: 'numbercolumn',
					format: '0,0.00',
					text: GSmartApp.Locales.thanhtien[GSmartApp.Locales.currentLocale],
					dataIndex: 'totalsum',
					width: 120,
					align: 'right',
					summary: 'sum'
				}]
			}, {
				flex: 1,
				xtype: 'grid',
				reference: 'gridSalebillEpc',
				columnLines: true,
				rowLines: true,
				bind: {
					hidden: '{isTabEpc}',
					store: '{SalebillDetailEpcStore}'
				},
				features: [{
					ftype: 'groupingsummary',
					groupHeaderTpl: '{name}',
					hideGroupedHeader: true,
					enableGroupingMenu: false
				}],
				columns: [{
					text: GSmartApp.Locales.mahang[GSmartApp.Locales.currentLocale],
					dataIndex: 'skucode',
					width: 120,
					summaryRenderer: function (grid, context) {
						return 'Tổng cộng';
					}
				}, {
					text: GSmartApp.Locales.tenhang[GSmartApp.Locales.currentLocale],
					dataIndex: 'skuname',
					flex: 1
				}, {
					text: GSmartApp.Locales.epc[GSmartApp.Locales.currentLocale],
					dataIndex: 'epc',
					width: 150
				}, {
					text: GSmartApp.Locales.donvitinh[GSmartApp.Locales.currentLocale],
					dataIndex: 'unitname',
					align: 'center',
					width: 80
				}, {
					xtype: 'numbercolumn',
					format: '0,000',
					text: GSmartApp.Locales.dongia[GSmartApp.Locales.currentLocale],
					dataIndex: 'unitprice',
					width: 100,
					align: 'right'
				}, {
					xtype: 'numbercolumn',
					format: '0,0.00',
					text: GSmartApp.Locales.vat[GSmartApp.Locales.currentLocale] + '(%)',
					dataIndex: 'vatpercent',
					width: 100,
					align: 'right',
					summary: 'sum'
				}, {
					xtype: 'numbercolumn',
					format: '0,0.00',
					text: GSmartApp.Locales.chietkhau[GSmartApp.Locales.currentLocale] + '(%)',
					dataIndex: 'discountpercent',
					width: 100,
					align: 'right',
					summary: 'sum'
				}, {
					xtype: 'numbercolumn',
					format: '0,0.00',
					text: GSmartApp.Locales.thanhtien[GSmartApp.Locales.currentLocale],
					dataIndex: 'totalsum',
					width: 120,
					align: 'right',
					summary: 'sum'
				}, {
					width: 40,
					hideable: false,
					cell: {
						tools: [{
							iconCls: 'fas fa-trash',
							tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
							handler: 'onDelete'
						}]
					}
				}]
			}, {
				//height:150,
				layout: {
					type: 'hbox',
					pack: 'start',
					align: 'stretch'
				},
				xtype: 'form',
				reference: 'formTotal',
				items: [{
					flex: 1
				}, {
					layout: 'vbox',
					items: [{
						xtype: 'hiddenfield',
						name: 'discount'
					}, {
						width: 400,
						labelWidth: 200,
						margin: '2 5 0 0',
						xtype: 'textfield',
						name: 'totalamount',
						textAlign: 'right',
						readOnly: true,
						fieldLabel: GSmartApp.Locales.congtienhang[GSmartApp.Locales.currentLocale]
					}, {
						width: 400,
						labelWidth: 200,
						margin: '2 5 0 0',
						xtype: 'textfield',
						name: 'totalvat',
						textAlign: 'right',
						readOnly: true,
						fieldLabel: GSmartApp.Locales.tienthue_gtgt[GSmartApp.Locales.currentLocale]
					}, {
						width: 400,
						labelWidth: 200,
						margin: '2 5 0 0',
						xtype: 'textfield',
						name: 'totalsum',
						textAlign: 'right',
						readOnly: true,
						fieldLabel: GSmartApp.Locales.tongcong_tienthanhtoan[GSmartApp.Locales.currentLocale]
					}]
				}]
			}, {
				layout: 'hbox',
				items: [{
					flex: 1
				}, {
					margin: '5 5 5 0',
					xtype: 'button',
					iconCls: 'x-fa fa-save',
					text: GSmartApp.Locales.btn_thanhtoansau[GSmartApp.Locales.currentLocale],
					handler: 'onSave'
				}, {
					margin: '5 5 5 10',
					xtype: 'button',
					iconCls: 'x-fa fa-money',
					text: GSmartApp.Locales.btn_thanhtoan[GSmartApp.Locales.currentLocale],
					handler: 'onPay'
				}]
			}]
		}]
	}]
});

