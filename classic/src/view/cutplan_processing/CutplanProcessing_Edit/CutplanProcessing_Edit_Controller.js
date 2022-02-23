Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_Edit.CutplanProcessing_Edit_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CutplanProcessing_Edit_Controller',
    init: function () {
        var viewModel = this.getViewModel();
        var OrgStore = viewModel.getStore('OrgStore');
        // tải những bàn cắt thuộc tổ cắt của user
        OrgStore.loadOrgByTypeBanCat();

        var SkuStore = viewModel.getStore('Sku');
        SkuStore.getSorters().add('product_code');
    },
    listen: {
        controller: {
            '*': {
                loaddata: 'onLoadData',
                // newdata: 'onNewData',
                // urlBack:'onUrlBack'
            }
        }
    },
    control: {
        '#btnBack': {
            click: 'onBackPage'
        },
        '#btnLuu': {
            click: 'onSave'
        },
    },
    onLoadData: function (id, type) {
        // console.log('onLoadData: ' + id + ' ' + type);
        var m = this;
        var viewModel = this.getViewModel();

        var porderObj = GSmartApp.util.State.get('porderObj');
		if(porderObj != null){

            var porder = porderObj; console.log(porder);
            viewModel.set('porder', porder);
            viewModel.set('cutplanProcessing.pordercode', porder.ordercode);
            viewModel.set('cutplanProcessing.porderid_link', porder.id);
            viewModel.set('cutplanProcessing.pcontractid_link', porder.pcontractid_link);
            viewModel.set('cutplanProcessing.productid_link', porder.productid_link);

            var porderid_link = porder.id;
            var pcontractid_link = porder.pcontractid_link;
            var productid_link = porder.productid_link;
            var producttypeid_link = 20;

            // load sku store (npl)
            if (pcontractid_link != null) {
                var SkuStore = viewModel.getStore('Sku');
                SkuStore.load_by_type_and_pcontract(producttypeid_link, pcontractid_link);
            }

            // load color store
            if (pcontractid_link != null && productid_link != null) {
                m.loadColorStore(pcontractid_link, productid_link);
            }

			GSmartApp.util.State.set('porderObj', null);
		}

        if (id == 0) {
            viewModel.set('cutplanProcessing.processingdate', new Date());
        } else {
            m.getInfo(id);
        }
    },
    onBackPage: function () {
        this.redirectTo('cutplan_processing');
    },
    getInfo: function (id) {
        var m = this;
        var viewModel = this.getViewModel();
        var CutplanProcessingDStore = viewModel.getStore('CutplanProcessingDStore');

        var mainView = Ext.getCmp('cutplan_processing_edit');
        if(mainView) mainView.setLoading(true);

        var params = new Object();
        params.id = id;
        GSmartApp.Ajax.post('/api/v1/cutplan_processing/cutplan_processing_getbyid', Ext.JSON.encode(params),
            function (success, response, options) {
                if(mainView) mainView.setLoading(false);
                var response = Ext.decode(response.responseText);
                if (response.respcode == 200) {
                    // console.log(response.data);
                    if(response.data.cutplanProcessingD == null) response.data.cutplanProcessingD = [];
                    viewModel.set('cutplanProcessing', response.data);

                    var date = Ext.Date.parse(response.data.processingdate, 'c');
                    if (date == null) date = new Date(response.data.processingdate);
                    viewModel.set('cutplanProcessing.processingdate', date);

                    // dựa vào thông tin cutplan_processing để load store sku và color
                    if (response.data.porderId != null || response.data.porderId != 0) {
                        var porderid_link = response.data.porderid_link;
                        var pcontractid_link = response.data.pcontractid_link;
                        var productid_link = response.data.productid_link;
                        var producttypeid_link = 20;
                        viewModel.set('porderid_link', porderid_link);
                        // load sku store (npl)
                        if (pcontractid_link != null) {
                            var SkuStore = viewModel.getStore('Sku');
                            SkuStore.load_by_type_and_pcontract(producttypeid_link, pcontractid_link);
                        }

                        // load color store
                        if (pcontractid_link != null && productid_link != null) {
                            m.loadColorStore(pcontractid_link, productid_link);
                        }

                        // load cutplanRow store
                        m.loadCutPlanRowStore();

                        // set CutplanProcessingDStore
                        var cutplanProcessing = viewModel.get('cutplanProcessing');
                        CutplanProcessingDStore.removeAll();
                        CutplanProcessingDStore.insert(0, cutplanProcessing.cutplanProcessingD);

                    }
                }
            })
    },
    onSave: function () {
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var params = new Object();
        params.data = [];
        var cutplanProcessing = viewModel.get('cutplanProcessing');

        var cutplanProcessingD = cutplanProcessing.cutplanProcessingD;
        if (cutplanProcessingD != null) {
            for (var i = 0; i < cutplanProcessingD.length; i++) {
                if (cutplanProcessingD[i].id == 0 || typeof cutplanProcessingD[i].id === 'string') {
                    cutplanProcessingD[i].id = null;
                }
            }
        }
        // console.log(stockin);
        params.data.push(cutplanProcessing);
        params.porderid_link = viewModel.get('porderid_link');
        params.material_skuid_link = viewModel.get('cutplanProcessing.material_skuid_link');
        params.colorid_link = viewModel.get('cutplanProcessing.colorid_link');

        // console.log(params);
        me.setLoading(true);

        GSmartApp.Ajax.post('/api/v1/cutplan_processing/cutplan_processing_create', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                var response = Ext.decode(response.responseText);
                if (success) {
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        this.redirectTo("cutplan_processing/" + response.id + "/edit");
                        m.getInfo(response.id);
                    } else{
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thất bại: ' + response.message,
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
    loadColorStore: function (pcontractid_link, productid_link) {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var params = new Object();
        params.pcontractid_link = pcontractid_link;
        params.productid_link = productid_link;

        GSmartApp.Ajax.post('/api/v1/pcontractsku/getbypcontract_product', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);

                    var listcolorData = new Array();
                    var listcolorid = new Array();
                    for (var i = 0; i < response.data.length; i++) {
                        var data = response.data[i];
                        if (!listcolorid.includes(parseInt(data.color_id))) {
                            var colorObj = new Object();
                            colorObj.id = parseInt(data.color_id);
                            colorObj.name = data.mauSanPham;
                            listcolorData.push(colorObj);
                            listcolorid.push(data.color_id);
                        }
                    }

                    // set data cho store cbbox
                    var ColorStore = viewModel.getStore('ColorStore');
                    // ColorStore.loadData(listcolorData);
                    ColorStore.removeAll();
                    ColorStore.insert(0, listcolorData);

                    var colorid_link = viewModel.get('cutplanProcessing.colorid_link')
                    me.down('#comboboxColor').setValue(colorid_link);
                }
            })
    },

    loadCutPlanRowStore: function () {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var porderid_link = viewModel.get('cutplanProcessing.porderid_link');
        var pcontractid_link = viewModel.get('cutplanProcessing.pcontractid_link');
        var productid_link = viewModel.get('cutplanProcessing.productid_link');
        var material_skuid_link = viewModel.get('cutplanProcessing.material_skuid_link');
        var colorid_link = viewModel.get('cutplanProcessing.colorid_link');

        if (material_skuid_link != null && colorid_link != null) {
            var mainView = Ext.getCmp('cutplan_processing_edit');
            if(mainView) mainView.setLoading(true);

            var CutPlanRowStore = viewModel.getStore('CutPlanRowStore');
            CutPlanRowStore.loadStore_bycolor_async(
                colorid_link, porderid_link, material_skuid_link,
                productid_link, pcontractid_link
            );
            CutPlanRowStore.load({
                scope: this,
                callback: function (records, operation, success) {
                    if(mainView) mainView.setLoading(false);
                    if (!success) {
                        // this.fireEvent('logout');
                    } else {
                        // loop
                        var newArray = new Array();
                        var CutPlanRowStoreData = CutPlanRowStore.getData().items;
                        // console.log(CutPlanRowStoreData);

                        for (var i = 0; i < CutPlanRowStoreData.length; i++) {
                            if (CutPlanRowStoreData[i].get('type') == 0) {
                                newArray.push(CutPlanRowStoreData[i].data);
                            }
                        }
                        CutPlanRowStore.loadData(newArray);
                        var cutplanrowid_link = viewModel.get('cutplanProcessing.cutplanrowid_link')
                        if(cutplanrowid_link != null){
                            var record = CutPlanRowStore.findRecord('id', cutplanrowid_link);
                            viewModel.set('cutPlanRow', record.data);
                        }
                    }
                }
            });
        }
    },
})