var app = angular.module('myView', []);

app.controller('mySelectPdf', function($scope,$http,pdfName){
	$scope.pdfNameShare = [];
  
	$scope.shareMyPdfName = function (myloc,myname) {

	   $scope.pdfLocShare = myloc;
	   $scope.pdfNameShare = myname;

	   pdfName.addData({'name': $scope.pdfNameShare, 'location':$scope.pdfLocShare});
	  	window.location.href = "fileops.html";
	}
});

app.controller('myCtrl', function($scope,$http,pdfName) {
	/*$http.get("php/getPDF.php").then(function(response){
		$scope.showPDF = response.data;
	});*/
	$scope.toolName="ReadTo";
	$scope.tagLine="Enhance your reading experience...";
	$scope.count=1;
	$scope.commentnum=1;
	$scope.buttonlike="images/greylike.jpeg";
	/*SHOW PDF*/
	var sharedpdfjson = pdfName.getData();
	var val=JSON.stringify(sharedpdfjson);
	var result = val.substring(1, val.length-1);
	var finalval = JSON.parse(result);
	$scope.sharedPDFName = finalval.name;
	$scope.sharedPDFLoc = finalval.location;
	
	/*GET LIKE COUNT*/
	var req = $http({
    		method: "post",
    		url: window.location.href + "/../php/setLike.php",
    		data: [{'like': 'toget', 
    				'name': '"'+$scope.sharedPDFName+'"',
    				'loc': '"'+$scope.sharedPDFLoc+'"',
    				'flag': 'getLike' }],
    		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    	});
		
    	req.success(function(data){
    		$scope.pdflikecount=data;
    		if(data>1)
    		{
    			$scope.likestring="Likes";
    		}
    		else
    		{
    			$scope.likestring="Like";
    		}
    	});

    	req.error(function(error){
    		alert(error);
    	});

	//$scope.pdflikecount=0;
	$scope.imsaved="";
	
	/*$scope.getPDF = function(){
		x($scope.sharedPDFName);
		//$window.x($scope.sharedPDFName);
	};*/
	


	/*PDF PAGE NUMBER*/
	$scope.checknupdate =function(){

		$scope.count=document.getElementById('page_num').innerHTML;
		var commentasstring=JSON.stringify($scope.savedcomments);
		var getcommentsjson = JSON.parse(commentasstring);
		for(var i=0;i<$scope.savedcomments.length;i++)
		{
			//var getcommentsjson= JSON.parse($scope.savedcomments);
			
			var scrollpos = getcommentsjson[i]['style']['top'];
			alert(JSON.stringify(scrollpos));
		}
		/*for(var i=0;i<getcommentsjson.length;i++)
		{
			var scrollpos = getcommentsjson[i]['style']['top'];
			var data = getcommentsjson[i]['data'];
			alert(data+" : "+scrollpos+ " : " + $scope.count);
		}*/
		/*var req = $http({
    		method: "post",
    		url: window.location.href + "/../php/saveComments.php",
    		data: [{'pageno': $scope.count, 
    				'scrollpos': scrollpos,
    				'flag': 'getComment' }],
    		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    	});
		
    	req.success(function(data){
    		
    	});

    	req.error(function(error){
    		alert(error);
    	});*/

		/*$scope.comments=[];
		$scope.savedcomments=[];*/
	};

	/*PDF LIKE BUTTON*/
	$scope.togglelike =function(){
		var incdec=0;
		if($scope.buttonlike=="images/greylike.jpeg"){
			$scope.buttonlike="images/bluelike.jpeg";
			$scope.pdflikecount++;
			if($scope.pdflikecount>1)
			{
				$scope.likestring="Likes";
			}
			incdec=1;
		}
		else
		{
			$scope.buttonlike="images/greylike.jpeg";
			if($scope.pdflikecount!=0)
			{
				$scope.pdflikecount--;
			}
			if($scope.pdflikecount<=1)
			{
				$scope.likestring="Like";
			}
			incdec=-1;
		}

		var request = $http({
    		method: "post",
    		url: window.location.href + "/../php/setLike.php",
    		data: [{'like': $scope.pdflikecount, 
    				'name': '"'+$scope.sharedPDFName+'"',
    				'loc': '"'+$scope.sharedPDFLoc+'"',
    				'flag': 'setLike' }],
    		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    	});
		
    	request.success(function(data){
    		$scope.pdflikecount=data;
    	});

    	request.error(function(error){
    		alert(error);
    	});
	};

	/*PDF COMMENT SECTION*/
	$scope.opendiv =function($event){
		//var scrollpos=window.scrollTop;
		//var width=screen.width*0.80;
		var canvasid=document.getElementById("the-canvas");
		var canvastop=canvasid.offsetTop;
		var canvasleft=canvasid.offsetLeft+2;
		var topval=$event.offsetY+canvastop;
		var leftval=canvasid.offsetWidth+canvasleft;
		$scope.comments.push({'style':{'position': 'absolute','top':topval,'left':leftval,'display':'block','width':'290px','height':'200px'},'id':'comment'+topval+$scope.commentnum});
		$scope.commentnum++;
	};
	$scope.comments=[];
	$scope.savedcomments=[];
	$scope.savecomment = function($id){
		var commentele=document.getElementById($id);
		var topval=commentele.style.top;
		var leftval=commentele.style.left;
		var buttonelem=commentele.getElementsByTagName('textarea')[0].value;
		$scope.savedcomments.push({'style':{'position': 'absolute','top':topval,'left':leftval,'display':'block','width':'290px','height':'150px'},'id':'savedcomment'+topval+$scope.commentnum, 'data':buttonelem});
		for(var i = 0; i < $scope.comments.length; i++) {
    		if($scope.comments[i].id == $id) {
        		$scope.comments.splice(i, 1);
        		break;
    		}
		}
		//commentele.remove();

	};

    
});




app.service('pdfName', function($window) {
        var KEY = 'App.SelectedValue';

        var addData = function(newObj) {
            var mydata = $window.sessionStorage.getItem(KEY);
            /*if (mydata) {
                mydata = JSON.parse(mydata);
            } else {*/
                mydata = [];
            /*}*/

            mydata.push(newObj);
            $window.sessionStorage.setItem(KEY, JSON.stringify(mydata));
        };

        var getData = function(){
            var mydata = $window.sessionStorage.getItem(KEY);
            if (mydata) {
                mydata = JSON.parse(mydata);
            }

            return mydata || [];
        };

        return {
            addData: addData,
            getData: getData
        };
    });


