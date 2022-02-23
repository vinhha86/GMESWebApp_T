Ext.define('GSmartApp.view.stockin.Encode_porder_search_Cotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Encode_porder_search_Cotroller',
	init: function() {
        this.onTimKiem();
	},
	control:{
		'#btnThoat': {
            click: 'onThoat'
        },
        '#btnTimKiem':{
            click: 'onTimKiem'
        },
        '#ordercode': {
            specialkey: 'onSpecialkey'
        },
        '#btnLuu': {
            click: 'onChon'
        }
    },
    onThoat: function(){
        this.getView().up('window').close();
    },
    onSpecialkey: function(field, e){
        var me = this;
        if (e.getKey() == e.ENTER) {
            me.onTimKiem();
        }
    },
    onTimKiem: function(){
        var viewmodel = this.getViewModel();

        var store = viewmodel.getStore('porderStore');
        var ordercode = viewmodel.get('ordercode');
        var skucode = viewmodel.get('skucode');

        store.loadStore(ordercode, skucode);
    },
    onChon: function(){
        var select = this.getView().getSelectionModel().getSelection();
        console.log(select);
        if(select.length > 0){
            var ordercode = select[0].data.ordercode;
            var skucode = select[0].data.skucode;
            this.fireEvent("Chon", ordercode, skucode);
        }
        else{
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn chưa chọn lệnh sản xuất",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
    }
})