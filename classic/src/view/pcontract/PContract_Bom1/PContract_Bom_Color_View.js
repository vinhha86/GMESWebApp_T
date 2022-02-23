Ext.define('GSmartApp.view.pcontract.PContract_Bom_Color_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_Bom_Color_View',
    controller: 'PContract_Bom_Color_ViewCotroller',
    colorid_link : 0,
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    features: [{
        ftype:'grouping',
        groupHeaderTpl: '{name}'
    }],
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEdit'
            } 
        }
    },
    bind:{
        store:'{PContractBomColorStore}'
    },
    columns:[{
        text: 'STT',
        width: 45,
        xtype: 'rownumberer',
        align: 'center'
    },{
        xtype: 'actioncolumn',
        width: 30,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [{
            itemId: 'btnDeleteMaterial_Bom',
            isActionDisabled: 'checkActionColumnPermission',            
            iconCls: 'x-fa fas fa-trash',
            tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
            handler: 'onXoa'
        }]
    },{
        xtype: 'checkcolumn',
        text: 'Ký gửi',
        dataIndex: 'forothercontract',
        itemId: 'checkother',
        width: 60
    }, {
        text: 'Mã NPL',
        dataIndex: 'materialCode',
        width: 120
    },{
        text: 'Nguyên phụ liệu',
        dataIndex: 'materialName',
        width: 150
    },{
        text: 'Màu NPL',
        dataIndex: 'tenMauNPL',
        width: 80
    },{
        text: 'Cỡ khổ',
        dataIndex: 'coKho',
        width: 80
    },{
        text: 'Thành phần vải',
        dataIndex: 'thanhPhanVai',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'ĐVT',
        dataIndex: 'unitid_link',
        width: 70,
        getEditor: function (record) {
            return Ext.create('Ext.grid.CellEditor', {
                field: {
                    xtype: 'combo',
                    bind: {
                        store: '{UnitStore}'
                    },
                    valueField: 'id',
                    displayField: 'code',
                    queryMode: 'local'
                }
            })
        },
        renderer: 'renderUnit'
    }, {
        text: 'Tiêu hao',
        dataIndex: 'lost_ratio',
        width: 70,
        xtype: 'numbercolumn',
        format: '0.000',
        editor: {
            xtype: 'textfield',
            selectOnFocus: true,
            maskRe: /[0-9.]/
        },
        renderer: function (value, metaData, record) {
            return value+" %";
        }
    },
    {
        text: 'Chung',
        dataIndex: 'amount',
        width: 65,
        xtype: 'numbercolumn',
        format: '0.0000',
        editor:{
            xtype:'textfield',
            maskRe: /[0-9.]/,
            selectOnFocus: true
        },
        renderer: function (value, metaData, record) {
            if(value ==0) return "";
            return Ext.util.Format.number(value, '0.0000')
        }
    },
    {
        text: 'Màu',
        dataIndex: 'amount_color',
        width: 65,
        xtype: 'numbercolumn',
        format: '0.0000',
        editor:{
            xtype:'textfield',
            maskRe: /[0-9.]/,
            selectOnFocus: true
        },
        renderer: function (value, metaData, record) {
            if(value ==0) return "";
            return Ext.util.Format.number(value, '0.0000')
        }
    }]
});

