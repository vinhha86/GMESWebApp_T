Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessingDAmountController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CutplanProcessingDAmountController',
    init: function() {
        var viewModel = this.getViewModel();
        var value = viewModel.get('value');
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
        var value = viewModel.get('value');
        this.fireEvent('Luu', value);
    },
    onThoat: function(){
        this.fireEvent('Thoat');
    },
});
