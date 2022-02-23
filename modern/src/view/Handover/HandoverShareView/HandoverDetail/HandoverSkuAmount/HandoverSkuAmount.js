Ext.define('GSmartApp.view.handover.HandoverShareView.HandoverDetail.HandoverSkuAmount.HandoverSkuAmount', {
    extend: 'Ext.form.Panel',
    xtype: 'HandoverSkuAmount',
    id:'HandoverSkuAmount',
    reference: 'HandoverSkuAmount',
    viewModel: {
        type: 'HandoverSkuAmountViewModel'
    },
    controller: 'HandoverSkuAmountController',
    // title: 'Login',

    // bodyPadding: 20,
    layout : 'center',
    // width: 160,
    autoSize: true,

    items: [{
        xtype: 'numberfield',
        // reference: 'cboorgto',
        // editable: false,
        // readOnly: true,
        bind:{
            value:'{totalpackage}'
        },
        label: 'Số lượng:',
        textAlign: 'right',
        hideTrigger:true,
        clearable: false,
        labelWidth: 100,
        width: 220,
    }],

    buttons: [{
        text: 'Thoát',
        itemId: 'btnThoat'
    },{
        text: 'Lưu',
        itemId: 'btnLuu'
    }]
});