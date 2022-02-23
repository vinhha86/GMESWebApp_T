Ext.define('GSmartApp.plugin.DragSelector', {
    extend : 'Ext.ux.DataView.DragSelector',
    alias  : 'plugin.kanban_dragselector',

    init : function(dataview) {

        var scroller = dataview.getScrollable && dataview.getScrollable();

        if (Ext.versions.extjs.isGreaterThan('6.5.0')) {
            // If the client dataview is scrollable, and this is a PointerEvents device
            // we cannot intercept the pointer to implement dragselect.
            if (scroller && (scroller.getX() || scroller.getY()) && Ext.supports.Touch) {
                return;
            }

            this.dataview = dataview;

            dataview.mon(dataview, {
                beforecontainerclick: this.cancelClick,
                scope: this,
                render: {
                    fn: this.onRender,
                    scope: this,
                    single: true
                }
            });
        } else {
            // If the client dataview is scrollable, and this is a PointerEvents device
            // we cannot intercept the pointer to implement dragselect.
            if (scroller && (scroller.getX() || scroller.getY()) && (Ext.supports.PointerEvents || Ext.supports.MSPointerEvents)) {
                return;
            }

            this.callParent(arguments);
        }
    },

    onRender : function() {
        this.callParent(arguments);

        // Prevent drag tracker from cancelling focus of the task view
        this.tracker.preventDefault = false;
    },

    destroy : function () {
        this.tracker && this.tracker.destroy();

        this.callParent(arguments);
    }
});