Ext.define('GSmartApp.view.POrder_Balance.POrderBalance_Sort_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrderBalance_Sort_ViewController',
    oldValue: '', // Lưu giá trị cũ trước khi sửa . Nếu giá trị mới không validate thì trả về giá trị cũ
    idAttribute: 0,
    init: function () {
        
    },
    control: {
        '#btnSort': {
            click: 'onSort'
        },
        '#btnSortDesc': {
            click: 'onSortDesc'
        },
        '#POrderBalance_Sort_View': {
            afterrender: 'onAfterrender'
        }
    },
    onAfterrender: function(){
        this.loadStore();
    },
    loadStore: function () {
        var m = this;
        var viewModel = this.getViewModel();
        var porderid_link = viewModel.get('porderid_link');

        var POrderBalanceStore = viewModel.getStore('POrderBalanceStore');
        POrderBalanceStore.loadStore(porderid_link);
    },
    onDrop: function(node, data, dropRec, dropPosition){
        var m = this;
        var viewModel = this.getViewModel();

        var POrderBalanceStore = viewModel.getStore('POrderBalanceStore');
        var arrData = [];
        POrderBalanceStore.each(function(rec,ind){
            var temp = new Object();
            temp.id = rec.get('id');
            temp.sortvalue = ind+1;
            arrData.push(temp);
        });

        var params = new Object();
        params.msgtype = "PORDERBALANCE_REORDER";
        params.message = "Sap xep cum cong doan san pham";
        params.data = arrData;

        GSmartApp.Ajax.post('/api/v1/porder_balance/porder_balance_reorder', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    // store.reload();
                    m.fireEvent('reloadPOrderBalanceStore');
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
    onSort: function (){
        var m = this;
        var viewModel = this.getViewModel();

        var POrderBalanceStore = viewModel.getStore('POrderBalanceStore');
        POrderBalanceStore.sort('balance_name','ASC');

        var arrData = [];

        POrderBalanceStore.each(function(rec,ind){
            var temp = new Object();
            temp.id = rec.get('id');
            temp.sortvalue = ind+1;
            arrData.push(temp);
        });
        POrderBalanceStore.sorters.clear();

        var params = new Object();
        params.msgtype = "PORDERBALANCE_REORDER";
        params.message = "Sap xep cum cong doan san pham";
        params.data = arrData;

        GSmartApp.Ajax.post('/api/v1/porder_balance/porder_balance_reorder', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    POrderBalanceStore.load();
                    m.fireEvent('reloadPOrderBalanceStore');
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lưu thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    POrderBalanceStore.load();
                }
            })
    },
    onSortDesc: function (){
        var m = this;
        var viewModel = this.getViewModel();

        var POrderBalanceStore = viewModel.getStore('POrderBalanceStore');
        POrderBalanceStore.sort('balance_name','DESC');

        var arrData = [];

        POrderBalanceStore.each(function(rec,ind){
            var temp = new Object();
            temp.id = rec.get('id');
            temp.sortvalue = ind+1;
            arrData.push(temp);
        });
        POrderBalanceStore.sorters.clear();

        var params = new Object();
        params.msgtype = "PORDERBALANCE_REORDER";
        params.message = "Sap xep cum cong doan san pham";
        params.data = arrData;

        GSmartApp.Ajax.post('/api/v1/porder_balance/porder_balance_reorder', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    POrderBalanceStore.load();
                    m.fireEvent('reloadPOrderBalanceStore');
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lưu thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    POrderBalanceStore.load();
                }
            })
    },
})