Ext.define('GSmartApp.view.stock.stockcreate.StockSpace', {
    extend: 'Ext.form.Panel',
    xtype: 'StockSpace',
    itemId:'StockSpace',
    controller: 'StockSpaceController',
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
            value:'{spaceObj.orgid_link}'
        },
        displayField: 'name',
        valueField: 'id',
        queryMode: 'local',
        anyMatch: true,
        editable: false,
        allowBlank: false,
        readOnly: true,
        hidden: true,
    },{
        // width:400,
        flex: 1,
        xtype:'textfield',
        itemId: 'txtFieldSpacename',
        margin: 5,
        fieldLabel: 'Tầng ('+ '<span style="color:red">*</span>' + ')',
        // allowBlank: false,
        // blankText : 'Không được để trống',
        maxLength: 20,
        maxLengthText: 'Tối đa 20 ký tự',
        bind:{
            value:'{spaceObj.spacename}'
        },
        labelWidth: 105,
        maskRe: /[0-9]/,
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
            itemId:'btnLuuSpace',
            iconCls: 'x-fa fa-save',
        },{
            flex:1,
            border: false
        },]
    }]
})