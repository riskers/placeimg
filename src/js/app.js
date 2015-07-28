var PlaceImg = {
	"placeholdit" : "http://placehold.it" ,		//http://placehold.it/350/000/fff&text=xxx
	"dummyimage" : "http://dummyimage.com/"		//http://dummyimage.com/350x350/000/FFF&text=xxx
}
												
function getData(resource,data){
	
	var defaultData = {
		width : 200 ,
		height : 200 ,
		frontColor : '000' ,
		backgroundColor : 'CCC' ,
		text : '' 
	}

	for(var k in data){
		if(!data[k]){
			data[k] = defaultData[k]
		}
	}

	var res = '';

	if(resource=='dummyimage'){
		res = "http://" + "dummyimage.com" ;
		res += '/' + data.width + 'x' + data.height 
		res += '/' + data.backgroundColor 
		res += '/' + data.frontColor
	}else if(resource=='placehold.it'){
		res = 'http://placehold.it' ;
		if(data.width==data.height){
			res += '/' + data.width
		}else{
			res += '/' + data.width + '/' + data.height ;
		}
		
		res += '/' + data.backgroundColor 
		res += '/' + data.frontColor
	}
	if(data.text!=''){
		res += '&text=' + data.text
	}
	
	return  res ;
}

window.onload = function(){
	var oOutput = document.getElementById('result') ,
		oInput = document.getElementById('in') ;

	var aInput = oInput.querySelectorAll('.v') ,
		inputData = {} ;

	var oSel = document.getElementById('sel') ;
	
	if(localStorage.getItem('resource')){
		var aOption = oSel.getElementsByTagName('option') ;
		for(var i=0;i<aOption.length;i++){
			if( aOption[i].value == localStorage.getItem('resource') ){
				aOption[i].selected = true 
				break ;
			}
		}
	}else{
		localStorage.setItem('resource','dummyimage') ;
	}

	oInput.addEventListener('keyup',function(e){

		var resource = localStorage.getItem('resource')

		var target = e.target ;
		if(target.tagName=='INPUT'){
			inputData = {
				width : aInput[0].value ,
				height : aInput[1].value ,
				frontColor : aInput[2].value ,
				backgroundColor : aInput[3].value ,
				text : aInput[4].value 
			} ;
			oOutput.value = getData(resource,inputData) ;
			//console.log(getData(resource,inputData))
		}
	},false)

	oInput.addEventListener('keypress',function(e){
		if(e.keyCode==13){
			oOutput.focus()
			oOutput.select()
		}
	})

	oOutput.addEventListener('click',function(){
		this.select();
		return false;
	})

	oSel.addEventListener('change',function(){
		var resource = this.value
		localStorage.setItem('resource',resource)
	})

}

