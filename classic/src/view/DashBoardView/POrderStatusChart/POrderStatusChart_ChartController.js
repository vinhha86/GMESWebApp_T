Ext.define('GSmartApp.view.DashBoardView.POrderStatusChart.POrderStatusChart_ChartController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrderStatusChart_ChartController',
    init: function () {
        // var viewModel = this.getViewModel();
        // var POrderStatusChartStore = viewModel.getStore('POrderStatusChartStore');
        // POrderStatusChartStore.loadStore();
    },

    //___________________________________________

    onAxisLabelRender: function(axis, label, layoutContext) {
        // Custom renderer overrides the native axis label renderer.
        // Since we don't want to do anything fancy with the value
        // ourselves except adding a thousands separator, but at the same time
        // don't want to loose the formatting done by the native renderer,
        // we let the native renderer process the value first.
        var value = layoutContext.renderer(label);

        return value === 0 ? '0' : Ext.util.Format.number(value, '0,000');
    },

    onSeriesLabelRender: function(value) {
        return Ext.util.Format.number(value, '0,000');
    },

    onGridColumnRender: function(v) {
        return Ext.util.Format.number(v, '0,000');
    },
    onTooltipRender: function(toolTip, record, ctx){
        // console.log(record);
        var porderBinding_list = record.get('porderBinding_list');
        var html = '';
        for(var i=0; i<porderBinding_list.length; i++){
            html+= '<div>';
            html+= porderBinding_list[i].orgName;
            html+= ' : '
            html+= porderBinding_list[i].sum;
            html+= '</div>';
        }
        // console.log(html);
        // toolTip.setHtml(record.get('sum'));
        toolTip.setHtml(html);
    },
    onBarRender: function(sprite, config, rendererData, index){
        var status = rendererData.store.data.items[index].get('status') + ''; 
        var statusName = rendererData.store.data.items[index].get('statusName'); 
        var fillStyle = '#FFFFFF';
        switch (status){
            case '0':
            // case 'Ch??a ph??n chuy???n':
                fillStyle = '#FFFF00';
                break;
            case '1':
            // case '???? ph??n chuy???n':
                fillStyle = '#B3E283';
                break;
            case '4':
            // case '??ang s???n xu???t':
                fillStyle = '#66DE93';
                break;
            case '6':
            // case '???? ho??n th??nh':
                if(statusName == 'Ch???m GH (??t)'){
                    fillStyle = '#FF616D';
                    break;
                }
                if(statusName == 'Ch???m GH (v???a)'){
                    fillStyle = '#D83A56';
                    break;
                }
                if(statusName == 'Ch???m GH (nhi???u)'){
                    fillStyle = '#DA0037';
                    break;
                }
                fillStyle = '#064420';
                break;
        }
        // console.log(status);
        // console.log(typeof status);
        // console.log(fillStyle);
        return Ext.apply(rendererData, {
            fill: fillStyle
         });
    }
});