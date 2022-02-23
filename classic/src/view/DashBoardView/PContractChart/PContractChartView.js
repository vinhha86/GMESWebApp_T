Ext.define('GSmartApp.view.DashBoardChart.PContractChart.PContractChartView', {
    extend: 'Ext.panel.Panel',
    xtype: 'PContractChartView',
    controller: 'PContractChartViewController',
    layout: 'fit',
    items: [{
        xtype: 'cartesian',
        reference: 'chart',
        width: '100%',
        height: 500,
        // captions: {
        //     title: 'Thông tin đơn hàng'
        // },
        // legend: {
        //     type: 'sprite',
        //     docked: 'bottom'
        // },
        bind: {
            store: '{PContractChartStore}',
            captions: '{title}'
        },
        axes: [{
            type: 'numeric',
            position: 'left',
            adjustByMajorUnit: true,
            grid: true,
            fields: ['soluong'],
            renderer: 'onAxisLabelRender',
            // title: 'Số lượng',
            minimum: 0
        }, {
            type: 'category',
            position: 'bottom',
            grid: true,
            fields: ['mahang'],
            // title: 'Mã hàng',
            label: {
                rotate: {
                    degrees: -45
                }
            }
        }],
        series: [{
            type: 'bar',
            xField: 'mahang',
            yField: ['soluong'],
            style: {
                opacity: 0.80
            },
            label: {
                display: 'insideEnd',
                'text-anchor': 'middle',
                field: 'soluong',
                renderer: Ext.util.Format.numberRenderer('0'),
                orientation: 'horizontal', //horizontal - vertical
                color: '#333'
            },
            highlight: {
                fillStyle: 'yellow'
            },
            tooltip: {
                trackMouse: true,
                renderer: 'onBarTipRender'
            }
        }]
    }],
    dockedItems: [{
        dock: 'top',
        layout: 'hbox',
        xtype: 'toolbar',
        items: [{
            xtype: 'combo',
            itemId: 'comboyear',
            fieldLabel: "Năm HĐ",
            bind: {
                store: '{YearStore}',
                value: '{year}'
            },
            displayField: 'name',
            valueField: 'id',
            width: 150,
            labelWidth: 60
        }, {
            xtype: 'radiogroup',
            itemId: 'rdoType',
            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
            fieldStyle: 'font-size:11px;',
            cls: 'x-check-group-alt',
            items: [
                { boxLabel: 'Sản phẩm chưa có định mức', width: 200, name: 'type', inputValue: 0, margin: 2 },
                { boxLabel: 'Chào giá chưa có PO line', width: 180, name: 'type', inputValue: 1, margin: 2 },
                { boxLabel: 'PO Line chưa Maps', name: 'type', inputValue: 2, margin: 2 }
            ],
            bind: {
                value: '{type}'
            }
        }]
    }]
});