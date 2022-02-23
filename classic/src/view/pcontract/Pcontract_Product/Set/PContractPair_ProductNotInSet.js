Ext.define('GSmartApp.view.pcontract.PContractPair_ProductNotInSet', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContractPair_ProductNotInSet',
    id:'PContractPair_ProductNotInSet',
    // controller: 'PContractProductPairInsertViewCotroller',
    productpairid_link: 0,
    // viewModel: {
    //     type: 'PContractViewModel'
    // },
    viewConfig: {
        enableTextSelection: false,
        columnLines: true,
        rowLines: true,
        plugins: {
            ptype: 'gridviewdragdrop',
            enableDrag: true,
            dragText: '{0} sản phẩm',
            dragGroup: 'ProductPairGroup',
            // dropGroup: 'ProductPairGroup'
        } 
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1
        }
    },
    bind:{
        store:'{PContractProductNotPairStore}'
    },
    reference: 'PContractPair_ProductNotInSet',
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
        dataIndex:'productBuyerCode',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },{
        text:'Tên SP',
        width: 100,
        dataIndex:'productName',
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }]
});

