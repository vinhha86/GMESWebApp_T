Ext.define('GSmartApp.view.pcontract.PContractSKUMainView', {
    extend: 'Ext.form.Panel',
    xtype: 'PContractSKUMainView',
    id: 'PContractSKUMainView',
    itemId: 'PContractSKUMainView',
    IdProduct: 0,
    pcontractid_link: 0,
    controller: 'PContractSKUMainViewController',
    layout: 'border',
    items: [{
        region: 'center',
        xtype: 'PContractSKUView',
        border: true,
        margin: 1
    }, {
        region: 'west',
        width: '45%',
        xtype: 'PContract_POList'
        // layout: 'border',
        // items:[
        //     {
        //         region: 'north',
        //         height: '50%',
        //         xtype: 'PContract_POList',
        //         border: true,
        //         margin: 1,
        //     },
        //     {
        //         region: 'center',
        //         xtype: 'PContractSKU_ListProductView',
        //         border: true,
        //         margin: 1,
        //     }            
        // ]
    }]
})