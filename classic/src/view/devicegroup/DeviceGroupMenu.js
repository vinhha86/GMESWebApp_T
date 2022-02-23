Ext.define('GSmartApp.view.devicegroup.DeviceGroupMenu', {
    extend: 'Ext.tree.Panel',
    xtype: 'DeviceGroupMenu',
    id:'DeviceGroupMenu',
    controller: 'DeviceGroupMenuController',
    reference: 'DeviceGroupMenu',
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
        store:'{DeviceGroupMenuTreeStore}'
    },
    columns:[{
        text:'Nhóm thiết bị',
        dataIndex:'name',
        xtype: 'treecolumn',
        flex: 1,
        renderer: function (value, metaData, record, rowIndex) {
            console.log(metaData);
            metaData.iconCls = 'x-fa fa-sliders';
            return value;
        }                     
    }],
    listeners: {
       itemcontextmenu: 'onContextMenu'
    },
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

