Ext.define('GSmartApp.view.DashBoardView.LineChartPackStockedAmount', {
    extend: 'Ext.panel.Panel',
    xtype: 'LineChartPackStockedAmount',
    controller: 'LineChartPackStockedAmountController',
    layout: 'fit',
    items: [{
            xtype: 'cartesian',
            reference: 'chart',
            width: '100%',
            height: '100%',
            legend: {
                type: 'sprite',
                docked: 'bottom'
            },
            // store: {
            //     type: 'browsers'
            // },
            bind: {
                store: '{LineChartPackStockedAmountStore}'
            },
            captions: {
                // title: 'Line Charts - Marked Lines',
                subtitle: 'Tiến độ sản xuất/nhập kho'
            },
            axes: [{
                type: 'numeric',
                fields: ['dataDHA', 'dataNV', 'dataBN1', 'dataBN2', 'dataBN3' ],
                position: 'left',
                grid: true,
                minimum: 0,
                renderer: 'onAxisLabelRender'
            }, {
                type: 'category',
                fields: 'processingDate',
                position: 'bottom',
                grid: true,
                label: {
                    rotate: {
                        degrees: -45
                    }
                },
                renderer: function (axis, label){
                    return Ext.Date.format(label, 'd/m');
                }
            }],
            series: [{
                type: 'line',
                title: 'DHA',
                xField: 'processingDate',
                yField: 'dataDHA',
                // marker: {
                //     // type: 'square',
                //     // animation: {
                //     //     duration: 200,
                //     //     easing: 'backOut'
                //     // }
                //     radius: 4,
                //     lineWidth: 2
                // },
                highlightCfg: {
                    scaling: 2
                },
                tooltip: {
                    trackMouse: true,
                    renderer: 'onSeriesTooltipRender'
                }
            }, {
                type: 'line',
                title: 'NV',
                xField: 'processingDate',
                yField: 'dataNV',
                // marker: {
                //     // type: 'triangle',
                //     // animation: {
                //     //     duration: 200,
                //     //     easing: 'backOut'
                //     // }
                //     radius: 4,
                //     lineWidth: 2
                // },
                highlightCfg: {
                    scaling: 2
                },
                tooltip: {
                    trackMouse: true,
                    renderer: 'onSeriesTooltipRender'
                }
            }, {
                type: 'line',
                title: 'BN1',
                xField: 'processingDate',
                yField: 'dataBN1',
                // marker: {
                //     // type: 'arrow',
                //     // animation: {
                //     //     duration: 200,
                //     //     easing: 'backOut'
                //     // }
                //     radius: 4,
                //     lineWidth: 2
                // },
                highlightCfg: {
                    scaling: 2
                },
                tooltip: {
                    trackMouse: true,
                    renderer: 'onSeriesTooltipRender'
                }
            }, {
                type: 'line',
                title: 'BN2',
                xField: 'processingDate',
                yField: 'dataBN2',
                // marker: {
                //     type: 'cross',
                //     animation: {
                //         duration: 200,
                //         easing: 'backOut'
                //     }
                // },
                highlightCfg: {
                    scaling: 2
                },
                tooltip: {
                    trackMouse: true,
                    renderer: 'onSeriesTooltipRender'
                }
            }, {
                type: 'line',
                title: 'BN3',
                xField: 'processingDate',
                yField: 'dataBN3',
                // marker: {
                //     type: 'cross',
                //     animation: {
                //         duration: 200,
                //         easing: 'backOut'
                //     }
                // },
                highlightCfg: {
                    scaling: 2
                },
                tooltip: {
                    trackMouse: true,
                    renderer: 'onSeriesTooltipRender'
                }
            }]
    }]
});