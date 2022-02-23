Ext.define('GSmartApp.view.pprocess.POrderSetReadyController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pordersetready',
    onCloseButton: function() {
        var mywin = Ext.WindowManager.getActive();
        if (mywin) {
            mywin.close();
        }
    },
    onSelectButton: function(button){
    
        var record = this.getViewModel().data.record;
        var data =new Array();
        var order=new Object();
        order.porderid_link = record.get('porderid_link');
        order.pprocesingid = record.get('id');
        order.ordercode = record.get('ordercode');
        order.productiondate = record.get('productiondate');
        order.sample_date = record.get('sample_date');
        order.cut_date = record.get('cut_date');
        order.qc_date = record.get('qc_date');
        order.packing_date = record.get('packing_date');
        order.stockout_date = record.get('stockout_date');
        data.push(order);

        var params=new Object();
        params.granttoorgid_link = record.get('granttoorgid_link');
        params.data = data;

		GSmartApp.Ajax.post('/api/v1/pprocess/setready', Ext.JSON.encode(params),
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
                        msg: "Chuyển trạng thái lệnh thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            });
  
    }
});
