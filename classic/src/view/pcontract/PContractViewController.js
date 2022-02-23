Ext.define('GSmartApp.view.pcontract.PContractViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractViewController',
    init: function () {
        this.onActivate();
        common.Check_Object_Permission();

        if (this.getView().IdPContract > 0) {
            this.onLoadData(this.getView().IdPContract, null);
            dockBottomBar = this.lookupReference('dockBottomBar');
            dockBottomBar.setHidden(true);
        }

        var viewModel = this.getViewModel();
        var ShipModeStore = viewModel.getStore('ShipModeStore');
        if (null != ShipModeStore) {
            ShipModeStore.loadStore();
            ShipModeStore.getSorters().add('name');
        }
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
        '#btnLuu_PContract': {
            click: 'onLuu'
        },
        '#PContractView': {
            activate: 'onActivate'
        },
        '#tabmain': {
            tabchange: 'onTabChange'
        }
    },
    onTabChange: function (tabPanel, newCard, oldCard, eOpts) {
        var viewmodel = this.getViewModel();
        if (newCard.xtype == "PContractProduct_BomColor_MainView") {
            viewmodel.set('isHidden_btnLuu', true);
            viewmodel.set('ishiddenActionColumn', true);
        }
        else {
            viewmodel.set('ishiddenActionColumn', false);
            viewmodel.set('isHidden_btnLuu', false);
            if (newCard.xtype == 'PContract_PO_Main') {
                viewmodel.set('isHidden_btnLuu', true);
                var storeproduct = viewmodel.getStore('PContractProductTreeStore');
                storeproduct.loadStore(viewmodel.get('PContract.id'), viewmodel.get('productid_link_filter'));
            } else {
                if (newCard.xtype == 'PContractSKUMainView') {
                    viewmodel.set('isHidden_btnLuu', true);
                    var MauSanPhamStore = viewmodel.getStore('MauSanPhamStore');
                    MauSanPhamStore.getmausanpham_by_pcontract(viewmodel.get('IdPContract'));

                    var poStore = viewmodel.getStore('PContractPOList');
                    poStore.loadAccept_ByContract(viewmodel.get('PContract.id'), viewmodel.get('IdProduct_filterPO'));
                }
                else if (newCard.xtype == 'PContract_POrder_Main') {
                    viewmodel.set('isHidden_btnLuu', true);
                    viewmodel.set('po_selected', null);
                    var productFilterStore = viewmodel.getStore('ProductFilterStore');
                    productFilterStore.loadStore_pair_andnotpair(viewmodel.get('PContract.id'));

                    var PContractPOList = viewmodel.getStore('PContractPOList');
                    PContractPOList.loadAccept_ByContract(viewmodel.get('PContract.id'), viewmodel.get('IdProduct_filterPO'));
                }
                else if (newCard.xtype == 'PContractProduct_Bom2_TabColorView') {
                    viewmodel.set('isHidden_btnLuu', true);
                    var tab = Ext.getCmp('PContractProduct_Bom2_TabColorView');
                    tab.getController().onChangeProduct();

                    var UnitStore = viewmodel.getStore('UnitStore');
                    UnitStore.loadStore();
                }
                else if (newCard.xtype == 'PContractProduct_Bom_TabColorView') {
                    viewmodel.set('isHidden_btnLuu', true);
                    var tab = Ext.getCmp('PContractProduct_Bom_TabColorView');
                    tab.getController().onChangeProduct();

                    var UnitStore = viewmodel.getStore('UnitStore');
                    UnitStore.loadStore();
                }
                else if (newCard.xtype == 'PContract_Bom_View') {
                    viewmodel.set('isHidden_btnLuu', true);
                    var productid_link = viewmodel.get('IdProduct');
                    if (productid_link != 0) {
                        Ext.getCmp('PContract_Bom_View').getController().onChangeProduct();
                    }

                    var UnitStore = viewmodel.getStore('UnitStore');
                    UnitStore.loadStore();
                }
                else if (newCard.xtype == 'Balance_Main_Pcontract') {
                    viewmodel.set('isHidden_btnLuu', true);
                    var storeproduct = viewmodel.getStore('PContractProductTreeStoreBalance');
                    storeproduct.loadStore(viewmodel.get('PContract.id'), viewmodel.get('productid_link_filter'));
                    var storematerial = viewmodel.getStore('Material_ByContract_Store');
                    storematerial.loadMaterialByContract(viewmodel.get('PContract.id'));
                }
                else if (newCard.xtype == 'Stockin_M_List_Main') {
                    // console.log('Stockin_M_List_Main')
                    viewmodel.set('isHidden_btnLuu', true);
                    var tab = Ext.getCmp('Stockin_M_List_Main');
                    tab.getController().onPContract_Stockin(viewmodel.get('IdPContract'));
                }
                else if (newCard.xtype == 'POrderBomKyThuatView') {
                    // console.log('Stockin_M_List_Main')
                    viewmodel.set('isHidden_btnLuu', true);
                    var tab = Ext.getCmp('POrderBomKyThuatView');
                    tab.getController().CreateColumns();

                    var porderid_link = 0;
                    var pcontractid_link = viewmodel.get('PContract.id');
                    var productid_link = viewmodel.get('IdProduct');
                    if (productid_link > 0) {
                        var store = viewmodel.getStore('POrderBom2Store');
                        store.getbom_by_porder(porderid_link, pcontractid_link, productid_link);
                    }
                }
                // else if (newCard.xtype == 'Recon_Main_Pcontract') {
                //     viewmodel.set('isHidden_btnLuu', true);
                //     var tab = Ext.getCmp('Recon_Main_Pcontract');
                //     tab.getController().setPcontractID(viewmodel.get('PContract.id'));
                //     var storeproduct_recon = viewmodel.getStore('PContractProductTreeStoreRecon');
                //     storeproduct_recon.loadStore(viewmodel.get('PContract.id'), viewmodel.get('productid_link_filter'));

                // }
                else {
                    var storeproductlist = viewmodel.getStore('PContractProductStore');
                    storeproductlist.load();
                    var storeproductpair = viewmodel.getStore('PContractProductPairStore');
                    storeproductpair.load();
                }
            }
        }
    },
    onLoadData: function (id, type) {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        if (type != "" && type != null) {
            var strSplit = type.toString().split('_');
            if (strSplit.length > 2) {
                viewmodel.set('pcontract_poid_link_filter', strSplit[1]);
                viewmodel.set('productid_link_filter', strSplit[2]);
                viewmodel.set('IdProduct_filterPO', strSplit[2]);
            }
        }
        viewmodel.set('IdPContract', id);
        viewmodel.set('PContract.id', id);
        // me.IdPContract = id;

        var infoView = me.down('#PContractInfoView');
        console
        infoView.IdPContract = id;
        infoView.getController().loadInfo(id);

        var listProducView = me.down('#PContractListProductView');
        listProducView.IdPContract = id;

        var productpair = me.down('#PContractPairProductView');
        productpair.IdPcontract = id;

        var storepair = viewmodel.getStore('PContractProductPairStore');
        var store = viewmodel.getStore('PContractProductStore');
        // sort PContractProductStore
        store.getSorters().remove('productid_link');
        store.getSorters().add('productBuyerCode');

        if (id > 0) {
            var productid_link_filter = viewmodel.get('productid_link_filter');
            store.loadStore(id, productid_link_filter);
            storepair.loadStore(id, productid_link_filter);
        }
        else {
            store.removeAll();
        }


    },
    onQuayLai: function () {
        this.redirectTo('lspcontract');
    },
    onActivate: function () {
        var th = this;
        var me = this.getView();
        var viewmodel = this.getViewModel();

        var KHStore = viewmodel.getStore('CustomerStore');
        var VenderStore = viewmodel.getStore('Vender');
        var EndBuyerStore = viewmodel.getStore('EndBuyer');
        var MarketStore = viewmodel.getStore('MarketStore');
        var PContractTypeStore = viewmodel.getStore('ContractTypes');

        KHStore.loadStore(10, false);
        VenderStore.loadStore(11, false);
        VenderStore.sort('code', 'ASC');

        EndBuyerStore.loadStore(12, false);
        EndBuyerStore.sort('code', 'ASC');

        // BranchStore.loadStore(false);
        // SeasonStore.loadStore(false);
        // UnitStore.loadStore();
        MarketStore.loadStore(1);
        MarketStore.sort('name', 'ASC');
        PContractTypeStore.loadStore();

        if (viewmodel.get('PContract.id') > 0 && viewmodel.get('isWindow')) {
            th.onLoadData(viewmodel.get('PContract.id'));
            var tab = me.down('#tabmain');
            tab.setActiveTab(viewmodel.get('tabActivate'));
        }
    },
    onLuu: function () {
        var me = this.getView();
        me.setLoading("Đang lưu dữ liệu");

        var t = this;
        var viewmodel = this.getViewModel();

        var params = new Object();
        var data = new Object();

        data = viewmodel.get('PContract');
        data.id = viewmodel.get('IdPContract');
        data.orgrootid_link = 0;
        data.status = 1;
        data.usercreatedid_link = 0;
        data.datecreated = '';

        if (data.payer == 1) {
            data.orgpayerid_link = data.orgvendorid_link;
            // data.orgshowid_link = data.orgvendorid_link;
        }
        else {
            data.orgpayerid_link = data.orgbuyerid_link;
            // data.orgshowid_link = data.orgbuyerid_link;
        }

        // if(data.orgshow == 1){
        //     data.orgshowid_link = data.orgvendorid_link;
        // }            
        // else{
        //     data.orgshowid_link = data.orgbuyerid_link;
        // }

        params.data = data;
        params.msgtype = "PContract_CREATE";
        params.message = "Tạo đơn hàng";

        GSmartApp.Ajax.post('/api/v1/pcontract/create', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: "Lưu thành công",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });

                        if (data.id == 0) {
                            t.redirectTo("lspcontract/" + response.id + "/edit");
                        }
                    }
                    else {
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        var viewInfo = me.down('#PContractInfoView');
                        viewInfo.down('#contractcode').focus();
                    }

                } else {
                    var response = Ext.decode(response.responseText);
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
                me.setLoading(false);
            })
    }
})