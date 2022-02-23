Ext.define('GSmartApp.view.stock.stockmenuwindow.StockMenuWindow', {
    extend: 'Ext.tree.Panel',
    xtype: 'StockMenuWindow',
    itemId:'StockMenuWindow',
    controller: 'StockMenuWindow_Controller',
    viewModel:{
        type:'StockMenuWindow_ViewModel'
    },
    reference: 'StockMenuWindow',
    cls: 'StockMenuWindow',
    useArrows:true,
    bufferedRenderer: false,
    selModel: {
        selType: 'rowmodel',
        mode: 'SINGLE'
    },
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
    dockedItems:[
        {
            layout:'hbox',
            border: false,
            dock:'bottom',
            items:[
                {
                    xtype: 'button',
                    itemId: 'btnChon',
                    iconCls: 'x-fa fa-check',
                    tooltip: 'Chọn',
                    text: 'Chọn',
                    margin: '5 1 5 1',
                },
            ]
        }
    ],
});

