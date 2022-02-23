Ext.define('GSmartApp.view.stockout.stockout_material.stockout_m_list.stockout_m_edit.stockout_m_edit_d.Stockout_M_Edit_D_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockout_M_Edit_D_Main',
    itemId: 'Stockout_M_Edit_D_Main',
    reference: 'Stockout_M_Edit_D_Main',
    controller: 'Stockout_M_Edit_D_MainController',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    requires: [
        'Ext.Toast',
        'Ext.Responsive',
        'Ext.dataview.listswiper.ListSwiper'
    ],

    items:[
        {
            layout: 'vbox',
            flex: 1,
            items:[
                {
                    xtype: 'textfield',
                    itemId: 'maNPLFilter',
                    // label: 'Mã hàng:',
                    // labelWidth: 85,
                    margin: '5 5 1 5',
                    // padding: 6,
                    // flex: 1,
                    // width: '100%',
                    // minWidth: 80,
                    // maxWidth: 200,
                    textAlign: 'left',
                    placeholder: 'Tìm kiếm nhanh ... (theo mã)',
                    // editable: false,
                    // readOnly: true,
                    clearable: false,
                    cls: 'searchField',
                    // bind: {
                    //     value: '{maNPLFilter}'
                    // },
                    listeners: {
                        keyup: 'onmaNPLFilterKeyup',
                        buffer: 500
                    }
                },
                {
                    margin: 1,
                    flex: 1,
                    xtype: 'Stockout_M_Edit_D',
                },
            ]
        },
    ]
});