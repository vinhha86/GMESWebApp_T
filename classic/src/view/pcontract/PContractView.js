Ext.define('GSmartApp.view.pcontract.PContractView', {
    extend: 'Ext.form.Panel',
    xtype: 'PContractView',
    id: 'PContractView',
    itemId: 'PContractView',
    controller: 'PContractViewController',
    viewModel: {
        type: 'PContractViewModel'
    },
    IdPContract: 0,
    layout: 'border',
    height: 500,
    items: [
        {
            region: 'center',
            border: true,
            margin: 1,
            xtype: 'tabpanel',
            itemId: 'tabmain',
            items: [{
                title: 'Thông tin chung',
                layout: 'border',
                items: [{
                    region: 'north',
                    height: 80,
                    border: true,
                    xtype: 'PContractInfoView',
                    margin: 1
                }, {
                    region: 'center',
                    margin: 1,
                    // border: true,
                    layout: 'border',
                    items: [{
                        region: 'center',
                        xtype: 'PContractAttributeView',
                        margin: 1,
                        border: true
                    }, {
                        region: 'west',
                        width: '65%',
                        layout: 'border',
                        items: [
                            {
                                region: 'center',
                                margin: 1,
                                border: true,
                                xtype: 'PContractListProductView',
                            },
                            {
                                region: 'south',
                                margin: 1,
                                height: 200,
                                layout: 'border',
                                items: [{
                                    region: 'center',
                                    xtype: 'PContractDocumentView',
                                    border: true,
                                    margin: 1
                                }, {
                                    region: 'east',
                                    width: '50%',
                                    margin: 1,
                                    border: true,
                                    xtype: 'PContractPairProductView'
                                }]
                            }
                        ]

                    }]
                }]
            }, {
                title: 'Chào giá',
                xtype: 'PContract_PO_Main',
            }, {
                title: 'Chi tiết PO',
                xtype: 'PContractSKUMainView',
                bind: {
                    // disabled: '{disabledTab}'
                }
            },
            // {
            //     title: 'Nguyên phụ liệu',
            //     xtype: 'PContractProductBomView'
            // }, 
            {
                title: 'Định mức hải quan',
                xtype: 'PContractProduct_Bom_TabColorView',
                bind: {
                    // disabled: '{disabledTab}'
                }
            },
            // {
            //     title: 'Định mức cân đối',
            //     xtype: 'PContractProduct_Bom2_TabColorView',
            //     bind: {
            //         // disabled: '{disabledTab}'
            //     }
            // },
            {
                title: 'Định mức cân đối',
                xtype: 'PContract_Bom_View'
            },
            {
                title: 'Định mức kỹ thuật',
                xtype: 'POrderBomKyThuatView',
            },
            {
                title: 'Cân đối NPL',
                xtype: 'Balance_Main_Pcontract',
            },
            {
                title: 'Nguyên phụ liệu về',
                xtype: 'Stockin_M_List_Main',
                viewModel: {
                    data: {
                        isAdd_Pcontract_Stockin: true,
                    }
                }
            },
            // {
            //     title: 'Quyết toán đơn hàng',
            //     xtype: 'Recon_Main_Pcontract',
            // },
                // {
                //     title: 'Lệnh sản xuất',
                //     xtype: 'PContract_POrder_Main',
                //     bind: {
                //         // disabled: '{disabledTab}'
                //     }
                // }
            ]
        }],
    dockedItems: [{
        layout: 'hbox',
        reference: 'dockBottomBar',
        border: false,
        dock: 'bottom',
        items: [{
            xtype: 'button',
            text: 'Quay lại',
            margin: 1,
            itemId: 'btnQuayLai',
            iconCls: 'x-fa fa-backward'
        },
        // {
        //     xtype: 'button',
        //     text: 'Chốt đơn',
        //     margin: 1,
        //     itemId: 'btnConfirm',
        //     iconCls: 'x-fa fa-handshake-o',
        //     // formBind: true
        // },
        {
            xtype: 'button',
            text: 'Lưu',
            margin: 1,
            itemId: 'btnLuu_PContract',
            iconCls: 'x-fa fa-save',
            formBind: true,
            bind: {
                hidden: '{isHidden_btnLuu}'
            }
        }, {
            flex: 1,
            border: false
        }]
    }]
})