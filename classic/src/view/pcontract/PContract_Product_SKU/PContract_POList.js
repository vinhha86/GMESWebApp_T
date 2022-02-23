Ext.define('GSmartApp.view.pcontract.PContract_POList', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_POList',
    itemId: 'PContract_POList',
    cls: 'PContract_POList',
    controller: 'PContract_POListController',
    viewConfig: {
        stripeRows: false,
        enableTextSelection: false,
        columnLines: true,
        rowLines: true,
        listeners: {
            expandbody: 'onSelectOffer'
        }
    },
    bind: {
        store: '{PContractPOList}'
    },
    reserveScrollbar: true,
    columns: [{
        xtype: 'actioncolumn',
        width: 28,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [
            {
                iconCls: 'x-fa fas fa-bars offerIcon',
                handler: 'onMenu_PO_Parent'
            }
        ]
    }, {
        text: 'STT',
        width: 40,
        xtype: 'rownumberer',
        align: 'center'
    },
    {
        text: 'PO Buyer',
        dataIndex: 'po_buyer',
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'POFilter',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onPOFilterKeyup',
                buffer: 500
            }
        },
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdCls = 'po_offer';
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'Mã SP (Buyer)',
        dataIndex: 'productbuyercode',
        flex: 1,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdCls = 'po_offer';
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        },
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'MaSPFilter',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onSPFilterKeyup',
                buffer: 500
            }
        }
    },
    {
        text: 'Ngày GH',
        dataIndex: 'shipdate',
        width: 75,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            metaData.tdCls = 'po_offer';
            return Ext.util.Format.date(value, 'd/m/y');
        }
    },
    {
        text: 'SL',
        align: 'end',
        dataIndex: 'po_quantity',
        width: 70,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            metaData.tdCls = 'po_offer';
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        }
    },
    {
        text: '+/-',
        align: 'end',
        dataIndex: 'po_quantity_difference',
        width: 70,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            // metaData.tdCls = 'po_offer';
            value == null ? value = 0 : value;
            if(value >= 0 ){
                metaData.tdCls = 'yellowBgBlackTxt';
            }else if(value < 0){
                metaData.tdCls = 'yellowBgRedTxt';
            }
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        }
    }],
    plugins: [{
        ptype: 'cellediting',
        clicksToEdit: 2,
        listeners: {
            validateedit: 'onPOListEdit'
        }
    }, {
        ptype: 'rowwidget',
        id: 'rowwidget',
        widget:
        {
            xtype: 'grid',
            itemId: 'PO_ChildList',
            plugins: {
                cellediting: {
                    clicksToEdit: 2,
                    listeners: {
                        validateedit: 'onPOListEdit'
                    }
                }
            },
            features: [{
                ftype: 'summary',
                dock: 'bottom'
            }],
            viewConfig: {
                stripeRows: false
            },
            bind: {
                store: '{record.sub_po_confirm}'
            },
            columns: [{
                xtype: 'actioncolumn',
                width: 28,
                menuDisabled: true,
                sortable: false,
                hideable: false,
                align: 'center',
                items: [
                    {
                        iconCls: 'x-fa fas fa-bars linekhIcon',
                        handler: 'onMenu_PO'
                    }
                ]
            }, {
                text: 'STT',
                width: 40,
                xtype: 'rownumberer',
                align: 'center'
            }, {
                text: 'PO Buyer',
                dataIndex: 'po_buyer',
                sortable: true,
                flex: 1,
                items: {
                    xtype: 'textfield',
                    fieldStyle: "",
                    reference: 'POFilterChil',
                    width: '99%',
                    flex: 1,
                    margin: 2,
                    enableKeyEvents: true,
                    listeners: {
                        keyup: 'onPOChilFilterKeyup',
                        buffer: 500
                    }
                },
                renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                    metaData.tdCls = 'po_linekh';
                    metaData.tdAttr = 'data-qtip="' + value + '"';
                    return value;
                },
                editor: {
                    allowBlank: false,
                    selectOnFocus: false
                }
            }, {
                text: 'Ship Mode',
                dataIndex: 'shipmodeid_link',
                width: 75,
                hideable: false,
                editor: {
                    completeOnEnter: true,
                    field: {
                        xtype: 'combo',
                        typeAhead: true,
                        triggerAction: 'all',
                        selectOnFocus: false,
                        bind: {
                            store: '{ShipModeStore}',
                            value: '{shipmodeid_link}'
                        },
                        displayField: 'name',
                        valueField: 'id',
                        queryMode: 'local'
                    }
                },
                renderer: 'renderShipping'
            },
            {
                text: 'Ngày VC',
                xtype: 'datecolumn',
                dataIndex: 'productiondate',
                hideable: false,
                // renderer: Ext.util.Format.dateRenderer('d/m/y'),
                renderer: function (value) {
                    var date = Ext.Date.parse(value, 'c');
                    return Ext.Date.format(date, 'd/m/y');
                },
                width: 75,
                editor: {
                    xtype: 'datefield',
                    fieldStyle: 'font-size:11px;',
                    format: 'd/m/y',
                    altFormats: "Y-m-d\\TH:i:s.uO",
                },
                renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                    metaData.tdCls = 'po_linekh';
                    var date = Ext.Date.parse(value, 'c');
                    return Ext.Date.format(date, 'd/m/y');
                }
            },
            {
                text: 'Ngày GH',
                xtype: 'datecolumn',
                dataIndex: 'shipdate',
                hideable: false,
                renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                    metaData.tdCls = 'po_linekh';
                    var date = Ext.Date.parse(value, 'c');
                    return Ext.Date.format(date, 'd/m/y');
                },
                width: 75,
                editor: {
                    xtype: 'datefield',
                    fieldStyle: 'font-size:11px;',
                    format: 'd/m/y',
                    altFormats: "Y-m-d\\TH:i:s.uO",
                },
            },
            {
                text: 'SL',
                align: 'end',
                hideable: false,
                dataIndex: 'po_quantity',
                width: 70,
                renderer: 'onRender_poquantity',
                editor: {
                    xtype: 'numberfield',
                    fieldStyle: 'font-size:11px;',
                    hideTrigger: true,
                    allowBlank: false,
                    minValue: 0,
                    maxValue: 1000000,
                    selectOnFocus: false,
                    decimalPrecision: 0
                },
                summaryType: 'sum', summaryRenderer: 'renderSum',
                align: 'end',
            },]
        }
    }
    ],
    dockedItems: [{
        dock: 'top',
        border: 'hbox',
        xtype: 'toolbar',
        padding: '0 0 10 5',
        height: 40,
        items: [{
            xtype: 'displayfield',
            fieldStyle: "font-weight: bold; font-size: 14px; color: black",
            labelWidth: 0,
            bind: {
                value: 'Danh sách PO'
            }
        }, {
            xtype: 'combo',
            editable: true,
            width: 260,
            margin: '0 0 0 5',
            fieldLabel: 'Sản phẩm',
            labelWidth: 70,
            itemId: 'productFilter',
            hidden: true,
            bind: {
                store: '{ProductFilterStore}',
                value: '{IdProduct_filterPO}',
                // readOnly: '{ishidden_addproduct}'
            },
            valueField: 'productid_link',
            displayField: 'productBuyerCode',
            queryMode: 'local'
        },
        {
            xtype: 'filefield',
            buttonText: 'Tải báo giá',
            buttonOnly: true,
            hidden: true,
            itemId: 'fileUploadPO',
            width: 35,
            height: 32,
            margin: 3
        },
        {
            xtype: 'button',
            tooltip: 'Tải file mẫu (PO Line)',
            margin: 3,
            // text: 'Mẫu file PO',
            iconCls: 'x-fa fa-download',
            itemId: 'btnUploadTemplate',
            bind: {
                hidden: '{PContract.contracttypeid_link == 1? false : true}'
            }
        },
        {
            xtype: 'button',
            tooltip: 'Tải file mẫu FOB (PO Line)',
            margin: 3,
            // text: 'Mẫu file PO',
            iconCls: 'x-fa fa-download',
            itemId: 'btnUploadTemplateFOB',
            bind: {
                hidden: '{PContract.contracttypeid_link == 2 ? false : true}'
            }
        },
        {
            xtype: 'combo',
            bind: {
                store: '{MauSanPhamStore}',
                value: '{id_mausanpham_filter}'
            },
            displayField: 'value',
            margin: 3,
            valueField: 'id',
            queryMode: 'local',
            width: 250,
            anyMatch: true,
            itemId: 'cmbFilterMauSP',
            triggers: {
                clear: {
                    cls: 'x-form-clear-trigger',
                    weight: -1,
                    handler: 'onClearFilter'
                }
            }
        }
        ]
    }, {
        dock: 'bottom',
        layout: 'hbox',
        items: [{
            html: '<div class="color-box">'
                + '<div class="color-square po_offer"></div>&nbspChào giá'
                + '</div>',
            margin: '5'
        }, {
            html: '<div class="color-box">'
                + '<div class="color-square po_linekh"></div>&nbspLine giao hàng'
                + '</div>',
            margin: '5'
        }]
    }]
});

