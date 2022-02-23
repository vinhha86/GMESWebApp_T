Ext.define('GSmartApp.view.invoice.InvoicePickup_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.InvoicePickup_Controller',
	init: function() {
        var me = this.getView();
		var viewmodel = this.getViewModel();
		var OrgProviderStore = viewmodel.getStore('OrgProviderStore');
		OrgProviderStore.loadStore(5, true);

        var today = new Date();
		var priorDate = new Date().setDate(today.getDate()-30);
		me.down('#invoicedate_from').setValue(new Date(priorDate));

        var InvoiceList_Store = viewmodel.getStore('InvoiceList_Store');
        InvoiceList_Store.getSorters().add('invoicenumber');

        this.onloadPage();
	},
	control: {
		'#InvoicePickup_Main': {
            beforedestroy: 'onDestroy'
        },
        '#InvoicePickup_List': {
            itemclick: 'onInvoiceClick'
        },
        '#btnTimKiem': {
            click: 'onloadPage'
        }
	},
    onDestroy:function(){
        var store = Ext.getCmp('InvoicePickup_List').getStore();
        store.clearFilter();
    },
    onCloseButton:function(){
        var store = Ext.getCmp('InvoicePickup_List').getStore();
        store.clearFilter();
        this.fireEvent('Thoat');
    },
    onSelectButton: function(){
        var m = Ext.getCmp('InvoicePickup_D');
        var me = this;
        var viewModel = this.getViewModel();
        var invoice = viewModel.get('invoice');
        
        var select = m.getSelectionModel().getSelection();
        if(select.length > 0){
            me.fireEvent('InvoicePickupSelect', invoice, select);
        }
    },
	onloadPage: function () {
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var InvoiceList_Store = viewModel.getStore('InvoiceList_Store');

        var invoicenumber = viewModel.get('invoice_number');
        var invoicedate_from = me.down('#invoicedate_from').getValue();
		var invoicedate_to = me.down('#invoicedate_to').getValue();
        var org_prodviderid_link = me.down('#org_prodviderid_link').getValue();

        
        if (invoicenumber == null) {
            invoicenumber = "";
        }

		if (org_prodviderid_link == null) {
            org_prodviderid_link = 0;
		}
		
		if (status == null) {
            status = 0;
        }

        InvoiceList_Store.loadStore_byPage_async('', '', 
            invoicedate_from, invoicedate_to, org_prodviderid_link, 
            0, 1, 1000);

            InvoiceList_Store.load({
            scope: this,
            callback: function (records, operation, success) {
                if (!success) {
                    // this.fireEvent('logout');
                } else {
                    var filterField = m.lookupReference('invoicenumberFilter');
                    filterField.setValue(invoicenumber);
                    m.onInvoicenumberFilterKeyup();
                }
            }
        });

        // var filterField = this.lookupReference('invoicenumberFilter');
        // filterField.setValue(invoicenumber);
        // this.onInvoicenumberFilterKeyup();
    },
    renderSum: function (value) {
		if (null == value) value = 0;
		return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
    },
    renderSumInteger: function (value) {
		if (null == value) value = 0;
		return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
    onInvoicenumberFilterKeyup:function(){
        var store = Ext.getCmp('InvoicePickup_List').getStore();
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('invoicenumberFilter'),
            filters = store.getFilters();

        // console.log(filterField);

        if (filterField.value) {
            this.invoicenumberFilter = filters.add({
                id: 'invoicenumberFilter',
                property: 'invoicenumber',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.invoicenumberFilter) {
            filters.remove(this.invoicenumberFilter);
            this.invoicenumberFilter = null;
        }
    },

    //___________________________________________
    onInvoiceClick: function(view, record, item, index, e, eOpts){
        // console.log(record);
        var viewModel = this.getViewModel();
        var invoice = record.data;
        var invoice_d = record.get('invoice_d');

        viewModel.set('invoice', invoice);

    }
})