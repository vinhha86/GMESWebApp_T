Ext.define('GSmartApp.view.currency.CurrencyViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.CurrencyViewModel',
    requires: ['GSmartApp.store.CurrencyStore'],
    stores: {
        CurrencyStore: {
            type: 'CurrencyStore'
        }
    },
    data: {
        id: 0,
        name: null,
        currentRec: null
    },
    formulas: {
        title: function(get){
            if(get('id') == 0){
                return 'Thêm mới ngoại tệ';
            }else{
                return 'Thông tin chi tiết của \'' + get('name') + '\''; 
            }
        }
    }
})