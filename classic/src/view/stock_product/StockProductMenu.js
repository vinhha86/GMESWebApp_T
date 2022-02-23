Ext.define('GSmartApp.view.stock_product.StockProductMenu', {
    extend: 'Ext.tree.Panel',
    xtype: 'StockProductMenu',
    itemId:'StockProductMenu',
    controller: 'StockProductMenuController',
    reference: 'StockProductMenu',
    useArrows:true,
    bufferedRenderer: false,
    // viewConfig: {
    //     plugins: {
    //         ptype: 'treeviewdragdrop',
    //         containerScroll: true
    //     },
    //     listeners: {
    //         beforedrop: 'onBeforeDropOrg',
    //         drop: 'onDropOrg',
    //     }      
    // },
    rootVisible: false,
    bind:{
        store:'{StockProductTreeStore}'
    },
    columns:[{
        text:'Kho',
        dataIndex:'name',
        xtype: 'treecolumn',
        flex: 1,
        renderer: function (value, metaData, record, rowIndex) {
            // metaData.tdCls = 'process-editablecolumn';
            // console.log(metaData);
            if(record.data.type == 0)
                metaData.iconCls = 'x-fa fa-building';
            if(record.data.type == 1){
                metaData.iconCls = 'x-fa fa-industry';
                if(record.data.shop == true){
                    metaData.iconCls = 'x-fa fa-home';
                    return value;
                }else{
                    metaData.iconCls = 'x-fa fa-industry';
                    return value;
                }
            }
            if(record.data.type == 2){
                metaData.iconCls = 'x-fa fa-home';
            }
            if(record.data.type == 3){
                if(record.data.khoangKhongXacDinh == true){
                    metaData.iconCls = 'x-fa fa-minus-square-o';
                    return 'Khoang ' + value;
                }else{
                    metaData.iconCls = 'x-fa fa-bars';
                    return 'Dãy ' + value;
                }
            }
            if(record.data.type == 4){
                metaData.iconCls = 'x-fa fa-square-o';
                return 'Hàng ' + value;
            }
            if(record.data.type == 5){
                metaData.iconCls = 'x-fa fa-minus-square-o';
                return 'Tầng ' + value + ' (' + record.get('spaceepc') + ')';
            }
            return value;
        }                     
    }],
    listeners: {
       itemcontextmenu: 'onContextMenu'
    },
});

