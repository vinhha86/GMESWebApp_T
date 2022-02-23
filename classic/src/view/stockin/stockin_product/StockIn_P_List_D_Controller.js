Ext.define('GSmartApp.view.stockin.StockIn_P_List_D_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockIn_P_List_D_Controller',
    init: function () {
        var m = this;
        var me = this.getView();
        var viewmodel = this.getViewModel();
    },
	listen: {
        controller: {
            // '#statusComboValueTrigger': {
            //     click: 'onStatusComboValueTriggerClick'
            // }
        }
    },    
    control: {
        // '#btnThemMoi': {
        //     click: 'onThemMoi'
        // },
    },
    
    // stockind
    onFilterValueMaNPLKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('StockinD_Store');
        var filterField = this.lookupReference('ValueFilterFieldMaNPL'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ValueFilterFieldMaNPL = filters.add({
                id: 'ValueFilterFieldMaNPL',
                property: 'skuCode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ValueFilterFieldMaNPL) {
            filters.remove(this.ValueFilterFieldMaNPL);
            this.ValueFilterFieldMaNPL = null;
        }
    },
    onFilterValueTenNPLKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('StockinD_Store');
        var filterField = this.lookupReference('ValueFilterFieldTenNPL'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ValueFilterFieldTenNPL = filters.add({
                id: 'ValueFilterFieldTenNPL',
                property: 'skuname',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ValueFilterFieldTenNPL) {
            filters.remove(this.ValueFilterFieldTenNPL);
            this.ValueFilterFieldTenNPL = null;
        }
    },
    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    },
    renderUnit: function(val, meta, record, rindex, cindex, store) {
        if (null != val){
            var viewModel = this.getViewModel();
            var UnitStore = viewModel.getStore('UnitStore');
            if (null!=UnitStore){
                var objUnit = UnitStore.data.find('id', val);
                // console.log(objUnit.data);
                return objUnit.data.code;
            }
        }
    },

    onMenu_Stockin_M_List_D_List: function (grid, rowIndex, colIndex, item, e, record) {
		var me = this;
		var menu_grid = new Ext.menu.Menu({
			xtype: 'menu',
			anchor: true,
			//padding: 10,
			minWidth: 150,
			viewModel: {},
			items: [
				{
					text: 'Chi tiết cây vải',
					itemId: 'btnMenu_Stockin_M_List_D_List_Pkl',
					separator: true,
					margin: '10 0 0',
					// iconCls: 'x-fa fas fa-edit brownIcon',
					iconCls: 'x-fa fas fa-edit',
					handler: function () {
						// console.log(record);
						me.onViewPackingList(grid, rowIndex);
					},
				},
				{
					text: 'Phiếu đo khổ vải',
					itemId: 'btnMenu_Stockin_M_List_D_PhieuKhoVai',
					separator: true,
					margin: '10 0 0',
					// iconCls: 'x-fa fas fa-trash redIcon',
					iconCls: 'x-fa fas fa-print',
					handler: function () {
						// console.log(record);
						me.onViewPhieuKhoVai(grid, rowIndex);
					}
				},
			]
		});
		// HERE IS THE MAIN CHANGE
		var position = [e.getX() - 10, e.getY() - 10];
		e.stopEvent();
		menu_grid.record = record;
		menu_grid.showAt(position);
	},
    onViewPackingList: function (grid, rowIndex, colIndex) {
		var viewmodel = this.getViewModel();
		var stockin = viewmodel.get('stockin');
		var data = grid.getStore().getAt(rowIndex);
		var stockindid_link = data.get('id');

		// console.log(stockin);
		// console.log(data);
		// console.log(stockindid_link);

		// if(isNaN(invoicedid_link)){
		if (false) {
			// not existed in db
			Ext.Msg.show({
				title: 'Thông báo',
				msg: 'Cần lưu invoice trước khi thêm packing list cho ' + data.get('skucode'),
				buttons: Ext.MessageBox.YES,
				buttonText: {
					yes: 'Đóng',
				}
			});
			return;
		} else {
			var form = Ext.create('Ext.window.Window', {
				height: '90%',
				width: '90%',
				closable: true,
				resizable: false,
				modal: true,
				border: false,
				title: 'Chi tiết Packing List - SKU : ' + data.get('skuCode'),
				closeAction: 'destroy',
				bodyStyle: 'background-color: transparent',
				layout: {
					type: 'fit', // fit screen for window
					padding: 5
				},
				items: [{
					xtype: 'Stockin_packinglist'
				}],
				viewModel: {
					type: 'Stockin_packinglist_ViewModel',
					data: {
						packinglist: {
							stockindid_link: stockindid_link,
							stockinid_link: viewmodel.get('stockin.id'),
							skuid_link: data.get('skuid_link')
						},
						stockin: stockin,
						stockinDRec: data
					}
				}
			});
			form.show();

			form.down('#Stockin_packinglist').getController().on('reloadStockinD_Store', function () {
				// console.log('reloadStockinD_Store event outside view single outside');
				var StockinD_Store = viewmodel.get('StockinD_Store');
				StockinD_Store.load();
			});
		}
	},
    onViewPhieuKhoVai: function (grid, rowIndex) {
		var viewmodel = this.getViewModel();
		var stockin = viewmodel.get('stockin'); // console.log(stockin);
		var data = grid.getStore().getAt(rowIndex); // console.log(data);
		var form = Ext.create('Ext.window.Window', {
			height: '90%',
			closable: true,
			resizable: false,
			modal: true,
			border: false,
			title: 'Phiếu đo khổ vải : ' + data.get('skuCode'),
			closeAction: 'destroy',
			width: 1200,
			bodyStyle: 'background-color: transparent',
			layout: {
				type: 'fit', // fit screen for window
				padding: 5
			},
			items: [{
				xtype: 'Stockin_M_Edit_D_PhieuKhoVai'
			}],
			viewModel: {
				type: 'Stockin_M_Edit_D_PhieuKhoVaiViewModel',
				data: {
					stockin: stockin,
					stockin_d: data
				}
			}
		});
		form.show();
	},
})