Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.Stockin_M_Edit_Product_Controller', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Stockin_M_Edit_Product_Controller',
	control: {
		'#btnTimSP': {
            click: 'onBtnTimSP'
        },
	},	
	onBtnTimSP: function () {
		var m = this;
		var me = this.getView();
        var viewmodel = this.getViewModel();
		var stockin = viewmodel.get('stockin');
		var pcontractid_link = viewmodel.get('pcontractid_link');
		var ProductCodeFilterValue = me.down('#productcode').getValue();
		// console.log(pcontractid_link);
		// console.log(ProductCodeFilterValue);
		if(ProductCodeFilterValue != null){
			ProductCodeFilterValue = ProductCodeFilterValue.trim();
		}

		if(pcontractid_link == null && stockin.pcontractid_link == null){
			if(ProductCodeFilterValue == null){
				Ext.Msg.show({
					title: 'Thông báo',
					msg: 'Mã sản phẩm không được bỏ trống',
					buttons: Ext.Msg.YES,
					// icon: Ext.Msg.QUESTION,
					buttonText: {
						yes: 'Thoát',
					},
				});
				me.down('#productcode').focus();
				return;
			}else if(ProductCodeFilterValue.trim() == ''){
				Ext.Msg.show({
					title: 'Thông báo',
					msg: 'Mã sản phẩm không được bỏ trống',
					buttons: Ext.Msg.YES,
					// icon: Ext.Msg.QUESTION,
					buttonText: {
						yes: 'Thoát',
					},
				});
				me.down('#productcode').focus();
				return;
			}
		}

		var form = Ext.create('Ext.window.Window', {
			closable: true,
			resizable: false,
			modal: true,
			border: false,
			title: 'Chọn sản phẩm đơn hàng',
			closeAction: 'destroy',
			height: Ext.getBody().getViewSize().height * .95,
			width: 800,
			bodyStyle: 'background-color: transparent',
			layout: {
				type: 'fit', // fit screen for window
				padding: 5
			},
			items: [{
				xtype: 'PContract_Product_Select',
				viewModel: {
					// type: 'PContract_Product_Select_ViewModel',
					data: {
						stockin: stockin,
						pcontractid_link: pcontractid_link,
						ProductCodeFilterValue: ProductCodeFilterValue,
					}
				}
			}]
		});  
		
		form.show();

		form.down('#PContract_Product_Select').getController().on('onSelect_Products', function (records) {
            console.log(records);
			var stockin_product = viewmodel.get('stockin.stockin_product');
            if(stockin_product == null){
                stockin_product = new Array();
				viewmodel.set('stockin.stockin_product', []);
            }	
			for(var i = 0; i < records.length; i++){
                var theProduct = records[i];
                var found = stockin_product.some(item => item.productid_link === theProduct.get('productid_link'));
                if(!found){
                    var stockin_productObj = new Object();
					stockin_productObj.id =  null;
                    stockin_productObj.productid_link = theProduct.get('productid_link');
					stockin_productObj.product_code = theProduct.get('productBuyerCode');
					stockin_productObj.product_name = theProduct.get('productName');
					stockin_productObj.product_desc = theProduct.get('productinfo');

					stockin_product.push(stockin_productObj);
                }
            }
			var StockinProduct_Store = viewmodel.getStore('StockinProduct_Store');
            StockinProduct_Store.removeAll();
			StockinProduct_Store.setData(stockin_product);
			viewmodel.set('stockin.stockin_product', stockin_product);
            form.close();					
        })
    },
	onXoa: function(grid, rowIndex, colIndex, item, e, record){
		var me = this.getView();
        var viewmodel = this.getViewModel();

		var rec = grid.getStore().getAt(rowIndex);
        var name = rec.get('product_code');
		var productid_link = rec.get('productid_link');

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa "' + name + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    grid.getStore().remove(rec);
					var stockin_product = viewmodel.get('stockin.stockin_product');
					for(var i=0; i<stockin_product.length; i++){
						if(stockin_product[i].productid_link == productid_link){
							stockin_product.splice(i,1);
							break;
						}
					}
					
					var StockinProduct_Store = viewmodel.getStore('StockinProduct_Store');
					StockinProduct_Store.removeAll();
					StockinProduct_Store.insert(0, stockin_product);
					viewmodel.set('stockin.stockin_product', stockin_product);
                }

            }
        });
	},
	onFilterValueMaSPKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('StockinProduct_Store');
        var filterField = this.lookupReference('ValueFilterFieldMaSP'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ValueFilterFieldMaSP = filters.add({
                id: 'ValueFilterFieldMaSP',
                property: 'product_code',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ValueFilterFieldMaSP) {
            filters.remove(this.ValueFilterFieldMaSP);
            this.ValueFilterFieldMaSP = null;
        }
    },
})