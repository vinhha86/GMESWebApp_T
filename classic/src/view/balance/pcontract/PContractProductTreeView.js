Ext.define('GSmartApp.view.balance.PContractProductTreeView', {
    extend: 'Ext.tree.Panel',
    xtype: 'PContractProductTreeView',
    id: 'PContractProductTreeView',
    controller: 'PContractProductTreeViewController',
    viewConfig: {
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    rootVisible: false,
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    bind: {
        store: '{PContractProductTreeStoreBalance}'
    },
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
                width: '90%',
                margin: 2,
                emptyText: 'Lọc mã sản phẩm',
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onStyleCodeFilterKeyup',
                    buffer: 500
                }
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                if (record.get('children').length > 0)
                    return '<div style ="font-size:9px;background: #f5e6e6">' + value + ' (SP Bộ)</div>';
                return '<div style ="font-size:9px">' + value + "</div>";
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
        }
    ],
    dockedItems: [
        {
            dock: 'bottom',
            xtype: 'toolbar',
            height: 40,
            padding: 2,
            // layout: 'hbox',
            items: [
                {
                    xtype: 'button',
                    text: 'Tính cân đối',
                    iconCls: 'x-fa fa-calculator',
                    handler: 'onCalBalance_ManyProduct'
                }
            ]
        },
        // {
        //     dock: 'top',
        //     xtype: 'toolbar',
        //     height: 40,
        //     padding: 2,
        //     // layout: 'hbox',
        //     items: [
        //         {
        //             xtype: 'combobox',
        //             itemId: 'cboMaterialId',
        //             bind: {
        //                 store: '{Material_ByContract_Store}',
        //                 value: '{Balance.materialid_link}'
        //             },
        //             displayField: 'description',
        //             valueField: 'material_skuid_link',
        //             queryMode: 'local',
        //             anyMatch: true,
        //             editable: true,
        //             allowBlank: true,
        //             margin: 2,
        //             flex: 1,
        //             emptyText: 'Nguyên phụ liệu'
        //         },
        //     ]
        // }
    ]
});

