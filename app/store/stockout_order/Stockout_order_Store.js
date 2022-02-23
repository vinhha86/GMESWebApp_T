Ext.define('GSmartApp.store.stockout_order.Stockout_order_Store', {
    extend: 'Ext.data.Store',
    storeId: 'Stockout_order_Store',
    alias: 'store.Stockout_order_Store',

    model: 'GSmartApp.model.stockout.Stockout_Order',
    GetByPorder: function (porderid_link) {
        var params = new Object();
        params.porderid_link = porderid_link;

        this.setProxy({
            type: 'ajax',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'POST'
            },
            url: config.getAppBaseUrl() + '/api/v1/stockoutorder/getby_porder',
            paramsAsJson: true,
            noCache: false,
            extraParams: params,
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        });
        this.load();
    },
    GetByPorderAndNPL: function (porderid_link, material_skuid_link) {
        var params = new Object();
        params.porderid_link = porderid_link;
        params.material_skuid_link = material_skuid_link;

        this.setProxy({
            type: 'ajax',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'POST'
            },
            url: config.getAppBaseUrl() + '/api/v1/stockoutorder/getby_porder_npl',
            paramsAsJson: true,
            noCache: false,
            extraParams: params,
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        });
        this.load();
    },
    loadStore_byPage: function (stockoutorderdate_from, stockoutorderdate_to, page, limit, status, stockouttypeid_link) {
        var me = this;
        var params = new Object();
        params.stockoutorderdate_from = stockoutorderdate_from;
        params.stockoutorderdate_to = stockoutorderdate_to;
        params.stockouttypeid_link = stockouttypeid_link;
        params.page = page;
        params.limit = limit;
        params.status = status;

        me.pageSize = limit;

        this.setProxy({
            type: 'ajax',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'POST'
            },
            url: config.getAppBaseUrl_Jitin() + '/api/v1/stockoutorder/getStockoutorder',
            paramsAsJson: true,
            extraParams: params,
            noCache: false,
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            reader: {
                type: 'json',
                rootProperty: 'data',
                totalProperty: 'totalCount'
            }
        });
        this.loadPage(page, {
            scope: this,
            callback: function (records, operation, success) {
                if (!success) {
                    // this.fireEvent('logout');
                }
            }
        });
    },

    loadStore_byPage_async: function (stockoutorderdate_from, stockoutorderdate_to, page, limit, stockouttypeid_link) {
        var me = this;
        var params = new Object();
        params.stockoutorderdate_from = stockoutorderdate_from;
        params.stockoutorderdate_to = stockoutorderdate_to;
        params.stockouttypeid_link = stockouttypeid_link;
        params.page = page;
        params.limit = limit;

        me.pageSize = limit;

        this.setProxy({
            type: 'ajax',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'POST'
            },
            // url: config.getAppBaseUrl_Jitin()+'/api/v1/invoice/getlist_bypage',
            url: config.getAppBaseUrl() + '/api/v1/stockoutorder/getStockoutorder',
            paramsAsJson: true,
            extraParams: params,
            noCache: false,
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            reader: {
                type: 'json',
                rootProperty: 'data',
                totalProperty: 'totalCount'
            }
        });
    },
    loadStore_byPage_types_async: function (stockoutorderdate_from, stockoutorderdate_to, page, limit, stockouttypeid_link_from, stockouttypeid_link_to) {
        var me = this;
        var params = new Object();
        params.stockoutorderdate_from = stockoutorderdate_from;
        params.stockoutorderdate_to = stockoutorderdate_to;
        params.stockouttypeid_link_from = stockouttypeid_link_from;
        params.stockouttypeid_link_to = stockouttypeid_link_to;
        params.page = page;
        params.limit = limit;

        me.pageSize = limit;

        this.setProxy({
            type: 'ajax',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'POST'
            },
            url: config.getAppBaseUrl() + '/api/v1/stockoutorder/getStockoutorder_by_types',
            paramsAsJson: true,
            extraParams: params,
            noCache: false,
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            reader: {
                type: 'json',
                rootProperty: 'data',
                totalProperty: 'totalCount'
            }
        });
    },
    loadStore_byPage_KeHoachSanXuat: function (stockoutorderdate_from, stockoutorderdate_to, page, limit, status, stockouttypeid_link, porder_grantid_link) {
        var me = this;
        var params = new Object();
        params.stockoutorderdate_from = stockoutorderdate_from;
        params.stockoutorderdate_to = stockoutorderdate_to;
        params.stockouttypeid_link = stockouttypeid_link;
        params.porder_grantid_link = porder_grantid_link;
        params.page = page;
        params.limit = limit;
        params.status = status;

        me.pageSize = limit;

        this.setProxy({
            type: 'ajax',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'POST'
            },
            url: config.getAppBaseUrl_Jitin() + '/api/v1/stockoutorder/getStockoutorder_KeHoachSanXuat',
            paramsAsJson: true,
            extraParams: params,
            noCache: false,
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            reader: {
                type: 'json',
                rootProperty: 'data',
                totalProperty: 'totalCount'
            }
        });
        this.loadPage(page, {
            scope: this,
            callback: function (records, operation, success) {
                if (!success) {
                    this.fireEvent('logout');
                }
            }
        });
    },

    loadStore_byPage_KeHoachSanXuat_async: function (stockoutorderdate_from, stockoutorderdate_to, page, limit, status, stockouttypeid_link, porder_grantid_link) {
        var me = this;
        var params = new Object();
        params.stockoutorderdate_from = stockoutorderdate_from;
        params.stockoutorderdate_to = stockoutorderdate_to;
        params.stockouttypeid_link = stockouttypeid_link;
        params.porder_grantid_link = porder_grantid_link;
        params.page = page;
        params.limit = limit;
        params.status = status;

        me.pageSize = limit;

        this.setProxy({
            type: 'ajax',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'POST'
            },
            // url: config.getAppBaseUrl_Jitin()+'/api/v1/invoice/getlist_bypage',
            url: config.getAppBaseUrl_Jitin() + '/api/v1/stockoutorder/getStockoutorder_KeHoachSanXuat',
            paramsAsJson: true,
            extraParams: params,
            noCache: false,
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            reader: {
                type: 'json',
                rootProperty: 'data',
                totalProperty: 'totalCount'
            }
        });
    },

    loadStore_Preview_ByPO: function (pcontract_poid_link) {
        var params = new Object();
        params.po_id = pcontract_poid_link;
        this.setProxy({
            type: 'ajax',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'POST'
            },
            url: config.getAppBaseUrl() + '/api/v1/stockoutorder/preview_bypo',
            paramsAsJson: true,
            extraParams: params,
            noCache: false,
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            reader: {
                type: 'json',
                rootProperty: 'data',
                totalProperty: 'totalCount'
            }
        });
        this.load();
    },
});
