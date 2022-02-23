Ext.define('GSmartApp.view.process_shipping.POLine.POLineViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POLineViewController',
    init: function () {

    },
    control: {
        '#cmbProduct': {
            select: 'onSelectProduct'
        },
        '#checkSPBo': {
            change: 'onCheckChange'
        },
        '#cmbMauSP': {
            select: 'onSelectMauSP'
        },
        '#cmbDaiCoSP': {
            select: 'onSelectMauSP'
        },
        '#btnMap': {
            click: 'onMap'
        },
        '#btnHuyMap': {
            click: 'onHuyMap'
        }
    },
    listen: {
        controller: {
            'Schedule_plan_ViewController': {
                'CancelDone': 'onReload'
            }
        }
    },
    onReload: function () {
        var viewmodel = this.getViewModel();
        var productid_link = viewmodel.get('productid_link');
        var POStore = viewmodel.getStore('POLineStore');
        var colorid_link = viewmodel.get('colorid_link');
        var sizesetid_link = viewmodel.get('sizesetid_link');

        POStore.getby_shipping(productid_link, colorid_link, sizesetid_link);
    },
    onHuyMap: function () {
        var grid = this.getView();
        var me = this;

        var select = grid.getSelectionModel().getSelection();
        if (select.length == 0) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: 'Bạn chưa chọn line',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else {
            for (var i = 0; i < select.length; i++) {
                var check = false;
                if (!select[i].get('ismap')) {
                    check = true;
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: 'Không được Hủy map line chưa được maps vào biểu đồ',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    break;
                }
            }
            if (!check) {
                Ext.Msg.show({
                    title: "Thông báo",
                    msg: 'Bạn có chắc chắn muốn hủy Map Line ?',
                    buttons: Ext.MessageBox.YESNO,
                    buttonText: {
                        yes: 'Có',
                        no: 'Không'
                    },
                    fn: function (btn) {
                        if (btn === 'yes') {
                            me.CancelMap(select);
                        }
                    }
                });
            }
        }
    },
    onMap: function () {
        var grid = this.getView();
        var me = this;

        var select = grid.getSelectionModel().getSelection();
        if (select.length == 0) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: 'Bạn chưa chọn line',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else {
            for (var i = 0; i < select.length; i++) {
                var check = false;
                if (select[i].get('ismap')) {
                    check = true;
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: 'Không được Map line đã được maps vào biểu đồ',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    break;
                }
            }
            if (!check) {
                var productcode = select[0].get('productbuyercode');
                me.ShowCreateManyPorder(productcode, select);
            }

        }
    },
    onClearFilterDaiCo: function () {
        var viewmodel = this.getViewModel();
        viewmodel.set('sizesetid_link', null);
        var productid_link = viewmodel.get('productid_link');
        var POStore = viewmodel.getStore('POLineStore');
        var colorid_link = viewmodel.get('colorid_link');
        var sizesetid_link = viewmodel.get('sizesetid_link');

        POStore.getby_shipping(productid_link, colorid_link, sizesetid_link);
    },
    onClearFilter: function () {
        var viewmodel = this.getViewModel();
        viewmodel.set('colorid_link', null);
        var productid_link = viewmodel.get('productid_link');
        var POStore = viewmodel.getStore('POLineStore');
        var colorid_link = viewmodel.get('colorid_link');
        var sizesetid_link = viewmodel.get('sizesetid_link');

        POStore.getby_shipping(productid_link, colorid_link, sizesetid_link);
    },
    onSelectMauSP: function () {
        var viewmodel = this.getViewModel();
        var productid_link = viewmodel.get('productid_link');
        var POStore = viewmodel.getStore('POLineStore');
        var colorid_link = viewmodel.get('colorid_link');
        var sizesetid_link = viewmodel.get('sizesetid_link');

        POStore.getby_shipping(productid_link, colorid_link, sizesetid_link);
    },
    onCheckChange: function () {
        var viewmodel = this.getViewModel();
        var productStore = viewmodel.getStore('ProductStore');
        var is_pair = viewmodel.get('is_pair');
        productStore.loadProductSingle("", is_pair);
    },
    onSelectProduct: function (cmb, rec, e) {
        var productid_link = rec.get('id');
        var attributeid_link = 4;

        var viewmodel = this.getViewModel();
        viewmodel.set('productid_link', productid_link);
        var storeMauSP = viewmodel.getStore('MauSanPhamStore');
        storeMauSP.loadByProductAndAttribute(productid_link, attributeid_link);

        var DaiCoStore = viewmodel.getStore('DaiCoSanPhamStore');
        DaiCoStore.loadbyProduct(productid_link);

        var POStore = viewmodel.getStore('POLineStore');
        var colorid_link = viewmodel.get('colorid_link');
        var sizesetid_link = viewmodel.get('sizesetid_link');

        POStore.getby_shipping(productid_link, colorid_link, sizesetid_link);
    },
    onMenuShow: function (grid, rowIndex, colIndex, item, e, record) {
        var me = this;
        var hiddenMap = record.get('ismap') == null ? false : record.get('ismap');

        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            //padding: 10,
            minWidth: 150,
            viewModel: {},
            items: [
                {
                    text: 'Map lệnh sản xuất',
                    itemId: 'btnmapLSX',
                    separator: true,
                    hidden: hiddenMap,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-link brownIcon',
                    handler: function () {
                        me.onMapPorder(record);
                    },
                },
                {
                    text: 'Hủy Map lệnh sản xuất',
                    itemId: 'btnCancelmapLSX',
                    separator: true,
                    hidden: !hiddenMap,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-undo brownIcon',
                    handler: function () {
                        Ext.Msg.confirm('Thông báo', 'Bạn có thực sự muốn hủy map với lệnh sản xuất',
                            function (choice) {
                                if (choice === 'yes') {
                                    me.CancelMap(record);
                                }
                            });
                    }
                }, {
                    text: 'Yêu cầu xuất kho thành phẩm',
                    itemId: 'btnYCXKThanhPham',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-plus brownIcon',
                    handler: function () {
                        me.onCreateStockoutP(record);
                    },
                }
            ]
        });
        // HERE IS THE MAIN CHANGE
        var position = [e.getX() - 10, e.getY() - 10];
        e.stopEvent();
        menu_grid.record = record;
        menu_grid.showAt(position);
        common.Check_Menu_Permission(menu_grid);
    },
    CancelMap: function (rec) {
        var grid = this.getView();
        var me = this;
        grid.setLoading('Đang xử lý');
        var params = new Object();
        var list = [];
        for (var i = 0; i < rec.length; i++) {
            list.push(rec[i].data);
        }
        params.data = list;

        GSmartApp.Ajax.post('/api/v1/porderpoline/delete_many_porder', Ext.JSON.encode(params),
            function (success, response, options) {
                grid.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Thành công!',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                        me.fireEvent('DeleteGrant', response.list_grantid_link);


                        var store = grid.getStore();
                        store.load();
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
    },
    onShowPorderList: function (store, pcontract_poid_link, rec, productid_link) {
        var viewmodel = this.getViewModel();
        var me = this;
        var form = Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Danh sách Kế hoạch trên biểu đồ',
            closeAction: 'destroy',
            height: 600,
            width: 900,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'POrder_Offer_view',
                viewModel: {
                    data: {
                        store: store,
                        pcontract_poid_link: pcontract_poid_link,
                        shipdate: rec.get('shipdate'),
                        productid_link: productid_link
                    }
                }
            }]
        });
        form.show();

        form.down('#POrder_Offer_view').getController().on('Thoat', function () {
            form.close();
        });

        form.down('#POrder_Offer_view').on('Chon', function () {
            var store = viewmodel.getStore('POLineStore');
            store.load();
            form.close();
        });
    },
    onMapPorder: function (rec) {
        var grid = this.getView();
        var me = this;
        grid.setLoading('Đang tải dữ liệu');
        var params = new Object();
        params.pcontract_poid_link = rec.get('pcontract_poid_link');
        GSmartApp.Ajax.post('/api/v1/porder_grant/getby_poconfirm', Ext.JSON.encode(params),
            function (success, response, options) {
                grid.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        if (response.data.length > 0) {
                            me.onShowPorderList(response.data, rec.get('pcontract_poid_link'), rec, rec.get('productid_link'));
                        }
                        else {
                            Ext.Msg.show({
                                title: 'Thông báo',
                                msg: 'Tất cả kế hoạch hiện có trên biểu đồ đã được maps! Bạn có muốn thêm kế hoạch trên biểu đồ cho line giao hàng đang chọn?',
                                buttons: Ext.Msg.YESNO,
                                icon: Ext.Msg.QUESTION,
                                buttonText: {
                                    yes: 'Có',
                                    no: 'Không'
                                },
                                fn: function (btn) {
                                    if (btn === 'yes') {
                                        me.ShowCreatePorder(rec);
                                    }
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
    },
    ShowCreatePorder: function (rec) {
        var viewmodel = this.getViewModel();
        var me = this;
        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Tạo lệnh sản xuất',
            closeAction: 'destroy',
            height: 300,
            width: 600,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'CreatePorderView',
                viewModel: {
                    data: {
                        enddate: rec.get('shipdate'),
                        productname: rec.get('productbuyercode'),
                        quantity: rec.get('po_quantity'),
                        pcontract_poid_link: rec.get('pcontract_poid_link'),
                        productid_link: rec.get('productid_link')
                    }
                }
            }]
        });
        form.show();

        form.down('#CreatePorderView').on('Create', function (data, orgid_link, orggrantid_link) {
            if (data != null)
                me.fireEvent('AddPlan', data, orgid_link, orggrantid_link);
            var store = viewmodel.getStore('POLineStore');
            store.load();
            form.close();
        })
    },
    onHiddenList: function () {
        var filter = Ext.getCmp('FilterBar').getController();
        filter.onGrantToOrgTap();
    },
    onSearchTap: function () {
        var grid = this.getView();
        grid.getStore().load();
    },
    ShowCreateManyPorder: function (productcode, select) {
        var me = this;
        var viewmodel = this.getViewModel();
        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Tạo lệnh sản xuất',
            closeAction: 'destroy',
            height: 200,
            width: 600,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'CreateManyPorderView',
                viewModel: {
                    data: {
                        productname: productcode,
                        list_po: select,
                        colorid_link: viewmodel.get('colorid_link'),
                        sizesetid_link: viewmodel.get('sizesetid_link')
                    }
                }
            }]
        });
        form.show();

        form.down('#CreateManyPorderView').on('Create', function (data, orgid_link, orggrantid_link, remove) {
            if (data != null)
                me.fireEvent('AddManyPlan', data, orgid_link, orggrantid_link, remove);
            var store = viewmodel.getStore('POLineStore');
            store.load();
            form.close();
        })
    },
    onCreateStockoutP: function (rec) {
        // var viewmodel = this.getViewModel();
        // var grid = this.getView();
        // var me = this;

        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Phiếu xuất kho',
            closeAction: 'destroy',
            height: Ext.getBody().getViewSize().height * .99,
            width: Ext.getBody().getViewSize().width * .95,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'stockout_p_edit',
                viewModel: {
                    type: 'Stockout_P_EditModel',
                    data: {
                        isWindow: true,
                        stockouttypeid_link: 21,
                        po: rec,
                    }
                }
            }]
        });
        form.show();

        form.down('#stockout_p_edit').getController().on('Thoat', function () {
            form.close();
        });
        form.down('#stockout_p_edit').getController().on('Luu', function () {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: 'Lập phiếu thành công',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            // form.close();
        });
    },
    // onReload: function () {
    //     var viewmodel = this.getViewModel();
    //     var ismap = viewmodel.get('ismap');
    //     var store = viewmodel.getStore('POLineStore');
    //     store.setGroupField('productbuyercode_parent');
    //     store.getby_shipping(viewmodel.get('shipdate_from'), viewmodel.get('shipdate_to'), ismap);
    // },
    onFilterMaSPKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('POLineStore');
        var filterField = this.lookupReference('filterMaSP'),
            filters = store.getFilters();

        if (filterField.value) {
            this.filterMaSP = filters.add({
                id: 'filterMaSP',
                property: 'productbuyercode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.filterMaSP) {
            filters.remove(this.filterMaSP);
            this.filterMaSP = null;
        }
    },
    onFilterPOKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('POLineStore');
        var filterField = this.lookupReference('filterPO'),
            filters = store.getFilters();

        if (filterField.value) {
            this.filterPO = filters.add({
                id: 'filterPO',
                property: 'po_buyer',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.filterPO) {
            filters.remove(this.filterPO);
            this.filterPO = null;
        }
    },
    onPOLineViewCellDblClick: function (view, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        // console.log(record);
        var viewmodel = this.getViewModel();
        var clickedDataIndex = view.panel.headerCt.getHeaderAtIndex(cellIndex).dataIndex;
        var clickedColumnName = view.panel.headerCt.getHeaderAtIndex(cellIndex).text;
        var clickedCellValue = record.get(clickedDataIndex);
        if (
            clickedDataIndex == 'amountinputsum' ||
            clickedDataIndex == 'amountoutputsum' ||
            clickedDataIndex == 'amountpackstockedsum' ||
            clickedDataIndex == 'amountstockedsum' ||
            clickedDataIndex == 'amountgiaohang'
        ) {
            var form = Ext.create('Ext.window.Window', {
                height: 550,
                width: 900,
                closable: true,
                title: 'Tiến độ',
                resizable: false,
                modal: true,
                border: false,
                closeAction: 'destroy',

                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    border: false,
                    xtype: 'POLineChart',
                    viewModel: {
                        type: 'POLineChart_ViewModel',
                        data: {
                            dataIndex: clickedDataIndex,
                            po: record,
                        }
                    }
                }]
            });
            form.show();
        }
    }
})