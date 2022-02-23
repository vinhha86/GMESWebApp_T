Ext.define('GSmartApp.view.pcontract.PContract_PO_FormAccept', {
    extend: 'Ext.form.Panel',
    xtype: 'PContract_PO_FormAccept',
    id: 'PContract_PO_FormAccept',
    controller: 'PContract_PO_FormAccept_ViewCotroller',
    viewModel : {
        type: 'PContract_PO_FormAccept_ViewModel'
    },
    bodyPadding: 5,
    border: false,
    IdPContract: 0,
    items: [{
        layout: 'vbox',
        border: false,
        items: [{
            xtype: 'textfield',
            labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
            fieldStyle: 'font-size:11px;',
            fieldLabel: 'PO Buyer:',
            labelAlign: 'left',
            labelWidth: 90,
            width: '100%',
            readOnly: true,
            margin: 2,
            bind: {
                value: '{po.po_buyer}'
            }                           
        },{
            xtype: 'textfield',
            readOnly: true,
            labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
            fieldStyle: 'font-size:11px;',
            fieldLabel: 'PO Vendor:',
            labelAlign: 'left',
            labelWidth: 90,
            width: '100%',
            margin: 2,
            bind: {
                value: '{po.po_vendor}'
            }
        },{
            xtype: 'datefield',
            labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
            fieldStyle: 'font-size:11px;',
            fieldLabel: 'Ngày giao:',
            reference: 'poinfo_shipdate',
            labelAlign: 'left',
            labelWidth: 90,
            width: '100%',
            margin: 2,
            format: 'd/m/Y',
            readOnly: true,
            altFormats: "Y-m-d\\TH:i:s.uO",
            bind: {
                value: '{po.shipdate}'
            }
        }, {
            xtype: 'textfield',
            readOnly: true,
            labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
            fieldStyle: 'font-size:11px;',
            fieldLabel: 'Số lượng:',
            labelAlign: 'left',
            labelWidth: 90,
            width: '100%',
            vtype: 'dollar',
            margin: 2,
            bind: {
                value: '{po.po_quantity}'
            }
        },{
            xtype: 'combo',
            queryMode: 'local',
            anyMatch: true,
            valueField: 'id',
            displayField: 'name',
            labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
            fieldStyle: 'font-size:11px;',
            margin: 2,
            fieldLabel: "Đơn vị chính:",
            bind: {
                value: '{po.orgid_link}',
                store: '{OrgStore}'
            },
            labelWidth: 90,
            width: '100%',
            allowBlank: false,
            blankText: 'Bạn chưa chọn đơn vị',
            itemId: 'cmbDonVi'
        }, {
            xtype: 'combo',
            queryMode: 'local',
            anyMatch: true,
            valueField: 'id',
            displayField: 'fullname',
            labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
            fieldStyle: 'font-size:11px;',
            margin: 2,
            fieldLabel: "Merchandiser:",
            bind: {
                value: '{po.userid_link}',
                store: '{UserStore}'
            },
            labelWidth: 90,
            width: '100%'
        }]
    }],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        items:[{
            xtype: 'button',
            margin: 5,
            text: 'Thoát',
            iconCls: 'x-fa fa-window-close',
            itemId: 'btnThoat'
        },{
            xtype: 'button',
            margin: 5,
            text: 'Xác nhận',
            iconCls: 'x-fa fa-check',
            itemId: 'btnXacNhan',
            formBind: true
        },{
            flex: 1,
        }]
    }]
})