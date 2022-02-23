Ext.define('GSmartApp.view.stockout.StockoutForCheckMain', {
    extend: 'Ext.container.Container',
    xtype: 'stockoutforcheckmain',
    controller: 'stockoutforcheck',
    viewModel: 'stockoutforcheck',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    padding: 5,
    items: [
        {
            xtype: 'container',
            layout: 'hbox',
            height: 40,
            items: [
                {
                    xtype: 'radiogroup',
                    reference:'pklistcheck_rdoCheckType',
                    simpleValue: true,
                    width: 200,
                    cls: 'x-check-group-alt',
                    items: [
                        { boxLabel: 'Khử co vải', inputValue: 1, checked: true},
                        { boxLabel: 'Kiểm vải', inputValue: 2, margin: '0 0 0 5'}
                    ],
                    listeners: {
                        change: 'onCheckTypeChange'
                    }            
                }, 
                {
                    xtype: 'datefield',
                    fieldLabel: 'Ngày kiểm:',
                    labelWidth: 90,
                    width: 220,
                    format: 'd/m/Y',
                    reference:'stockoutdate_from',
                    //value: Ext.Date.add (new Date(),Ext.Date.DAY,-5),  // defaults to today
                    value: new Date(),  // defaults to today
                    listeners: {
                        change: 'onSearchTap'
                    }
                }, 
                // {
                //     xtype: 'datefield',
                //     fieldLabel: 'đến ngày:',
                //     margin: '0 0 0 5',
                //     labelWidth: 70,
                //     width: 200,
                //     format: 'd/m/Y',
                //     reference:'stockoutdate_to',
                //     value: new Date(),  // defaults to today
                // }, 
                // {
                //     xtype: 'textfield',
                //     margin: '0 0 0 5',
                //     name: 'txtskucodeforsearch',
                //     reference:'txtskucodeforsearch',
                //     fieldLabel: 'Thẻ vải:',
                //     width: 150,
                //     labelWidth: 55,
                //     hideLabel: false,
                //     //emptyText: 'Mã SX'
                // },        
                // {
                //     xtype: 'button',
                //     margin: '0 0 0 5',
                //     //text: 'Tìm kiếm',
                //     iconCls: 'x-fa fa-search',
                //     weight: 30,
                //     handler: 'onSearchTap'
                // }
            ]            
        },
        {
            xtype: 'container',
            flex: 1,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'stockoutforcheckd',
                    width: 400
                },
                {
                    xtype: 'panel',
                    width: 5
                },
                {
                    xtype: 'stockoutforcheckpklist',
                    flex: 2
                }
            ]
        }  
    ],
    listeners: {
        activate: 'onActivate'
    }               
});
