Ext.define('GSmartApp.view.pcontract.PContractProductPairInsertView', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContractProductPairInsertView',
    id:'PContractProductPairInsertView',
    // controller: 'PContractProductPairInsertViewCotroller',
    productpairid_link: 0,
    // viewModel: {
    //     type: 'PContractViewModel'
    // },
    viewConfig: {
        enableTextSelection: true,
        columnLines: true,
        rowLines: true,
        plugins: {
            ptype: 'gridviewdragdrop',
            enableDrag: false,
            dragGroup: 'ProductPairGroup',
            dropGroup: 'ProductPairGroup'
        },
        listeners: {
            beforedrop: 'onBeforeDropAdd'
        }   
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1
        }
    },
    bind:{
        store:'{PContractProductPairStore}'
    },
    reference: 'PContractProductPairInsertView',
    columns:[{
        text:'Ảnh',
        dataIndex:'imgproduct',
        width: 50,
        textAlign: 'center',
        renderer: function(value, meta, record){
            return '<img style="width:16px; height:14px" src="data:image/gif;base64,'+ value +'">';
        }
    },{
        text:'Mã SP (Buyer)',
        flex: 1,
        dataIndex:'productBuyerCode',
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },{
        text:'Tên SP',
        dataIndex:'productName',
        width: 100,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },{
        text:'Số lượng',
        dataIndex:'amount',
        width: 90,
        align: 'right',
        editor:{
            xtype:'textfield',
            maskRe: /[0-9.]/,
            selectOnFocus: true
        },
        renderer: function(value, meta, record){
            return Ext.util.Format.number(value, '0,000');
        }
    },{
        xtype: 'actioncolumn',
        width: 25,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [{
            iconCls: 'x-fa fas fa-trash',
            itemId: 'btnXoa_sp',
            tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
            handler: 'onXoa'
        }]
    }]
});

