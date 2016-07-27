// Output Android Icons.jsx
// 2012 Todd Linkner
// License: none (public domain)
// v1.0
// Updated by Larry Lai
//
// This script is for Photoshop CC 2015.5. It outputs Android icons of the  
// following sizes from a source PSD at least 512px x 512px
//
// store:
//	Icon.png		(512px x 512px)
//
// xxxhdpi:
//  Icon.png        (192px x 192px)
//
// xxhdpi:
//  Icon.png        (144px x 144px)
//
// xhdpi:
//	Icon.png		(96px x 96px)
//
// hdpi:
//	Icon.png		(72px x 72px)
//
// mdpi:
//	Icon.png		(48px x 48px)
//
// ldpi:
//	Icon.png		(36px x 36px)

//Installation:
// 1. Place Script in 
//  <Photoshop Directory>\presets\scripts\
//
// 2. Restart Photoshop
//
// 3. Select File -> Scripts -> Corner Editor
//
// Set a keyboard shortcut or record an action
// for faster access.

/*
// BEGIN__HARVEST_EXCEPTION_ZSTRING
<javascriptresource>
<name>$$$/JavaScripts/OutputAndroidIcons/MenuAlt=Output Android Icons</name>
<category>mobile</category>
</javascriptresource>
// END__HARVEST_EXCEPTION_ZSTRING
*/

// bring Photoshop into focus
#target photoshop

main();

function main() {

    alert("This script outputs Android store, SHDPI, HDPI, "
        + "MDPI, and LDPI icons from a source PSD at least 512px x "
        + "512px\r\r");

    // Ask user for input folder
	var inputFile = File.openDialog("Select a PSD file at least 512px x 512px","PSD File:*.psd");
	if (inputFile == null) throw "No file selected. Exting script.";

    // Open file
	open(inputFile);
    var docRef = app.activeDocument;

	// Make output folders
	var dirstore = Folder(app.activeDocument.path+"/AnroidIcons/store");
	if(!dirstore.exists) dirstore.create();
    var dirxxxhdpi = Folder(app.activeDocument.path+"/AnroidIcons/drawable-xxxhdpi");
    if(!dirxxxhdpi.exists) dirxxxhdpi.create();
    var dirxxhdpi = Folder(app.activeDocument.path+"/AnroidIcons/drawable-xxhdpi");
    if(!dirxxhdpi.exists) dirxxhdpi.create();
	var dirxhdpi = Folder(app.activeDocument.path+"/AnroidIcons/drawable-xhdpi");
	if(!dirxhdpi.exists) dirxhdpi.create();
	var dirhdpi = Folder(app.activeDocument.path+"/AnroidIcons/drawable-hdpi");
	if(!dirhdpi.exists) dirhdpi.create();
	var dirmdpi = Folder(app.activeDocument.path+"/AnroidIcons/drawable-mdpi");
	if(!dirmdpi.exists) dirmdpi.create();
	var dirldpi = Folder(app.activeDocument.path+"/AnroidIcons/drawable-ldpi");
	if(!dirldpi.exists) dirldpi.create();

    // Set ruler untis to pixels
    app.preferences.typeUnits = TypeUnits.PIXELS

    // Store icon:
	resize(dirstore,512);
    // XHDPI icon:
    resize(dirxxxhdpi,192);
    // XHDPI icon:
    resize(dirxxhdpi,144);
    // XHDPI icon:
	resize(dirxhdpi,96);
    // HDPI icon:
	resize(dirhdpi,72);
    // MDPI icon:
	resize(dirmdpi,48);
    // LDPI icon:
	resize(dirldpi,36);

    // Clean up
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);

    alert("Done!");
}

function resize(dir,size) {
    // Setup file name
    var fname = app.activeDocument.name.replace(/\s+/g, '_').replace(/([a-z\d])([A-Z])/g, '$1_$2').toLowerCase();
    n = fname.lastIndexOf(".");
    if (n > 0) {
        var basename = fname.substring(0,n);
        fname = basename+".png";
   }

    // Set export options
    var opts, file;
    opts = new ExportOptionsSaveForWeb();
    opts.format = SaveDocumentType.PNG;
    opts.PNG8 = false; 
    opts.transparency = true;
    opts.interlaced = 0;
    opts.includeProfile = false;
    opts.optimized = true;

    // Duplicate, resize and export
    var tempfile = app.activeDocument.duplicate();
    tempfile.resizeImage(size+"px",size+"px");
    file = new File(dir+"/"+fname);
    tempfile.exportDocument(file, ExportType.SAVEFORWEB, opts);
    tempfile.close(SaveOptions.DONOTSAVECHANGES);
}