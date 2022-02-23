Ext.define('GSmartApp.view.invcheck.InvCheckList_M_Controller', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.InvCheckList_M_Controller',
	init: function () {
		this.callParent(arguments);
		var viewmodel = this.getViewModel();
		var ListOrgStore = viewmodel.get('ListOrgStore');
		var listidtype = "8,9,13,22,17";
		ListOrgStore.loadStore_allchildren_byorg(listidtype);
	},
	onActivate: function () {
		this.onSearch();
	},
	listen: {
		controller: {
			'*': {
				urlBack: 'onSearch',
			}
		}
	},
	onCreate: function () {
		var view = this.getView();
		var viewModel = view.getViewModel();
		var entry = viewModel.get('urlback');
		this.redirectTo("lsinvcheck/create");
	},
	onSearch: function () {
		var invdateto_from = this.lookupReference('invdateto_from');
		var invdateto_to = this.lookupReference('invdateto_to');
		var orgfrom_code = this.lookupReference('orgfrom_code');
		var status = this.lookupReference('status');

		var viewmodel = this.getViewModel();
		var store = viewmodel.get('InvCheckListStore');
		store.loadStore(invdateto_from.getValue(), invdateto_to.getValue(), orgfrom_code.getValue(), status.getValue());
	},
	onItemdblclick: function (grid, record, index, e, eOpts) {
		var id = record.get('id');
		this.redirectTo("lsinvcheck/" + id + "/edit");
	},
	onEdit: function (grid, rowIndex, colIndex) {
		var record = grid.getStore().getAt(rowIndex);
		var id = record.get('id');
		this.redirectTo("lsinvcheck/" + id + "/edit");
	},
	onDelete: function (grid, rowIndex, colIndex) {
		var record = grid.getStore().getAt(rowIndex);
		var id = record.get('id');
		var store = this.getView().getStore();
		Ext.Msg.show({
			title: GSmartApp.Locales.title_thongbao[GSmartApp.Locales.currentLocale],
			message: GSmartApp.Locales.title_dongkiemke[GSmartApp.Locales.currentLocale],
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.QUESTION,
			fn: function (btn) {
				if (btn === 'yes') {
					var record = grid.getStore().getAt(rowIndex);
					if (!isNaN(id)) {
						GSmartApp.Ajax.postJitin('/api/v1/invcheck/invcheck_deactive', '{"id": ' + id + '}', function (success, response, options) {
							store.reload();
						})
					}
				}
			}
		});
	}
})