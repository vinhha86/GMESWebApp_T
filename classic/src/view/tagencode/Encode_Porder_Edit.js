Ext.define('GSmartApp.view.tagencode.Encode_Porder_Edit', {
    extend: 'Ext.form.Panel',
    xtype: 'Encode_Porder_Edit',
    id:'Encode_Porder_Edit',
    controller: 'Encode_Porder_EditController',
    viewModel:{
        type:'Encode_Porder_Edit_ViewModel'
    },
    layout: 'border',
    items: [{
        region: 'center',
        border : true,
        xtype: 'Encode_POrder_EPC',
        margin: 1
    }, {
        region: 'west',
        width: '55%',
        title: 'Danh sách lệnh sản xuất',
        xtype: 'Encode_POrder',
        border: true,
        margin: 1
    }],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[{
            xtype:'button',
            text: 'Quay lại',
            margin: 3,
            itemId:'btnQuayLai',
            iconCls: 'x-fa fa-backward'
        }]
    }]
})