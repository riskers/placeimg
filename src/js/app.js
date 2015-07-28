/*
{
	"placeholdit" : "http://placehold.it" ,		//http://placehold.it/350/000/fff&text=xxx
	"dummyimage" : "http://dummyimage.com/"	,	//http://dummyimage.com/350x350/000/FFF&text=xxx
	"fake" : "http://fakeimg.pl"		//http://fakeimg.pl/350x200/?text=World&font=lobster
	"kitten" : 'http://placekitten.com/' 	//http://placekitten.com/g/500/300
	"FPOImg" : "http://fpoimg.com"		//http://fpoimg.com/350x200
	"lore" : "http://lorempixel.com/"		//http://lorempixel.com/350/200
}
*/
												
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
		if(data.text!=''){
			res += '&text=' + data.text
		}
	}else if(resource=='placehold.it'){
		res = 'http://placehold.it' ;
		if(data.width==data.height){
			res += '/' + data.width
		}else{
			res += '/' + data.width + '/' + data.height ;
		}
		res += '/' + data.backgroundColor 
		res += '/' + data.frontColor
		if(data.text!=''){
			res += '&text=' + data.text
		}
	}else if(resource=='fake'){
		res = 'http://fakeimg.pl'
		res += '/' + data.width + 'x' + data.height  
		res += '/' + data.backgroundColor 
		res += '/' + data.frontColor
		if(data.text!=''){
			res += '?text=' + data.text
		}
	}else if(resource=='kitten'){
		res = 'http://placekitten.com/g' 
		res += '/' + data.width + '/' + data.height
	}else if(resource =='FPO'){
		res = 'http://fpoimg.com'
		res += '/' + data.width + 'x' + data.height  
	}else if(resource=='lore'){
		res = 'http://lorempixel.com/'
		res += '/' + data.width + '/' + data.height
	}

	return  res ;
}

window.onload = function(){
	var oOutput = document.getElementById('result') ,
		oInput = document.getElementById('in') ;

	var aInput = oInput.querySelectorAll('.v') ,
		inputData = {} ;

	var oSel = document.getElementById('sel') ;

	var oAside = document.querySelector('.aside') ;
	
	if(localStorage.getItem('resource')){
		var aOption = oSel.getElementsByTagName('option') ;
		for(var i=0;i<aOption.length;i++){
			if( aOption[i].value == localStorage.getItem('resource') ){
				aOption[i].selected = true 
				if(i<=2){
					oAside.style.display = 'block'
				}else{
					oAside.style.display = 'none'
				}
				break ;
			}
		}
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
		var resource = this.value ,
			index = this.selectedIndex
		localStorage.setItem('resource',resource)
		if(index<=2){
			oAside.style.display = 'block'
		}else{
			oAside.style.display = 'none'
		}
	})

}

