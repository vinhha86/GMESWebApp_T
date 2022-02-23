Ext.define('GSmartApp.view.porders.POrder_Grant_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_Grant_Controller',
    init: function(){
        var me = this.getView();
        var viewmodel =  this.getViewModel();

        viewmodel.set('granttoorgid_link', me.granttoorgid_link);
        viewmodel.set('granttoorg_name', me.granttoorg_name);

        //Lay thong tin POrder
        if (null != me.porderid_link){
            var params = new Object();
            params.porderid_link = me.porderid_link;
            GSmartApp.Ajax.post('/api/v1/porder/getone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                   
                    if(response.respcode == 200){
                        viewmodel.set('porder', response.data);
                        
                        //Lay danh sach POrders_SKU
                        var porderSKUStore = viewmodel.getStore('porderSKUStore');
                        porderSKUStore.loadByPorderID(me.porderid_link);

                        if (callviewid_link == 1){
                            //Lay Grant va Grantt SKU
                            var grant_params = new Object();
                            grant_params.porderid_link = me.porderid_link;
                            grant_params.granttoorgid_link = me.granttoorgid_link;

                            GSmartApp.Ajax.post('/api/v1/porder_grant/getone', Ext.JSON.encode(grant_params),
                            function (success, response, options) {
                                if (success) {
                                    var grant_response = Ext.decode(response.responseText);
                                    var grant_data = grant_response.data;
                                
                                    if(grant_response.respcode == 200){
                                        viewmodel.set('porder_grant', grant_data);
                                        
                                        //Lay danh sach Grant_SKU
                                        if (null != grant_data.porder_grant_sku){
                                            var grantedSKUStore = viewmodel.getStore('grantedSKUStore');
                                            for(i=0;i<grant_data.porder_grant_sku.length;i++){
                                                var grant_sku = grant_data.porder_grant_sku[i];

                                                var sku_data =  new Object();
                                                sku_data.skuid_link = grant_sku.skuid_link;
                                                sku_data.skucode = grant_sku.skucode;
                                                sku_data.mauSanPham = grant_sku.mauSanPham;
                                                sku_data.coSanPham = grant_sku.coSanPham;
                                                sku_data.grantamount = grant_sku.grantamount;
                                                grantedSKUStore.insert(0,sku_data);
                                            }
                                            console.log(grantedSKUStore);
                                        }
                                    }
                                }
                            })
                        }
                    }
                }
            })
        }

    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnLuu': {
            click: 'onLuu'
        }
    },    
    onThoat: function () {
        // this.getView().up('window').destroy();
        var me = this.getView();
        me.fireEvent("GrantClose");
    },
    onLuu: function () {
        var viewmodel =  this.getViewModel();
        var me = this.getView();
        var porderid_link = me.porderid_link;
        var granttoorgid_link = me.granttoorgid_link;
        var grantedSKUStore = viewmodel.getStore('grantedSKUStore');

        var newGrant = new Object();
        newGrant.id = null;
        newGrant.porderid_link = porderid_link;
        newGrant.granttoorgid_link = granttoorgid_link;
        var GrantedSKU = [];   
        grantedSKUStore.each(function (record) {
            var sku_data =  new Object();
            sku_data.skuid_link = record.data.skuid_link;
            sku_data.grantamount = record.data.grantamount;
            GrantedSKU.push(sku_data);
        });  
        newGrant.porder_grant_sku = GrantedSKU;

        var params = new Object();
        params.data = newGrant;

        GSmartApp.Ajax.post('/api/v1/porder_grant/create', Ext.JSON.encode(params),
        function (success, response, options) {
            if (success) {
                console.log(response);
            }
        })        
        me.fireEvent("GrantSave");
    },
    onAddToGrantt: function(){
        var orderSKUView = Ext.getCmp('POrder_Grant_Edit_OrderSKU');
        var select_orderSKU = orderSKUView.getView().getSelectionModel().getSelection();   

        if(select_orderSKU.length == 0){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn chưa chọn SKU',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });

            return;
        } else {
            var viewmodel =  this.getViewModel();
            var grantedSKUStore = viewmodel.getStore('grantedSKUStore');
            var porderSKUStore = viewmodel.getStore('porderSKUStore');

            for (var i = 0; i < select_orderSKU.length; i++) {
                var data = select_orderSKU[i].data;

                var sku_data =  new Object();
                sku_data.skuid_link = data.skuid_link;
                sku_data.skucode = data.skucode;
                sku_data.mauSanPham = data.mauSanPham;
                sku_data.coSanPham = data.coSanPham;
                sku_data.grantamount = data.pquantity_total;

                grantedSKUStore.insert(0,data);
            }
            porderSKUStore.remove(select_orderSKU);
        }
    }
})