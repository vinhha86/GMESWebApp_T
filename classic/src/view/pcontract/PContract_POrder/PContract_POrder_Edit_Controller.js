Ext.define('GSmartApp.view.pcontract.PContract_POrder_Edit_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_POrder_Edit_Controller',
    init: function(){
        this.reloadSKU();
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
    },    
    reloadSKU:function(){
        var viewmodel = this.getViewModel();
        var porder = viewmodel.get('porder');
        var poSKUStore = viewmodel.getStore('POSKUStore');
        var porderSKUStore = viewmodel.getStore('porderSKUStore');

        var pcontract_poid_link =  porder.pcontract_poid_link;
        var productid_link =  porder.productid_link;

        poSKUStore.loadPOSKU_Free_ByProduct(productid_link, pcontract_poid_link);
        porderSKUStore.loadByPorderID(porder.id);
    },
    onPorder_RemoveSKU:function(){
        me = this;
        var viewmodel = this.getViewModel();
        var porder = viewmodel.get('porder');
        // var porderSKU_View = Ext.getCmp('PContract_POrder_Edit_PorderSKU').getView();
        var porderSKU_View = Ext.first('#PContract_POrder_Edit_PorderSKU').getView();
        var porderSKU_select = porderSKU_View.getSelectionModel().getSelection();
        var porderSKU_list = [];
        for (var i = 0; i < porderSKU_select.length; i++) {
            porderSKU_list.push(porderSKU_select[i].data);
        }

        var params=new Object();
        params.porderid_link = porder.id;
        params.data = porderSKU_list;

        if (porderSKU_list.length > 0){
            GSmartApp.Ajax.post('/api/v1/porder/delete_sku', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (!success) {
                    Ext.MessageBox.show({
                        title: "Chi tiết lệnh",
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                } else {
                    me.reloadSKU();
                }
            });    
        }    
    },
    onPorder_AddSKU: function(){
        me = this;
        var viewmodel = this.getViewModel();
        var porder = viewmodel.get('porder');
        var poSKU_View = Ext.getCmp('PContract_POrder_Edit_POSKU').getView();
        var poSKU_select = poSKU_View.getSelectionModel().getSelection();
        var poSKU_list = [];
        for (var i = 0; i < poSKU_select.length; i++) {
            var data = poSKU_select[i].data;
            if (data.pquantity_free > 0){
                var newSKU =new Object();
                newSKU.id = null;
                newSKU.porderid_link = porder.id;
                newSKU.productid_link = data.productid_link;
                newSKU.skuid_link = data.skuid_link;
                // newSKU.pquantity_sample = data.pquantity_sample;
                // newSKU.pquantity_porder = data.pquantity_porder;
                // newSKU.pquantity_production = data.pquantity_production;
                newSKU.pquantity_total = data.pquantity_free;

                poSKU_list.push(newSKU);
            }
        }
        var params=new Object();
        params.porderid_link = porder.id;
        params.data = poSKU_list;
        if (poSKU_list.length > 0){
            GSmartApp.Ajax.post('/api/v1/porder/create_skulist', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (!success) {
                    Ext.MessageBox.show({
                        title: "Chi tiết lệnh",
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                } else {
                    me.reloadSKU();
                }
            });
        }
    },
    onThoat: function () {
        var viewmodel = this.getViewModel();
        this.fireEvent('Thoat',viewmodel.get('porder'));
    },
    renderSum: function (value) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
    onPorder_EditSKU: function(editor, context, e){
        var grid = this.getView();
        if(context.value == context.originalValue) return;

        grid.setLoading(true);
        var viewmodel = this.getViewModel();
        var data = context.record.data;
        var params = new Object();
        params.data = data;

        GSmartApp.Ajax.post('/api/v1/porder/update_sku', Ext.JSON.encode(params),
            function (success, response, options) {
                grid.setLoading(false);
                var porderSKUStore = viewmodel.getStore('porderSKUStore');
                var response = Ext.decode(response.responseText);
                if (success) {
                    porderSKUStore.commitChanges();

                    //reload POSKU Store
                    var POSKUStore = viewmodel.getStore('POSKUStore');
                    POSKUStore.reload();
                } else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: 'Lưu thất bại: ' + response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Có'
                        }
                    });
                    porderSKUStore.rejectChanges();
                }
            })
    },    
})