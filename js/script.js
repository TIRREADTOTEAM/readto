var app = angular.module('myView', []);
app.controller('myCtrl', function($scope,$http) {
	/*$http.get("php/getPDF.php").then(function(response){
		$scope.showPDF = response.data;
	});*/
	$scope.toolName="ReadTo";
	$scope.tagLine="Enhance your reading experience...";
	$scope.count=1;
	$scope.commentnum=1;
	$scope.buttonlike="images/greylike.jpeg";
	$scope.likestring="Like";
	$scope.pdflikecount=0;
	$scope.imsaved="";
	$scope.checknupdate =function(){

		$scope.count=document.getElementById('page_num').innerHTML;
		
	};
	$scope.togglelike =function(){
		if($scope.buttonlike=="images/greylike.jpeg"){
			$scope.buttonlike="images/bluelike.jpeg";
			$scope.pdflikecount++;
			if($scope.pdflikecount>1)
			{
				$scope.likestring="Likes";
			}
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
		}
	};
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