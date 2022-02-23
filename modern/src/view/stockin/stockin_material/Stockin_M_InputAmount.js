Ext.define('GSmartApp.view.stockin.stockin_material.Stockin_M_InputAmount', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockin_M_InputAmount',
    id:'Stockin_M_InputAmount',
    reference: 'Stockin_M_InputAmount',
    viewModel: {
        type: 'Stockin_M_InputAmountViewModel'
    },
    controller: 'Stockin_M_InputAmountController',
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
            value:'{totalpackagecheck}'
        },
        label: 'Số lượng:',
        textAlign: 'right',
        hideTrigger:true,
        clearable: true,
        labelWidth: 100,
        width: 280,
    }],

    buttons: [{
        text: 'Thoát',
        itemId: 'btnThoat'
    },{
        text: 'Lưu',
        itemId: 'btnLuu'
    }]
});