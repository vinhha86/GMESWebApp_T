Ext.define('GSmartApp.view.stockin.stockin_product.stockin_p_edit.stockin_POLINE.Stockin_POLINE_Main_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_POLINE_Main_Controller',
	init: function() {
        var viewModel = this.getViewModel();
        if(viewModel.get('po_buyer') != ''){
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
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var POLineStore = viewModel.getStore('POLineStore');
        var po_buyer = viewModel.get('po_buyer');
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
            POLineStore.getall_by_pobuyer_async(po_buyer);
            POLineStore.load({
                scope: this,
                callback: function(records, operation, success) {
                    if(success){
                        // console.log(records);
                        if(records.length > 0){
                            // var POLineStore = viewModel.getStore('POLineStore');
                            var grid = me.down('#Stockin_POLINE');
                            grid.getSelectionModel().select(0);
                            var select = grid.getSelectionModel().getSelection();
                            var record = select[0];

                            var PContractSKUStore = viewModel.getStore('PContractSKUStore');
                            if(PContractSKUStore) PContractSKUStore.removeAll();
                            m.onStockin_POLINE_itemclick(record);
                        }
                    }
                }
            });
            
        }
    },
    onStockin_POLINE_itemclick: function(record){
        var pcontract_poid_link = record.get('id');
        var viewModel = this.getViewModel();
        var PContractSKUStore = viewModel.getStore('PContractSKUStore');

        var mainView = this.getView().up('window');
        if(mainView) mainView.setLoading(true);
        PContractSKUStore.load_by_pcontract_po_async(pcontract_poid_link);
        PContractSKUStore.load({
            scope: this,
            callback: function(records, operation, success) {
                if(mainView) mainView.setLoading(false);
                if(!success){
                    // this.fireEvent('logout');
                } else {
                }
            }
        });
        viewModel.set('poData.id', record.get('id'));
        viewModel.set('poData.po_buyer', record.get('po_buyer'));
    },
    onChon: function(){
        var viewModel = this.getViewModel();
        var mainView = this.getView().up('window');
        var grid = mainView.down('#Stockin_POLINE_Sku');
        var select = grid.getSelectionModel().getSelection();
        var poData = viewModel.get('poData');
        // console.log(select);

        if(select.length == 0){
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn chưa chọn sản phẩm",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }else{
            // console.log(select);
            for(var i=0; i<select.length; i++){
                var item = select[i];
                if(item.get('so_luong_yeu_cau') == null){
                    var pquantity_total = item.get('pquantity_total');
                    item.set('so_luong_yeu_cau', pquantity_total);
                }
            }
            mainView.down('#Stockin_POLINE_Main').fireEvent('Chon', select, poData);
        }
        // grid.fireEvent("Chon", select[0].data);
    },
    onEnterPOBuyer_txtField: function (field, e) {
		var me = this;
		if (e.getKey() == e.ENTER) {
			me.onTimKiem();
		}
	},
})