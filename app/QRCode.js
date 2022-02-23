Ext.define('GSmartApp.QRCode', {
	extend: 'Ext.Component',
    xtype: 'qrcode',
    imgsize:128,
    maximgsize:547,
    text: 'blank',
    colorDark : "#000000",
    colorLight : "#ffffff",
 
    onRender: function (t, eOpts) {
        var me = this;
        me.callParent(arguments);
        if(!me.qrcode){
            var size = me.imgsize>me.maximgsize?me.maximgsize:me.imgsize;
            me.qrcode = new QRCode(me.getEl(),{
                width:size,
                height:size,
                text:me.text,
                colorDark:me.colorDark,
                colorLight:me.colorLight,
                correctLevel: QRCode.CorrectLevel.H
            });
        }
        else {
            me.qrcode.clear();
            me.qrcode.makeCode(me.text);
        }
    },
 
    onDestroy: function () {
        if (this.qrcode) {
            this.qrcode.clear();
        }
        this.callParent(arguments);
    },
    onMakeCode(text){
        console.log(text);
        var me= this;
        var qrcode = this.qrcode;
        
    },
    onGenBase64: function(){
        var qrcodjs = this.qrcode;
        var imgBase64 = qrcodjs._oDrawing._elImage.currentSrc;
                if (typeof imgBase64 === "undefined")
                    imgBase64 = qrcodjs._oDrawing._elImage.href;
                if (typeof imgBase64 === "undefined")
                    imgBase64 = qrcodjs._oDrawing._elImage.src;
                    console.log(imgBase64);
    }

});