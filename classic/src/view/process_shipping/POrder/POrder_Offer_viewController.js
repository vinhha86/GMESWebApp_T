Ext.define('GSmartApp.view.process_shipping.POrder.POrder_Offer_viewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_Offer_viewController',
    init: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('POrder_ListStore');
        store.insert(0, viewmodel.get('store'));
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnChon': {
            click: 'onChon'
        }
    },
    onOrderCodeFilterKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('POrder_ListStore');
        var filterField = this.lookupReference('ordercodeFilterField'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ordercodeFilterField = filters.add({
                id: 'ordercodeFilterField',
                property: 'ordercode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ordercodeFilterField) {
            filters.remove(this.ordercodeFilterField);
            this.ordercodeFilterField = null;
        }
    },
    renderSum: function (value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
    onThoat: function () {
        this.fireEvent('Thoat');
    },
    onChon: function () {
        var viewmodel = this.getViewModel();
        var m = this;
        var grid = this.getView();
        var select = grid.getSelectionModel().getSelection();

        if (select.length == 0) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn chưa chọn Lệnh sản xuất',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
        }
        else {
            grid.setLoading('Đang xử lý');
            var params = new Object();
            params.pcontract_poid_link = viewmodel.get('pcontract_poid_link');
            params.pordergrantid_link = select[0].get('id');
            params.productid_link = viewmodel.get('productid_link');

            GSmartApp.Ajax.post('/api/v1/porderpoline/add_pordergrant', Ext.JSON.encode(params),
                function (success, response, options) {
                    grid.setLoading(false);
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            m.fireEvent('UpdatePorder', response.porderinfo, response.amount, response.endDate, select[0].get('id'), response.duration);
                            grid.fireEvent('Chon');

                        }
                        else {
                            Ext.Msg.show({
                                title: 'Thông báo',
                                msg: 'Có lỗi trong quá trình xử lý dữ liệu!',
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng'
                                }
                            });
                        }
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Có lỗi trong quá trình xử lý dữ liệu!',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                    }
                })


        }
    }
})