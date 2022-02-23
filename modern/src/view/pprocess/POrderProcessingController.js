Ext.define('GSmartApp.view.pprocess.POrderProcessingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrderProcessingController',

    control: {
        '#btnBack': {
            tap: 'onBtnBackTap'
        }
    },
    init: function() {
        var viewmodel = this.getViewModel();
        var FactoryStore = viewmodel.get('FactoryStore');
        var POrderProcessingStore = viewmodel.get('POrderProcessingStore');
        var factoryCombo = this.lookupReference('factorycombo');
        var ProductionLineStore = viewmodel.get('ProductionLineStore');
        
        // FactoryStore.loadStore_Async(13, null);
        FactoryStore.loadStore_allchildren_byorg_async('13',false);
		FactoryStore.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 // this.fireEvent('logout');
				} else {
                    //Tai du lieu tien do cua phan xuong dau tien trong danh sach Factory
                    if (records.length > 0){
                        factoryCombo.setValue(records[0].data.id);
                        POrderProcessingStore.loadByDate(new Date(),records[0].data.id);
                        ProductionLineStore.loadToSX(records[0].data.id);
                        // console.log(POrderProcessingStore.data);
                    }
                }
			}
        });
        // console.log(FactoryStore);
    },
    onFactoryItemSelected: function (sender, record) {
        var viewmodel = this.getViewModel();
        // var cbProcessingDate = this.lookupReference('processingdate');
        var POrderProcessingStore = viewmodel.get('POrderProcessingStore');
        var ProductionLineStore = viewmodel.get('ProductionLineStore');
        

        POrderProcessingStore.loadByDate(new Date(),record.get('id'));

        //Lay danh sach to chuyen
        var orgcombo = this.lookupReference('orgcombo');
        ProductionLineStore.loadToSX_Async(record.get('id'));
        ProductionLineStore.load({
			scope: this,
			callback: function(records, operation, success) {
				if(success){
                    if (null != orgcombo){
                        orgcombo.setValue(-1);
                        if (null!=POrderProcessingStore.filters)
                            POrderProcessingStore.getFilters().remove('granttoorgid_link');
                    }
				}
			}
		});
    },
    onOrgItemSelected: function (sender, record) {
        var viewmodel = this.getViewModel();
        var POrderProcessingStore = viewmodel.get('POrderProcessingStore');
        if (record.get('id') > 0){
            //Them ^ va $ de xu ly loi filter so 1
            sIDSelect = new RegExp("^"+record.get('id')+"$"); 
            POrderProcessingStore.filter('granttoorgid_link',sIDSelect);
        }
        else {
            POrderProcessingStore.getFilters().remove('granttoorgid_link');
            //this.getView().store.clearFilter(); 
        }
    },
    // onItemTap: function(dataview, index, target, record, e, eOpts){
    //     console.log(record.data);
    // },
    onChildTap: function(dataview, location){
        var record = location.record;
        // console.log(record.data);
        if (record)
            this.redirectTo("lsporderprocessing/"+record.get('id')+"/edit");
    },
    onPOrderFilterKeyup: function() {
        var viewmodel = this.getViewModel();
        var POrderProcessingStore = viewmodel.get('POrderProcessingStore');
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('porderFilterField'),
            filters = POrderProcessingStore.getFilters();

        if (filterField.getValue() != null || filterField.getValue() != '') {
            this.porderFilter = filters.add({
                id: 'porderFilter',
                property: 'pordercode',
                value: filterField.getValue(),
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.porderFilter) {
            filters.remove(this.porderFilter);
            this.porderFilter = null;
        }
    },

    onBtnBackTap: function(){
        // Ext.util.History.back();
        this.redirectTo("mobilemenu");
    }
});
