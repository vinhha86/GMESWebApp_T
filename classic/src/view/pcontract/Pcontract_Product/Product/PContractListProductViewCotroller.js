Ext.define('GSmartApp.view.pcontract.PContractListProductViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractListProductViewCotroller',
    init: function () {
        common.Check_Object_Permission();
    },
    control: {
        '#btnAddProduct_PContractListProductView': {
            click: 'onThemMoi'
        },
        '#btnExcel': {
            click: 'onExcel'
        },
        '#PContractListProductView': {
            select: 'onSelectProduct'
        }
    },
    onExcel: function () {
        var viewmodel = this.getViewModel();
        var params = new Object();
        params.pcontractid_link = viewmodel.get('PContract.id');

        GSmartApp.Ajax.post('/api/v1/report/test', Ext.JSON.encode(params),
            function (success, response, options) {
            })
    },
    onThemMoi: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();

        if (viewmodel.get('PContract.id') == 0) {
            Ext.MessageBox.show({
                title: 'Thông báo',
                msg: 'Bạn phải tạo đơn hàng trước khi chọn sản phẩm',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            var viewInfo = Ext.getCmp('PContractInfoView');
            viewInfo.down('#contractcode').focus();
            return;
        }
        else {
            var form = Ext.create({
                xtype: 'skusearchwindow',
                width: 800,
                height: 500,
                reference: 'skusearchwindow',
                viewModel: {
                    data: {
                        sourceview: 'PContractListProductView',
                        searchtype: 1,
                        pcontractid_link: viewmodel.get('PContract.id'),
                        type: 10,                        
                        orgcustomerid_link: viewmodel.get('PContract.orgbuyerid_link'),
                        isHidden_sku: true,
                        isHiddenSkuSearchCriteria_Attr_actioncolumn: true,
                        isHiddenSkuSearchCriteria_Attr_btnThemMoi: true
                    }
                }
            });
            form.show();
        }

        
    },
    onSelectProduct: function (t, record, index, eOpts) {
        var viewmodel = this.getViewModel();
        var storeAttValue = viewmodel.getStore('PContractAttValueStore');
        var storeDoc = viewmodel.getStore('PContractDocumentStore');

        var me = this.getView();
        var PContractId = viewmodel.get('IdPContract');;
        var productid = record.data.productid_link;
        var productName = record.data.productName;

        // storeAttValue.loadStore(PContractId, productid);
        storeAttValue.loadStoreByProductId(productid);
        storeDoc.loadStore(PContractId, productid);

        viewmodel.set('titleAttvalue', 'Thuộc tính : ' + productName);
        viewmodel.set('titleDoccument', 'Tài liệu : ' + productName);
        viewmodel.set('IdProduct', productid);
    },
    onXoa: function (grid, rowIndex, colIndex) {
        var params = new Object();
        var rec = grid.getStore().getAt(rowIndex);
        params.id = grid.getStore().getAt(rowIndex).get('id');

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa sản phẩm "' + rec.data.productName + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    GSmartApp.Ajax.post('/api/v1/pcontractproduct/delete', Ext.JSON.encode(params),
                        function (success, response, options) {
                            if (success) {
                                var response = Ext.decode(response.responseText);
                                var store = grid.getStore();
                                if (response.respcode != 200) {
                                    Ext.Msg.show({
                                        title: "Thông báo",
                                        msg: 'Lưu thất bại',
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'Đóng',
                                        }
                                    });
                                }
                                else {
                                    store.removeAt(rowIndex);
                                }
                            } else {
                                var response = Ext.decode(response.responseText);
                                Ext.Msg.show({
                                    title: "Thông báo",
                                    msg: response.message,
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
                                });
                            }
                        })
                }
            }
        });


    },
    onEdit: function (editor, context, e) {
        var viewmodel = this.getViewModel();
        var data = context.record.data;
        var params = new Object();
        params.data = data;

        GSmartApp.Ajax.post('/api/v1/pcontractproduct/update', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    var store = viewmodel.getStore('PContractProductStore');
                    if (response.respcode != 200) {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: 'Lưu thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        store.rejectChanges();
                    }
                    else {
                        store.commitChanges();
                    }
                }
            })
    },
    onEditSoLuong: function (grid, rowIndex, colIndex) {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var IdPContract = viewmodel.get('IdPContract');
        var data = grid.getStore().getAt(rowIndex);
        var productid_link = data.get('productid_link');
        var name = data.get('productName');
        me.getSelectionModel().select(data);

        var form = Ext.create('Ext.window.Window', {
            height: 300,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Cập nhật số lượng sản phẩm ' + name,
            closeAction: 'destroy',
            width: 400,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'PContractProductColorView',
                IdProduct: productid_link,
                IdPContract: IdPContract
            }]
        });
        form.show();
    },

    viewProductDetail: function(grid, metadata, rowIndex){
        xtype = 'ProductDetailView';
        title = 'Cập nhật sản phẩm';
        var viewmodel = this.getViewModel();
        var me = this;
        var data = grid.getStore().getAt(rowIndex);
        var id = data.get('productid_link');

        var form = Ext.create('Ext.window.Window', {
            height: '90%',
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
                            id : id,
                            producttypeid_link: 10
                        }
                    }
                }
            }]
        });
        form.show();

        form.down('#ProductDetailView').on('CreateProduct', function (product) {
            var PContractProductStore = viewmodel.getStore('PContractProductStore');
            PContractProductStore.load();
            form.close();
        })
    },

    viewImg: function (grid, rowIndex, colIndex) {
        var viewmodel = this.getViewModel();
        var me = this.getView();
        var data = grid.getStore().getAt(rowIndex);
        var id = data.get('productid_link');
        var name = data.get('productName');
        me.getSelectionModel().select(data);

        var params = new Object();
        params.id = id;
        GSmartApp.Ajax.post('/api/v1/product/getone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        var form = Ext.create('Ext.window.Window', {
                            height: 400,
                            width: 380,
                            closable: true,
                            resizable: false,
                            modal: true,
                            border: false,
                            title: 'Ảnh sản phẩm ' + name,
                            closeAction: 'destroy',
                            bodyStyle: 'background-color: transparent',
                            layout: {
                                type: 'fit', // fit screen for window
                                padding: 5
                            },
                            items: [{
                                xtype: 'PContractImageView',
                                IdProduct: id,
                                viewModel: {
                                    data: {
                                        img: response.img,
                                        productid_link: id
                                    }
                                }
                            }]
                        });
                        form.show();

                        form.down('#PContractImageView').on('Reload',function(){
                            var store = viewmodel.getStore('PContractProductStore');
                            store.load();
                        })
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Lấy thông tin thất bại',
                        msg: null,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    checkActionColumnPermission: function (view, rowIndex, colIndex, item, record) { 
        return common.Check_ActionColum_Permission(item.itemId); 
    },
    onFilterValueMaSPKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('PContractProductStore');
        var filterField = this.lookupReference('ValueFilterFieldMaSP'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ValueFilterFieldMaSP = filters.add({
                id: 'ValueFilterFieldMaSP',
                property: 'productBuyerCode',
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
    onFilterValueTenSPKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('PContractProductStore');
        var filterField = this.lookupReference('ValueFilterFieldTenSP'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ValueFilterFieldTenSP = filters.add({
                id: 'ValueFilterFieldTenSP',
                property: 'productName',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ValueFilterFieldTenSP) {
            filters.remove(this.ValueFilterFieldTenSP);
            this.ValueFilterFieldTenSP = null;
        }
    },
})