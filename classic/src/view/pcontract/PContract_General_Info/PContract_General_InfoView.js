Ext.define('GSmartApp.view.PContract.PContract_General_InfoView', {
    extend: 'Ext.window.Window',
    xtype: 'PContract_General_InfoView',
    id: 'PContract_General_InfoView',
    height: '90%',
    width: '90%',
    closable: true,
    title: 'Thông tin chung',
    resizable: false,
    modal: true,
    border: false,
    closeAction: 'destroy',
    bodyStyle: 'background-color: transparent',
    layout: {
        type: 'fit', // fit screen for window
        padding: 5
    },
    viewModel: {
        type: 'PContractViewModel'
    },
    controller: 'PContract_General_InfoViewController',
    IdPContract: 0,
    items: [
        {
            // title: 'Thông tin chung',
            layout: 'border',
            items: [{
                region: 'north',
                height: 80,
                border: true,
                xtype: 'PContractInfoView',
                margin: 1
            }, {
                region: 'center',
                margin: 1,
                // border: true,
                layout: 'border',
                items: [{
                    region: 'center',
                    xtype: 'PContractAttributeView',
                    margin: 1,
                    border: true
                }, {
                    region: 'west',
                    width: '65%',
                    layout: 'border',
                    items:[
                        {
                            region: 'center',
                            margin: 1,
                            border: true,
                            xtype: 'PContractListProductView',
                        },
                        {
                            region: 'south',
                            margin: 1,
                            height: 200,
                            layout: 'border',
                            items: [{
                                region: 'center',
                                xtype: 'PContractDocumentView',
                                border: true,
                                margin: 1
                            }, {
                                region: 'east',
                                width: '50%',
                                margin: 1,
                                border: true,
                                xtype: 'PContractPairProductView'
                            }]
                        }         
                    ]

                }]
            }]
        }
    ]
})