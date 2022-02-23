Ext.define('GSmartApp.view.pprocess.POrderSubProcessWindow', {
    extend: 'Ext.window.Window',
    xtype: 'pordersubprocesswindow',
    title: 'Công đoạn phụ',
    controller: 'pordersubprocess',
    viewModel: 'pordersubprocess',
    width: 300,
    height: 500,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    bodyPadding: 10,
    modal: true,
    items: [{
        xtype: 'textfield',
        readOnly: true,
        textAlign: 'right',
        anchor: '100%',            
        fieldLabel: 'Tổ SX:',
        labelAlign: 'left',
        labelWidth: 100,
        bind: '{granttoorgid_link}',
    },{
        xtype: 'textfield',
        readOnly: true,
        textAlign: 'right',
        anchor: '100%',            
        fieldLabel: 'Mã SX:',
        labelAlign: 'left',
        labelWidth: 100,
        bind: '{ordercode}',
    },{
        xtype: 'gridpanel',
        reference: 'grdsubprocess',
        border: true,
        // width: 280,
        // height: 300,
        flex: 1,
        store: {
            type: 'porderworkingprocess'
        },
        // selModel: {
        //     selType: 'checkboxmodel'
        // },        
        columns: [
            {xtype: 'checkcolumn', header: 'Chọn', dataIndex: 'isselected', width: 55,
                editor: {xtype: 'checkbox',cls: 'x-grid-checkheader-editor'}
            },             
            {
            header: 'Công đoạn phụ',
            dataIndex: 'name',
            flex: 1,
            editor: {
                // defaults to textfield if no xtype is supplied
                allowBlank: false
            }
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
    }],
    listeners:{
        activate: 'onActivate'
    }
});
