Ext.define('GSmartApp.view.personel.Personnel_his_detail', {
    extend: 'Ext.form.Panel',
    xtype: 'Personnel_his_detail',
    id: 'Personnel_his_detail',
    controller: 'Personnel_his_detail_ViewController',
    viewModel: {
        type: 'Personnel_his_detail_ViewModel'
    },
    layout: 'vbox',
    // bind: {
    //     title: '{title}'
    // },
    items: [{
        xtype: 'combo',
        margin: 5,
        labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
        fieldStyle: 'font-size:11px;',
        fieldLabel: 'Chức vụ',
        displayField: 'name',
        valueField: 'id',
        labelWidth: 105,
        width: '100%',
        queryMode:'local',
        bind: {
            store : '{PositionStore}',
            hidden: '{!isPosition}',
            value: '{his.positionid_link}'
        }
    },{
        xtype: 'combo',
        margin: 5,
        labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
        fieldStyle: 'font-size:11px;',
        fieldLabel: 'Cấp bậc',
        displayField: 'name',
        valueField: 'id',
        labelWidth: 105,
        width: '100%',
        queryMode:'local',
        bind: {
            store : '{LaborStore}',
            hidden: '{!isLevel}',
            value: '{his.levelid_link}'
        }
    },
    {
        xtype: 'combo',
        margin: 5,
        labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
        fieldStyle: 'font-size:11px;',
        fieldLabel: 'Phòng ban',
        displayField: 'name',
        valueField: 'id',
        labelWidth: 105,
        width: '100%',
        queryMode:'local',
        bind: {
            store : '{OrgStore}',
            hidden: '{!isOrg}',
            value: '{his.orgid_link}'
        }
    },
    {
        xtype: 'radiogroup',
        itemId: 'rdoSalType',
        labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
        fieldStyle: 'font-size:11px;',
        width: '100%',
        cls: 'x-check-group-alt',
        items: [
            { boxLabel: 'Lương thời gian', inputValue: 0, checked: true, margin: 2},
            { boxLabel: 'Lương sản phẩm', inputValue: 1, margin: 2},
            { boxLabel: 'Lương khoán', inputValue: 2, margin: 2}
        ],
        simpleValue: true,
        bind: {
            hidden: '{!isSalary}',
            value: '{saltype}'
        }        
    },
    {
        xtype: 'combo',
        itemId: 'cboSalType',
        editable: false,
        queryMode:'local',
        margin: 5,
        labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
        fieldStyle: 'font-size:11px;',
        fieldLabel: 'Thang lương',
        displayField: 'name',
        valueField: 'id',
        labelWidth: 105,
        width: '100%',
        bind: {
            store : '{SalTypeStore}',
            hidden: '{!isSalary}',
            value: '{his.saltypeid_link}'
        }
    },    
    {
        xtype: 'combo',
        itemId: 'cboSalLevel',
        editable: false,
        margin: 5,
        queryMode:'local',
        labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
        fieldStyle: 'font-size:11px;',
        fieldLabel: 'Bậc lương',
        displayField: 'sallevel_name',
        valueField: 'sallevelid_link',
        labelWidth: 105,
        width: '100%',
        bind: {
            store : '{SalTypeLevelStore}',
            hidden: '{!isSalary}',
            value: '{his.sallevelid_link}'
        }
    },   
    {
        xtype: 'textfield',
        labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
        fieldStyle: 'font-size:11px;',
        margin: 5,
        labelWidth: 105,
        width: '100%',
        fieldLabel: 'Số Quyết định <span style="color:red">(*)</span>',
        bind: {
            value: '{his.decision_number}'
        },
        allowBlank: false,
        blankText: 'Không được để trống'
    },{
        xtype: 'datefield',
        labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
        fieldStyle: 'font-size:11px;',
        fieldLabel: 'Ngày quyết định <span style="color:red">(*)</span>',
        labelAlign: 'left',
        labelWidth: 105,
        width: '100%',
        margin: 5,
        format: 'd/m/Y',
        altFormats: "Y-m-d\\TH:i:s.uO",
        bind: {
            value: '{his.decision_date}'
        },
        allowBlank: false,
        blankText: 'Không được để trống'
    }],
    dockedItems: [{
        layout: 'hbox',
        border: false,
        dock: 'bottom',
        items: [{
            xtype: 'button',
            text: 'Thoát',
            margin: 1,
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close'
        }, 
        {
            xtype: 'button',
            text: 'Lưu',
            margin: 1,
            itemId: 'btnLuu',
            iconCls: 'x-fa fa-save',
            formBind: true
        }]
    }]
})