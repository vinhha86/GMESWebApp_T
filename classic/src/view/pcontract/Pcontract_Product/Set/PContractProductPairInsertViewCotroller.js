Ext.define('GSmartApp.view.pcontract.PContractProductPairInsertViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractProductPairInsertViewCotroller',
    init: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('PContractProductPairStore');
        var storeNotIn = viewmodel.getStore('PContractProductNotPairStore');
        var pcontractid_link = viewmodel.get('pcontractid_link');

        if (viewmodel.get('id') != 0)
             store.load_product_pair_detail(pcontractid_link, viewmodel.get('id'));

             storeNotIn.load_product_not_pair(pcontractid_link, viewmodel.get('id'));
    },
    control: {
        '#btnChon': {
            click: 'onChon'
        },
        '#btnThoat': {
            click: 'onThoat'
        }
    },
    onThoat: function () {
        var me = this.getView();
        me.up('window').close();
    },
    onChon: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('PContractProductPairStore');
        var me = this.getView();

        var params = new Object();
        params.pcontractid_link = viewmodel.get('pcontractid_link');
        params.productpairid_link = viewmodel.get('id');

        var data = [];
        var select = store.data.items;
        for (var i = 0; i < select.length; i++) {
            var obj = select[i].data
            if(obj.amount > 0)
                data.push(obj);
        }
        if(data.length < 2){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn phải nhập ít nhất 2 sản phẩm để ghép bộ',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
        }
        else{
            params.listpair = data;

            GSmartApp.Ajax.post('/api/v1/pcontractproductpairing/create', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if(response.mesErr != ""){
                            Ext.Msg.show({
                                title: 'Thông báo',
                                msg: response.mesErr,
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }
                        else{
                           me.fireEvent('Chon')
                        }                    
                    } else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                })
        }
    },
    onBeforeDropAdd: function(node, context, overModel, dropPosition, dropHandlers, eOpts){
        var data = context.records[0].data;

        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('PContractProductPairStore');
        var storeNotPair = viewmodel.getStore('PContractProductNotPairStore');

        var recNew = new Object({
            imgproduct: data.imgproduct,
            productBuyerCode: data.productBuyerCode,
            productName: data.productName,
            amount: 1,
            id: null,
            pquantity: 0,
            productid_link : data.productid_link
        });
        store.insert(store.length-1 , recNew);
        storeNotPair.remove(context.records[0]);

        dropHandlers.cancelDrop();
    },
    onXoa: function(grid, rowIndex, colIndex){
        var viewmodel = this.getViewModel();
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var data = rec.data;

        store.remove(rec);

        var storeNotIn = viewmodel.getStore('PContractProductNotPairStore');
        var recNew = new Object({
            imgproduct: data.imgproduct,
            productBuyerCode: data.productBuyerCode,
            productName: data.productName,
            productid_link : data.productid_link
        });
        storeNotIn.insert(0,recNew);
    }
})