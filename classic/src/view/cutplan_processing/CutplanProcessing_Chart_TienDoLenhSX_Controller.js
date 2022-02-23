Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_Chart_TienDoLenhSX_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CutplanProcessing_Chart_TienDoLenhSX_Controller',

    onChartRendered: function(chart) {
        var me = this.getView();
        var viewModel = this.getViewModel();
        var porder = viewModel.get('porder');
        var porder_id = viewModel.get('porder_id');

        var store = chart.getStore();
        store.removeAll();
        store.add({
            processingdate: null,
            amountinput: null,
            amountinputsum: null,
            amountoutput: null,
            amountoutputsum: null,
            amountpacked: null,
            amountpackedsum: null,
            amountstocked: null,
            amountstockedsum: null                                                       
        });

        if(porder != null){
            var porderId = porder.get('id');

            var POrderLineChartStore = this.getViewModel().getStore('POrderLineChartStore');
            POrderLineChartStore.LoadPorderProcessing(porderId);
            // LineChartStore.LoadPorderProcessing(4020);
            POrderLineChartStore.load({
                scope: this,
                callback: function(records, operation, success) {
                    if(!success){
                        // this.fireEvent('logout');
                    }
                    else{
                        // console.log(POrderLineChartStore);
                        store.removeAll();
                        if(POrderLineChartStore.data.length == 0){
                            store.add({
                                processingdate: null,
                                amountinput: null,
                                amountinputsum: null,
                                amountoutput: null,
                                amountoutputsum: null,
                                amountpacked: null,
                                amountpackedsum: null,
                                amountstocked: null,
                                amountstockedsum: null                                                       
                            });
                        }else{
                            for (var i = 0; i < POrderLineChartStore.data.length; i++) {
                                var data = POrderLineChartStore.data.items[i].data;
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
                }
            });
        }else{
            var POrderLineChartStore = this.getViewModel().getStore('POrderLineChartStore');
            POrderLineChartStore.LoadPorderProcessing(porder_id);
            // LineChartStore.LoadPorderProcessing(4020);
            POrderLineChartStore.load({
                scope: this,
                callback: function(records, operation, success) {
                    if(!success){
                        // this.fireEvent('logout');
                    }
                    else{
                        // console.log(POrderLineChartStore);
                        store.removeAll();
                        if(POrderLineChartStore.data.length == 0){
                            store.add({
                                processingdate: null,
                                amountinput: null,
                                amountinputsum: null,
                                amountoutput: null,
                                amountoutputsum: null,
                                amountpacked: null,
                                amountpackedsum: null,
                                amountstocked: null,
                                amountstockedsum: null                                                       
                            });
                        }else{
                            for (var i = 0; i < POrderLineChartStore.data.length; i++) {
                                var data = POrderLineChartStore.data.items[i].data;
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

    onTooltipRender_Input: function(tooltip, record, item) {
        tooltip.setHtml(record.get('processingdate') + '- VC: ' + record.get('amountinput') + '- Lũy kế VC: ' + record.get('amountinputsum'));
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