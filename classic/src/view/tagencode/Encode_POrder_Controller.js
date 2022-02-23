Ext.define('GSmartApp.view.tagencode.Encode_POrder_Controller', {
    extend: 'Ext.app.ViewController',
	alias: 'controller.Encode_POrder_Controller',
	init: function(){
		var viewModel = this.getViewModel();
		
    },
    control: {
        '#btnTimKiem': {
            click: 'onTimLenh'
		},
		'#ordercode':{
			specialkey: 'onSpecialkey'
		},
		'#skucode': {
			specialkey: 'onSpecialkey'
		}
    },
    renderSum: function (value) {
		if (null == value) value = 0;
		return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
	},
	onSpecialkey: function (field, e) {
		var me = this;
		if (e.getKey() == e.ENTER) {
			if (field.itemId == 'skucode')
				me.onTimLenh();
			else
				me.onTaiSanPham();
		}
	},
	onTimLenh: function () {
		var me = this;
		var grid = this.getView();
		var ordercode = grid.down('#ordercode').getValue();
		var skucode = grid.down('#skucode').getValue();

		var form = Ext.create('Ext.window.Window', {
			height: 600,
			closable: true,
			resizable: false,
			modal: true,
			border: false,
			title: 'Danh sách lệnh sản xuất',
			closeAction: 'destroy',
			width: 1100,
			bodyStyle: 'background-color: transparent',
			layout: {
				type: 'fit', // fit screen for window
				padding: 5
			},
			items: [{
				xtype: 'Encode_porder_search',
				viewModel: {
					data: {
						ordercode: ordercode,
						skucode: skucode
					}
				}
			}]
		});
		form.show();

		form.down('#Encode_porder_search').getController().on('Chon', function (ordercode, skucode) {
			grid.down('#ordercode').setValue(ordercode);
			grid.down('#skucode').setValue(skucode);
			me.onTaiSanPham();
			form.close();
		})
	},
	onTaiSanPham: function () {
		var me = this;
		var grid = this.getView();
		var viewmodel = this.getViewModel();

		var params = new Object();
		var ordercode = grid.down('#ordercode').getValue();
		var skucode = grid.down('#skucode').getValue();

		if (ordercode == "") {
			Ext.MessageBox.show({
				title: "Thông báo",
				msg: "Bạn chưa nhập mã lệnh sản xuất!",
				buttons: Ext.MessageBox.YES,
				buttonText: {
					yes: 'Đóng',
				}
			});
		}
		else {
			params.ordercode = ordercode;
			params.skucode = skucode;

			GSmartApp.Ajax.post('/api/v1/porder/get_porder_sku_encode', Ext.JSON.encode(params),
				function (success, resp, options) {
					if (success) {
						var resp = Ext.decode(resp.responseText);
						if (resp.respcode == 200) {
							if (resp.data.length > 0) {
								var store = viewmodel.getStore('Porder_SKU_Store');
								store.removeAll();
								store.setData(resp.data);
							}
							else {
								Ext.MessageBox.show({
									title: "Thông báo",
									msg: "Mã lệnh sản xuất không đúng bạn vui lòng tìm kiếm lại!",
									buttons: Ext.MessageBox.YES,
									buttonText: {
										yes: 'Đóng',
									},
									fn: function (btn) {
										if (btn === 'yes') {
											me.onTimLenh();
										}
									}
								});
							}
						}
						else {
							Ext.MessageBox.show({
								title: "Thông báo",
								msg: "Mã lệnh sản xuất không đúng bạn vui lòng tìm kiếm lại!",
								buttons: Ext.MessageBox.YES,
								buttonText: {
									yes: 'Đóng',
								},
								fn: function (btn) {
									if (btn === 'yes') {
										me.onTimLenh();
									}
								}
							});
						}
					}
				})
		}

	},
	onPrint: function (grid, rowIndex) {
		var viewModel = this.getViewModel();
		var rec = grid.getStore().getAt(rowIndex);
		Ext.Msg.show({
			title: 'Thông báo',
			msg: 'Bạn có muốn in mã vạch "' + rec.get('skucode') + '" ?',
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.QUESTION,
			buttonText: {
				yes: 'Có',
				no: 'Không'
			},
			fn: function (btn) {
				if (btn === 'yes') {
					if(viewModel.get('isEdit')){

					}
					else
					{
						viewModel.set('skucode', rec.get('skucode'));
						viewModel.set('color_name', rec.get('color_name'));
						viewModel.set('size_name', rec.get('size_name'));
						viewModel.set('encode.encode_amount', rec.get('pquantity_remain') < 0 ? 0 : rec.get('pquantity_remain'));
						viewModel.set('porderyear', rec.get('porderyear'));
						viewModel.set('encode.porderid_link', rec.get('porderid_link'));
						viewModel.set('encode.skucode', rec.get('skucode'));
						viewModel.set('encode.skuid_link', rec.get('skuid_link'));
					}
				}
			}
		});
	}
});
