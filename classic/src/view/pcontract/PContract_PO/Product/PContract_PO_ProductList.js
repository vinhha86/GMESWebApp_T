Ext.define('GSmartApp.view.pcontract.PContract_PO_ProductList', {
    extend: 'Ext.tree.Panel',
    xtype: 'PContract_PO_ProductList',
    id: 'PContract_PO_ProductList',
    // controller: 'PContractSKU_ListProductViewCotroller',
    IdPContract: 0,
    viewConfig: {
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    indent: 0,
    features: [{
        ftype: 'summary',
        groupHeaderTpl: 'Tổng',
        dock: 'bottom'
    }],
    rootVisible: false,
    bind: {
        store: '{PContractProductTreeStore}'
    },
    reference: 'PContract_DeliveryPlan_ProductList',
    columns: [
        {
            text: 'Mã SP (Buyer)',
            xtype: 'treecolumn',
            cellWrap: true,
            dataIndex: 'code',
            flex: 1,
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'styleCodeFilter',
                width: '99%',
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onStyleCodeFilterKeyup',
                    buffer: 500
                }
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return '<div style ="font-size:9px">' + value + '</div>';
            },
            cellTpl: [
                '<tpl for="lines">',
                '<div class="{parent.childCls} {parent.elbowCls}-img ',
                '{parent.elbowCls}-<tpl if=".">line<tpl else>empty</tpl>" role="presentation"></div>',
                '</tpl>',
                '<div style="display:inline-flex">',
                '<div class="{childCls} {elbowCls}-img {elbowCls}',
                '<tpl if="isLast">-end</tpl><tpl if="expandable">-plus {expanderCls}</tpl>" role="presentation"></div>',
                '<tpl if="checked !== null">',
                '<div role="button" {ariaCellCheckboxAttr}',
                ' class="{childCls} {checkboxCls}<tpl if="checked"> {checkboxCls}-checked</tpl>"></div>',
                '</tpl>',
                '<tpl if="glyph">',
                '<span class="{baseIconCls}" ',
                '<tpl if="glyphFontFamily">',
                'style="font-family:{glyphFontFamily}"',
                '</tpl>',
                '>{glyph}</span>',
                '<tpl else>',
                '<tpl if="icon">',
                '<img src="{blankUrl}"',
                '<tpl else>',
                '<div',
                '</tpl>',
                ' role="presentation" class="{childCls} {baseIconCls} {customIconCls} ',
                '{baseIconCls}-<tpl if="leaf">leaf<tpl else><tpl if="expanded">parent-expanded<tpl else>parent</tpl></tpl> {iconCls}" ',
                '<tpl if="icon">style="background-image:url({icon})"/><tpl else>></div></tpl>',
                '</tpl>',
                '<tpl if="href">',
                '<a href="{href}" role="link" target="{hrefTarget}" class="{textCls} {childCls}">{value}</a>',
                '<tpl else>',
                '<span class="{textCls} {childCls}">{value}</span>',
                '</tpl>',
                '</div>'
            ]
        },
        {
            text: 'Mã SP vendor',
            dataIndex: 'vendorcode',
            align: 'left',
            width: 90,
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'styleVendorCodeFilter',
                width: '99%',
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onStyleVendorCodeFilterKeyup',
                    buffer: 500
                }
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                value = value == null ? "" : value;
                return '<div style ="font-size:9px">' + value + '</div>';
            }
        },
        {
            text: 'SL',
            dataIndex: 'amount',
            align: 'right',
            width: 70,
            summaryType: 'sum',
            summaryRenderer: function (value, summaryData, dataIndex) {
                return '<div style="color:red; font-size:9px; font-weight: bold; align: right">' + Ext.util.Format.number(value, '0,000') + '</div>';
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                metaData.tdCls = 'po_linekh';
                var value = value == 0 ? "" : Ext.util.Format.number(value, '0,000');
                return '<div style ="font-size:9px">' + value + '</div>'
            }
        },
        {
            text: 'Giá',
            dataIndex: 'price',
            align: 'right',
            width: 60,
            summaryType: 'sum',
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                metaData.tdCls = 'po_linekh';
                var value = value == 0 ? "" : Ext.util.Format.number(value, '0,000.00');
                return '<div style ="font-size:9px">' + value + '</div>'
            },
            summaryRenderer: function (value, summaryData, dataIndex) {
                return '<div style="color:red; font-size:9px; font-weight: bold; align: right">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
            }
        },
        {
            text: 'Tổng',
            dataIndex: 'totalprice',
            align: 'right',
            width: 70,
            summaryType: 'sum',
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                metaData.tdCls = 'po_linekh';
                var value = value == 0 ? "" : Ext.util.Format.number(value, '0,000.00');
                return '<div style ="font-size:9px">' + value + '</div>'
            },
            summaryRenderer: function (value, summaryData, dataIndex) {
                return '<div style="color:red; font-size:9px; font-weight: bold; align: right">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
            }
        }
    ],
    dockedItems: [{
        dock: 'bottom',
        xtype: 'toolbar',
        height: 40,
        padding: 2,
        // layout: 'hbox',
        items: [
            {
                xtype: 'filefield',
                buttonText: 'Tải báo giá',
                buttonOnly: true,
                hidden: true,
                itemId: 'fileUpload',
                width: 35,
                height: 32,
                margin: 3
            },
            // {
            //     xtype: 'splitbutton',
            //     renderTo: Ext.getBody(),
            //     margin: 3,
            //     iconCls: 'x-fa fas fa-bars violetIcon',
            //     menu: new Ext.menu.Menu({
            //         items: [
            //             // these will render as dropdown menu items when the arrow is clicked:
            //             {
            //                 text: 'Upload báo giá',
            //                 iconCls: 'x-fa fa-upload',
            //                 itemId: 'splbtn_Upload'
            //             },
            //             {
            //                 text: 'Mẫu file upload', 
            //                 iconCls: 'x-fa fa-download',
            //                 itemId: 'splbtn_Template'
            //             },
            //             {
            //                 text: 'Xuất Excel báo giá', 
            //                 iconCls: 'x-fa fa-download',
            //                 itemId: 'splbtn_Excel'
            //             }
            //         ]
            //     })
            // }
            {
                xtype: 'button',
                tooltip: 'Upload báo giá',
                // margin: 3,
                iconCls: 'x-fa fa-upload',
                itemId: 'splbtn_Upload'
            },
            {
                xtype: 'button',
                tooltip: 'Xuất Excel báo giá',
                // margin: 3,
                iconCls: 'x-fa fa-file-excel-o',
                itemId: 'splbtn_Excel'
            },
            {
                xtype: 'button',
                tooltip: 'Tải file mẫu',
                // margin: 3,
                iconCls: 'x-fa fa-download',
                itemId: 'splbtn_Template'
            }
        ]
    }]
});

