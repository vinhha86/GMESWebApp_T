Ext.define('GSmartApp.view.pordercreating.POrderCreating_New_POrder', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrderCreating_New_POrder',
    id: 'POrderCreating_New_POrder',
    controller: 'POrderCreating_New_POrderCotroller',
    reference: 'POrderCreating_New_POrder',
    requires: [
        'Ext.Number',
        'Ext.Date',
        'Ext.grid.plugin.RowWidget'
    ],    
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    border: true,
    bind: {
        store: '{porders}'
    },
    columns: [
        {text:'Mã lệnh', dataIndex:'ordercode', width: 80},
        {text:'Xưởng SX', dataIndex:'granttoorgname', flex: 1},
        {text:'Ngày giao SX', dataIndex:'orderdate', width: 70, renderer: Ext.util.Format.dateRenderer('d/m/y')},
        {text:'Số lượng', dataIndex:'totalorder', width: 70},
        {
            xtype: 'actioncolumn',
            width: 28,
            menuDisabled: true,
            sortable: false,
            renderer: function (value, metadata, record) {
                if (record.get('status') > 0) {
                    this.iconCls = 'x-fa fas fa-trash-o greyIcon';
                    this.tooltip = 'Lệnh đã đưa vào sản xuất';                    
                }
                else {
                    this.iconCls = 'x-fa fas fa-trash-o redIcon';
                    this.tooltip = 'Xóa lệnh';  
                }
            },            
            handler: 'onPOrderItemDelete'
        }                      
    ],
    dockedItems: [{
        dock: 'top',
        layout: 'hbox',
        border: true,
        items:[
            {
                xtype: 'combo',
                flex: 1,
                margin: 5,
                bind: {
                    store: '{ListOrgStore}',
                    value: '{org_order_id_link}'
                },
                valueField: 'id',
                displayField: 'name',
                fieldLabel: 'Phân xưởng/ Đvị gia công:',
                labelWidth: 160,
                itemId: 'cmbOrg'
            }
        ]
    }],
    plugins: {
        rowwidget: {
            widget: 
            {
                xtype: 'grid',
                autoLoad: true,
                bind: {
                    store: '{record.porder_product_sku}',
                    // title: 'Danh sách hàng xuất'
                },
                plugins: {
                    cellediting: {
                        clicksToEdit: 2,
                        listeners: {
                            edit: 'onItemEdit'
                        }            
                    }
                },                  
				columns: [
					{ header: 'Mã vạch', dataIndex: 'skuCode', flex: 1},
					{ header: 'Màu', dataIndex: 'mauSanPham', width: 70},
					{ header: 'Cỡ', dataIndex: 'coSanPham', width: 70},  
                    { header: 'Số lượng', dataIndex: 'pquantity_total', width: 80,
                        editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: true, maxValue: 100000, selectOnFocus: false},
                        summaryType: 'sum', summaryRenderer: 'renderSum',
                        renderer: function (value, metaData, record, rowIndex) {
                            metaData.tdCls = 'process-editablecolumn';
                            return value;
                        }                       
                    }  
				]							
			}
		}
	},    
});

