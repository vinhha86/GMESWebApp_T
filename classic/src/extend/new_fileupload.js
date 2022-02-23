
Ext.define("GSmartApp.extend.new_fileupload", {
    extend:'Ext.form.field.File',
    alias: "widget.new_fileupload",
    xtype: 'new_fileupload',
    onRender: function () {
        this.callParent(arguments);
        this.fileInputEl.dom.setAttribute('multiple', this.multiple);
    },
 
    /**
     * Convenience method that will return the files in the fileInputEl.dom
     */
    getFileList: function () {
        return this.fileInputEl.dom.files;
    }
});