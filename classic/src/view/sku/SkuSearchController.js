Ext.define('GSmartApp.view.sku.SkuSearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.skusearch',
    init: function () {
        var me = this.getView();
        var viewModel = this.getViewModel();
        if (viewModel.get('sourceview') == 'PContractListProductView'
            || viewModel.get('isHidden_Select_Products') == false) {
            var SkuAtributesStore = this.getViewModel().getStore('SkuAtributesStore');
            SkuAtributesStore.loadDefaultAttr(10);
            this.onSearchButton();
        }

        if (viewModel.get('sourceview') == 'PContract_PO_Edit_Price') {
            var grid_skusearch = me.items.get('grid_skusearch');
            var selectionModel = grid_skusearch.getSelectionModel();
            selectionModel.setSelectionMode('SINGLE');
        }

        if (viewModel.get('SKUCode') != null || viewModel.get('SKUCode') != '') {
            viewModel.set('code', viewModel.get('SKUCode'));
        }

        this.onActivate();
    },
    onActivate: function () {
        var viewModel = this.getViewModel();
        var producttypeStore = viewModel.getStore('ProductTypeStore');

        if (viewModel.get('searchtype') == 0)
            producttypeStore.getAll();
        else if (viewModel.get('searchtype') == 1)
            producttypeStore.getall_CompleteProductTypes();
        else if (viewModel.get('searchtype') == 2)
            producttypeStore.getall_MainMaterialTypes();
        else if (viewModel.get('searchtype') == 3)
            producttypeStore.getall_SubMaterialTypes();
        else if (viewModel.get('searchtype') == 4)
            producttypeStore.getall_MaterialTypes();
        else if (viewModel.get('searchtype') == 5)
            producttypeStore.get_not_type_product();
        if (null != viewModel.get('skucode')) {
            var store_sku = Ext.data.StoreManager.lookup('store_sku');
            if (null != store_sku && viewModel.get('skucode').length > 0) {
                store_sku.loadByCode(viewModel.get('skucode'));
            }
        }

        if (viewModel.get('productid_link') != 0) {
            var SkuStore = viewModel.getStore('SkuStore');
            var productid_link = viewModel.get('productid_link');
            SkuStore.loadByProduct(productid_link, true);
            SkuStore.sort([
                { property: 'color_name', direction: 'ASC' },
                { property: 'sort_size', direction: 'ASC' }
            ]);

            var SkuAtributesStore = this.getViewModel().getStore('SkuAtributesStore');
            SkuAtributesStore.loadDefaultAttr(10);

            this.onSearchButton();
        }
    },
    control: {
        'ProductList': {
            itemdblclick: 'onEditProduct'
        },
    },
    onFilterMauSP: function () {
        var viewmodel = this.getViewModel(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('FilterMauSP'),
            filters = viewmodel.getStore('SkuStore').getFilters();

        if (filterField.value) {
            this.FilterMauSP = filters.add({
                id: 'FilterMauSP',
                property: 'color_name',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.FilterMauSP) {
            filters.remove(this.FilterMauSP);
            this.FilterMauSP = null;
        }
    },
    onCloseButton: function () {
        var mywin = Ext.WindowManager.getActive();
        if (mywin) {
            mywin.close();
        }
    },
    onCreateSKU: function () {
        var viewmodel = this.getViewModel();

        var params = new Object();
        params.productid_link = viewmodel.get('productid_link_notsearch');

        params.listMau = listMau;
        params.listCo = listCo;
        params.msgtype = "PCONTRACT_PRODUCT_ATTRIBUTE_CREATE";
        params.message = "Tạo thuộc tính sản phẩm đơn hàng";

        GSmartApp.Ajax.post('/api/v1/productattribute/createvalue_fromsearch', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        mainView = Ext.getCmp('PContractAttributeView');
                        mainView.getStore().load();

                        SKUView = Ext.getCmp('PContractSKUView');
                        SKUView.getStore().load();

                        me.up('window').close();
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lưu thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    onSearchButton: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();

        skusearch_ProductType = viewmodel.get('type');
        skusearch_code = me.down('#SkuSearchCriteria').lookupReference('skusearch_code').getValue();
        skusearch_partnercode = me.down('#SkuSearchCriteria').lookupReference('skusearch_partnercode').getValue();
        productid_link = viewmodel.get('productid_link');
        orgcustomerid_link = viewmodel.get('orgcustomerid_link');
        var SkuAtributesStore = viewmodel.getStore('SkuAtributesStore');
        var ProductStore = viewmodel.getStore('ProductStore');
        var SkuStore = viewmodel.getStore('SkuStore');
        ProductStore.removeAll();
        SkuStore.removeAll();

        var attributes = new Array();
        Ext.Array.each(SkuAtributesStore.data.items, function (rc) {
            if (rc.data.selectedids != '')
                attributes.push(rc.data);
        });
        ProductStore.loadFilter(
            skusearch_ProductType,
            skusearch_code,
            skusearch_partnercode,
            attributes,
            productid_link,
            orgcustomerid_link
        )

    },
    onSelectButton: function (button) {
        var viewModel = this.getViewModel();
        var sourceview = viewModel.get('sourceview');

        if (viewModel.get('sourceview') == 'stockoutforcheck') {
            this.createStockoutForCheck();
        }
        //Tab san pham trong don hang
        if (viewModel.get('sourceview') == 'PContractListProductView') {
            this.createPContractProduct();
        }
        //Tab phan loai san pham trong don hang
        if (viewModel.get('sourceview') == 'PContractSKU_ListProductView') {
            this.createPContractProductSKU();
        }
        //Tab nguyen phu lieu trong don hang
        if (viewModel.get('sourceview') == 'PContractProductBomView') {
            this.createContractBOM();
        }
        if (viewModel.get('sourceview') == 'PContract_Bom_View') {
            this.InsertNPL_DinhMucKhachHang();
        }

        //Invoice 
        // if (viewModel.get('sourceview') == 'InvoiceEdit_D') {
        //     this.InsertSKU_to_invoice();
        // } 

        if (viewModel.get('sourceview') == 'PContractProduct_Bom_TabColorView') {
            this.InsertNPL_DinhMucHaiQuan();
        }

        if (viewModel.get('sourceview') == 'PContractProduct_Bom2_TabColorView') {
            this.InsertNPL_DinhMucKhachHang();
        }

        if (sourceview == 'PContract_PO_Edit_Price') {
            this.InsertMaterialIdLinkToPriceD();
        }

        if (sourceview == 'PContract_PO_Edit_Price_D_SKU') {
            this.InsertMaterialIdLinkToPriceDSKU();
        }

        if (sourceview == 'FabricPrice') {
            this.InsertToFabricPrice();
        }

        if (sourceview == 'InvoiceEdit_D') {
            this.InsertToInvoiceEdit_D();
        }

        if (sourceview == 'Stockin_SubM_Edit_D') {
            this.InsertToStockin_SubM_Edit_D();
        }

        if (sourceview == 'Stockout_P_EditController') {
            var grid_skusearch = this.getView().items.get('grid_skusearch');
            var records = grid_skusearch.getSelection();
            this.fireEvent('product_sku_selected', records);
        }
    },
    createPContractProduct: function () {
        var m = this;
        var me = this.getView().down('#ProductList');
        var viewModel = this.getViewModel();
        var params = new Object();
        params.pcontractid_link = viewModel.get('pcontractid_link');
        var select = me.getSelectionModel().getSelection();

        if (select.length == 0) {
            Ext.Msg.show({
                title: "Thông báo",
                msg: 'Bạn chưa chọn sản phẩm',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else {
            var listIdProduct = [];
            for (var i = 0; i < select.length; i++) {
                var data = select[i].data;
                listIdProduct.push(data.id);
            }
            params.listIdProduct = listIdProduct;

            GSmartApp.Ajax.post('/api/v1/pcontractproduct/create', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode != 200) {
                            Ext.Msg.show({
                                title: "Thông báo",
                                msg: 'Có lỗi trong quá trình chọn sản phẩm',
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }
                        else {
                            var viewProduct = Ext.getCmp('PContractListProductView');
                            viewProduct.getStore().load();
                            m.onCloseButton();
                        }
                    }
                })
        }
    },
    createPContractProduct_WithSKU: function () {
        var me = this.getView().down('#grid_skusearch');
        var viewModel = this.getViewModel();
        var select = me.getSelectionModel().getSelection();

        if (select.length == 0) {
            Ext.Msg.show({
                title: "Thông báo",
                msg: 'Bạn chưa chọn SKU',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
        }
        else {
            var params = new Object();
            params.pcontractid_link = viewModel.get('pcontractid_link');
            params.productid_link = viewModel.get('productid_link_notsearch');
            var listskuid_link = [];
            for (var i = 0; i < select.length; i++) {
                var data = select[i].data;
                listskuid_link.push(data.id);
            }
            params.listskuid = listskuid_link;

            GSmartApp.Ajax.post('/api/v1/pcontractproduct/create_with_sku', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode != 200) {
                            Ext.Msg.show({
                                title: "Thông báo",
                                msg: 'Có lỗi trong quá trình chọn sản phẩm',
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }
                        else {
                            var viewProduct = Ext.getCmp('PContractListProductView');
                            viewProduct.getStore().load();

                            var storeAttValue = Ext.getCmp('PContractAttributeView').getStore();
                            storeAttValue.loadStore(viewModel.get('pcontractid_link'), viewModel.get('productid_link_notsearch'));

                            //load lai ds sku
                            var storeSKU = Ext.getCmp('PContractSKUView').getStore();
                            storeSKU.loadStore(viewModel.get('pcontractid_link'), viewModel.get('productid_link_notsearch'));

                            me.up('window').close();
                        }
                    }
                })
        }
    },
    InsertSKU_to_invoice: function () {
        var me = this.getView().down('#grid_skusearch');
        var viewModel = this.getViewModel();
        var params = new Object();

        params.invoiceid_link = viewModel.get('invoiceid_link');
        var select = me.getSelectionModel().getSelection();

        if (select.length == 0) {
            Ext.Msg.show({
                title: "Thông báo",
                msg: 'Bạn chưa chọn SKU',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else {
            var listskuid_link = [];
            for (var i = 0; i < select.length; i++) {
                var data = select[i].data;
                listskuid_link.push(data.id);
            }
            params.list_skuid_link = listskuid_link;

            GSmartApp.Ajax.post('/api/v1/invoice/invoice_insertsku', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode != 200) {
                            Ext.Msg.show({
                                title: "Thông báo",
                                msg: 'Có lỗi trong quá trình chọn NPL',
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }
                        else {
                            var viewInvoice = Ext.getCmp('InvoiceEdit');
                            viewInvoice.getController().getInfo(params.invoiceid_link);

                            me.up('window').close();
                        }
                    }
                })
        }
    },
    createPContractProductSKU: function () {
        var me = this.getView().down('#grid_skusearch');
        var viewModel = this.getViewModel();
        var params = new Object();
        params.pcontractid_link = viewModel.get('pcontractid_link');
        params.productid_link = viewModel.get('productid_link_notsearch');
        params.pcontract_poid_link = viewModel.get('pcontract_poid_link');
        var select = me.getSelectionModel().getSelection();

        if (select.length == 0) {
            Ext.Msg.show({
                title: "Thông báo",
                msg: 'Bạn chưa chọn SKU',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else {
            var listskuid_link = [];
            for (var i = 0; i < select.length; i++) {
                var data = select[i].data;
                listskuid_link.push(data.id);
            }
            params.listskuid_link = listskuid_link;

            GSmartApp.Ajax.post('/api/v1/pcontractsku/create', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode != 200) {
                            Ext.Msg.show({
                                title: "Thông báo",
                                msg: 'Có lỗi trong quá trình chọn sản phẩm',
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }
                        else {
                            //load lai ds san pham
                            var viewProduct = Ext.getCmp('PContractSKUView');
                            viewProduct.getStore().load();

                            //load lai danh sach thuoc tinh
                            var storeAttValue = Ext.getCmp('PContractView').getViewModel().getStore('PContractAttValueStore');
                            console.log(storeAttValue);
                            storeAttValue.loadStore(viewModel.get('pcontractid_link'), viewModel.get('productid_link_notsearch'));

                            //load lai ds sku
                            var storeSKU = Ext.getCmp('PContractSKUView').getStore();
                            storeSKU.removeAll();
                            // storeSKU.loadStore(viewModel.get('pcontractid_link'), viewModel.get('productid_link_notsearch'));
                            storeSKU.load();
                            me.up('window').close();
                        }
                    }
                })
        }
    },
    createContractBOM: function () {
        var viewModel = this.getViewModel();
        var pcontractid_link = viewModel.get('pcontractid_link');
        var productid_link = viewModel.get('productid_link_notsearch');

        var grid_skusearch = this.getView().items.get('grid_skusearch');
        var records = grid_skusearch.getSelection();
        if (records.length > 0) {
            var params = new Object();
            var data = [];
            for (var i = 0; i < records.length; i++) {
                data.push(records[i].data.id);
            }
            params.productid_link = productid_link;
            params.pcontractid_link = pcontractid_link;
            params.listnpl = data;

            GSmartApp.Ajax.post('/api/v1/pcontractproductbom/create_pcontract_productbom', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var storebom = Ext.getCmp('PContractProductBomView').getStore();
                        storebom.loadStore(pcontractid_link, productid_link);

                        var tab = Ext.getCmp('PContractProduct_Bom_TabColorView');
                        if (tab.items.length > 0) {
                            var storebomcolor = Ext.getCmp('PContractView').getViewModel().getStore('PContractBomColorStore');
                            storebomcolor.load();

                            var storebomcolor2 = Ext.getCmp('PContractView').getViewModel().getStore('PContractBom2ColorStore');
                            storebomcolor2.load();
                        }

                        var tab2 = Ext.getCmp('PContractProduct_Bom2_TabColorView');
                        if (tab2.items.length > 0) {
                            var storebomcolor2 = Ext.getCmp('PContractView').getViewModel().getStore('PContractBom2ColorStore');
                            storebomcolor2.load();
                        }

                        var mywin = Ext.WindowManager.getActive();
                        if (mywin) {
                            mywin.close();
                        }
                    } else {
                        Ext.MessageBox.show({
                            title: "Đơn hàng",
                            msg: "Lỗi thêm nguyên phụ liệu, liên hệ kỹ thuật để trợ giúp",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                })
        }
    },
    InsertNPL_DinhMucHaiQuan: function () {
        var viewModel = this.getViewModel();
        var pcontractid_link = viewModel.get('pcontractid_link');
        var productid_link = viewModel.get('productid_link_notsearch');

        var grid_skusearch = this.getView().items.get('grid_skusearch');
        var records = grid_skusearch.getSelection();
        if (records.length > 0) {
            var params = new Object();
            var data = [];
            for (var i = 0; i < records.length; i++) {
                data.push(records[i].data.id);
            }
            params.productid_link = productid_link;
            params.pcontractid_link = pcontractid_link;
            params.listnpl = data;

            GSmartApp.Ajax.post('/api/v1/pcontractproductbom/create_pcontract_productbom', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var tab = Ext.getCmp('PContractProduct_Bom_TabColorView');
                        if (tab.items.length > 0) {
                            var storebomcolor = Ext.getCmp('PContractView').getViewModel().getStore('PContractBomColorStore');
                            storebomcolor.load();
                        }

                        // var tab2 = Ext.getCmp('PContractProduct_Bom2_TabColorView');
                        // if(tab2.items.length > 0){
                        //     var storebomcolor2 = Ext.getCmp('PContractView').getViewModel().getStore('PContractBom2ColorStore');
                        //     storebomcolor2.load();
                        // }

                        var mywin = Ext.WindowManager.getActive();
                        if (mywin) {
                            mywin.close();
                        }
                    } else {
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: "Lỗi thêm nguyên phụ liệu, liên hệ kỹ thuật để trợ giúp",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                    }
                })
        }
    },
    InsertNPL_DinhMucKhachHang: function () {
        var me = this;

        var viewModel = this.getViewModel();
        var pcontractid_link = viewModel.get('pcontractid_link');
        var productid_link = viewModel.get('productid_link_notsearch');

        var grid_skusearch = this.getView().items.get('grid_skusearch');
        var records = grid_skusearch.getSelection();
        if (records.length > 0) {
            var params = new Object();
            var data = [];
            for (var i = 0; i < records.length; i++) {
                data.push(records[i].data.id);
            }
            params.productid_link = productid_link;
            params.pcontractid_link = pcontractid_link;
            params.listnpl = data;

            GSmartApp.Ajax.post('/api/v1/pcontractproductbom2/create_pcontract_productbom', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        // var storebom = Ext.getCmp('PContractProductBomView').getStore();
                        // storebom.loadStore(pcontractid_link, productid_link);

                        me.fireEvent('reload');

                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: "Thành công",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                        // var mywin = Ext.WindowManager.getActive();
                        // if (mywin) {
                        //     mywin.close();
                        // }
                    } else {
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: "Lỗi thêm nguyên phụ liệu, liên hệ kỹ thuật để trợ giúp",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                    }
                })
        }
    },
    InsertMaterialIdLinkToPriceD: function () {
        var m = this;
        var viewModel = this.getViewModel();
        var grid_skusearch = this.getView().items.get('grid_skusearch');
        var selectionModel = grid_skusearch.getSelectionModel();
        var records = grid_skusearch.getSelection();
        if (records.length > 0) {
            // console.log(records[0]);
            // var materialid_link = records[0].get('id');
            m.fireEvent("AddMaterialIdLink", records[0]);
            // m.onThoat();
        } else {
            // Ext.Msg.alert({
            //     title: "Thông báo",
            //     msg: 'Bạn chưa chọn SKU',
            //     buttons: Ext.MessageBox.YES,
            //     buttonText: {
            //         yes: 'Đóng',
            //     },
            //     fn: function (btn) {
            //         me.down('#cmbSanPham').expand();
            //     }
            // });
            // return;
        }
    },
    InsertMaterialIdLinkToPriceDSKU: function () {
        var m = this;
        var viewModel = this.getViewModel();
        var grid_skusearch = this.getView().items.get('grid_skusearch');
        var selectionModel = grid_skusearch.getSelectionModel();
        var records = grid_skusearch.getSelection();
        if (records.length > 0) {
            var params = new Object();
            var currencyid_link = viewModel.get('currencyid_link');
            var unitid_link = viewModel.get('unitid_link');
            var materialid_link_list = new Array();

            for (var i = 0; i < records.length; i++) {
                materialid_link_list.push(records[i].data.id);
            }

            params.materialid_link_list = materialid_link_list;
            params.currencyid_link = currencyid_link;
            params.unitid_link = unitid_link;

            GSmartApp.Ajax.post('/api/v1/fabricprice/getByMaterial', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        // FabricPriceStore.load();
                        var response = Ext.decode(response.responseText);
                        // console.log(response.data);
                        m.fireEvent("AddMaterialIdLink", response.data);
                    }
                })
        } else {
        }
    },
    InsertToFabricPrice: function () {
        var m = this;
        var viewModel = this.getViewModel();
        var grid_skusearch = this.getView().items.get('grid_skusearch');
        var selectionModel = grid_skusearch.getSelectionModel();
        var records = grid_skusearch.getSelection();
        if (records.length > 0) {
            // console.log(records[0]);
            // var materialid_link = records[0].get('id');
            m.fireEvent("AddMaterialIdLinkFabricPrice", records);
            // m.onThoat();
        } else {
            // Ext.Msg.alert({
            //     title: "Thông báo",
            //     msg: 'Bạn chưa chọn nguyên phụ liệu',
            //     buttons: Ext.MessageBox.YES,
            //     buttonText: {
            //         yes: 'Đóng',
            //     },
            // });
            // return;
        }
    },
    onSelect_Products: function () {
        var me = this.getView().down('#ProductList');
        var records = me.getSelectionModel().getSelection();

        if (records.length > 0) {
            this.fireEvent("onSelect_Products", records);
        }
    },
    InsertToInvoiceEdit_D: function () {
        var grid_skusearch = this.getView().items.get('grid_skusearch');
        var records = grid_skusearch.getSelection();
        if (records.length > 0) {
            this.fireEvent("InsertToInvoiceEdit_D", records);
        }
    },
    InsertToStockin_SubM_Edit_D: function(){
        var grid_skusearch = this.getView().items.get('grid_skusearch');
        var records = grid_skusearch.getSelection();
        if (records.length > 0) {
            this.fireEvent("InsertToStockin_SubM_Edit_D", records);
        }
    },
    createStockoutForCheck: function () {
        var viewModel = this.getViewModel();
        var grid_skusearch = this.getView().items.get('grid_skusearch');
        var records = grid_skusearch.getSelection();
        if (records.length > 0) {
            var params = new Object();
            var stockout = new GSmartApp.model.Stockout({
                id: -1,
                orgrootid_link: null,
                stockoutorderid_link: null,
                stockoutcode: null,
                stockoutdate: viewModel.get('stockoutdate'),
                stockouttypeid_link: viewModel.get('stockouttypeid_link'),
                orgid_from_link: null,
                orgid_to_link: null,
                porderid_link: null,
                pordercode: null,
                shipperson: null,
                totalpackage: null,
                totalyds: null,
                totalpackagecheck: null,
                totalydscheck: null,
                totalpackageprocessed: null,
                totalydsprocessed: null,
                totalm3: null,
                totalnetweight: null,
                totalgrossweight: null,
                p_skuid_link: records[0].get('id'),
                p_skucode: records[0].get('code'),
                extrainfo: null,
                status: null,
                usercreateid_link: null,
                timecreate: null,
                lastuserupdateid_link: null,
                lasttimeupdate: null
            });
            params.data = stockout.data;
            params.skudata = records[0].data;


            GSmartApp.Ajax.post('/api/v1/stockout/createstockoutforcheck_withsku', Ext.JSON.encode(params),
                function (success, response, options) {
                    var response = Ext.decode(response.responseText);
                    if (success) {
                        var store_stockout_d_forcheck = Ext.data.StoreManager.lookup('store_stockout_d_forcheck');
                        if (store_stockout_d_forcheck) {
                            store_stockout_d_forcheck.reload();
                        }
                        var mywin = Ext.WindowManager.getActive();
                        if (mywin) {
                            mywin.close();
                        }
                    } else {
                        Ext.MessageBox.show({
                            title: "Kiểm đo/Khử co",
                            msg: "Thẻ vải không đúng",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                });
        }
    },
    onProductItemSelected: function (sender, record) {
        console.log(record);
        var viewModel = this.getViewModel();
        var SkuStore = viewModel.getStore('SkuStore');
        if (record.get('id') > 0) {
            //Chỉ gán khi tìm kiếm sản phẩm
            if (viewModel.get('searchtype') == 1) {
                viewModel.set('productid_link_notsearch', record.data.id);
            }
            if (record.data.product_type >= 20 && record.data.product_type < 60)
                SkuStore.loadByProduct(record.get('id'), false);//Hien ca ALL
            else
                SkuStore.loadByProduct(record.get('id'), true);
            SkuStore.sort([
                { property: 'color_name', direction: 'ASC' },
                { property: 'sort_size', direction: 'ASC' }
            ]);
        }
    },
    onCreateProduct: function () {
        var viewmodel = this.getViewModel();
        var me = this;
        var xtype = '', title = '';
        if (null != viewmodel.get('type') && viewmodel.get('type') > 0) {
            if (10 <= viewmodel.get('type') && viewmodel.get('type') < 20) {
                xtype = 'ProductDetailView';
                title = 'Thêm mới sản phẩm';
            }
            else if (20 <= viewmodel.get('type') && viewmodel.get('type') < 30) {
                xtype = 'MaterialDetailView';
                title = 'Thêm mới nguyên liệu';
            }
            else if (30 <= viewmodel.get('type') && viewmodel.get('type') < 40) {
                xtype = 'SewingTrimDetailView';
                title = 'Thêm mới phụ liệu may';
            }
            else if (40 <= viewmodel.get('type') && viewmodel.get('type') < 50) {
                xtype = 'PackingTrimDetailView';
                title = 'Thêm mới phụ liệu hoàn thiện';
            }
            else if (50 <= viewmodel.get('type') && viewmodel.get('type') < 60) {
                xtype = 'SewingThreadDetailView';
                title = 'Thêm mới chỉ may';
            }

            var form = Ext.create('Ext.window.Window', {
                height: 500,
                closable: true,
                title: title,
                resizable: false,
                modal: true,
                border: false,
                closeAction: 'destroy',
                width: 1200,
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    border: false,
                    xtype: xtype,
                    viewModel: {
                        data: {
                            btnQuayLai: true,
                            isWindow: true,
                            product: {
                                producttypeid_link: viewmodel.get('type'),
                                id: 0
                            }
                        }
                    }
                }]
            });
            form.show();

            form.down('#' + xtype).on('CreateProduct', function (product) {
                me.onSearchButton();
                // form.close();
            })
        } else {
            Ext.Msg.show({
                title: "Thông báo",
                msg: 'Bạn cần chọn phân loại sản phẩm/nguyên phụ liệu và bấm nút Tìm sản phẩm trước khi tạo mới',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
        }
    },

    onEditProductList: function (grid, rowIndex, colIndex) {
        var data = grid.getStore().getAt(rowIndex);
        this.onEditProduct(grid, data);
        // console.log(data);
    },

    onEditProduct: function (grid, rec) {
        // console.log(rec);
        var viewmodel = this.getViewModel();
        var me = this;
        var xtype = '', title = '', height = 500;
        if (10 <= viewmodel.get('type') && viewmodel.get('type') < 20) {
            xtype = 'ProductDetailView';
            title = 'Cập nhật sản phẩm';
            height = '95%';
        }
        else if (20 <= viewmodel.get('type') && viewmodel.get('type') < 30) {
            xtype = 'MaterialDetailView';
            title = 'Cập nhật nguyên liệu';
        }
        else if (30 <= viewmodel.get('type') && viewmodel.get('type') < 40) {
            xtype = 'SewingTrimDetailView';
            title = 'Cập nhật phụ liệu may';
        }
        else if (40 <= viewmodel.get('type') && viewmodel.get('type') < 50) {
            xtype = 'PackingTrimDetailView';
            title = 'Cập nhật phụ liệu hoàn thiện';
        }
        else if (50 <= viewmodel.get('type') && viewmodel.get('type') < 60) {
            xtype = 'SewingTrimDetailView';
            title = 'Cập nhật Chỉ may';
        }

        var form = Ext.create('Ext.window.Window', {
            height: height,
            closable: true,
            title: title,
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            width: 1200,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: xtype,
                viewModel: {
                    data: {
                        btnQuayLai: true,
                        isWindow: true,
                        product: {
                            id: rec.data.id,
                            producttypeid_link: viewmodel.get('type')
                        }
                    }
                }
            }]
        });
        form.show();

        form.down('#' + xtype).on('CreateProduct', function (product) {
            me.onSearchButton();
            form.close();
        })
    },

    onbuyercodeProductListFilterKeyup: function () {
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('buyercodeProductListFilter'),
            filters = this.getViewModel().getStore('ProductStore').getFilters();

        if (filterField.value) {
            this.buyercodeProductListFilter = filters.add({
                id: 'buyercodeProductListFilter',
                property: 'buyercode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.buyercodeProductListFilter) {
            filters.remove(this.buyercodeProductListFilter);
            this.buyercodeProductListFilter = null;
        }
    },
    partnercodeProductListFilterKeyup: function () {
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('partnercodeProductListFilter'),
            filters = this.getViewModel().getStore('ProductStore').getFilters();

        if (filterField.value) {
            this.partnercodeProductListFilter = filters.add({
                id: 'partnercodeProductListFilter',
                property: 'partnercode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.partnercodeProductListFilter) {
            filters.remove(this.partnercodeProductListFilter);
            this.partnercodeProductListFilter = null;
        }
    },
    onnameProductListFilterKeyup: function () {
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('nameProductListFilter'),
            filters = this.getViewModel().getStore('ProductStore').getFilters();

        if (filterField.value) {
            this.nameProductListFilter = filters.add({
                id: 'nameProductListFilter',
                property: 'name',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.nameProductListFilter) {
            filters.remove(this.nameProductListFilter);
            this.nameProductListFilter = null;
        }
    },
});
