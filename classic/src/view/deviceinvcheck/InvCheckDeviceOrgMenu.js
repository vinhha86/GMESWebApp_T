Ext.define('GSmartApp.view.deviceinvcheck.InvCheckDeviceOrgMenu', {
    extend: 'Ext.tree.Panel',
    xtype: 'InvCheckDeviceOrgMenu',
    id:'InvCheckDeviceOrgMenu',
    controller: 'InvCheckDeviceOrgMenuController',
    reference: 'InvCheckDeviceOrgMenu',
    useArrows:true,
    bufferedRenderer: false,
    border: false,
    // viewConfig: {
    //     stripeRows: true,
    //     enableTextSelection: true,
    //     columnLines: true,
    //     rowLines: true
    // },    
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
                metaData.iconCls = 'x-fa fa-building';
            if(record.data.orgtypeid_link == 17)
                metaData.iconCls = 'x-fa fa-home';
            if(record.data.orgtypeid_link == 13){
                    metaData.iconCls = 'x-fa fa-industry';
                if(record.data.is_manufacturer == 1)
                    metaData.iconCls = 'x-fa fa-handshake';
                else
                    metaData.iconCls = 'x-fa fa-industry';
            }
            if(record.data.orgtypeid_link == 14)
                metaData.iconCls = 'x-fa fa-sliders';
            return value;
        }                     
    }],
    // listeners: {
    //    itemcontextmenu: 'onContextMenu'
    // },
    // dockedItems: [{
    //     dock: 'top',
    //     layout: 'hbox',
    //     border: false,
    //     items: [{
    //         xtype: 'checkbox',
    //         fieldLabel: 'Hiện đơn vị không hoạt động ',
    //         labelWidth: 200,
    //         labelAlign: 'right',
    //         bind: {
    //             value:'{isDisplayInactive}'
    //         },
    //         listeners: {
    //             change: 'onchkboxchange'
    //         }
    //     }]
    // }]
});

