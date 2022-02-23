Ext.define('GSmartApp.view.stockout.Stockout_POLINECotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_POLINECotroller',
	init: function() {
        var viewmodel = this.getViewModel();
        if(viewmodel.get('po_buyer') != ''){
            this.onTimKiem();
        }
	},
	control:{
		'#btnThoat' : {
            click: 'onThoat'
        },
        '#btnTimKiem': {
            click: 'onTimKiem'
        },
        '#btnLuu' :{
            click: 'onChon'
        },
        '#POBuyer_txtField': {
            keypress: 'onEnterPOBuyer_txtField'
        }
    },
    onThoat: function(){
        this.getView().up('window').close();
    },
    onTimKiem: function(){
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('POLineStore');
        var po_buyer = viewmodel.get('po_buyer');
        if(po_buyer == ''){
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn chưa nhập PO Line",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else{
            store.getall_by_pobuyer(po_buyer);
        }
    },
    onChon: function(){
        var grid = this.getView();
        var select = grid.getSelectionModel().getSelection();

        grid.fireEvent("Chon", select[0].data);
    },
    onEnterPOBuyer_txtField: function (field, e) {
		var me = this;
		if (e.getKey() == e.ENTER) {
			me.onTimKiem();
		}
	},
})