Ext.define('GSmartApp.view.pcontract.PContractProductBomView', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContractProductBomView',
    id: 'PContractProductBomView',
    controller: 'PContractProductBomViewController',
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    features: [{
        id: 'grouping',
        ftype:'grouping',
        groupHeaderTpl: '{name}',
        collapseTip: "",
        expandTip:""
    }],
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEdit'
            } 
        }
    },
    bind: {
        store: '{PContractProductBom2Store}',
        title: '{title}'
    },
    columns: [{
        text: 'STT',
        width: 45,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Mã NPL',
        dataIndex: 'materialCode',
        width: 150
    },{
        text: 'Nguyên phụ liệu',
        dataIndex: 'materialName',
        flex: 1
    },{
        text: 'Màu NPL',
        dataIndex: 'tenMauNPL',
        width: 100
    },{
        text: 'Cỡ khổ',
        dataIndex: 'coKho',
        width: 100
    },{
        text: 'Thành phần vải',
        dataIndex: 'thanhPhanVai',
        width: 250
    }, {
        text: 'ĐVT',
        dataIndex: 'unitName',
        width: 90
    }, {
        text: 'Tiêu hao',
        dataIndex: 'lost_ratio',
        width: 90,
        xtype: 'numbercolumn',
        format: '0.000',
        getEditor: function (record) {
            return Ext.create('Ext.grid.CellEditor', {
                field: {
                    xtype: 'textfield',
                    maskRe: /[0-9.]/,
                    selectOnFocus: true
                }
            })
        },
        renderer: function (value, metaData, record) {
            return value+" %";
        }
    }, {
        xtype: 'checkcolumn',
        text: 'Ký gửi',
        dataIndex: 'forothercontract',
        width: 60
    }, {
        xtype: 'actioncolumn',
        width: 30,
        menuDisabled: true,
        sortable: false,
        bind:{
            hidden: '{ishiddenActionColumn}'
        },
        items: [{
            iconCls: 'x-fa fas fa-trash',
            tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
            handler: 'onXoa'
        }]
    }],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        border: true,
        height: 45,
        style: "background-color : white",
        items: [{
            xtype: 'combo',
            flex:1,
            margin: 3,
            bind: {
                store: '{PContractProductStore}',
                value: '{IdProduct}',
                readOnly: '{isReadOnlycmbSanPham}'
            },
            fieldLabel: 'Sản phẩm',
            labelWidth: 80,
            itemId: 'cmbSanPham',
            queryMode: 'local',
            anyMatch: true,
            editable: false,
            valueField: 'productid_link',
            displayField: 'productName'
        },{
            xtype: 'combo',
            width:200,
            margin: 3,
            bind: {
                store: '{UnitStore}',
                value: '{id}'
            },
            fieldLabel: 'Đo độ dài:',
            labelWidth: 80,
            queryMode: 'local',
            anyMatch: true,
            editable: false,
            valueField: 'lengthunitid_link',
            displayField: 'name'
        },{
            xtype: 'combo',
            width:200,
            margin: 3,
            bind: {
                store: '{UnitStore}',
                value: '{id}'
            },
            fieldLabel: 'Đo trọng lượng:',
            labelWidth: 100,
            queryMode: 'local',
            anyMatch: true,
            editable: false,
            valueField: 'weightunitid_link',
            displayField: 'name'
        }]
    }]
});

