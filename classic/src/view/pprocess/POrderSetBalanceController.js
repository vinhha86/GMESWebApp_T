Ext.define('GSmartApp.view.pprocess.POrderSetBalanceController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pordersetbalance',
    onActivate: function(){
        var myModel = this.getViewModel();
        console.log(myModel.data.balance_date);
    },
    onCloseButton: function() {
        var mywin = Ext.WindowManager.getActive();
        if (mywin) {
            mywin.close();
        }
    },
    onSelectButton: function(button){
        var myModel = this.getViewModel();
        var radio1 = Ext.getCmp('rdo_balance_status_ok')
        if (radio1.getValue()){
            myModel.data.balance_status = 1;
        } else {
            if (null != myModel.data.balance_date){
                myModel.data.balance_status = 0;
            } else {
                myModel.data.balance_status = -1;
            }
        }


        var params=new Object();
        params.porderid_link = myModel.data.porderid_link;
        params.pprocesingid = myModel.data.pprocesingid;
        params.ordercode = myModel.data.ordercode;
        params.balance_status = myModel.data.balance_status;
        params.balance_date = myModel.data.balance_date;
        params.balance_rate = myModel.data.balance_rate;

		GSmartApp.Ajax.post('/api/v1/porder/updatebalance', Ext.JSON.encode(params),
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
                        msg: "Sửa cân đối NPL thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            });  
    },
    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    },  
    renderCell: function(value, record) {
        if (null == value) value = 0;
        return '<div style="font-size: 11px;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
    },       
});
