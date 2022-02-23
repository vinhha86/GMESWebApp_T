Ext.define('GSmartApp.view.pcontract.PContract_Bom_PO_SKUViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_Bom_PO_SKUViewCotroller',
    control: {
        '#cmbSanPham': {
            select: 'onSelectSanPham'
        },
        'PContract_Bom_PO_SKUView': {
            select: 'onSelect',
            deselect: 'onDeselect'
        }
    },
    init: function () {
        var viewmodel = this.getViewModel();
    },
    onEdit: function (editor, context, e) {
        if (context.value == context.originalValue) return;

        var record = context.record;
        var grid = this.getView();
        var main = grid.up('#PContract_Bom_PO_MainView');
        var viewmodel = this.getViewModel();
        var storeSKU = viewmodel.getStore('PContractSKUStore');

        var params = new Object();
        params.product_skuid_link = record.get('skuid_link');
        params.pcontractid_link = viewmodel.get('pcontractid_link');
        params.productid_link = viewmodel.get('cmb_productid_link');
        params.pcontract_poid_link = viewmodel.get('pcontract_poid_link');
        params.material_skuid_link = viewmodel.get('material_skuid_link');
        params.quantity = context.value;

        main.setLoading("Đang xử lý");
        GSmartApp.Ajax.post('/api/v1/pcontractproductbom2/select_sku', Ext.JSON.encode(params),
            function (success, response, options) {
                main.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode != 200) {
                        Ext.MessageBox.show({
                            title: "Có lỗi trong quá trình xử lý dữ liệu",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        storeSKU.rejectChanges();
                    }
                    else {
                        storeSKU.commitChanges();

                        var store = viewmodel.getStore('PContractBom_PO_Store');
                        var pcontractid_link = viewmodel.get('pcontractid_link');
                        var productid_link = viewmodel.get('productid_link');

                        store.loadPOConfirm(pcontractid_link, productid_link);

                        grid.getSelectionModel().select(record, true, true);
                    }
                }
                else {
                    storeSKU.rejectChanges();
                }
            })
    },
    onSelectSanPham: function (combo, record, eOpts) {
        var viewmodel = this.getViewModel();
        var storeSku = viewmodel.getStore('PContractSKUStore');
        var pcontract_poid_link = viewmodel.get('pcontract_poid_link');
        var material_skuid_link = viewmodel.get('material_skuid_link');

        storeSku.loadStoreByPO_and_Product_Material(record.data.id, pcontract_poid_link, material_skuid_link);
    },
    renderSum: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(value, '0,000');
    },
    onSelect: function (m, record, index, eOpts) {
        var grid = this.getView();
        var main = grid.up('#PContract_Bom_PO_MainView');
        var viewmodel = this.getViewModel();

        var params = new Object();
        params.product_skuid_link = record.get('skuid_link');
        params.pcontractid_link = viewmodel.get('pcontractid_link');
        params.productid_link = viewmodel.get('cmb_productid_link');
        params.pcontract_poid_link = viewmodel.get('pcontract_poid_link');
        params.material_skuid_link = viewmodel.get('material_skuid_link');
        params.quantity = record.get('pquantity_total');

        main.setLoading("Đang xử lý");
        GSmartApp.Ajax.post('/api/v1/pcontractproductbom2/select_sku', Ext.JSON.encode(params),
            function (success, response, options) {
                main.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode != 200) {
                        Ext.MessageBox.show({
                            title: "Có lỗi trong quá trình xử lý dữ liệu",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        grid.getSelectionModel().deselect(record, true, true);
                    }
                    else {
                        var store = viewmodel.getStore('PContractBom_PO_Store');
                        var pcontractid_link = viewmodel.get('pcontractid_link');
                        var productid_link = viewmodel.get('productid_link');

                        store.loadPOConfirm(pcontractid_link, productid_link);
                    }
                }
                else {
                    grid.getSelectionModel().deselect(record, true, true);
                }
            })
    },
    onDeselect: function (m, record, index, eOpts) {
        var grid = this.getView();
        var main = grid.up('#PContract_Bom_PO_MainView');
        var viewmodel = this.getViewModel();
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn bỏ chọn?" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {

                    var params = new Object();
                    params.product_skuid_link = record.get('skuid_link');
                    params.pcontractid_link = viewmodel.get('pcontractid_link');
                    params.productid_link = viewmodel.get('cmb_productid_link');
                    params.pcontract_poid_link = viewmodel.get('pcontract_poid_link');
                    params.material_skuid_link = viewmodel.get('material_skuid_link');

                    main.setLoading("Đang xử lý");
                    GSmartApp.Ajax.post('/api/v1/pcontractproductbom2/deselect_sku', Ext.JSON.encode(params),
                        function (success, response, options) {
                            main.setLoading(false);
                            if (success) {
                                var response = Ext.decode(response.responseText);
                                if (response.respcode != 200) {
                                    Ext.MessageBox.show({
                                        title: "Có lỗi trong quá trình xử lý dữ liệu",
                                        msg: response.message,
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'Đóng',
                                        }
                                    });
                                    grid.getSelectionModel().select(record, true, true);
                                }
                            }
                            else {
                                grid.getSelectionModel().select(record, true, true);
                            }
                        })
                }
                else {
                    grid.getSelectionModel().select(record, true, true);
                }
            }
        });
    }
})