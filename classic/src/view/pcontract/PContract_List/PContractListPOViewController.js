Ext.define('GSmartApp.view.pcontract.PContractListPOViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractListPOViewController',
    isActivate: false,
    control: {
        'PContractListPOView': {
            itemdblclick: 'onPOSelect'
        },
        '#btnEditAllLine': {
            click: 'onEditLine'
        },
        '#btnThuGon': {
			click: 'onhiddenMaster'
		},
		'#btnMoRong': {
			click: 'onhiddenMaster'
		},
    },
    onhiddenMaster: function () {
		var viewModel = this.getViewModel();
		var formMaster = Ext.getCmp('PContractMainView');
		var isHidden = formMaster.getHeight() > 0 ? false : true;
		viewModel.set('IsformMaster', !isHidden);

		formMaster.setHidden(!isHidden);
	},
    onPOSelect: function (grid, record, item, index, e, eOpts) {
        if (null != record) {
            var pcontractid_link = record.get('pcontractid_link');
            var poid_link = record.get('id');
            var productid_link = record.get('productid_link');

            this.redirectTo('lspcontract/' + pcontractid_link + "/edit_" + poid_link + "_" + productid_link);
        }
    },
    onEditLine: function () {
        var viewmodel = this.getViewModel();
        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Danh sách Line giao hàng',
            closeAction: 'destroy',
            height: 400,
            width: 700,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'All_line_Edit_View',
                viewModel: {
                    data: {
                        pcontractid_link: viewmodel.get('pcontractid_link')
                    }
                }
            }]
        });
        form.show();

        form.down('#All_line_Edit_View').getController().on('Reload', function () {
            var storePO = viewmodel.getStore('PContractPOList');
            storePO.reload();
            // form.close();
        })
    },
    onBuyerCodeFilterKeyup: function () {
        var viewmodel = this.getViewModel();
        var POStore = viewmodel.get('PContractPOList');
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('BuyerCodeFilterField'),
            filters = POStore.getFilters();

        if (filterField.value) {
            this.buyercodeFilter = filters.add({
                id: 'buyercodeFilter',
                property: 'productbuyercode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.buyercodeFilter) {
            filters.remove(this.buyercodeFilter);
            this.buyercodeFilter = null;
        }
    },
    onNgayGiaoFilterKeyup: function () {
        var viewmodel = this.getViewModel();
        var POStore = viewmodel.get('PContractPOList');
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('NgayGiaoFilterField'),
            filters = POStore.getFilters();

        if (filterField.value) {
            this.ngayGiaoFilter = filters.add({
                id: 'ngayGiaoFilter',
                property: 'shipdate',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ngayGiaoFilter) {
            filters.remove(this.ngayGiaoFilter);
            this.ngayGiaoFilter = null;
        }
    },
    onNgayGiaoStringFilterKeyup: function () {
        var viewmodel = this.getViewModel();
        var POStore = viewmodel.get('PContractPOList');
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('NgayGiaoStringFilterField'),
            filters = POStore.getFilters();

        if (filterField.value) {
            this.ngayGiaoStringFilter = filters.add({
                id: 'ngayGiaoStringFilter',
                property: 'shipdateString',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ngayGiaoStringFilter) {
            filters.remove(this.ngayGiaoStringFilter);
            this.ngayGiaoStringFilter = null;
        }
    },
    onPhanXuongFilterKeyup: function () {
        var viewmodel = this.getViewModel();
        var POStore = viewmodel.get('PContractPOList');
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('PhanXuongFilterField'),
            filters = POStore.getFilters();

        if (filterField.value) {
            this.phanXuongFilter = filters.add({
                id: 'phanXuongFilter',
                property: 'factories',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.phanXuongFilter) {
            filters.remove(this.phanXuongFilter);
            this.phanXuongFilter = null;
        }
    },
    onPhuTrachFilterKeyup: function () {
        var viewmodel = this.getViewModel();
        var POStore = viewmodel.get('PContractPOList');
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('PhuTrachFilterField'),
            filters = POStore.getFilters();

        if (filterField.value) {
            this.PhuTrachFilter = filters.add({
                id: 'PhuTrachFilter',
                property: 'merchandiser_name',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.PhuTrachFilter) {
            filters.remove(this.PhuTrachFilter);
            this.PhuTrachFilter = null;
        }
    },

    renderedPhuTrach: function(value, metaData, record, rowIdx, colIdx, store){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var result = '';
        var UserStore = viewModel.getStore('UserStore');
        var items = UserStore.getData().items;

        if(value != null && value != 0){
            for(var i=0; i<items.length; i++){
                var item = items[i];
                var id = item.get('id');
                var fullName = item.get('fullName');

                if(value == id){
                    result = fullName;
                    break;
                }
            }
        }
        return result;
    },
    onEdit: function (editor, context, e) {
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('PContractPOList');

        if (context.value == context.originalValue) return;
        grid.setLoading("Đang xử lý");

        var data = context.record.data;

        if(isNaN(data.merchandiserid_link)) {
            data.merchandiserid_link = null;
        }

        var params = new Object();
        params.data = data;

        GSmartApp.Ajax.post('/api/v1/pcontract_po/update_merchandiser', Ext.JSON.encode(params),
        function (success, response, options) {
            grid.setLoading(false);
            if (success) {
                var response = Ext.decode(response.responseText);
                if (response.respcode != 200) {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: 'Lưu thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Có'
                        }
                    });
                    store.rejectChanges();
                }
                else {
                    store.commitChanges();
                }
            }
        })
    },
})