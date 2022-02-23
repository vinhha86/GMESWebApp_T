Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.Stockin_M_Edit_POrderCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_M_Edit_POrderCotroller',
	init: function() {

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
        var ordercode = grid.down('#ordercode').getValue();

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
            store.loadStore(ordercode);
        }
    },
    onChon: function(){
        var select = this.getView().getSelectionModel().getSelection();
        console.log(select);
        if(select.length > 0){
            var ordercode = select[0].data.ordercode;
            this.fireEvent("Chon", ordercode);
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