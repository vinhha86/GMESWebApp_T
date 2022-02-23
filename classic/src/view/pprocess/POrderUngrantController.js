Ext.define('GSmartApp.view.pprocess.POrderUngrantController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.porderungrant',

    onCloseButton: function() {
        var mywin = Ext.WindowManager.getActive();
        if (mywin) {
            mywin.close();
        }
    },
    onSelectButton: function(button){
        var myModel = this.getViewModel();
        var data =new Array();
        var order=new Object();
        order.porderid_link = myModel.data.porderid_link;
        order.pprocesingid = myModel.data.pprocesingid;
        order.ordercode = myModel.data.ordercode;
        order.comment = myModel.data.comment;
        data.push(order);

        var params=new Object();
        params.granttoorgid_link = myModel.data.granttoorgid_link;
        params.data = data;

        GSmartApp.Ajax.post('/api/v1/pprocess/ungrant', Ext.JSON.encode(params),
        function (success, response, options) {
            var response = Ext.decode(response.responseText);
            if (success) {
                var storeprocessing = Ext.data.StoreManager.lookup('store_processing');
                storeprocessing.reload();

                var mywin = Ext.WindowManager.getActive();
                if (mywin) {
                    mywin.close();
                }  
            } else {
                Ext.MessageBox.show({
                    title: "Thông báo",
                    msg: "Hủy phân chuyền thất bại",
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
            }
        });
    },
    onSplitAmountChange: function(e, newValue, oldValue, eOpts ) {
        var viewModel = this.getViewModel();
        viewModel.set('amountorigin',viewModel.get('amountcutsum') - newValue);
    }
});
