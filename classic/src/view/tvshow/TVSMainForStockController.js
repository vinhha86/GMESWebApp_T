Ext.define('GSmartApp.view.report.TVSMainForStockController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tvsmainforstock',
    init: function() {
        //ST.defaultContext.driver.windowHandleMaximize();
        // this.getStatus();
        // runner = GSmartApp.Utils.porderTaskRunner;
        // if (!runner) {
        //     GSmartApp.Utils.porderTaskRunner = runner = new Ext.util.TaskRunner();
        // }
        // runner.start({
        //     run : function () {
        //         var store_waiting = Ext.data.StoreManager.lookup('store_waiting'); 
        //         if (store_waiting) {
        //             store_waiting.loadFilter(
        //                 null,//ordercode
        //                 '2',//orderstatus
        //                 null,//granttoorgid_link
        //                 null,//collection
        //                 null,//season
        //                 null,//salaryyear
        //                 -1,//salarymonth
        //                 null,//processingdate_from
        //                 null//processingdate_to
        //                 );                    
        //             // store_waiting.loadByDate(new Date());
        //             //console.log(store_waiting);
        //         }
        //         var store_tvsorgstatus = Ext.data.StoreManager.lookup('store_tvsorgstatus'); 
        //         if (store_tvsorgstatus) {
        //             store_tvsorgstatus.loadByDate(new Date());
        //             var rec = store_tvsorgstatus.first();
        //             if (null != rec){
        //                 Ext.ComponentQuery.query('[id=gauge_org1]')[0].setValue(rec.get('org1_percentcomplete'));
        //                 Ext.ComponentQuery.query('[id=golivedesc_org1]')[0].setHtml('Giao hàng: ' + rec.get('org1_golivedate'));
        //                 Ext.ComponentQuery.query('[id=ordercode_org1]')[0].setHtml('Mã SX: ' + rec.get('org1_orderlist'));

        //                 Ext.ComponentQuery.query('[id=gauge_org2]')[0].setValue(rec.get('org2_percentcomplete'));
        //                 Ext.ComponentQuery.query('[id=golivedesc_org2]')[0].setHtml('Giao hàng: ' + rec.get('org2_golivedate'));
        //                 Ext.ComponentQuery.query('[id=ordercode_org2]')[0].setHtml('Mã SX: ' + rec.get('org2_orderlist'));

        //                 Ext.ComponentQuery.query('[id=gauge_org3]')[0].setValue(rec.get('org3_percentcomplete'));
        //                 Ext.ComponentQuery.query('[id=golivedesc_org3]')[0].setHtml('Giao hàng: ' + rec.get('org3_golivedate'));
        //                 Ext.ComponentQuery.query('[id=ordercode_org3]')[0].setHtml('Mã SX: ' + rec.get('org3_orderlist'));

        //                 Ext.ComponentQuery.query('[id=gauge_org4]')[0].setValue(rec.get('org4_percentcomplete'));
        //                 Ext.ComponentQuery.query('[id=golivedesc_org4]')[0].setHtml('Giao hàng: ' + rec.get('org4_golivedate'));
        //                 Ext.ComponentQuery.query('[id=ordercode_org4]')[0].setHtml('Mã SX: ' + rec.get('org4_orderlist'));

        //                 Ext.ComponentQuery.query('[id=gauge_org5]')[0].setValue(rec.get('org5_percentcomplete'));
        //                 Ext.ComponentQuery.query('[id=golivedesc_org5]')[0].setHtml('Giao hàng: ' + rec.get('org5_golivedate'));
        //                 Ext.ComponentQuery.query('[id=ordercode_org5]')[0].setHtml('Mã SX: ' + rec.get('org5_orderlist'));

        //                 Ext.ComponentQuery.query('[id=gauge_org6]')[0].setValue(rec.get('org6_percentcomplete'));
        //                 Ext.ComponentQuery.query('[id=golivedesc_org6]')[0].setHtml('Giao hàng: ' + rec.get('org6_golivedate'));
        //                 Ext.ComponentQuery.query('[id=ordercode_org6]')[0].setHtml('Mã SX: ' + rec.get('org6_orderlist'));

        //                 Ext.ComponentQuery.query('[id=gauge_org7]')[0].setValue(rec.get('org7_percentcomplete'));
        //                 Ext.ComponentQuery.query('[id=golivedesc_org7]')[0].setHtml('Giao hàng: ' + rec.get('org7_golivedate'));
        //                 Ext.ComponentQuery.query('[id=ordercode_org7]')[0].setHtml('Mã SX: ' + rec.get('org7_orderlist'));

        //                 Ext.ComponentQuery.query('[id=gauge_org8]')[0].setValue(rec.get('org8_percentcomplete'));
        //                 Ext.ComponentQuery.query('[id=golivedesc_org8]')[0].setHtml('Giao hàng: ' + rec.get('org8_golivedate'));
        //                 Ext.ComponentQuery.query('[id=ordercode_org8]')[0].setHtml('Mã SX: ' + rec.get('org8_orderlist'));

        //                 Ext.ComponentQuery.query('[id=gauge_org9]')[0].setValue(rec.get('org9_percentcomplete'));
        //                 Ext.ComponentQuery.query('[id=golivedesc_org9]')[0].setHtml('Giao hàng: ' + rec.get('org9_golivedate'));
        //                 Ext.ComponentQuery.query('[id=ordercode_org9]')[0].setHtml('Mã SX: ' + rec.get('org9_orderlist'));

        //                 Ext.ComponentQuery.query('[id=gauge_org10]')[0].setValue(rec.get('org10_percentcomplete'));
        //                 Ext.ComponentQuery.query('[id=golivedesc_org10]')[0].setHtml('Giao hàng: ' + rec.get('org10_golivedate'));
        //                 Ext.ComponentQuery.query('[id=ordercode_org10]')[0].setHtml('Mã SX: ' + rec.get('org10_orderlist'));

        //                 Ext.ComponentQuery.query('[id=gauge_org11]')[0].setValue(rec.get('org11_percentcomplete'));
        //                 Ext.ComponentQuery.query('[id=golivedesc_org11]')[0].setHtml('Giao hàng: ' + rec.get('org11_golivedate'));
        //                 Ext.ComponentQuery.query('[id=ordercode_org11]')[0].setHtml('Mã SX: ' + rec.get('org11_orderlist'));

        //                 Ext.ComponentQuery.query('[id=gauge_org12]')[0].setValue(rec.get('org12_percentcomplete'));
        //                 Ext.ComponentQuery.query('[id=golivedesc_org12]')[0].setHtml('Giao hàng: ' + rec.get('org12_golivedate'));
        //                 Ext.ComponentQuery.query('[id=ordercode_org12]')[0].setHtml('Mã SX: ' + rec.get('org12_orderlist'));

        //                 Ext.ComponentQuery.query('[id=gauge_org13]')[0].setValue(rec.get('org13_percentcomplete'));
        //                 Ext.ComponentQuery.query('[id=golivedesc_org13]')[0].setHtml('Giao hàng: ' + rec.get('org13_golivedate'));
        //                 Ext.ComponentQuery.query('[id=ordercode_org13]')[0].setHtml('Mã SX: ' + rec.get('org13_orderlist'));

        //                 Ext.ComponentQuery.query('[id=gauge_org14]')[0].setValue(rec.get('org14_percentcomplete'));
        //                 Ext.ComponentQuery.query('[id=golivedesc_org14]')[0].setHtml('Giao hàng: ' + rec.get('org14_golivedate'));
        //                 Ext.ComponentQuery.query('[id=ordercode_org14]')[0].setHtml('Mã SX: ' + rec.get('org14_orderlist'));

        //                 Ext.ComponentQuery.query('[id=gauge_org15]')[0].setValue(rec.get('org15_percentcomplete'));
        //                 Ext.ComponentQuery.query('[id=golivedesc_org15]')[0].setHtml('Giao hàng: ' + rec.get('org15_golivedate'));
        //                 Ext.ComponentQuery.query('[id=ordercode_org15]')[0].setHtml('Mã SX: ' + rec.get('org15_orderlist'));

        //                 Ext.ComponentQuery.query('[id=gauge_org16]')[0].setValue(rec.get('org16_percentcomplete'));
        //                 Ext.ComponentQuery.query('[id=golivedesc_org16]')[0].setHtml('Giao hàng: ' + rec.get('org16_golivedate'));
        //                 Ext.ComponentQuery.query('[id=ordercode_org16]')[0].setHtml('Mã SX: ' + rec.get('org16_orderlist'));
        //             }
        //         }          
        //     },
        //     interval : 60000
        // });
    },
    onActivate: function(){
        var store_tvsorgstatus = Ext.data.StoreManager.lookup('store_tvsorgstatus'); 

        var store_waiting = Ext.data.StoreManager.lookup('store_waiting'); 
        if (store_waiting) {
            store_waiting.loadFilter(
                null,//ordercode
                '2',//orderstatus
                null,//granttoorgid_link
                null,//collection
                null,//season
                null,//salaryyear
                -1,//salarymonth
                null,//processingdate_from
                null//processingdate_to
                );            
            //store_waiting.loadByDate(new Date());
            //console.log(store_waiting);
        }
        
        // if (store_tvsorgstatus) {
            store_tvsorgstatus.loadByDate(new Date());
            var rec = store_tvsorgstatus.first();
            if (null != rec){
                Ext.ComponentQuery.query('[id=gauge_org1]')[0].setValue(rec.get('org1_percentcomplete'));
                Ext.ComponentQuery.query('[id=golivedesc_org1]')[0].setHtml('Giao hàng: ' + rec.get('org1_golivedate'));
                Ext.ComponentQuery.query('[id=ordercode_org1]')[0].setHtml('Mã SX: ' + rec.get('org1_orderlist'));

                Ext.ComponentQuery.query('[id=gauge_org2]')[0].setValue(rec.get('org2_percentcomplete'));
                Ext.ComponentQuery.query('[id=golivedesc_org2]')[0].setHtml('Giao hàng: ' + rec.get('org2_golivedate'));
                Ext.ComponentQuery.query('[id=ordercode_org2]')[0].setHtml('Mã SX: ' + rec.get('org2_orderlist'));

                Ext.ComponentQuery.query('[id=gauge_org3]')[0].setValue(rec.get('org3_percentcomplete'));
                Ext.ComponentQuery.query('[id=golivedesc_org3]')[0].setHtml('Giao hàng: ' + rec.get('org3_golivedate'));
                Ext.ComponentQuery.query('[id=ordercode_org3]')[0].setHtml('Mã SX: ' + rec.get('org3_orderlist'));

                Ext.ComponentQuery.query('[id=gauge_org4]')[0].setValue(rec.get('org4_percentcomplete'));
                Ext.ComponentQuery.query('[id=golivedesc_org4]')[0].setHtml('Giao hàng: ' + rec.get('org4_golivedate'));
                Ext.ComponentQuery.query('[id=ordercode_org4]')[0].setHtml('Mã SX: ' + rec.get('org4_orderlist'));

                Ext.ComponentQuery.query('[id=gauge_org5]')[0].setValue(rec.get('org5_percentcomplete'));
                Ext.ComponentQuery.query('[id=golivedesc_org5]')[0].setHtml('Giao hàng: ' + rec.get('org5_golivedate'));
                Ext.ComponentQuery.query('[id=ordercode_org5]')[0].setHtml('Mã SX: ' + rec.get('org5_orderlist'));

                Ext.ComponentQuery.query('[id=gauge_org6]')[0].setValue(rec.get('org6_percentcomplete'));
                Ext.ComponentQuery.query('[id=golivedesc_org6]')[0].setHtml('Giao hàng: ' + rec.get('org6_golivedate'));
                Ext.ComponentQuery.query('[id=ordercode_org6]')[0].setHtml('Mã SX: ' + rec.get('org6_orderlist'));

                Ext.ComponentQuery.query('[id=gauge_org7]')[0].setValue(rec.get('org7_percentcomplete'));
                Ext.ComponentQuery.query('[id=golivedesc_org7]')[0].setHtml('Giao hàng: ' + rec.get('org7_golivedate'));
                Ext.ComponentQuery.query('[id=ordercode_org7]')[0].setHtml('Mã SX: ' + rec.get('org7_orderlist'));

                Ext.ComponentQuery.query('[id=gauge_org8]')[0].setValue(rec.get('org8_percentcomplete'));
                Ext.ComponentQuery.query('[id=golivedesc_org8]')[0].setHtml('Giao hàng: ' + rec.get('org8_golivedate'));
                Ext.ComponentQuery.query('[id=ordercode_org8]')[0].setHtml('Mã SX: ' + rec.get('org8_orderlist'));

                Ext.ComponentQuery.query('[id=gauge_org9]')[0].setValue(rec.get('org9_percentcomplete'));
                Ext.ComponentQuery.query('[id=golivedesc_org9]')[0].setHtml('Giao hàng: ' + rec.get('org9_golivedate'));
                Ext.ComponentQuery.query('[id=ordercode_org9]')[0].setHtml('Mã SX: ' + rec.get('org9_orderlist'));

                Ext.ComponentQuery.query('[id=gauge_org10]')[0].setValue(rec.get('org10_percentcomplete'));
                Ext.ComponentQuery.query('[id=golivedesc_org10]')[0].setHtml('Giao hàng: ' + rec.get('org10_golivedate'));
                Ext.ComponentQuery.query('[id=ordercode_org10]')[0].setHtml('Mã SX: ' + rec.get('org10_orderlist'));

                Ext.ComponentQuery.query('[id=gauge_org11]')[0].setValue(rec.get('org11_percentcomplete'));
                Ext.ComponentQuery.query('[id=golivedesc_org11]')[0].setHtml('Giao hàng: ' + rec.get('org11_golivedate'));
                Ext.ComponentQuery.query('[id=ordercode_org11]')[0].setHtml('Mã SX: ' + rec.get('org11_orderlist'));

                Ext.ComponentQuery.query('[id=gauge_org12]')[0].setValue(rec.get('org12_percentcomplete'));
                Ext.ComponentQuery.query('[id=golivedesc_org12]')[0].setHtml('Giao hàng: ' + rec.get('org12_golivedate'));
                Ext.ComponentQuery.query('[id=ordercode_org12]')[0].setHtml('Mã SX: ' + rec.get('org12_orderlist'));

                Ext.ComponentQuery.query('[id=gauge_org13]')[0].setValue(rec.get('org13_percentcomplete'));
                Ext.ComponentQuery.query('[id=golivedesc_org13]')[0].setHtml('Giao hàng: ' + rec.get('org13_golivedate'));
                Ext.ComponentQuery.query('[id=ordercode_org13]')[0].setHtml('Mã SX: ' + rec.get('org13_orderlist'));

                Ext.ComponentQuery.query('[id=gauge_org14]')[0].setValue(rec.get('org14_percentcomplete'));
                Ext.ComponentQuery.query('[id=golivedesc_org14]')[0].setHtml('Giao hàng: ' + rec.get('org14_golivedate'));
                Ext.ComponentQuery.query('[id=ordercode_org14]')[0].setHtml('Mã SX: ' + rec.get('org14_orderlist'));

                Ext.ComponentQuery.query('[id=gauge_org15]')[0].setValue(rec.get('org15_percentcomplete'));
                Ext.ComponentQuery.query('[id=golivedesc_org15]')[0].setHtml('Giao hàng: ' + rec.get('org15_golivedate'));
                Ext.ComponentQuery.query('[id=ordercode_org15]')[0].setHtml('Mã SX: ' + rec.get('org15_orderlist'));

                Ext.ComponentQuery.query('[id=gauge_org16]')[0].setValue(rec.get('org16_percentcomplete'));
                Ext.ComponentQuery.query('[id=golivedesc_org16]')[0].setHtml('Giao hàng: ' + rec.get('org16_golivedate'));
                Ext.ComponentQuery.query('[id=ordercode_org16]')[0].setHtml('Mã SX: ' + rec.get('org16_orderlist'));
            }
        // }  
    }
});