Ext.define('GSmartApp.view.invoice.invoice_pcontractlist.invoice_pcontractlist_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.invoice_pcontractlist_Controller',
	init: function() {
        var viewModel = this.getViewModel();
        var pcontractSearch = viewModel.get('pcontractSearch');
        var PContractStore = viewModel.getStore('PContractStore');
        PContractStore.findByContractcode(pcontractSearch);

        // sorter
        PContractStore.getSorters().add('contractcode');
    },
    control: {
		'#btnThoat': {
			click: 'onThoat'
        },
        '#btnLuu': {
			click: 'onLuu'
		},
    },
    onThoat: function(){
        this.fireEvent('pcontractlistThoat');
    },
    onLuu: function(){
        var m = this.getView();
        var me = this;
        var viewModel = this.getViewModel();
        
        var select = m.getSelectionModel().getSelection();
        if(select.length > 0){
            me.fireEvent('pcontractlistLuu', select);
        }else{
            me.fireEvent('pcontractlistNotSelect');
        }
    },
})