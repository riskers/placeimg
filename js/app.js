var DefaultData = {
	width : 200 ,
	height : 200 ,
	frontColor : 'FFF' ,
	backgroundColor : '000' ,
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
	res += '&text=' + data.text
	console.log(res)
	return  res ;
}

window.onload = function(){
	var oOutput = document.getElementById('result') ,
		oInput = document.getElementById('in') ;

	var aInput = oInput.querySelectorAll('.v') ,
		inputData = {} ;
	
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
		}
	},false)

	
	oOutput.addEventListener('click',function(){
		this.select();
		return false;
	})

}

