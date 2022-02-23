Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessingDAmount', {
    extend: 'Ext.form.Panel',
    xtype: 'CutplanProcessingDAmount',
    id:'CutplanProcessingDAmount',
    reference: 'CutplanProcessingDAmount',
    viewModel: {
        type: 'CutplanProcessingDAmountViewModel'
    },
    controller: 'CutplanProcessingDAmountController',
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
            value:'{value}',
            label: '{label}',
        },
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