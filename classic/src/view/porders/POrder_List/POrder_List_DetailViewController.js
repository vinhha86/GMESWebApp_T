Ext.define('GSmartApp.view.porders.POrder_List.POrder_List_DetailViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_List_DetailViewController',
    init: function () {
        var viewmodel = this.getViewModel();
        viewmodel.set('is_poline_hidden', false);
        viewmodel.set('is_poline_sku_hidden', false);
        viewmodel.set('is_addremovesku_hidden', true);
        viewmodel.set('is_poline_skugranted_hidden', true);
        viewmodel.set('isEditSL', true);
    },
    listen: {
        controller: {
            '*': {
                loaddata: 'onLoadData'
            }
        }
    },
    control: {
        '#btnQuayLai': {
            click: 'onQuayLai'
        },
        '#btnTTSanPham': {
            click: 'onTTSanPham'
        },
        '#btnTTDonHang': {
            click: 'onTTDonHang'
        },
        '#tabmain': {
            tabchange: 'onTabChange'
        },
        '#btnPrintPorder': {
            click: 'onPrintPorder'
        },
        '#btnCutPlan': {
            click: 'onCutPlan'
        }
    },
    onCutPlan: function () {
        var viewmodel = this.getViewModel();
        var porderid_link = viewmodel.get('porder.id');
        var porder = viewmodel.get('porder');

        var form = Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Kế hoạch cắt',
            closeAction: 'destroy',
            height: Ext.getBody().getViewSize().height * .95,
            width: Ext.getBody().getViewSize().width * .95,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'CutPlan_MainView',
                viewModel: {
                    data: {
                        porderid_link: porderid_link,
                        porder: porder
                    }
                }
            }]
        });
        form.show();

        form.down('#CutPlan_MainView').getController().on('Thoat', function () {
            form.close();
        })
    },
    onPrintPorder: function () {
        var me = this;
        var viewmodel = this.getViewModel();
        var params = new Object();
        params.porderid_link = viewmodel.get('IdPOrder');

        GSmartApp.Ajax.post('/api/v1/porder_report/porder', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        var vendor = viewmodel.get('porder.vendorname');
                        var masp = viewmodel.get('porder.stylebuyer');
                        me.saveByteArray("LenhSanXuat_" + vendor + "_" + masp + ".xlsx", response.data);
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lấy thông tin thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lấy thông tin thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        }
                    });
                }
            })
    },
    saveByteArray: function (reportName, byte) {
        var me = this;
        byte = this.base64ToArrayBuffer(byte);

        var blob = new Blob([byte], { type: "application/xlsx" });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        var fileName = reportName;
        link.download = fileName;
        link.click();
    },
    base64ToArrayBuffer: function (base64) {
        var binaryString = window.atob(base64);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
            var ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        return bytes;
    },
    onTabChange: function (tabPanel, newCard, oldCard, eOpts) {
        var me = this.getView();
        var viewmodel = this.getViewModel();

        if (newCard.xtype == "POrder_Tab_Info") {
            var infoView = me.down('#POrder_InfoView');
            infoView.IdPOrder = me.IdPOrder;
            infoView.getController().loadInfo(me.IdPOrder);

            var store_porder = viewmodel.getStore('porderSKUStore');

            store_porder.setGroupField('po_buyer');
            store_porder.load();

            // var store_line = viewmodel.getStore('POLineSKU_Store');
            // store_line.load();
        }
        else if (newCard.xtype == "POrder_Tab_Grant") {
            var listGrantView = me.down('#POrder_List_GrantView');
            listGrantView.IdPOrder = me.IdPOrder;
            listGrantView.getController().loadInfo(me.IdPOrder);


        }
        else if (newCard.xtype == "PorderBom_TabColor") {
            var tab = Ext.getCmp('PorderBom_TabColor').getController();
            tab.createTab();
        }
        else if (newCard.xtype == "POrderBom2View") {
            me.down('#POrderBom2View').getController().CreateColumns();
        }
        else if (newCard.xtype == "PorderSewingCost_View") {
            var storeSewing = viewmodel.getStore('PorderSewingCostStore');
            var porderid_link = viewmodel.get('porder.id');
            storeSewing.loadby_porder(porderid_link);
        }
        else if (newCard.xtype == "PorderProcessingDetail") {
            var POrderGrantStore = viewmodel.getStore('POrderGrantStore');
            var porderid_link = viewmodel.get('IdPOrder');
            POrderGrantStore.loadStoreByPOrderId(porderid_link);
        }
        else if (newCard.xtype == "Stockout_order_MainView") {
            var POrderGrantStore = viewmodel.getStore('Stockout_order_Store');
            var porderid_link = viewmodel.get('IdPOrder');
            POrderGrantStore.GetByPorder(porderid_link);
        }
    },
    onLoadData: function (id) {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        viewmodel.set('IdPOrder', id);

        var storeSku = viewmodel.getStore('POLineSKU_Store');
        storeSku.loadByPOrderStore(id);

        var storePOrder = viewmodel.getStore('porderSKUStore');
        storePOrder.setGroupField('po_buyer');
        storePOrder.loadByPorderID(id);

        me.IdPOrder = id;

        var infoView = me.down('#POrder_InfoView');
        infoView.IdPOrder = id;
        infoView.getController().loadInfo(me.IdPOrder);

        // var productSkuView = me.down('#POrder_ProductSKUView');
        // productSkuView.IdPOrder = id;
        // productSkuView.getController().loadInfo(me.IdPOrder);

        // var listGrantView = me.down('#POrder_List_GrantView');
        // listGrantView.IdPOrder = id;
        // listGrantView.getController().loadInfo(me.IdPOrder);
    },
    onQuayLai: function () {
        this.redirectTo('porderlistmain');
    },
    onTTSanPham: function () {
        // pcontractid_link
        console.log('here yet');
        var viewModel = this.getViewModel();
        var pcontractid_link = viewModel.get('porder').pcontractid_link;
        var productid_link = viewModel.get('porder').productid_link;
        // console.log(pcontractid_link);
        // console.log(viewModel.get('porder'));
        var window = Ext.create('GSmartApp.view.PContract.PContract_General_InfoView', {
            IdPContract: pcontractid_link,
            IdProduct: productid_link,
            viewModel: {
                data: {
                    IdPContract: pcontractid_link,
                    IdProduct: productid_link,
                    isWindow: true
                }
            }
        });
        window.show();
    },
    onTTDonHang: function () {
        // pcontract_poid_link
        var viewModel = this.getViewModel();
        var pcontract_poid_link = viewModel.get('porder').pcontract_poid_link;
        // console.log(pcontract_poid_link);
        var window = Ext.create('GSmartApp.view.pcontract.PContract_PO_Edit_Info_Main_Window', {
            viewModel: {
                data: {
                    id: pcontract_poid_link
                }
            }
        });
        window.show();
    },
})