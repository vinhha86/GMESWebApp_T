Ext.define('GSmartApp.view.sewingtrim.SewingTrimInfoView', {
    extend: 'Ext.form.Panel',
    xtype: 'SewingTrimInfoView',
    id: 'SewingTrimInfoView',
    controller: 'SewingTrimInfoViewController',
    layout:'hbox',
	bodyPadding: 5,
    border: false,
    IdProduct: 0,
    items:[{
        layout:'vbox',
        border: false,
        flex: 1,
        items:[{
            layout:'hbox',
            border:false,
            items:[{
                xtype:'textfield',
                margin: 2,
                fieldLabel: "Mã PL may (<span style = 'color: red'>*</span>)",
                bind:{
                    value : '{product.buyercode}'
                },
                itemId:'code',
                name:'code',
                height: 32,
                allowBlank: false,
                blankText: 'Không được để trống',
                labelWidth: 110
            },{
                xtype:'textfield',
                margin: 2,
                height: 32,
                width: 400,
                fieldLabel: "Tên PL May (<span style = 'color: red'>*</span>)",
                allowBlank: false,
                blankText: 'Không được để trống',
                bind:{
                    value : '{product.name}'
                },
                name:'name',
                labelWidth: 110
            }]
        },{
            layout:'hbox',
            border: false,
            items:[{
                xtype:  'combo',
                margin: 2,
                valueField: 'id',
                displayField: 'name',
                queryMode: 'local',
				anyMatch: true,
                fieldLabel: "Đơn vị tính (<span style = 'color: red'>*</span>)",
                allowBlank: false,
                labelWidth: 110,
                blankText: 'Không được để trống',
                bind:{
                    store: '{UnitStore}',
                    value : '{product.unitid_link}'
                }
            }]
        }]
    },{
        xtype:'SewingTrimImageView',
        margin: 2
    }]
})