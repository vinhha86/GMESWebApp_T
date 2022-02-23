Ext.define('GSmartApp.view.pprocess.POrderListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.porderlist',
    init: function() {
        this.callParent(arguments);
        this.getView().store.loadAllLatest();
        //console.log(this.getView().store);
    },
    onPOrderFilterKeyup: function() {
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('porderFilterField'),
            filters = grid.store.getFilters();

        if (filterField.value) {
            this.porderFilter = filters.add({
                id: 'porderFilter',
                property: 'ordercode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.porderFilter) {
            filters.remove(this.porderFilter);
            this.porderFilter = null;
        }
    },
    onCloseButton: function() {
        var mywin = Ext.WindowManager.getActive();
        if (mywin) {
            mywin.close();
        }
    },
    onSelectButton: function(button){
        var viewModel = button.up('window').getViewModel();
        // console.log(viewModel.get('selectedorg'));
        
        // var records = this.getView().getSelection();
        // console.log(records);
        //console.log(Ext.JSON.encode(records));
        this.getView().store.filter('isselected', true);
        var records = this.getView().store.data.items;        

        var data =new Array();
        Ext.Array.each(records, function(rc) {
            //console.log(Ext.JSON.encode(rc.data));
            var order=new Object();
            order.granttoorgid_link = viewModel.get('selectedorg');
            if (Ext.isNumber(rc.data.id))
                order.porderid_link = rc.data.id;
            else
                order.porderid_link = -1;
            order.ordercode = rc.data.ordercode;
            order.grantamount = rc.data.totalorder;
            data.push(order);
        });


        var params=new Object();
        params.granttoorgid_link = viewModel.get('selectedorg');
        params.data = data;

		GSmartApp.Ajax.post('/api/v1/pprocess/grant', Ext.JSON.encode(params),
			function (success, response, options) {
				if (success) {
                    var response = Ext.decode(response.responseText);
                    if(response!=null && response!=''){
     
                     var storeprocessing = Ext.data.StoreManager.lookup('store_processing');
                     storeprocessing.loadByCurrentDate();
     
                         var mywin = Ext.WindowManager.getActive();
                         if (mywin) {
                             mywin.close();
                         }  
                    }
				} else {
                    Ext.Msg.show({ 
                        title: 'Thông báo',
                        msg: 'Thêm lệnh thất bại', 
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                      });
                }
            });
    }
});
