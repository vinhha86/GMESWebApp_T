Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_Chart_TienDoCat_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CutplanProcessing_Chart_TienDoCat_Controller',

    onChartRendered: function(chart) {
        var me = this.getView();
        var viewModel = this.getViewModel();
        var porder = viewModel.get('porder');
        var maNPL_id = viewModel.get('maNPL_id');
        var store = chart.getStore();
        store.removeAll();
        store.add({
            processingdate: null,
            amountcut: null                                                 
        });

        if(porder != null && maNPL_id != null){
            var porderId = porder.get('id');

            var CutplanProcessingLineChartStore = this.getViewModel().getStore('CutplanProcessingLineChartStore');
            CutplanProcessingLineChartStore.Load_byPorder(porderId, maNPL_id);
            // LineChartStore.LoadPorderProcessing(4020);
            CutplanProcessingLineChartStore.load({
                scope: this,
                callback: function(records, operation, success) {
                    if(!success){
                        // this.fireEvent('logout');
                    }
                    else{
                        // console.log(CutplanProcessingLineChartStore);
                        store.removeAll();
                        if(CutplanProcessingLineChartStore.data.length == 0){
                            store.add({
                                processingdate: null,
                                amountcut: null                                                 
                            });
                        }else{
                            for (var i = 0; i < CutplanProcessingLineChartStore.data.length; i++) {
                                var data = CutplanProcessingLineChartStore.data.items[i].data;
                                store.add({
                                    processingdate: data.processingdate_str,
                                    amountcut: null==data.amountcut?0:data.amountcut,                                                    
                                });
                            }
                        }
                    }
                }
            });        
        }
    },
    onAxisLabelRender: function(axis, label, layoutContext) {
        // Custom renderer overrides the native axis label renderer.
        // Since we don't want to do anything fancy with the value
        // ourselves except appending a '%' sign, but at the same time
        // don't want to loose the formatting done by the native renderer,
        // we let the native renderer process the value first.
        return layoutContext.renderer(label);
    },

    onTooltipRender_Cut: function(tooltip, record, item) {
        tooltip.setHtml(record.get('processingdate') + '- SL cắt: ' + record.get('amountcut'));
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