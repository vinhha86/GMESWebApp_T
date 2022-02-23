Ext.define('GSmartApp.view.stock.stockcreate.StockRow', {
    extend: 'Ext.form.Panel',
    xtype: 'StockRow',
    itemId:'StockRow',
    controller: 'StockRowController',
    layout: 'vbox',
    items: [{
        // width:400,
        flex: 1,
        margin: 5,
        labelWidth: 105,
        xtype: 'combobox',
        fieldLabel: 'Kho',
        bind:{
            store:'{ListKhoRowStore}',
            value:'{rowObj.orgid_link}'
        },
        displayField: 'name',
        valueField: 'id',
        queryMode: 'local',
        anyMatch: true,
        editable: false,
        allowBlank: false,
        readOnly: true
    },{
        // width:400,
        flex: 1,
        xtype:'textfield',
        itemId: 'txtFieldCode',
        margin: 5,
        fieldLabel: 'Dãy ('+ '<span style="color:red">*</span>' + ')',
        // allowBlank: false,
        // blankText : 'Không được để trống',
        maxLength: 20,
        maxLengthText: 'Tối đa 20 ký tự',
        bind:{
            value:'{rowObj.code}'
        },
        labelWidth: 105
    }],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnThoat',
            iconCls: 'x-fa fa-window-close',
        },{
            xtype:'button',
            text: 'Lưu',
            margin: 3,
            itemId:'btnLuuRow',
            iconCls: 'x-fa fa-save',
        },{
            flex:1,
            border: false
        },]
    }]
})