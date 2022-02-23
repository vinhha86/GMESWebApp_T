Ext.define('GSmartApp.view.stock.StockMenu', {
    extend: 'Ext.tree.Panel',
    xtype: 'StockMenu',
    itemId:'StockMenu',
    controller: 'StockMenuController',
    reference: 'StockMenu',
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
        store:'{StockTreeStore}'
    },
    columns:[{
        text:'Khoang',
        dataIndex:'name',
        xtype: 'treecolumn',
        flex: 1,
        renderer: function (value, metaData, record, rowIndex) {
            // metaData.tdCls = 'process-editablecolumn';
            // console.log(metaData);
            if(record.data.type == 0)
                metaData.iconCls = 'x-fa fa-building';
            if(record.data.type == 1)
                metaData.iconCls = 'x-fa fa-industry';
            if(record.data.type == 2)
                metaData.iconCls = 'x-fa fa-home';
            if(record.data.type == 3){
                if(record.data.khoangKhongXacDinh == true){
                    metaData.iconCls = 'x-fa fa-minus-square-o';
                    return 'Khoang ' + value;
                }else{
                    metaData.iconCls = 'x-fa fa-bars';

                    // var value = value.trim();
                    // if(value.length == 2){
                    //     var subStr = value.substring(0, 1);
                    //     if(!isNaN(subStr)){
                    //         value = '0' + value;
                    //     }
                    // }

                    return 'Dãy ' + value;
                }
            }
            if(record.data.type == 4){
                metaData.iconCls = 'x-fa fa-square-o';
                return 'Tầng ' + value; // Hàng
            }
            if(record.data.type == 5){
                metaData.iconCls = 'x-fa fa-minus-square-o';
                // return 'Khoang ' + value + ' (' + record.get('spaceepc') + ')'; // Tầng
                return 'Khoang ' + value; // Tầng
            }
            return value;
        }                     
    }],
    listeners: {
       itemcontextmenu: 'onContextMenu'
    },
});

