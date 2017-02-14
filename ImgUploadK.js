


/**
 * Expand function of file upload element. (input type="file")
 * 
 * @version 1.2
 * @date 2017-1-30 | 2017-2-14
 */
var ImgUploadK =function(){
	
	
	var dndParam = {}; // parameter for "extendDnD" function.
	var lblParam = {}; // parameter for "extendLbl" function.
	
	var files; // File object from the file event.
	
	var def_img_fp ; // Default image path.
	
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
	 * @param callback(files) :Execute callback when drop image file or change file.Callback argument is file information.
	 */
	this.extendDnD = function(param,callback){

		// If Param property is empty, set a value.
		this.dndParam = _setParamIfEmptyForDnD(param);
		
		var fuElm = $(param.rap_slt);
		
		// Keep image file path.
		this.def_img_fp = $(param.img_preview_slt).attr('src');
		

		// Add drop event to rapper element.
		fuElm[0].addEventListener('drop',function(evt){
			evt.stopPropagation();
			evt.preventDefault();

			var files = evt.dataTransfer.files; 
			myself.files = files;
			
			if(!files[0]){
				return;
			}
			
			// Show image preview.
			_imgPreviewForDnD(files); 
			
			// Excute callback function for drop event.
			if(callback){
				callback(files);
			}

		},false);
		
		
		fuElm[0].addEventListener('dragover',function(evt){
			// evt.stopPropagation();
			evt.preventDefault();
		},false);
		
		// Add event of upload file.
		$(param.file_upload_slt).change(function(e) {

			// Get file object and show image preview.
			var files = e.target.files;
			_imgPreviewForDnD(files); 
			
			// Excute callback function for change event.
			if(callback){
				callback(files);
			}

		});
		
	}
	
	/**
	 * Formating callbacks function data.
	 * @param callbacks :Callback functions.
	 * @param functionNames :The function name list of callbacks.
	 * @returns Formated callbacks
	 */
	function formatingCallbacks(callbacks,functionNames){
		
		var cbFuncs ={};
		
		for(var i in functionNames){
			var func_name = functionNames[i];
			cbFuncs[func_name] = null;
		}


		if(_empty(callbacks)==false){

			if(typeof callbacks == 'function'){
				var def_func_name = functionNames[0];
				cbFuncs[def_func_name] = callbacks;
			}else{
				for(var func_name in callbacks){
					cbFuncs[func_name] = callbacks[func_name];
				}
			}
			
		}
		
		return cbFuncs;

	}
	
	
	
	
	/**
	 * Extend file upload with label.
	 * @param param
	 * - label_slt :Selector of label element with upload file element.
	 * - file_upload_slt :Selector of file upload element.
	 * - init_display_slt :Selector of initial  display element.(Optional)
	 * - img_preview_slt :Selector of preview iamge element.
	 */
	this.extendLbl = function(param){

		// If Param property is empty, set a value.
		this.lblParam = _setParamIfEmptyForLbl(param);
		
		var lblElm = $(param.label_slt);
		
		// Keep image file path.
		this.def_img_fp = $(param.img_preview_slt).attr('src');

		// Add drop event to rapper element.
		lblElm[0].addEventListener('drop',function(evt){
			evt.stopPropagation();
			evt.preventDefault();

			var files = evt.dataTransfer.files; 
			myself.files = files;
			
			if(!files[0]){
				return;
			}

			// Show image preview.
			_imgPreviewForLbl(files); 

		},false);
		
		
		lblElm[0].addEventListener('dragover',function(evt){
			// evt.stopPropagation();
			evt.preventDefault();
		},false);
		
		// Add event of upload file.
		$(param.file_upload_slt).change(function(e) {

			// Get file object and show image preview.
			var files = e.target.files;
			_imgPreviewForLbl(files); 

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
	
	
	/**
	 * Get files object of file upload function.
	 * @return  files	:File object from the file event.
	 */
	this.getFiles = function(){
		return myself.files;
	}
	
	
	/**
	 * Reset file upload elemnt and image preview element.(For label type)
	 */
	this.resetLbl = function(){
		
		var param = myself.lblParam;
		
		try {
			$(param.file_upload_slt).val("");// Attention: change event occurs in IE
		} catch (e) {
			console.log('It can not be reset in IE ');
		}	
		$(param.img_preview_slt).attr('src',myself.def_img_fp);
		
		
	}
	
	
	/**
	 * Reset file upload elemnt and image preview element.(For label type)
	 */
	this.resetDnD = function(){
		
		var param = myself.dndParam;
		
		try {
			$(param.file_upload_slt).val("");// Attention: change event occurs in IE
		} catch (e) {
			console.log('It can not be reset in IE ');
		}	
		$(param.img_preview_slt).attr('src',myself.def_img_fp);
		
		
	}
	
	
	
	
	
	// If Param property is empty, set a value. for drag & drop function.
	function _setParamIfEmptyForDnD(param){
		
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
	
	
	
	
	
	// If Param property is empty, set a value. for label type.
	function _setParamIfEmptyForLbl(param){
		

		
		if(param == undefined){
			throw new Error("No param");
		}
		
		if(param['label_slt'] == undefined){
			throw new Error("No label_slt in param");
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
	function _imgPreviewForDnD(files){

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
	
	
	

	/**
	 * Show image preview for Label type.
	 * @param files :File object from the file event.
	 */
	function _imgPreviewForLbl(files){

		var param = myself.lblParam;
		
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
				
				// ■■■□□□■■■□□□■■■□□□
//				// Fit rapper element size to image size.
//				var img = new Image;
//				img.src = reader.result;
//				img.onload = function() { 
//					 $(param.rap_slt).css({
//						'width':img.width,
//						'height':img.height});
//				};
			}

		}
	}
	
	
	
	// Empty judgment.
	function _empty(v){
		if(v == null || v == '' || v=='0'){
			return true;
		}else{
			if(typeof v == 'object'){
				if(Object.keys(v).length == 0){
					return true;
				}
			}
			return false;
		}
	}
	
	
	// call constractor method.
	this.constract();
};

	
	

