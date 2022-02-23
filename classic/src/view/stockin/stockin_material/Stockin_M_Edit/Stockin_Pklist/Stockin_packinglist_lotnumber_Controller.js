Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.stockin_pklist.Stockin_packinglist_lotnumber_Controller', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Stockin_packinglist_lotnumber_Controller',
	init: function () {
	},
	control: {
		'#Stockin_packinglist_lotnumber': {
			itemclick: 'onSelectlot'
		}
	},
	renderSum: function (value) {
		if (null == value) value = 0;
		return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
	},
	renderCount: function (value) {
		if (null == value) value = 0;
		return '<div style="font-weight: bold; color:darkred;"> Tổng: ' + Ext.util.Format.number(value, '0,000') + '</div>';
	},
	onSelectlot: function (grid, record, item, index, e, eOpts) {
		// console.log(record);
		var viewModel = this.getViewModel();
		viewModel.set('curentLot', record);
		var PackingListStore = viewModel.getStore('PackingListStore');
		PackingListStore.removeAll();
		PackingListStore.insert(0,record);
	}
})