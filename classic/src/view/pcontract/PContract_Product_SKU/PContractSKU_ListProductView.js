Ext.define('GSmartApp.view.pcontract.PContractSKU_ListProductView', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContractSKU_ListProductView',
    id:'PContractSKU_ListProductView',
    controller: 'PContractSKU_ListProductViewCotroller',
    IdPContract: 0,
    viewConfig: {
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    selModel: {
        //selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEdit'
            } 
        }
    },
    bind:{
        store:'{PContractProduct_PO_Store}'
    },
    reference: 'PContractSKU_ListProductView',
    columns:[
    // {
    //     text:'Ảnh',
    //     dataIndex:'urlimage',
    //     width: 50,
    //     textAlign: 'center',
    //     renderer: function(value, meta, record){
    //         return '<img style="width:16px; height:14px" src="data:image/gif;base64,'+ value +'">';
    //     },
    //     listeners:{
    //         click: 'viewImg'
    //     }
    // },
    {
        text:'Mã Buyer (SP)',
        dataIndex:'code',
        width: 100,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },{
        text:'Tên SP',
        dataIndex:'info',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text:'SL',
        dataIndex:'pquantity',
        width: 60,
        align: 'right',
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        }
        // editor:{
        //     xtype:'textfield',
        //     maskRe: /[0-9.]/,
        //     selectOnFocus: true
        // }
    }
    ],
    // dockedItems:[{
    //     dock: 'bottom',
    //     layout: 'hbox',
    //     border: false,
    //     items:[{
    //         flex: 1
    //     },{
    //         xtype: 'button',
    //         margin: 1,
    //         text: 'Thêm SKU',
    //         iconCls: 'x-fa fa-plus',
    //         itemId: 'btnThemSKU'
    //     }]
    // }]
});

