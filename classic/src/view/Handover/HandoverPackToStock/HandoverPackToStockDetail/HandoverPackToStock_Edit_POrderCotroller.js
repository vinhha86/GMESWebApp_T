Ext.define('GSmartApp.view.handover.HandoverPackToStock_Edit_POrderCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverPackToStock_Edit_POrderCotroller',
	init: function() {
        var viewmodel = this.getViewModel();
        if(viewmodel.get('ordercode') != ''){
            this.onTimKiem();
        }
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
        var grid = this.getView();
        var viewmodel = this.getViewModel();

        var store = viewmodel.getStore('porderStore');
        var ordercode = viewmodel.get('ordercode');

        if(ordercode == ""){
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn chưa nhập mã lệnh",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        } else {
            store.loadStoreBySearch(ordercode, '','','',null,null,null,null,null,[0,1,2,3,4,5,6],1000,1);
        }
    },
    onChon: function(){
        var select = this.getView().getSelectionModel().getSelection();
        if(select.length > 0){
            this.fireEvent("Chon", select[0].data);
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