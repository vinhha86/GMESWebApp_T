Ext.define('GSmartApp.view.process_shipping.Balance.Balance_mat_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Balance_mat_ViewController',
    init: function () {
    },
    control: {
        '#btnAddStockoutOrder': {
            click: 'onAddStockoutOrder'
        },
        'Balance_mat_View': {
            beforeselect: 'onBeforeselect'
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
                    fn: function(){                        
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
                            detail : select
                        }
                    }
                }]
            });
            form.show();
        
            form.down('#Stockout_Detail_View').getController().on('Thoat', function () {
                form.close();
            });
        
            form.down('#Stockout_Detail_View').getController().on('Save', function () {
                var store = viewmodel.getStore('Stockout_order_Store');
                store.load();
            });
    }
})