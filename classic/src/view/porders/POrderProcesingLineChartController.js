Ext.define('GSmartApp.view.porders.POrderProcesingLineChartController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrderProcesingLineChartController',

    onChartRendered: function(chart) {
        var store = chart.getStore();
        store.removeAll();

        var me = this.getView();
        var LineChartStore = this.getViewModel().getStore('LineChartStore');
        LineChartStore.LoadPorderProcessing(me.POrderId);
        LineChartStore.load({
            scope: this,
            callback: function(records, operation, success) {
                if(!success){
                    // this.fireEvent('logout');
                }
                else{
                    for (var i = 0; i < LineChartStore.data.length; i++) {
                        var data = LineChartStore.data.items[i].data;
                        store.add({
                            processingdate: data.processingdate_str,
                            amountinput: null==data.amountinput?0:data.amountinput,
                            amountinputsum: null==data.amountinputsum?0:data.amountinputsum,
                            amountoutput: null==data.amountoutput?0:data.amountoutput,
                            amountoutputsum: null==data.amountoutputsum?0:data.amountoutputsum,
                            amountpacked: null==data.amountpacked?0:data.amountpacked,
                            amountpackedsum: null==data.amountpackedsum?0:data.amountpackedsum,
                            amountstocked: null==data.amountstocked?0:data.amountstocked,
                            amountstockedsum: null==data.amountstockedsum?0:data.amountstockedsum                                                        
                        });
                    }
               
                }
            }
        });        


    },
    onAxisLabelRender: function(axis, label, layoutContext) {
        // Custom renderer overrides the native axis label renderer.
        // Since we don't want to do anything fancy with the value
        // ourselves except appending a '%' sign, but at the same time
        // don't want to loose the formatting done by the native renderer,
        // we let the native renderer process the value first.
        return layoutContext.renderer(label);
    },

    onTooltipRender_Input: function(tooltip, record, item) {
        tooltip.setHtml(record.get('processingdate') + '- Lũy kế VC: ' + record.get('amountinputsum'));
    },

    onTooltipRender_Output: function(tooltip, record, item) {
        tooltip.setHtml(record.get('processingdate') + '- Lũy kế RC: ' + record.get('amountoutputsum'));
    },
    onTooltipRender_Packed: function(tooltip, record, item) {
        tooltip.setHtml(record.get('processingdate') + '- Lũy kế ĐG: ' + record.get('amountpackedsum'));
    },

    onTooltipRender_Stocked: function(tooltip, record, item) {
        tooltip.setHtml(record.get('processingdate') + '- Lũy kế NK: ' + record.get('amountstockedsum'));
    },
    onItemHighlight: function(chart, newHighlightItem, oldHighlightItem) {
        this.setSeriesLineWidth(newHighlightItem, 4);
        this.setSeriesLineWidth(oldHighlightItem, 2);
    },

    setSeriesLineWidth: function(item, lineWidth) {
        if (item) {
            item.series.setStyle({
                lineWidth: lineWidth
            });
        }
    }
});