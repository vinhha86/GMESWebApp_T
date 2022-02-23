Ext.define('GSmartApp.view.org.ListOrgMenu', {
    extend: 'Ext.tree.Panel',
    xtype: 'lsorgmenu',
    id:'ListOrgMenu',
    controller: 'ListOrgMenuController',
    reference: 'ListOrgMenu',
    useArrows:true,
    bufferedRenderer: false,
    bodyStyle: {
        
    },
    // viewConfig: {
    //     stripeRows: true,
    //     enableTextSelection: true,
    //     columnLines: true,
    //     rowLines: true
    // },    
    viewConfig: {
        plugins: {
            ptype: 'treeviewdragdrop',
            containerScroll: true
        },
        listeners: {
            beforedrop: 'onBeforeDropOrg',
            drop: 'onDropOrg',
        }      
    },
    rootVisible: false,
    bind:{
        store:'{MenuStore}'
    },
    columns:[{
        text:'Đơn vị',
        dataIndex:'name',
        xtype: 'treecolumn',
        flex: 1,
        renderer: function (value, metaData, record, rowIndex) {
            // metaData.tdCls = 'process-editablecolumn';
            // console.log(metaData);
            if(record.data.status != 1)
            metaData.tdStyle = 'color: lightgray;';
            if(record.data.orgtypeid_link == 1)
                metaData.iconCls = 'x-fa fa-building'
            if(record.data.orgtypeid_link == 13){
                    metaData.iconCls = 'x-fa fa-industry'
                if(record.data.is_manufacturer == 1)
                    metaData.iconCls = 'x-fa fa-handshake'
                else
                    metaData.iconCls = 'x-fa fa-industry'
            }
            if(record.data.orgtypeid_link == 14)
                metaData.iconCls = 'x-fa fa-sliders'
            if(record.data.orgtypeid_link == 8)
                metaData.iconCls = 'x-fa fa-home'
            if(record.data.orgtypeid_link == 9)
                metaData.iconCls = 'x-fa fa-check-circle'
            if(record.data.orgtypeid_link == 21)
                metaData.iconCls = 'x-fa fa-bath'
            if(record.data.orgtypeid_link == 17)
                metaData.iconCls = 'x-fa fa-scissors'
            if(record.data.orgtypeid_link == 3)
                metaData.iconCls = 'x-fa fa-archive'
            if(record.data.orgtypeid_link == 19)
                metaData.iconCls = 'x-fa fa-archive'
            return value;
        }                     
    }],
    listeners: {
       itemcontextmenu: 'onContextMenu'
    },
    dockedItems: [
        {
            dock: 'top',
            layout: 'hbox',
            border: false,
            items: [{
                xtype: 'checkbox',
                fieldLabel: 'Hiện đơn vị không hoạt động ',
                labelWidth: 200,
                labelAlign: 'right',
                bind: {
                    value:'{isDisplayInactive}'
                },
                listeners: {
                    change: 'onchkboxchange'
                }
            }]
        },
        // {
        //     dock: 'bottom',
        //     layout: 'hbox',
        //     border: false,
        //     items: [{
        //         xtype:'button',
        //         // text: 'Làm mới',
        //         tooltip: 'Làm mới',
        //         margin: 3,
        //         itemId:'btnRefresh',
        //         iconCls: 'x-fa fa-refresh',
        //     }]
        // }
    ]
});

