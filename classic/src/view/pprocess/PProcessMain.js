Ext.define('GSmartApp.view.pprocess.PProcessMain', {
    extend: 'Ext.Container',
    xtype: 'pprocessmain',

    title: 'Lệnh sản xuất',
    layout: 'fit',
    
    //controller: 'main',
    //viewModel: 'main',
    items: [{
            xtype: 'toolbar',
            items: [{
                xtype: 'datefield',
                anchor: '100%',
                fieldLabel: 'Ngày sản xuất: ',
                dateFormat: 'd/m/Y',
                name: 'processingdate',
                value: new Date()  // defaults to today
            }]
        }, {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'fit'
                //bodyStyle: 'margin: 5px;'
            },        
            items: [{
                xtype: 'porglist',
                width: 80,
                reference:'porglist'
            },{
                xtype: 'panel',
                width: 5
            },{
                xtype: 'porderprocessing',
                flex: 1,
                reference:'porderprocessing'
            }]
    }]
});
