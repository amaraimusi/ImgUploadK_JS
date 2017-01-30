


/**
 * Expand function of file upload element. (input type="file")
 * 
 */
var ImgUploadK =function(){
	
	
	this.dndParam = {}; // parameter for "extendDnD" function.
	
	this.files; // File object from the file event.
	
	var myself=this; // Instance of myself.
	
	
	

	/**
	 * initialized.
	 */
	this.constract=function(){
		
	};
	
	/**
	 * Extend drag & drop
	 * @param param
	 * - rap_slt :Rapper element selector of upload file element.
	 * - file_upload_slt :Selector of file upload element.
	 * - init_display_slt :Selector of initial  display element.(Optional)
	 * - img_preview_slt :Selector of preview iamge element.
	 */
	this.extendDnD = function(param){

		// If Param property is empty, set a value.
		this.dndParam = setParamIfEmptyForDnD(param);
		
		var fuElm = $(param.rap_slt);

		// Add drop event to rapper element.
		fuElm[0].addEventListener('drop',function(evt){
			evt.stopPropagation();
			evt.preventDefault();

			var files = evt.dataTransfer.files; 
			myself.files = files;
			
			// Show image preview.
			ImgPreviewForDnD(files); 

		},false);
		
		
		fuElm[0].addEventListener('dragover',function(evt){
			// evt.stopPropagation();
			evt.preventDefault();
		},false);
		
		// Add event of upload file.
		$(param.file_upload_slt).change(function(e) {

			
			// Get file object and show image preview.
			var files = e.target.files;
			ImgPreviewForDnD(files); 

		});
		
	}
	
	/**
	 * Get file name array.
	 * @return file name array.
	 */
	this.getFileNames = function(){
		var list = null;
		
		if(myself.files){
			list = [];
			for (var i = 0; i < myself.files.length; i++) {
				list.push(myself.files[i].name);
			}
		}
		
		return list;
	}
	
	// If Param property is empty, set a value. for drag & drop function.
	function setParamIfEmptyForDnD(param){
		
		if(param == undefined){
			throw new Error("No param");
		}
		
		if(param['rap_slt'] == undefined){
			throw new Error("No rap_slt in param");
		}
		
		if(param['file_upload_slt'] == undefined){
			throw new Error("No file_upload_slt in param");
		}
		
		if(param['init_display_slt'] == undefined){
			param['init_display_slt'] = null;
		}
		
		if(param['img_preview_slt'] == undefined){
			param['img_preview_slt'] = null;
		}
		
		
		return param;
	};
	
	
	

	/**
	 * Show image preview for Drag and drop.
	 * @param files :File object from the file event.
	 */
	function ImgPreviewForDnD(files){

		var param = myself.dndParam;
		
		// Hide initial display element.
		if(param.init_display_slt){
			$(param.init_display_slt).hide();
		}
		
		// Rendring data url scheme by asynchronous.
		var oFile = files[0];
		var reader = new FileReader();
		reader.readAsDataURL(oFile);

		// Callback from render.
		reader.onload = function(evt) {
			
			if(param.img_preview_slt){
			
				// Set data url scheme to image element, and show preview image.
				$(param.img_preview_slt).attr('src',reader.result);
				
				// Fit rapper element size to image size.
				var img = new Image;
				img.src = reader.result;
				img.onload = function() { 
					 $(param.rap_slt).css({
						'width':img.width,
						'height':img.height});
				};
			}

		}
	}
	
	
	// call constractor method.
	this.constract();
};

	
	

