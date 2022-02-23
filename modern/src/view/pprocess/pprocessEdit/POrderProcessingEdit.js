Ext.define('GSmartApp.view.pprocess.POrderProcessingEdit', {
    extend: 'Ext.form.Panel',
    xtype: 'porderprocessingedit',
    reference:'porderprocessingedit',
    controller: 'POrderProcessingEditController',
	viewModel: {
        type: 'POrderProcessingEditViewModel'
    },    
    header: false,
    bodyPadding: 10,
    layout: 'vbox',
    scrollable:'vertical',
    defaults: {
        margin:'0 0 10 0'
    },
    cls: 'porderprocessingedit-modern',

    items: [{
        // Combo box, date, SL
        layout: 'vbox',
        border: false,
        width: '100%',
        items: [{
            layout: 'hbox',
            border: false,
            width: '100%',
            items: [{
            //     xtype: 'combobox',
            //     margin: 2,
            //     label: "Tổ",
            //     bind: {
            //         store:'{ProductionLineStore}'
            //     },
            //     value: null,
            //     displayField: 'namefactory',
            //     valueField: 'id',
            //     queryMode: 'local',
            //     editable: false,
            //     listeners: {
            //         change: 'onProductionLineChange'
            //     },
            //     labelWidth: 60,
            //     flex: 1,
            // },{
            //     xtype: 'datefield',
            //     margin: 2,
            //     label: "Ngày",
            //     bind: {
            //         disabled: '{idDatePickerDisabled}'
            //     },
            //     value: new Date(),  // defaults to today
            //     format: 'd/m/Y',
            //     listeners: {

            //     },
            //     labelWidth: 60,
            //     flex: 1,
            }]
        },{
            layout: 'hbox',
            border: false,
            width: '100%',
            items: [
            {
                // xtype: 'button',
                // reference: 'backBtn',
                // ui: 'header',
                // iconCls: 'x-fa fa-arrow-left',
                // margin: '0 0 0 10',
                // flex: 1,
                // maxWidth: 40,
                // listeners: {
                //     tap: 'onBackBtn'
                // },
                // hidden: false
            },{
                xtype: 'textfield',
                margin: 2,
                label: "Mã SX",
                editable: false,
                readOnly: true,
                labelWidth: 60,
                flex: 1,
                maxWidth: 200,
                textAlign: 'right',
                bind: {
                    value: '{pordercode}'
                }
            },{
                xtype: 'numberfield',
                margin: 2,
                label: "SL",
                editable: false,
                readOnly: true,
                labelWidth: 30,
                flex: 1,
                maxWidth: 170,
                minValue: 0,
                hideTrigger:true,
                textAlign: 'right',
                bind: {
                    value: '{grantamount}'
                }
            }]
        },]
    },{
        // Vào chuyền, ra chuyền, kế hoạch ngày
        xtype: 'POrderProcessingInputOutput'
    },{
        // Quality Control, Lỗi, Kế hoạch ngày, Đạt
        xtype: 'POrderProcessingQualityControl'
    },{
        // Đóng gói
        xtype: 'POrderProcessingPacking'
    },{
        // Khoán ra chuyền, Đăng ký Quality Control
        xtype: 'POrderProcessingOutputTarget'
    },{
        flex: 1,
        height: '70px'
    }]
});