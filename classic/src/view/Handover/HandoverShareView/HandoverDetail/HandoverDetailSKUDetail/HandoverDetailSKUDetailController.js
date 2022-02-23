Ext.define('GSmartApp.view.handover.HandoverDetailSKUDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverDetailSKUDetailController',
    init: function () {
        var me = this;
        var viewModel = this.getViewModel();
        var viewId = viewModel.get('viewId');
        var handoverproductid_link = viewModel.get('handoverproductid_link');
        if(viewId == 'handover_pack_tostock_detail' && handoverproductid_link == null){
            me.loadSKUInfoForPackToStock();
        }else{
            me.loadInfo();
        }
    },
    listen: {
        
    },
    control: {
        
    },
    renderSum: function (value) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
    onEditHandoverSKU: function(editor, context, e){
        var me = this;
        var viewModel = this.getViewModel();
        var viewId = viewModel.get('viewId');
        var handoverproductid_link = viewModel.get('handoverproductid_link');
        if(viewId == 'handover_pack_tostock_detail' && handoverproductid_link == null){
            me.EditSKUForPackToStock(context);
        }else{
            me.EditHandoverSKU(context);
        }
    },
    EditSKUForPackToStock: function(context){
        // console.log(context);
        var viewModel = this.getViewModel();
        var grid = this.getView();
        var viewId = viewModel.get('viewId');
        var HandoverSkuStore = viewModel.getStore('HandoverSkuStore');
        var main = Ext.getCmp(viewId);
        var HandoverProductStore = main.getViewModel().getStore('HandoverProductStore');
        // grid.setLoading(true);
        if(context.value == context.originalValue || context.value < 0 || context.value == ''){
            HandoverSkuStore.rejectChanges();
            return;
        }

        var data = context.record.data;
        var handoverSku = new Object();
        handoverSku.productid_link = data.productid_link;
        handoverSku.skuid_link = data.id;
        handoverSku.totalpackage = context.value;

        var index = HandoverProductStore.find('productid_link', data.productid_link,
        0, false, false, true);
        if(index != -1){
            // đã có
            // console.log(index);
            var products = HandoverProductStore.getData().items;
            var p = HandoverProductStore.findRecord('productid_link', data.productid_link,
            0, false, false, true);
            var product = HandoverProductStore.findRecord('productid_link', data.productid_link,
            0, false, false, true).data;
            // var product = products[index].data;

            // console.log(HandoverProduct);
            // console.log(HandoverProduct.handoverSKUs);
            if(product.handoverSKUs.length > 0){
                // console.log('>0');
                var SKUs = product.handoverSKUs;
                var isSkusExist = false;
                for(var i=0;i<SKUs.length;i++){
                    var sku = SKUs[i];
                    // console.log(handoverSKU);
                    if(sku.skuid_link == handoverSku.skuid_link){
                        sku.totalpackage = handoverSku.totalpackage;
                        isSkusExist = true;
                    }
                }
                if(!isSkusExist){
                    SKUs.push(handoverSku);
                }

                var total = 0;
                for(var i=0;i<SKUs.length;i++){
                    var sku = SKUs[i];
                    total+=parseInt(sku.totalpackage);
                }
                // product.totalpackage = total;
                p.set('totalpackage', total);
            }else{
                // console.log('=0');
                var SKUs = product.handoverSKUs;
                SKUs.push(handoverSku);
                var total = 0;
                for(var i=0;i<SKUs.length;i++){
                    var sku = SKUs[i];
                    total+=parseInt(sku.totalpackage);
                }
                p.set('totalpackage', total);
            }
        }else{
            // chưa có, thêm product vào store
            var handoverProduct = new Object();
            handoverProduct.productid_link = handoverSku.productid_link;
            handoverProduct.unitid_link = 2;
            handoverProduct.totalpackage = handoverSku.totalpackage;
            handoverProduct.buyercode  = data.product_code;
            handoverProduct.buyername = data.product_name;
            handoverProduct.unitName = 'Chiếc';

            var handoverSKUs = new Array();
            handoverSKUs.push(handoverSku);

            handoverProduct.handoverSKUs = handoverSKUs;
            HandoverProductStore.add(handoverProduct);
        }

    },
    EditHandoverSKU: function(context){
        var viewModel = this.getViewModel();
        var grid = this.getView();
        var viewId = viewModel.get('viewId');
        var HandoverSkuStore = viewModel.getStore('HandoverSkuStore');
        if(
            viewId == 'handover_line_fromcut_detail' ||
            viewId == 'handover_pack_fromline_detail'
        ){
            HandoverSkuStore.rejectChanges();
            return;
        }
        if(context.value == context.originalValue){
            // HandoverSkuStore.rejectChanges();
            return;
        }
        if(context.value < 0 || context.value == ''){
            HandoverSkuStore.rejectChanges();
            return;
        }
        grid.setLoading(true);
        var data = context.record.data;
        var params = new Object();
        params.data = data;

        GSmartApp.Ajax.post('/api/v1/handoversku/updateHandoverSku', Ext.JSON.encode(params),
            function (success, response, options) {
                grid.setLoading(false);
                var response = Ext.decode(response.responseText);
                if (success) {
                    context.record.set('totalpackage', context.value);
                    HandoverSkuStore.commitChanges();
                    //
                    if(context.rowIdx < HandoverSkuStore.data.length - 1) {  
                        var cellediting = grid.getPlugin('cellediting');
                        cellediting.startEditByPosition({
                            row: (context.rowIdx + 1),
                            column: context.colIdx
                        });
                    }
                    // load handoverProduct grid
                    var main = Ext.getCmp(viewId);
                    var HandoverProductStore = main.getViewModel().getStore('HandoverProductStore');
                    HandoverProductStore.load();
                } else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: 'Lưu thất bại: ' + response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Có'
                        }
                    });
                    HandoverSkuStore.rejectChanges();
                }
            })
    },
    onSpecialkey: function( text, e, eOpts ){
        if(e.keyCode == 9) e.stopEvent();
    },
    loadInfo: function(){
        var viewModel = this.getViewModel();
        var handoverid_link = viewModel.get('handoverid_link');
        var handoverproductid_link = viewModel.get('handoverproductid_link');
        var porderid_link = viewModel.get('porderid_link');
        var productid_link = viewModel.get('productid_link');
        var HandoverSkuStore = viewModel.getStore('HandoverSkuStore');
        HandoverSkuStore.getSorters().add('skuColor');
        HandoverSkuStore.getSorters().add('skuSizeSortVal');
        HandoverSkuStore.loadStore_Async(handoverid_link, handoverproductid_link, porderid_link, productid_link);
        
        HandoverSkuStore.load({
            scope: this,
            callback: function(records, operation, success) {
                if(!success){
                    // this.fireEvent('logout');
                } else {
                    var params=new Object();
                    params.handoverid_link = handoverid_link;
                    params.handoverproductid_link = handoverproductid_link;
                    params.porderid_link = porderid_link;
                    params.productid_link = productid_link;
                    // console.log(params);
                    GSmartApp.Ajax.post('/api/v1/handoversku/getByHandoverProduct', Ext.JSON.encode(params),
                    function (success, response, options) {
                        var response = Ext.decode(response.responseText);
                        if (success) {
                            // console.log(response);
                            HandoverSkuStore.setData(response.data);
                            HandoverSkuStore.commitChanges();
                        }
                    }); 
                }
            }
        });
    },
    loadSKUInfoForPackToStock:function(){
        var me = this;
        var viewModel = this.getViewModel();
        var viewId = viewModel.get('viewId');
        var data = viewModel.get('data');
        var HandoverSkuStore = viewModel.getStore('HandoverSkuStore');
        for(var i=0;i<data.length;i++){
            // skuCode, skuColor, skuSize, totalpackage
            data[i].skuCode = data[i].code;
            data[i].skuColor = data[i].color_name;
            data[i].skuSize = data[i].size_name;
            data[i].skuSizeSortVal = data[i].sort_size;
            data[i].totalpackage = 0;
        }
        HandoverSkuStore.setData(data);
        HandoverSkuStore.getSorters().add('skuColor');
        HandoverSkuStore.getSorters().add('skuSizeSortVal');
        // console.log(data);
    }
})