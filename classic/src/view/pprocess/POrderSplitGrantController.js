Ext.define('GSmartApp.view.pprocess.POrderSplitGrantController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pordersplitgrant',
    onActivate: function(){
        var store_orgtosx = Ext.data.StoreManager.lookup('store_orgtosx');
        if (null != store_orgtosx){
            store_orgtosx.loadConfig();
            store_orgtosx.load();
        }  
                
        var viewModel = this.getViewModel();
        num_amountsplit = this.lookupReference('num_amountsplit');
        num_amountsplit.setMaxValue(viewModel.get('amountcutsum'));
    },
    onCloseButton: function() {
        var mywin = Ext.WindowManager.getActive();
        if (mywin) {
            mywin.close();
        }
    },
    onSelectButton: function(button){
        var myModel = this.getViewModel();
        if (myModel.get('splittoorgid_link') == null){
            Ext.Msg.alert('Tách chuyền','Cần phải chọn Tổ sx trước khi thực hiện');
            return;
        }        
        var data =new Array();

        var order=new Object();
        order.granttoorgid_link = myModel.get('sourceorgid_link');
        order.porderid_link = myModel.data.porderid_link;
        order.id = myModel.data.pprocesingid;
        order.ordercode = myModel.get('ordercode');
        order.grantamount = myModel.get('amountorigin');
        data.push(order);

        var ordersplit=new Object();
        ordersplit.granttoorgid_link = myModel.get('splittoorgid_link');
        ordersplit.porderid_link = myModel.data.porderid_link;
        ordersplit.ordercode = myModel.get('ordercode');
        ordersplit.grantamount = myModel.get('amountsplit');
        data.push(ordersplit);

        var params=new Object();
        params.data = data;

		GSmartApp.Ajax.post('/api/v1/pprocess/grant', Ext.JSON.encode(params),
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
                        msg: "Tách chuyền thất bại",
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
