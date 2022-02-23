Ext.define('GSmartApp.view.process_shipping.POLine.POLineChart.POLineChart', {
    extend: 'Ext.Panel',
    xtype: 'POLineChart',
    itemId: 'POLineChart',
    reference: 'POLineChart',
    controller: 'POLineChart_Controller',
    viewModel: 'POLineChart_ViewModel',
    // tbar: [
    //     '->',
    //     {
    //         text: 'Hàng ngày',
    //         handler: 'onAmountInputShow'
    //     },
    //     {
    //         text: 'Ra chuyền',
    //         handler: 'onAmountOutputShow'
    //     }
    // ],    
    items: {
        xtype: 'cartesian',
        reference: 'chart',
        width: '100%',
        height: 500,
        legend: {
            type: 'sprite',
            docked: 'right'
        },        
        interactions: {
            type: 'panzoom',
            zoomOnPanGesture: true
        },
        animation: {
            duration: 200
        },
        // bind: {
        //     store: '{LineChartStore}'
        // },
        store: Ext.create('Ext.data.JsonStore', {
            fields: ['processingdate', 
            'amountinput', 'amountinputsum', 
            'amountoutput', 'amountoutputsum',
            'amountpacked', 'amountpackedsum',
            'amountpackstocked', 'amountpackstockedsum',
            'amountstocked', 'amountstockedsum'
            ]
        }),
        innerPadding: {
            left: 40,
            right: 40
        },
        captions: {
            title: 'Tiến độ sản xuất'
        },
        axes: [{
            type: 'numeric',
            fields: ['amountinput', 'amountoutput', 'amountpacked', 'amountpackstocked', 'amountstocked', 'amountgiaohang'],
            position: 'left',
            grid: true,
            minimum: 0,
            // maximum: 500,
            renderer: 'onAxisLabelRender'
        }, {
            type: 'category',
            // dateFormat: 'd/m/y',
            position: 'bottom',
            grid: true,
            label: {
                rotate: {
                    degrees: -45
                }
            }
        }],
        series: [
            {
                type: 'line',
                smooth: true,
                showMarkers: true,
                title: 'Vào chuyền',
                xField: 'processingdate',
                yField: 'amountinput',
                style: {
                    lineWidth: 2
                },
                marker: {
                    radius: 4,
                    lineWidth: 2
                },
                label: {
                    field: 'amountinput',
                    display: 'over'
                },
                highlight: {
                    fillStyle: '#000',
                    radius: 5,
                    lineWidth: 2,
                    strokeStyle: '#fff'
                },
                tooltip: {
                    trackMouse: true,
                    showDelay: 0,
                    dismissDelay: 0,
                    hideDelay: 0,
                    renderer: 'onTooltipRender_Input'
                },
                bind: {
                    hidden: '{isamountinputHidden}',
                    showInLegend: '{!isamountinputHidden}'
                }
            },
            {
                type: 'line',
                smooth: true,
                showMarkers: true,
                title: 'Ra chuyền',
                xField: 'processingdate',
                yField: 'amountoutput',
                style: {
                    lineWidth: 2
                },
                marker: {
                    radius: 4,
                    lineWidth: 2
                },
                label: {
                    field: 'amountoutput',
                    display: 'over'
                },
                highlight: {
                    fillStyle: '#000',
                    radius: 5,
                    lineWidth: 2,
                    strokeStyle: '#fff'
                },
                tooltip: {
                    trackMouse: true,
                    showDelay: 0,
                    dismissDelay: 0,
                    hideDelay: 0,
                    renderer: 'onTooltipRender_Output'
                },
                bind: {
                    hidden: '{isamountoutputHidden}',
                    showInLegend: '{!isamountoutputHidden}'
                }
            },
            // {
            //     type: 'line',
            //     smooth: true,
            //     showMarkers: true,
            //     title: 'Đóng gói',
            //     xField: 'processingdate',
            //     yField: 'amountpacked',
            //     style: {
            //         lineWidth: 2
            //     },
            //     marker: {
            //         radius: 4,
            //         lineWidth: 2
            //     },
            //     label: {
            //         field: 'amountpacked',
            //         display: 'over'
            //     },
            //     highlight: {
            //         fillStyle: '#000',
            //         radius: 5,
            //         lineWidth: 2,
            //         strokeStyle: '#fff'
            //     },
            //     tooltip: {
            //         trackMouse: true,
            //         showDelay: 0,
            //         dismissDelay: 0,
            //         hideDelay: 0,
            //         renderer: 'onTooltipRender_Packed'
            //     },
            //     bind: {
            //         hidden: '{isamountpackedHidden}',
            //         showInLegend: '{!isamountpackedHidden}'
            //     }
            // },
            {
                type: 'line',
                smooth: true,
                showMarkers: true,
                title: 'Hoàn thiện',
                xField: 'processingdate',
                yField: 'amountpackstocked',
                style: {
                    lineWidth: 2
                },
                marker: {
                    radius: 4,
                    lineWidth: 2
                },
                label: {
                    field: 'amountpackstocked',
                    display: 'over'
                },
                highlight: {
                    fillStyle: '#000',
                    radius: 5,
                    lineWidth: 2,
                    strokeStyle: '#fff'
                },
                tooltip: {
                    trackMouse: true,
                    showDelay: 0,
                    dismissDelay: 0,
                    hideDelay: 0,
                    renderer: 'onTooltipRender_Packstocked'
                },
                bind: {
                    hidden: '{isamountpackstockedHidden}',
                    showInLegend: '{!isamountpackstockedHidden}'
                }
            },  
            {
                type: 'line',
                smooth: true,
                showMarkers: true,
                title: 'Nhập kho',
                xField: 'processingdate',
                yField: 'amountstocked',
                style: {
                    lineWidth: 2
                },
                marker: {
                    radius: 4,
                    lineWidth: 2
                },
                label: {
                    field: 'amountstocked',
                    display: 'over'
                },
                highlight: {
                    fillStyle: '#000',
                    radius: 5,
                    lineWidth: 2,
                    strokeStyle: '#fff'
                },
                tooltip: {
                    trackMouse: true,
                    showDelay: 0,
                    dismissDelay: 0,
                    hideDelay: 0,
                    renderer: 'onTooltipRender_Stocked'
                },
                bind: {
                    hidden: '{isamountstockedHidden}',
                    showInLegend: '{!isamountstockedHidden}'
                }
            },
            {
                type: 'line',
                smooth: true,
                showMarkers: true,
                title: 'Giao hàng',
                xField: 'processingdate',
                yField: 'amountgiaohang',
                style: {
                    lineWidth: 2
                },
                marker: {
                    radius: 4,
                    lineWidth: 2
                },
                label: {
                    field: 'amountgiaohang',
                    display: 'over'
                },
                highlight: {
                    fillStyle: '#000',
                    radius: 5,
                    lineWidth: 2,
                    strokeStyle: '#fff'
                },
                tooltip: {
                    trackMouse: true,
                    showDelay: 0,
                    dismissDelay: 0,
                    hideDelay: 0,
                    renderer: 'onTooltipRender_GiaoHang'
                },
                bind: {
                    hidden: '{isamountgiaohangHidden}',
                    showInLegend: '{!isamountgiaohangHidden}'
                }
            }
        ],
        listeners: {
            afterrender: 'onChartRendered',
            // itemhighlight: 'onItemHighlight'
        }
    }
});
