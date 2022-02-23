Ext.define('GSmartApp.view.pprocess.POrderSetReady', {
    extend: 'Ext.window.Window',
    xtype: 'pordersetready',
    controller: 'pordersetready',
    title: 'Kế hoạch sản xuất',
    viewModel: 'pordersetready',
    width: 350,
    height: 430,
    //layout: 'fit',
    //resizable: true,
    modal: true,
    items:[{
        xtype: 'panel',
        bodyPadding: 10,
        layout: 'vbox',
        items: [{
            xtype: 'textfield',
            readOnly: true,
            textAlign: 'right',
            anchor: '100%',            
            fieldLabel: 'Tổ SX:',
            labelAlign: 'left',
            labelWidth: 150,
            bind: '{record.granttoorgid_link}',
        },{
            xtype: 'textfield',
            textAlign: 'right',
            anchor: '100%',            
            fieldLabel: 'Mã SX:',
            labelAlign: 'left',
            labelWidth: 150,
            bind: '{record.ordercode}',
        },{
            xtype: 'datefield',
            anchor: '100%',            
            fieldLabel: 'Dự kiến may mẫu:',
            labelAlign: 'left',
            labelWidth: 150,
            format: 'd/m/Y',
            reference:'sample_date',
            name: 'sample_date',
            bind: '{record.sample_date}'
            //value: new Date()  // defaults to today
        },{
            xtype: 'datefield',
            anchor: '100%',            
            fieldLabel: 'Dự kiến cắt:',
            labelAlign: 'left',
            labelWidth: 150,
            format: 'd/m/Y',
            reference:'cut_date',
            name: 'cut_date',
            bind: '{record.cut_date}'
            //value: new Date()  // defaults to today
        },{
            xtype: 'datefield',
            anchor: '100%',            
            fieldLabel: 'Dự kiến vào chuyền:',
            labelAlign: 'left',
            labelWidth: 150,
            format: 'd/m/Y',
            reference:'productiondate',
            name: 'productiondate',
            bind: '{record.productiondate}'
            //value: new Date()  // defaults to today
        },{
            xtype: 'datefield',
            anchor: '100%',            
            fieldLabel: 'Dự kiến QC:',
            labelAlign: 'left',
            labelWidth: 150,
            format: 'd/m/Y',
            reference:'qc_date',
            name: 'qc_date',
            bind: '{record.qc_date}'
            //value: new Date()  // defaults to today
        },{
            xtype: 'datefield',
            anchor: '100%',            
            fieldLabel: 'Dự kiến hoàn thiện:',
            labelAlign: 'left',
            labelWidth: 150,
            format: 'd/m/Y',
            reference:'packing_date',
            name: 'packing_date',
            bind: '{record.packing_date}'
            //value: new Date()  // defaults to today
        },{
            xtype: 'datefield',
            anchor: '100%',            
            fieldLabel: 'Dự kiến xuất kho:',
            labelAlign: 'left',
            labelWidth: 150,
            format: 'd/m/Y',
            reference:'stockout_date',
            name: 'stockout_date',
            bind: '{record.stockout_date}'
            //value: new Date()  // defaults to today
        }]
    }],
    fbar: [{
        minWidth: 80,
        text: 'Xác nhận',
        handler: 'onSelectButton'
    }, {
        minWidth: 80,
        text: 'Đóng',
        handler: 'onCloseButton'
    }]    
});
