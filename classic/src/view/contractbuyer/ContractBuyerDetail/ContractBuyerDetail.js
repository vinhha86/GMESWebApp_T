Ext.define('GSmartApp.view.contractbuyer.ContractBuyerDetail.ContractBuyerDetail', {
    extend: 'Ext.form.Panel',
    xtype: 'ContractBuyerDetail',
    id: 'ContractBuyerDetail',
    controller: 'ContractBuyerDetailController',
    viewModel: {
        type: 'ContractBuyerViewModel'
    },
    layout: 'border',
    // bind:{
    //     title: '{title}'
    // },
    items: [{
        region: 'west',
        width: '60%',
        border: true,
        margin: 1,
        bind: {
            title: '{title}'
        },
        items: [{
            xtype: 'textfield',
            margin: 5,
            fieldLabel: 'Mã hợp đồng (' + '<span style="color:red">*</span>' + ')',
            allowBlank: false,
            blankText: 'Không được để trống',
            maxLength: 50,
            maxLengthText: 'Tối đa 50 ký tự',
            bind: {
                value: '{currentRec.contract_code}'
            },
            width: 400,
            itemId: 'contract_code',
            labelWidth: 120
        }, {
            xtype: 'textfield',
            margin: 5,
            fieldLabel: 'Năm hợp đồng (' + '<span style="color:red">*</span>' + ')',
            allowBlank: false,
            maskRe: /[0-9]/,
            maxLength: 4,
            maxLengthText: 'Tối đa 4 ký tự',
            bind: {
                value: '{currentRec.contract_year}'
            },
            width: 400,
            itemId: 'contract_year',
            labelWidth: 120,
            listeners: {
                focusleave: 'onContractYearFocusLeave'
            }
        }, {
            xtype: 'datefield',
            margin: 5,
            fieldLabel: 'Ngày hợp đồng',
            allowBlank: true,
            reference: 'contract_date',
            format: 'd/m/Y',
            bind: {
                value: '{currentRec.contract_date}'
            },
            // value: new Date(),
            width: 400,
            itemId: 'contract_date',
            labelWidth: 120
        }, {
            xtype: 'datefield',
            margin: 5,
            fieldLabel: 'Ngày kết thúc',
            allowBlank: true,
            reference: 'contract_date_finish',
            format: 'd/m/Y',
            bind: {
                value: '{currentRec.contract_date_finish}'
            },
            // value: new Date(),
            width: 400,
            itemId: 'contract_date_finish',
            labelWidth: 120
        }, {
            xtype: 'combobox',
            margin: 5,
            fieldLabel: 'Vendor',
            bind: {
                store: '{Vendor}',
                value: '{currentRec.vendorid_link}'
            },
            displayField: 'code',
            valueField: 'id',
            queryMode: 'local',
            anyMatch: true,
            // editable: false,
            width: 400,
            labelWidth: 120,
        }, {
            layout: 'hbox',
            items: [{
                xtype: 'textfield',
                margin: 5,
                fieldLabel: 'Link hợp đồng',
                bind: {
                    value: '{currentRec.url}'
                },
                width: 400,
                labelWidth: 120,
                itemId: 'textLinkContract'
            }, {
                xtype: 'button',
                iconCls: 'x-fa fa-forward',
                text: 'Đến trang hợp đồng',
                itemId: 'btnUrl_Contract',
                margin: 5
            }]
        }, {
            layout: 'hbox',
            items: [{
                xtype: 'textfield',
                margin: 5,
                fieldLabel: 'File hợp đồng',
                bind: {
                    value: '{currentRec.file_contract_name}'
                },
                width: 400,
                readOnly: true,
                labelWidth: 120
            }, {
                xtype: 'button',
                iconCls: 'x-fa fa-upload',
                text: 'Upload file',
                itemId: 'btnUpload',
                margin: 5
            }, {
                xtype: 'filefield',
                buttonText: 'Tải báo giá',
                buttonOnly: true,
                hidden: true,
                itemId: 'fileUpload_Contract',
                width: 35,
                height: 32,
                margin: 3
            }, {
                xtype: 'button',
                iconCls: 'x-fa fa-download',
                text: 'Download file',
                itemId: 'btnDownload_Contract',
                margin: 5
            }]
        }, {
            xtype: 'textarea',
            margin: 5,
            fieldLabel: 'Chú thích',
            reference: 'comment',
            // allowBlank: false,
            // blankText : 'Không được để trống',
            bind: {
                value: '{currentRec.comment}'
            },
            maxLength: 1000,
            maxLengthText: 'Tối đa 1000 ký tự',
            width: 400,
            height: 200,
            labelWidth: 120
        }]
    }, {
        region: 'center',
        width: '40%',
        border: true,
        margin: 1,
        title: 'Danh sách Buyer',
        xtype: 'grid',
        id: 'ContractBuyerListBuyerGrid',
        reference: 'ContractBuyerListBuyerGrid',
        viewConfig: {
            stripeRows: false,
            columnLines: true,
            rowLines: true
        },
        bind: {
            store: '{currentRec.contractBuyerDs}'
        },
        columns: [
            {
                xtype: 'actioncolumn',
                width: 30,
                menuDisabled: true,
                sortable: false,
                align: 'center',
                items: [{
                    iconCls: 'x-fa fas fa-trash',
                    tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
                    handler: 'onXoaBuyer',
                }]
            }, {
                text: 'STT',
                width: 50,
                xtype: 'rownumberer',
                align: 'center'
            }, {
                text: 'Buyer',
                dataIndex: 'buyerCode',
                flex: 1,
                renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                    metaData.tdAttr = 'data-qtip="' + value + '"';
                    return value;
                }
            }],
        dockedItems: [{
            dock: 'top',
            xtype: 'toolbar',
            border: false,
            items: [{
                xtype: 'button',
                margin: '5 1 5 1',
                // text: 'Thêm Buyer',
                // width: 105,
                iconCls: 'x-fa fa-plus',
                itemId: 'btnThemMoiBuyer',
            }]
        }]

    }],
    dockedItems: [{
        layout: 'hbox',
        border: false,
        dock: 'bottom',
        items: [{
            xtype: 'button',
            text: 'Quay lại',
            margin: 3,
            itemId: 'btnQuayLai',
            iconCls: 'x-fa fa-backward'
        }, {
            xtype: 'button',
            text: 'Lưu',
            margin: 3,
            itemId: 'btnLuu',
            iconCls: 'x-fa fa-save',
            formBind: true
        }, {
            xtype: 'button',
            text: 'Lưu và tạo mới',
            margin: 3,
            itemId: 'btnLuuVaTaoMoi',
            iconCls: 'x-fa fa-save',
            formBind: true
        }, {
            flex: 1,
            border: false
        }]
    }]
})