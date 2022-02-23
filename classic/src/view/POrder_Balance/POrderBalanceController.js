Ext.define('GSmartApp.view.POrder_Balance.POrderBalanceController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrderBalanceController',
    init: function () {
        var viewModel = this.getViewModel();
        var porderid_link = viewModel.get('porderid_link');

        var PorderSewingCostStore = viewModel.getStore('PorderSewingCostStore');
        PorderSewingCostStore.loadByPorderUnused(porderid_link);

        var POrderBalanceStore = viewModel.getStore('POrderBalanceStore');
        POrderBalanceStore.loadStore(porderid_link);
    },

    control: {
        '#btnSapXepCumCongDoan': {
            click: 'onBtnSapXepCumCongDoan'
        },
        '#btnXoaViTriMulti': {
            click: 'onBtnXoaViTriMulti',
        },
        '#btnThemViTri': {
            click: 'onBtnThemViTri'
        },
    },
    onBtnSapXepCumCongDoan: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var porderid_link = viewModel.get('porderid_link');

        var form = Ext.create('Ext.window.Window', {
            // height: 400,
            width: 400,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Sắp xếp cụm công đoạn',
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'POrderBalance_Sort_View',
                viewModel: {
                    data: {
                        porderid_link: porderid_link,
                    }
                }
            }]
        });
        form.show();

        form.down('#POrderBalance_Sort_View').getController().on('reloadPOrderBalanceStore', function(){
            var POrderBalanceStore = viewModel.get('POrderBalanceStore');
            POrderBalanceStore.load();
            // form.close();
        })
    },
    onBtnThemViTri: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var porderid_link = viewModel.get('porderid_link');
        // console.log('porderid_link : ' + porderid_link);
        var form = Ext.create('Ext.window.Window', {
            // height: 400,
            width: 400,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Thêm cụm công đoạn',
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'POrderBalance_Detail_AddPosition',
                viewModel: {
                    type: 'POrderBalance_Detail_AddPositionViewModel',
                    data: {
                        porderid_link: porderid_link,
                    }
                }
            }]
        });
        form.show();

        form.down('#POrderBalance_Detail_AddPosition').getController().on('reloadPOrderBalanceStore', function(){
            var POrderBalanceStore = viewModel.get('POrderBalanceStore');
            POrderBalanceStore.load();
            form.close();
        })
    },
    onBtnXoaViTriMulti: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var POrderBalanceStore = viewModel.getStore('POrderBalanceStore');
        var PorderSewingCostStore = viewModel.getStore('PorderSewingCostStore');
        var selection = me.down('#POrderBalance_Detail').getSelectionModel().getSelection();
        // console.log(selection);
        if(selection.length == 0){
            Ext.Msg.show({
                title: "Thông báo",
                msg: "Bạn chưa chọn cụm công đoạn",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
            return;
        }

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    var idList = new Array();
                    for(var i = 0; i < selection.length; i++) {
                        idList.push(selection[i].get('id'));
                    }

                    me.setLoading(true);

                    var params = new Object();
                    params.idList = idList;

                    GSmartApp.Ajax.post('/api/v1/porder_balance/delete_multi', Ext.JSON.encode(params),
                        function (success, response, options) {
                            me.setLoading(false);
                            if (success) {
                                var response = Ext.decode(response.responseText);
                                if (response.respcode == 200) {
                                    Ext.Msg.show({
                                        title: "Thông báo",
                                        msg: "Xóa thành công!",
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'Đóng'
                                        },
                                    });
                                    POrderBalanceStore.load();
                                    PorderSewingCostStore.load();
                                }
                                else {
                                    Ext.Msg.show({
                                        title: "Thông báo",
                                        msg: "Xóa thất bại!",
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'Đóng'
                                        }
                                    });
                                }
                            } else {
                                Ext.Msg.show({
                                    title: "Thông báo",
                                    msg: "Xóa thất bại!",
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng'
                                    }
                                });
                            }
                        })
                }
            }
        });
    },
    onBtnXoaViTri: function(grid, rowIndex, colIndex){
        var m = this;
        grid.setLoading('Đang xóa dữ liệu');
        var viewmodel = this.getViewModel();
        var POrderBalanceStore = viewmodel.getStore('POrderBalanceStore');
        var PorderSewingCostStore = viewmodel.getStore('PorderSewingCostStore');

        var rec = POrderBalanceStore.getAt(rowIndex);

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa cụm công đoạn ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    var params = new Object();
                    params.id = rec.get('id');

                    GSmartApp.Ajax.post('/api/v1/porder_balance/delete', Ext.JSON.encode(params),
                        function (success, response, options) {
                            grid.setLoading(false);
                            if (success) {
                                var response = Ext.decode(response.responseText);
                                if (response.respcode == 200) {
                                    Ext.Msg.show({
                                        title: "Thông báo",
                                        msg: "Xóa thành công",
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'Đóng'
                                        },
                                        fn: function () {
                                            // POrderBalanceStore.remove(rec);
                                            POrderBalanceStore.load();
                                            PorderSewingCostStore.load();
                                        }
                                    });
                                }
                                else {
                                    Ext.Msg.show({
                                        title: "Thông báo",
                                        msg: "Xóa thất bại",
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'Đóng'
                                        }
                                    });
                                }
                            }
                            else {
                                Ext.Msg.show({
                                    title: "Thông báo",
                                    msg: "Xóa thất bại",
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng'
                                    }
                                });
                            }
                        })
                }else{
                    grid.setLoading(false);
                }
            }
        });
    },
    onBeforeDropBalanceDetailSubToSub: function(node, data, overModel, dropPosition, dropHandlers, eOpts){
        console.log('SubToSub');
        console.log(data); // drag data
        console.log(overModel);  // data where dropped
        console.log(dropPosition);

        var me = this;

        // if(overModel == null) {
        //     dropHandlers.cancelDrop();
        //     return;
        // }
        if(data == null) {
            dropHandlers.cancelDrop();
            return;
        }

        var porderbalanceid_link_next = overModel.data.porderbalanceid_link;
        var porderbalanceid_link_prev = data.records[0].data.porderbalanceid_link;
        var porders_balance_processid_link = data.records[0].data.id; 

        if(porderbalanceid_link_next == porderbalanceid_link_prev){
            dropHandlers.cancelDrop();
            return;
        }

        me.onDropBalanceDetailSubToSub(porders_balance_processid_link, 
            porderbalanceid_link_prev, porderbalanceid_link_next, dropHandlers);
        // dropHandlers.cancelDrop();
    },
    onDropBalanceDetailSubToSub: function(porders_balance_processid_link, 
        porderbalanceid_link_prev, porderbalanceid_link_next, dropHandlers){
        var viewModel = this.getViewModel();
        var POrderBalanceStore = viewModel.getStore('POrderBalanceStore');
        // var PorderSewingCostStore = viewModel.getStore('PorderSewingCostStore');

        var params = new Object();
        params.porders_balance_processid_link = porders_balance_processid_link;
        params.porderbalanceid_link_next = porderbalanceid_link_next;

        GSmartApp.Ajax.post('/api/v1/porder_balance_process/updatePorderBalanceId', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        POrderBalanceStore.load();
                        // var porderBalancePrev = POrderBalanceStore.getById(porderbalanceid_link_prev);
                        // var porderBalanceNext = POrderBalanceStore.getById(porderbalanceid_link_next);
                        // console.log(porderBalancePrev);
                        // console.log(porderBalanceNext);
                    }
                    else {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Xoá thất bại",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        dropHandlers.cancelDrop();
                    }
                }
                else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: "Xoá thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    dropHandlers.cancelDrop();
                }
            })
    },
    onBeforeDropBalanceDetailSub: function(node, data, overModel, dropPosition, dropHandlers, eOpts){
        console.log('SubToList');
        console.log(data); // drag data
        console.log(overModel);  // data where dropped
        console.log(dropPosition);

        var me = this;

        // if(overModel == null) {
        //     dropHandlers.cancelDrop();
        //     return;
        // }
        if(data == null) {
            dropHandlers.cancelDrop();
            return;
        }

        // var porders_sewingcostid_link = overModel.data.id;
        var porders_balance_processid_link = data.records[0].data.id;

        me.onDropBalanceDetailSub(porders_balance_processid_link, dropHandlers);
        // dropHandlers.cancelDrop();
    },
    onDropBalanceDetailSub: function(porders_balance_processid_link, dropHandlers){
        var viewModel = this.getViewModel();
        // var POrderBalanceStore = viewModel.getStore('POrderBalanceStore');
        var PorderSewingCostStore = viewModel.getStore('PorderSewingCostStore');

        var params = new Object();
        params.porders_balance_processid_link = porders_balance_processid_link;

        GSmartApp.Ajax.post('/api/v1/porder_balance_process/delete', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        PorderSewingCostStore.load();
                    }
                    else {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Xoá thất bại",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        dropHandlers.cancelDrop();
                    }
                }
                else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: "Xoá thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    dropHandlers.cancelDrop();
                }
            })
    },
    onBeforeDropWorkingProcess: function (node, data, overModel, dropPosition, dropHandlers, eOpts) {
        console.log('ListToPosition');
        console.log(data); // drag data
        console.log(overModel);  // data where dropped
        console.log(dropPosition);

        var me = this;

        if(overModel == null) {
            dropHandlers.cancelDrop();
            return;
        }
        if(data == null) {
            dropHandlers.cancelDrop();
            return;
        }

        var porderbalanceid_link = overModel.data.id;
        var pordersewingcostid_link = data.records[0].data.id;

        me.onDropWorkingProcess(porderbalanceid_link, pordersewingcostid_link, dropHandlers);
        // dropHandlers.cancelDrop();
    },
    onDropWorkingProcess: function(porderbalanceid_link, pordersewingcostid_link, dropHandlers){

        var viewModel = this.getViewModel();
        var POrderBalanceStore = viewModel.getStore('POrderBalanceStore');

        var params = new Object();
        params.porderbalanceid_link = porderbalanceid_link;
        params.pordersewingcostid_link = pordersewingcostid_link;

        GSmartApp.Ajax.post('/api/v1/porder_balance_process/create', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        POrderBalanceStore.load();
                    }
                    else {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Thêm mới thất bại",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        dropHandlers.cancelDrop();
                    }
                }
                else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: "Thêm mới thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    dropHandlers.cancelDrop();
                }
            })
    },

});