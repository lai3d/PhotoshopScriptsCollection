// Output iOS Icons.jsx
// 2014 Todd Linkner
// 2016 Larry Lai
// License: none (public domain)
// v1.4
//
// This script is for Photoshop CC 2017. It outputs iOS icons of the following 
// sizes from a source 1024px x 1024px PSD
//
// [name]-20.png
// [name]-20@2x.png
// [name]-20@3x.png
// [name]-29.png
// [name]-29@2x.png
// [name]-29@3x.png
// [name]-40.png
// [name]-40@2x.png
// [name]-40@3x.png
// [name]-50.png
// [name]-50@2x.png
// [name]-57.png
// [name]-57@2x.png
// [name]-60@2x.png
// [name]-60@3x.png
// [name]-72.png
// [name]-72@2x.png
// [name]-76.png
// [name]-76@2x.png
// [name]-83.5@2x.png
// [name]-512.png      (512px x 512px)
// [name]-512@2x.png   (1024px x 1024px)

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

// bring Photoshop into focus
#target Photoshop

main();

function main() {

    alert("This script outputs iPhone, iPad, and iTunes icons, "
        + "from a 1024px x 1024px PSD source file.\r\r");

    // Ask user for input folder
	var inputFile = File.openDialog("Select a 1024px x 1024px PSD file","PSD File:*.psd");
	if (inputFile == null) throw "No file selected. Exting script.";

	// Open file
	open(inputFile);

    // Set ruler untis to pixels
    app.preferences.typeUnits = TypeUnits.PIXELS

    // iOS 10 Icons

    resize(20,1);
    resize(20,2);
    resize(20,3);
    resize(29,1);
    resize(29,2);
    resize(29,3);
    resize(40,1);
    resize(40,2);
    resize(40,3);
    resize(50,1);
    resize(50,2);
    resize(57,1);
    resize(57,2);
    resize(60,2);
    resize(60,3);
    resize(72,1);
    resize(72,2);
    resize(76,1);
    resize(76,2);
    resize(83.5,2);
    resize(512,1);
    resize(512,2);
    resize(1024,1);

    // Clean up
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    alert("Done!");
}

function resize(size,scaleFactor) {
     // Setup file name
    var pname = app.activeDocument.path + "/";
    var fname = app.activeDocument.name;
    var append = "";
    var fsize = size * scaleFactor;
    if (scaleFactor > 1) {
		append =  "@" + scaleFactor + "x";   
    }
    n = fname.lastIndexOf(".");
    if (n > 0) {
        var basename = fname.substring(0,n);
        fname = basename+"-"+size+append+".png";
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
    tempfile.resizeImage(fsize+"px",fsize+"px");
    file = new File(pname+fname);
    tempfile.exportDocument(file, ExportType.SAVEFORWEB, opts);
    tempfile.close(SaveOptions.DONOTSAVECHANGES);
}

