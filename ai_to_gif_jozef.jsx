var sourceDoc, docName
		//Set PDF Options
		pdfOpenOptions = new PDFOpenOptions;
		pdfOpenOptions.antiAlias = true;
		pdfOpenOptions.page = 1;
		pdfOpenOptions.mode = OpenDocumentMode.RGB;
		pdfOpenOptions.resolution = 72;	// (72dpi * 1.5)‚đ•ĎŤX
		pdfOpenOptions.CropPage = CropToType.ARTBOX;

		//Set GIF output options
		exportOptions = new GIFSaveOptions;
		exportOptions.matte = MatteType.WHITE;
		exportOptions.Forced = true;
		exportOptions.Palette = 1;
		exportOptions.Dither = 1;
		exportOptions.transparency = true;



var topFolder = Folder.selectDialog('Select the folder with Illustrator files you want to convert to GIF','~');
var fileandfolderAr = scanSubFolders(topFolder,/\.(ai|)$/i);
var fileList = fileandfolderAr[0];

if ( fileList.length > 0 ){
	for(var a = 0 ;a < fileList.length; a++)
	{

	sourceDoc = app.open(fileList[a],pdfOpenOptions);

		//Set GIF file name
		docName= String(fileList[a])		
		docName=docName.slice(0, -3)	
		targetFile = new File(docName + ".gif");
				
		//Save and Close
		sourceDoc.saveAs(targetFile,exportOptions,true,Extension.LOWERCASE);
		sourceDoc.close(SaveOptions.DONOTSAVECHANGES);
	}
	alert('Done!')
}
else{
	alert('No matching files found');
}

function scanSubFolders(tFolder, mask) { // folder object, RegExp or string
    var sFolders = new Array(); 
    var allFiles = new Array(); 
    sFolders[0] = tFolder; 
    for (var j = 0; j < sFolders.length; j++){ // loop through folders             
        var procFiles = sFolders[j].getFiles(); 
        for (var i=0;i<procFiles.length;i++){ // loop through this folder contents 
            if (procFiles[i] instanceof File ){
                if(mask==undefined) allFiles.push(procFiles[i]);// if no search mask collect all files
                if (procFiles[i].fullName.search(mask) != -1) allFiles.push(procFiles[i]); // otherwise only those that match mask
        }else if (procFiles[i] instanceof Folder){
            sFolders.push(procFiles[i]);// store the subfolder
            scanSubFolders(procFiles[i], mask);// search the subfolder
         }
      } 
   } 
   return [allFiles,sFolders]; 
};
