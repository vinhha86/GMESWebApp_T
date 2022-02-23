Ext.define('GSmartApp.view.pprocess.POrderSubProcessController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pordersubprocess',

    onActivate: function(){
        var viewModel = this.getViewModel();
        var store_workingprocess = Ext.data.StoreManager.lookup('store_workingprocess'); 
        store_workingprocess.loadByOrderID(viewModel.get('porderid_link'));
    },
    onCloseButton: function() {
        var mywin = Ext.WindowManager.getActive();
        if (mywin) {
            mywin.close();
        }
    },
    onSelectButton: function(button){
      
        var store_workingprocess = Ext.data.StoreManager.lookup('store_workingprocess');
        var records = store_workingprocess.data.items;
        console.log(records);
        //console.log(Ext.JSON.encode(records));

        var data =new Array();
        Ext.Array.each(records, function(rc) {
            //console.log(Ext.JSON.encode(rc.data));
            // var order=new Object();
            // if (Ext.isNumber(rc.data.id))
            //     order.porderid = rc.data.id;
            // else
            //     order.porderid = -1;
            // order.ordercode = rc.data.ordercode;
            data.push(rc.data);
        });

        var viewModel = this.getViewModel();
        var params=new Object();
        params.porderid_link = viewModel.get('porderid_link');
        params.pprocesingid = viewModel.get('pprocesingid');
        params.ordercode = viewModel.get('ordercode');
        params.data = data;

        GSmartApp.Ajax.post('/api/v1/psubprocess/update_subprocess', Ext.JSON.encode(params),
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
                    msg: "Công đoạn phụ thất bại",
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
