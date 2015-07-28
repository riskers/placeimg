var DefaultData = {
	width : 200 ,
	height : 200 ,
	frontColor : '000' ,
	backgroundColor : 'CCC' ,
	text : '' 
}
	
var PlaceImg = {
	"dummyimage" : "http://dummyimage.com/"
}

function dealNull(data,DefaultData){
	for(var k in data){
		if(!data[k]){
			data[k] = DefaultData[k]
		}
	}
	return data ;
}

function getData(data){
	var res = "http://" + "dummyimage.com" ;
	data = dealNull(data,DefaultData) ;
	console.log(data)
	res += '/' + data.width + 'x' + data.height 
	res += '/' + data.backgroundColor 
	res += '/' + data.frontColor
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
	}

	oInput.addEventListener('keyup',function(e){
		var target = e.target ;
		if(target.tagName=='INPUT'){
			inputData = {
				width : aInput[0].value ,
				height : aInput[1].value ,
				frontColor : aInput[2].value ,
				backgroundColor : aInput[3].value ,
				text : aInput[4].value 
			} ;
			oOutput.value = getData(inputData) ;
			console.log(getData(inputData))
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

