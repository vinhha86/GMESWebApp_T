Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_Edit.CutplanProcessing_Edit_M_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CutplanProcessing_Edit_M_Controller',
	init: function() {
        
	},
	control:{
		'#btnPlusPorder': {
            click: 'onBtnPlusPorder'
        },
        '#btnSearchPorder': {
            click: 'onBtnSearchPorder'
        },
        '#comboboxSku': {
            select: 'onSelectSku'
        },
        '#comboboxColor': {
            select: 'onSelectMauSP'
        },
        '#comboboxCutPlanRow': {
            select: 'onSelectCutPlanRow'
        },
    },
    
    onBtnPlusPorder: function () {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var cutplanProcessing = viewModel.get('cutplanProcessing');
        var pordercode = viewModel.get('cutplanProcessing.pordercode');

        if (pordercode == null || pordercode.length == 0) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Mã lệnh không được bỏ trống',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }

        var mainView = Ext.getCmp('cutplan_processing_edit');
        if(mainView) mainView.setLoading(true);
        
        var params = new Object();
        params.pordercode = pordercode;

        GSmartApp.Ajax.post('/api/v1/porderlist/getbyexactpordercode', Ext.JSON.encode(params),
            function (success, response, options) {
                if(mainView) mainView.setLoading(false);
                var response = Ext.decode(response.responseText);
                if (success) {
                    if (response.respcode == 200) {
                        // console.log(response);
                        if (response.message == 'Mã lệnh không tồn tại') {
                            Ext.Msg.show({
                                title: 'Thông báo',
                                msg: response.message,
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        } else {
                            Ext.Msg.show({
                                title: 'Thông báo',
                                msg: 'Tìm lệnh thành công',
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                            // load bản ghi đầu tiên trả vê, cần sửa lại nếu có nhiều lệnh trùng ordercode
                            viewModel.set('porder', response.data[0]); // VCTK-203621-14/05/21_1
                            viewModel.set('cutplanProcessing.porderid_link', response.data[0].id);
                            viewModel.set('cutplanProcessing.pcontractid_link', response.data[0].pcontractid_link);
                            viewModel.set('cutplanProcessing.productid_link', response.data[0].productid_link);

                            var porderid_link = response.data[0].id;
                            viewModel.set('porderid_link', porderid_link);
                            var pcontractid_link = response.data[0].pcontractid_link;
                            var productid_link = response.data[0].productid_link;
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

                        }
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lỗi' + response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lỗi' + response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    onBtnSearchPorder: function () {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var pordercode = viewModel.get('cutplanProcessing.pordercode');
        var viewId = 'cutplan_processing_edit';
        var cutplanProcessing = viewModel.get('cutplanProcessing');
        var granttoorgid_link = null;

        if ((pordercode == null || pordercode.length == 0) && granttoorgid_link == null) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Mã lệnh không được bỏ trống',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }

        var form = Ext.create('Ext.window.Window', {
            height: 400,
            width: 500,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Danh sách lệnh',
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'HandoverDetailPorderSearch',
                viewModel: {
                    type: 'HandoverDetailPorderSearchViewModel',
                    data: {
                        pordercode: pordercode,
                        granttoorgid_link: granttoorgid_link,
                        viewId: viewId
                    }
                }
            }]
        });
        form.show();

        // get event
        form.down('#HandoverDetailPorderSearch').getController().on('selectPOrder', function (record) {
            // console.log(record);
            var porder = record.data;
            viewModel.set('porder', porder);
            viewModel.set('cutplanProcessing.pordercode', porder.ordercode);

            viewModel.set('cutplanProcessing.porderid_link', porder.id);
            viewModel.set('porderid_link', porder.id);
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

            form.close();
        });
        form.down('#HandoverDetailPorderSearch').getController().on('found0Porder', function () {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Không tìm thấy lệnh',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            form.close();
        });
        form.down('#HandoverDetailPorderSearch').getController().on('found1Porder', function (record) {
            // console.log(record);
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Tìm thấy 1 lệnh',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            var porder = record[0].data;
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

            form.close();
        });
    },
    onEnterPOrderSearch: function(textfield, e, eOpts){
        var m = this;
        if(e.getKey() == e.ENTER) {
            m.onBtnSearchPorder();
        }
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
                        if (!listcolorid.includes(data.color_id)) {
                            var colorObj = new Object();
                            colorObj.id = data.color_id;
                            colorObj.name = data.mauSanPham;
                            listcolorData.push(colorObj);
                            listcolorid.push(data.color_id);
                        }
                    }

                    // set data cho store cbbox
                    // viewModel.set('listcolorData', listcolorData);
                    var ColorStore = viewModel.getStore('ColorStore');
                    // ColorStore.loadData(listcolorData);
                    ColorStore.removeAll();
                    ColorStore.insert(0, listcolorData);
                }
            })
    },

    onSelectSku: function (cbbox, newValue, oldValue, eOpts) {
        this.loadCutPlanRowStore();
    },
    onSelectMauSP: function (cbbox, newValue, oldValue, eOpts) {
        this.loadCutPlanRowStore();
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
                        // filter
                        // var CutPlanRowStoreFilter = CutPlanRowStore.getFilters();
                        // if (!m.CutPlanRowStoreFilter) {
                        //     console.log('in here');
                        //     m.CutPlanRowStoreFilter = CutPlanRowStoreFilter.add({
                        //         id: 'CutPlanRowStoreFilter',
                        //         property: 'type',
                        //         value: '0',
                        //         exactMatch: true
                        //     });
                        // }

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

                    }
                }
            });
        }
    },

    onSelectCutPlanRow: function (cbbox, newValue, oldValue, eOpts) {
        var viewModel = this.getViewModel();
        var cutPlanRow = newValue.data;
        viewModel.set('cutPlanRow', cutPlanRow);
        viewModel.set('cutplanProcessing.cutplanrowid_link', cutPlanRow.id)
        // console.log(cutPlanRow);
    },
})