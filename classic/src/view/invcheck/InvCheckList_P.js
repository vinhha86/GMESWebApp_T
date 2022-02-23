Ext.define('GSmartApp.view.invcheck.InvCheckList_P', {
	extend: 'Ext.grid.Panel',
	xtype:'InvCheckList_P',
	controller: 'InvCheckList_P_Controller',
	viewModel: {
        type: 'InvCheckList_P_ViewModel'
	},
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
	},
	bind:{
		store: '{InvCheckListStore}'
	},
	columns: [{ 
		text: GSmartApp.Locales.sophien[GSmartApp.Locales.currentLocale],
		dataIndex: 'invcheckcode', 
		width: 280
	},
	{ 
		text: GSmartApp.Locales.ngaykiem[GSmartApp.Locales.currentLocale],
		dataIndex: 'invcheckdatetime', 
		width: 120
	},
	{ 
		text: GSmartApp.Locales.kho_kiemke[GSmartApp.Locales.currentLocale],
		dataIndex: 'orgcheck_name', 
		flex:1
	},
	{ 
		text: GSmartApp.Locales.nguoi_taophien[GSmartApp.Locales.currentLocale],
		dataIndex: 'user_name', 
		width: 150
	},
	{
		text: GSmartApp.Locales.trangthai[GSmartApp.Locales.currentLocale],
		dataIndex: 'status', 
		width: 150
	},
	{ 
		xtype: 'actioncolumn',
		width: 50,
		menuDisabled: true,
		sortable: false,

		items: [{
			iconCls: 'x-fa fas fa-edit',
			tooltip:GSmartApp.Locales.btn_sua[GSmartApp.Locales.currentLocale], 
			handler: 'onEdit'
		}, {
			iconCls: 'x-fa fas fa-times-circle-o',
			tooltip:GSmartApp.Locales.dongphien_kiemke[GSmartApp.Locales.currentLocale], 
			handler: 'onDelete'
		}]
	}],	
    dockedItems: [{
        dock: 'top',
        layout: 'hbox',
        xtype: 'toolbar',
        border: false,
		items:[
			{
				xtype:'button',
				text: 'Lập phiên mới',
				iconCls: 'x-fa fa-plus',
				handler: 'onCreate',
			},			 
			{
				name:'invdateto_from',
				reference: 'invdateto_from',
				fieldLabel: 'Kiểm từ ngày:',
				labelWidth: 85,
				width: 215,
				xtype: 'datefield',
				value: new Date(),
				format:'d/m/Y',
				emptyText:GSmartApp.Locales.ngaykiem_tu[GSmartApp.Locales.currentLocale],
			},
			{
				name:'invdateto_to',
				reference: 'invdateto_to',
				fieldLabel: 'đến ngày:',
				labelWidth: 65,				
				width: 195,
				xtype: 'datefield',
				value: new Date(),
				format:'d/m/Y',
				emptyText:GSmartApp.Locales.ngaykiem_den[GSmartApp.Locales.currentLocale],
			},
			{
				name:'orgfrom_code',
				reference: 'orgfrom_code',
				xtype: 'combobox',
				emptyText: 'Kho kiểm',
				bind:{
					store: '{ListOrgStore}'
				},				
				queryMode: 'local',
				anyMatch: true,
				displayField: 'name',
				valueField: 'id'
			},
			{
				xtype: 'combobox',
				reference: 'status',
				emptyText: 'Trạng thái',
				bind:{
					store: '{InvCheckStatusStore}'
				},		
				queryMode: 'local',
				anyMatch: true,
				displayField: 'name',
				valueField: 'id',
				name:'status',
				// value:-1
			},{
			//  width:90,
				xtype:'button',
			//  text:GSmartApp.Locales.btn_loc[GSmartApp.Locales.currentLocale],
				iconCls: 'x-fa fa-search',
				handler:'onSearch'
			}
		]
	},
	{
        dock: 'bottom',
        layout: 'hbox',
        xtype: 'toolbar',
        border: false,
        height: 50,
        items: [{
            xtype: 'textfield',
            value: 25,
            itemId: 'limitpage',
            maskRe: /[0-9]/,
            width: 180,
            selectOnFocus: true,
            margin: 5,
            fieldLabel: 'Số bản ghi/ Trang',
            labelWidth: 120
        }, '-', {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            flex: 1,
            nextText: 'Trang tiếp',
            prevText: 'Trang trước',
            afterPageText: '/ {0}',
            beforePageText: 'Trang',
            itemId: 'page',
            refreshText: 'Làm mới dữ liệu',
            border: false,
            bind: {
                store: '{StockinStore}'
            },
            emptyMsg: 'Không có kết quả tìm kiếm',
            lastText: 'Trang cuối',
            firstText: 'Trang đầu',
            displayMsg: 'Hiển thị {0} - {1} của {2}'
        }]
	}],
    listeners: {
		activate: 'onActivate',
		itemdblclick: 'onItemdblclick'
    }
});

