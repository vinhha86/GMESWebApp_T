Ext.define('GSmartApp.view.stock.stockcreate.StockFloor', {
    extend: 'Ext.form.Panel',
    xtype: 'StockFloor',
    itemId:'StockFloor',
    controller: 'StockFloorController',
    layout: 'vbox',
    items: [{
        // width:400,
        flex: 1,
        margin: 5,
        labelWidth: 105,
        xtype: 'combobox',
        fieldLabel: 'Kho',
        bind:{
            store:'{ListKhoSpaceStore}',
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
    },
    // {
    //     // width:400,
    //     flex: 1,
    //     xtype:'textfield',
    //     itemId: 'txtFieldSpaceEpc',
    //     margin: 5,
    //     fieldLabel: 'EPC ('+ '<span style="color:red">*</span>' + ')',
    //     allowBlank: false,
    //     blankText : 'Không được để trống',
    //     maxLength: 100,
    //     maxLengthText: 'Tối đa 100 ký tự',
    //     bind:{
    //         value:'{spaceObj.spaceepc}'
    //     },
    //     labelWidth: 105
    // },
    {
        // width:400,
        flex: 1,
        xtype:'textfield',
        itemId: 'txtFieldSpaceName',
        margin: 5,
        fieldLabel: 'Tầng ('+ '<span style="color:red">*</span>' + ')',
        allowBlank: false,
        blankText : 'Không được để trống',
        maxLength: 10,
        maxLengthText: 'Tối đa 10 ký tự',
        bind:{
            value:'{spaceObj.spacename}',
            hidden: '{isTxtFieldSpaceNameDisable}'
        },
        labelWidth: 105,
        maskRe: /[0-9]/,
    },{
        // width:400,
        flex: 1,
        xtype:'textfield',
        itemId: 'txtFieldFloorId',
        margin: 5,
        fieldLabel: 'Khoang ('+ '<span style="color:red">*</span>' + ')',
        allowBlank: false,
        maxLength: 2,
        maxLengthText: 'Tối đa 2 ký tự',
        bind:{
            value :'{spaceObj.floorid}'
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
            bind: {
                disabled: '{isBtnLuuFloorDisabled}'
            },
            // formBind: true
        },{
            flex:1,
            border: false
        },]
    }]
})