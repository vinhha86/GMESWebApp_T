Ext.define('GSmartApp.view.cut_plan.warehouse.Cutplan_Warehouse_MainView_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Cutplan_Warehouse_MainView_Controller',
    init: function () {

    },
    listen: {
        controller: {
            'Stockout_order_warehouse_ViewController': {
                'AddMat': 'onAddMat'
            }
        }
    },
    onAddMat: function (data) {
        var viewmodel = this.getViewModel();
        var params = new Object();
        params.data = data;
        params.cutplanrowid_link = viewmodel.get('cutplanrowid_link');

        GSmartApp.Ajax.postJitin('/api/v1/warehouse/lockmaterial_cutplan', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        var storecutplan_warehouse = viewmodel.getStore('WarehouseCutplanStore');
                        storecutplan_warehouse.load();
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: "Có lỗi trong quá trình xử lý dữ liệu! Bạn hãy thử lại sau",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        }
                    });
                }
            })
    }
})