Ext.define('GSmartApp.view.POrder_Grant_Balance.POrderGrantBalanceController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrderGrantBalanceController',
    init: function () {
        var viewModel = this.getViewModel();
        var porderid_link = viewModel.get('porderid_link');
        var pordergrantid_link = viewModel.get('pordergrantid_link');
        // console.log(porderid_link);
        // console.log(pordergrantid_link);

        var POrderBalanceStore = viewModel.getStore('POrderBalanceStore');
        POrderBalanceStore.loadStoreByPorderAndPorderGrant(porderid_link, pordergrantid_link);

        var Personnel_Store = viewModel.getStore('Personnel_Store');
        Personnel_Store.loadStore_byPorderGrant(pordergrantid_link);
    },
    onBeforePersonnelGroupDrop:function(node, data, overModel, dropPosition, dropHandlers, eOpts){
        // console.log(data); // drag data
        // console.log(overModel);  // data where dropped
        // console.log(dropPosition);

        var me = this;
        var viewModel = this.getViewModel();

        if(overModel == null) {
            dropHandlers.cancelDrop();
            return;
        }
        if(data == null) {
            dropHandlers.cancelDrop();
            return;
        }

        var personnelid_link = data.records[0].data.id;
        var porderbalanceid_link = overModel.data.id;
        var pordergrantid_link = viewModel.get('pordergrantid_link');

        // console.log(personnelid_link);
        // console.log(porderbalanceid_link);
        // console.log(pordergrantid_link);

        dropHandlers.cancelDrop();

        me.updatePorderGrantBalancePersonnel(personnelid_link, porderbalanceid_link, pordergrantid_link);
    },
    updatePorderGrantBalancePersonnel: function(personnelid_link, porderbalanceid_link, pordergrantid_link){
        var me = this;
        var viewModel = this.getViewModel();

        var POrderBalanceStore = viewModel.getStore('POrderBalanceStore');
        var Personnel_Store = viewModel.getStore('Personnel_Store');

        var params = new Object();
        params.personnelid_link = personnelid_link;
        params.porderbalanceid_link = porderbalanceid_link;
        params.pordergrantid_link = pordergrantid_link;

        GSmartApp.Ajax.post('/api/v1/porder_grant_balance/create', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Personnel_Store.load();
                        POrderBalanceStore.load();
                    }
                    else {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Thêm thất bại",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        // dropHandlers.cancelDrop();
                    }
                }
                else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: "Thêm thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    // dropHandlers.cancelDrop();
                }
            })
    },
    onBeforeWorkingProcessGroupDrop: function(node, data, overModel, dropPosition, dropHandlers, eOpts){
        var me = this;
        var viewModel = this.getViewModel();

        if(overModel == null) {
            dropHandlers.cancelDrop();
            return;
        }
        if(data == null) {
            dropHandlers.cancelDrop();
            return;
        }

        console.log(data);
        var porderbalanceid_link = data.records[0].data.id;
        var pordergrantid_link = viewModel.get('pordergrantid_link');
        var personnelid_link = data.records[0].data.personnelId;

        dropHandlers.cancelDrop();

        me.deletePorderGrantBalancePersonnel(personnelid_link, porderbalanceid_link, pordergrantid_link);
    },
    deletePorderGrantBalancePersonnel: function(personnelid_link, porderbalanceid_link, pordergrantid_link){
        var me = this;
        var viewModel = this.getViewModel();

        var POrderBalanceStore = viewModel.getStore('POrderBalanceStore');
        var Personnel_Store = viewModel.getStore('Personnel_Store');

        var params = new Object();
        params.personnelid_link = personnelid_link;
        params.porderbalanceid_link = porderbalanceid_link;
        params.pordergrantid_link = pordergrantid_link;

        GSmartApp.Ajax.post('/api/v1/porder_grant_balance/delete', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Personnel_Store.load();
                        POrderBalanceStore.load();
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
                        // dropHandlers.cancelDrop();
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
                    // dropHandlers.cancelDrop();
                }
            })
    },
});