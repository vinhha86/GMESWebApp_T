Ext.define('GSmartApp.view.pcontract.PContractSKUMainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractSKUMainViewController',
    init: function () {
        
    },
    control:{
        '#productFilter': {
            select: 'onFilterProduct',
            change: 'onChangeProduct'
        }
    },
    onFilterProduct: function(combo, record, eOpts ){
        // console.log(record);
        var viewmodel =  this.getViewModel();
        var store = viewmodel.getStore('PContractPOList');
        var productid_link = record.get('productid_link');
        // viewmodel.set('IdProduct_filterPO',productid_link);
        
        var pcontractid_link = viewmodel.get('PContract.id');

        store.loadAccept_ByContract(pcontractid_link , productid_link);
    },
    onChangeProduct: function(m, newValue, oldValue){
        if(newValue == "" || newValue == null){
            var viewmodel =  this.getViewModel();
            var store = viewmodel.getStore('PContractPOList');            
            
            var pcontractid_link = viewmodel.get('PContract.id');
    
            store.loadAccept_ByContract(pcontractid_link , 0);
        }
        
    }
})