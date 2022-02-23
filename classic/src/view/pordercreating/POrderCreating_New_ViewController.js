Ext.define('GSmartApp.view.pordercreating.POrderCreating_New_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrderCreating_New_ViewController',
    isActivate: false,
    init: function () {

    },
    control:{
    },
    onTaoLenh: function(){
        var viewmodel = this.getViewModel();

        var pcontractid_link = viewmodel.get('PContract.id');
        var productid_link = viewmodel.get('IdProduct');
        var org_order_id_link = viewmodel.get('org_order_id_link');
        var ordercode = viewmodel.get('ordercode');
        var orderdate = viewmodel.get('orderdate');
        var id = viewmodel.get('id');

        if(productid_link == 0 ){
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn chưa chọn Sản phẩm",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else if (org_order_id_link <= 0 ) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn chưa chọn Xưởng sản xuất",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        } else {
            var params = new Object();
            params.ordercode = ordercode;
            params.orderdate = orderdate;
            params.id = id;
            params.pcontractid_link = pcontractid_link;
            params.productid_link = productid_link;
            params.granttoorg_link = org_order_id_link;
            params.sku = [];

            // var store = viewmodel.getStore('PContractSKUStore').filter('isselected', true).getData();
            var store = viewmodel.getStore('PContractSKUPorderStore').query('isselected',true);
            for(var i in store.items){
                var data = store.items[i];
                var sku = new Object();
                sku.id = data.get('id');
                sku.orgrootid_link = data.get('orgrootid_link');
                sku.pcontractid_link = data.get('pcontractid_link');
                sku.productid_link = data.get('productid_link');
                sku.skuid_link = data.get('skuid_link');
                sku.pquantity_sample = data.get('pquantity_sample');
                sku.pquantity_porder = data.get('pquantity_porder');
                sku.pquantity_total = data.get('pquantity_total');

                params.sku.push(sku);
            }

            GSmartApp.Ajax.post('/api/v1/porder/create', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: "Tạo Lệnh thành công",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });

                        var storePOrders = viewmodel.getStore('porders');
                        storePOrders.loadByContract(pcontractid_link,productid_link);

                        var pContractSKUStore = viewmodel.getStore('PContractSKUPorderStore');
                        pContractSKUStore.reload();
                    }
                }
            })
        }
    }    
})