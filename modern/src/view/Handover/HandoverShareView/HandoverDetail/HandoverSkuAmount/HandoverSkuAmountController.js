Ext.define('GSmartApp.view.handover.HandoverShareView.HandoverDetail.HandoverSkuAmount.HandoverSkuAmountController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverSkuAmountController',
    init: function() {
        var viewModel = this.getViewModel();
        var totalpackage = viewModel.get('totalpackage');
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
        var totalpackage = viewModel.get('totalpackage');
        this.fireEvent('Luu', totalpackage);
    },
    onThoat: function(){
        this.fireEvent('Thoat');
    },
});
