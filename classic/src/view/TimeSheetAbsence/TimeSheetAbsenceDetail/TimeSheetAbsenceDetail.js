Ext.define('GSmartApp.view.TimeSheetAbsence.TimeSheetAbsenceDetail', {
    extend: 'Ext.form.Panel',
    xtype: 'TimeSheetAbsenceDetail',
    id:'TimeSheetAbsenceDetail',
    controller: 'TimeSheetAbsenceDetailController',
    layout: 'vbox',
    items: [{
        layout: 'hbox',
        width: '100%',
        items: [{
            xtype:'combo',
            margin: 5,
            fieldLabel: 'Đơn vị',
            bind: {
                store : '{ListOrgStore}',
                value: '{orgFactoryId}',
                readOnly: '{isEdit}'
            },
            valueField: 'id',
            displayField: 'name',
            itemId: 'orgFactoryList',
            // allowBlank: false,
            flex:1,
            labelWidth: 110,
            queryMode: 'local',
            anyMatch: true,
            listeners: {
                change: 'onFactoryListChange'
            }
        },{
            xtype:'combo',
            margin: 5,
            fieldLabel: 'Tổ',
            bind: {
                store : '{ListProductionLineStore}',
                value: '{orgProductionLineId}',
                readOnly: '{isEdit}'
            },
            valueField: 'id',
            displayField: 'name',
            itemId: 'orgProductionLineList',
            // allowBlank: false,
            flex:1,
            labelWidth: 110,
            queryMode: 'local',
            anyMatch: true,
            listeners: {
                change: 'onProductionLineListChange'
            }
        }]
    },{
        layout: 'hbox',
        width: '100%',
        items: [{
            xtype:'combo',
            margin: 5,
            fieldLabel: 'Mã nhân viên ('+ '<span style="color:red">*</span>' + ')',
            bind: {
                store : '{Personnel_Store}',
                value: '{personnelid_link}',
                readOnly: '{isEdit}'
            },
            valueField: 'id',
            displayField: 'code',
            itemId: 'personnelCodeList',
            // allowBlank: false,
            flex:1,
            labelWidth: 110,
            queryMode: 'local',
            anyMatch: true,
            listeners: {
                select: 'onPersonnelCodeListChange'
            }
        },{
            xtype:'combo',
            margin: 5,
            fieldLabel: 'Họ tên ('+ '<span style="color:red">*</span>' + ')',
            bind: {
                store : '{Personnel_Store}',
                value: '{personnelfullname}',
                readOnly: '{isEdit}'
            },
            valueField: 'id',
            displayField: 'fullname',
            itemId: 'personnelNameList',
            // allowBlank: false,
            flex:1,
            labelWidth: 110,
            queryMode: 'local',
            anyMatch: true,
            listeners: {
                select: 'onPersonnelNameListChange'
            }
        }]
    },{
        layout: 'hbox',
        width: '100%',
        items: [{
            xtype:'datefield',
            margin: 5,
            fieldLabel: 'Từ ngày ('+ '<span style="color:red">*</span>' + ')',
            reference: 'absencedate_from',
            itemId: 'absencedate_from',
            format: 'd/m/Y',
            bind: {
                value: '{absencedate_from}'
            },
            allowBlank: false,
            flex:1,
            labelWidth: 110,
            listeners: {
                // change: 'onChange'
            }
        },{
            xtype: 'timefield',
            margin: 5,
            fieldLabel: 'Giờ ('+ '<span style="color:red">*</span>' + ')',
            reference: 'timefrom',
            itemId: 'timefrom',
            allowBlank: false,
            flex:1,
            labelWidth: 110,
            format: 'H:i',
            // minValue: '1:30 AM',
            // maxValue: '9:15 PM',
             value: '00:00',
            listeners: {
                // change: 'onChange'
            }
        }]
    },{
        layout: 'hbox',
        width: '100%',
        items: [{
            xtype:'datefield',
            margin: 5,
            fieldLabel: 'Đến ngày ('+ '<span style="color:red">*</span>' + ')',
            reference: 'absencedate_to',
            itemId: 'absencedate_to',
            format: 'd/m/Y',
            bind: {
                value: '{absencedate_to}'
            },
            allowBlank: false,
            flex:1,
            labelWidth: 110,
            listeners: {
                // change: 'onChange'
            }
        },{
            xtype: 'timefield',
            margin: 5,
            fieldLabel: 'Giờ ('+ '<span style="color:red">*</span>' + ')',
            reference: 'timeto',
            itemId: 'timeto',
            allowBlank: false,
            flex:1,
            labelWidth: 110,
            format: 'H:i',
            // minValue: '1:30 AM',
            // maxValue: '9:15 PM',
             value: '23:59',
            listeners: {
                // change: 'onChange'
            }
        }]
    },{
        layout: 'hbox',
        width: '100%',
        items: [{
            xtype:'combo',
            margin: 5,
            fieldLabel: 'Loại nghỉ ('+ '<span style="color:red">*</span>' + ')',
            bind: {
                store : '{TimeSheetAbsenceTypeStore}',
                value: '{absencetypeid_link}'
            },
            valueField: 'id',
            displayField: 'name',
            itemId: 'timeSheetAbsenceTypeList',
            // allowBlank: false,
            flex:1,
            labelWidth: 110,
            queryMode: 'local',
            anyMatch: true,
            listeners: {
                // change: 'onChange'
            }
        },{
            margin: 5,
            flex:1
        }]
    },{
        xtype:'textarea',
        margin: 5,
        fieldLabel: 'Nội dung ('+ '<span style="color:red">*</span>' + ')',
        bind: {
            value: '{absence_reason}'
        },
        reference: 'reason',
        allowBlank: false,
        blankText : 'Không được để trống',
        maxLength: 200,
        maxLengthText: 'Tối đa 200 ký tự',
        width: '100%',
        flex: 1,
        labelWidth: 110
    }],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[{
            xtype:'button',
            text: 'Lưu',
            margin: 3,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save',
            formBind: true
        },{
            xtype:'button',
            text: 'Xác nhận',
            margin: 3,
            itemId:'btnConfirm',
            iconCls: 'x-fa fa-check',
            formBind: false,
            bind: {
                hidden: '{isBtnConfirmHidden}',
                disabled: '{isConfirm}'
            }
        },{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnThoat',
            iconCls: 'x-fa fa-window-close',
            formBind: false
        },{
            flex: 1
        }]
    }]
})