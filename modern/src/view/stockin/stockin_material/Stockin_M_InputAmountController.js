Ext.define('GSmartApp.view.stockin.stockin_material.Stockin_M_InputAmountController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_M_InputAmountController',
    init: function() {
        var viewModel = this.getViewModel();
        var totalpackagecheck = viewModel.get('totalpackagecheck');
        // console.log('totalpackage: ' + totalpackage);
    },
    control: {
        '#btnLuu': {
            tap: 'onLuu'
        },
        '#btnThoat': {
            tap: 'onThoat'
        },
    },
    onLuu: function(){
        var viewModel = this.getViewModel();
        var totalpackagecheck = viewModel.get('totalpackagecheck');
        this.fireEvent('Luu', totalpackagecheck);
    },
    onThoat: function(){
        this.fireEvent('Thoat');
    },
});
