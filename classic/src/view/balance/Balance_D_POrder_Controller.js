Ext.define('GSmartApp.view.process_shipping.Balance.Balance_D_POrder_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Balance_D_POrder_Controller',
    init: function () {
    },
    control: {
        '#btnAddStockoutOrder': {
            click: 'onAddStockoutOrder'
        },
        'Balance_D_POrder': {
            beforeselect: 'onBeforeselect',
            celldblclick: 'onCellDblClick'
        }
    },
    onCellDblClick: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        console.log(record);
        var viewmodel = this.getViewModel();
        if (cellIndex == 9) {//Yeu cau xuat
            var porderid_link = viewmodel.get('porderid_link');

            var form = Ext.create('Ext.window.Window', {
                closable: true,
                resizable: false,
                modal: true,
                border: false,
                title: 'Phiếu yêu cầu xuất cho sản xuất',
                closeAction: 'destroy',
                height: Ext.getBody().getViewSize().height * .8,
                width: Ext.getBody().getViewSize().width * .80,
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    xtype: 'Stockout_order_MainView',
                    viewModel: {
                        type: 'ProcessShippingMainViewModel',
                        data: {
                            isload: true, //them bien de load du lieu len hay khong
                            porderid_link: porderid_link,
                            material_skuid_link: record.get('mat_skuid_link'),
                            pcontractid_link: viewmodel.get('pcontractid_link'),
                        }
                    }
                }]
            });
            form.show();
        } else if (cellIndex == 7) {//Nhu cau
            console.log(record.data.product_d)
            var form = Ext.create('Ext.window.Window', {
                closable: true,
                resizable: false,
                modal: true,
                border: false,
                title: 'Chi tiết nhu cầu',
                closeAction: 'destroy',
                height: 500,
                width: 800,
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    xtype: 'Balance_D_Product_Skus',
                    viewModel: {
                        // type: 'Balance_D_Product_Skus_ViewModel',
                        data: {
                            productlist: record.data.product_d,
                        }
                    }
                }]
            });
            form.show();
        } else if (cellIndex == 8) { // cột Nhập kho
            // bật danh sách phiếu nhập kho có chứa NPL đang chọn
            var form = Ext.create('Ext.window.Window', {
                closable: true,
                resizable: false,
                modal: true,
                border: false,
                title: 'Danh sách phiếu nhập kho',
                closeAction: 'destroy',
                height: '95%',
                width: '95%',
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    xtype: 'Stockin_M_List_Main',
                    viewModel: {
                        type: 'Stockin_M_ViewModel',
                        data: {
                            isCanDoiNplPopup: true,
                            mat_skuid_link: record.get('mat_skuid_link'),
                        }
                    }
                }]
            });
            form.show();
        } else if (cellIndex == 10) { // cột Xuất kho
            // bật danh sách phiếu xuất kho có chứa NPL đanh chọn
            var form = Ext.create('Ext.window.Window', {
                closable: true,
                resizable: false,
                modal: true,
                border: false,
                title: 'Danh sách phiếu xuất kho',
                closeAction: 'destroy',
                height: '95%',
                width: '95%',
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    xtype: 'Stockout_M_List_Main',
                    viewModel: {
                        type: 'Stockout_M_EditModel',
                        data: {
                            isCanDoiNplPopup: true,
                            mat_skuid_link: record.get('mat_skuid_link'),
                        }
                    }
                }]
            });
            form.show();
        }
    },
    onBeforeselect: function (m, record, index, eOpts) {
        var grid = this.getView();
        var select = grid.getSelectionModel().getSelection();

        if (select.length > 0) {
            var data = select[0].data;
            if (data.mat_sku_product_typename != record.get('mat_sku_product_typename')) {
                Ext.MessageBox.show({
                    title: "Thông báo",
                    msg: "Bạn không được chọn các NPL khác chủng loại",
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    },
                    fn: function () {
                        grid.getSelectionModel().deselect(record, true, true);
                    }
                });
            }
        }
    },
    onAddStockoutOrder: function () {
        var viewmodel = this.getViewModel();

        var grid = this.getView();
        var select = grid.getSelectionModel().getSelection();
        if (select.length == 0) return;

        var stockouttypeid_link = select[0].get('mat_sku_product_typename') == "Vải chính" ? 1 : 2;

        var form = Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Phiếu yêu cầu xuất cho sản xuất',
            closeAction: 'destroy',
            height: Ext.getBody().getViewSize().height * .99,
            width: Ext.getBody().getViewSize().width * .90,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Stockout_Detail_View',
                viewModel: {
                    data: {
                        order: {
                            stockouttypeid_link: stockouttypeid_link,
                            id: null,
                            porderid_link: viewmodel.get('porderid_link')
                        },
                        porderid_link: viewmodel.get('porderid_link'),
                        pcontractid_link: viewmodel.get('pcontractid_link'),
                        detail: select
                    }
                }
            }]
        });
        form.show();

        form.down('#Stockout_Detail_View').getController().on('Thoat', function () {
            form.close();
        });
    },
    onFilterValueMaNPLKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('SKUBalanceStore_Mat');
        var filterField = this.lookupReference('ValueFilterFieldMaNPL'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ValueFilterFieldMaNPL = filters.add({
                id: 'ValueFilterFieldMaNPL',
                property: 'mat_sku_code',
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
})