Ext.define('GSmartApp.view.pordercreating.POrderCreating_New_POrderCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrderCreating_New_POrderCotroller',
    isActivate: false,
    init: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();

        var ListOrgStore = viewmodel.getStore('ListOrgStore');
        ListOrgStore.loadStore(13, true);
       
    },
    control:{
        '#cmbOrg':{
            select: 'onOrgItemSelected'
        }
    },    
    onOrgItemSelected: function(combo, record, eOpts){
        var viewmodel = this.getViewModel();
        var org_order_id_link = record.data.id;
        var storePOrders = viewmodel.getStore('porders');
        if (org_order_id_link > 0)
            storePOrders.filter('granttoorgid_link',org_order_id_link);
        else
        storePOrders.clearFilter();
    },
    onPOrderItemDelete: function(rid, rowIndex, colIndex){
        var viewmodel = this.getViewModel();
        var pcontractid_link = viewmodel.get('pcontractid_link');
        var productid_link = viewmodel.get('productid_link');
        
        Ext.Msg.confirm('Kiểm vải', 'Bạn có thực sự muốn xóa lệnh? chọn YES để thực hiện',
            function (choice) {
                if (choice === 'yes') {
                    var storePOrders = viewmodel.getStore('porders');
                    var record = storePOrders.getAt(rowIndex);
                    if (record.get('status') == 0){
                        var params=new Object();
                        params.id = record.get('id');
            
                        GSmartApp.Ajax.post('/api/v1/porder/delete', Ext.JSON.encode(params),
                        function (success, response, options) {
                            if (success) {
                                Ext.MessageBox.show({
                                    title: "Thông báo",
                                    msg: "Xóa Lệnh thành công",
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
                                });
        
                                var storePOrders = viewmodel.getStore('porders');
                                storePOrders.loadByContract(pcontractid_link, productid_link);

                                var pContractSKUStore = viewmodel.getStore('PContractSKUStore');
                                pContractSKUStore.reload();
                            } else {
                                console.log(response.responseText);
                            }
                        })
                    }                      
                }
            }
        );
    },
    onItemEdit: function(editor, e){
        var viewmodel = this.getViewModel();
        var params=new Object();
        params.data = e.record.data;
        
        GSmartApp.Ajax.post('/api/v1/porder/update_sku', Ext.JSON.encode(params),
        function (success, response, options) {
            if (success) {
                var storePOrders = viewmodel.getStore('porders');
                storePOrders.reload();

                var pContractSKUStore = viewmodel.getStore('PContractSKUStore');
                pContractSKUStore.reload();
            } else {
                console.log(response.responseText);
            }
        })    
        // var ownerRecord = this.getView().getSelection();
        // console.log(e.grid.store.sum('pquantity_total'));    
        // console.log(ownerRecord);
        
    }
})