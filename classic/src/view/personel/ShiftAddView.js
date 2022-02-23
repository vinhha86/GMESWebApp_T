Ext.define('GSmartApp.view.personel.ShiftAddView', {
    extend: 'Ext.form.Panel',
    xtype: 'ShiftAddView',
    id: 'ShiftAddView',
    controller:'ShiftAddViewController',
    viewModel:{
        type:'Personel_MainView_Model'
    },
    items:[
        {
            xtype:'combobox',
            fieldLabel:'Ca làm việc',
            queryMode:'local',
            margin:5,
            displayField:'name',
            valueField:'id',
            bind:{
                store:'{TimesheetShiftTypeStore}',
                value:'{Shift.id}'
            }
        }
    ],
    dockedItems:[
        {
            dock:'bottom',
            layout:'hbox',
            items:[
                {
                    xtype:'button',
                    iconCls:'x-fa fa-save',
                    text:'Lưu',
                    itemId:"Luu",
                    margin:5
                },{
                    xtype:'button',
                    iconCls:'x-fa fa-sign-out',
                    text:'Thoát',
                    itemId:'Exit',
                    margin:5
                }
            ]
        }
    ]
})