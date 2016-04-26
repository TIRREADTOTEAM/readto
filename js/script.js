var app = angular.module('myView', []);

app.controller('myUploadPdf', function($scope,$http,pdfName){
    $scope.toolName="ReadTo";
    $scope.tagLine="Enhance your reading experience...";

});
app.controller('mySelectPdf', function($scope,$http,pdfName){
    $scope.toolName="ReadTo";
    $scope.tagLine="Enhance your reading experience...";
	$scope.pdfNameShare = [];
    $scope.pdfs=[];
   /* var request = $http({
        method: "post",
        url: window.location.href + "/../php/getPdfs.php",
        data: [{
                'flag': 'getPdf' }],
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });

    request.success(function(data){

        for(i=0;i<data.length;i++)
        {
            var jsontext = data[i];
            var obj=JSON.parse(jsontext);
            $scope.pdfs.push(obj);
        }
    });

    request.error(function(error){
        alert(error);
    });*/
	$scope.shareMyPdfName = function (myloc,myname) {

	   $scope.pdfLocShare = myloc;
	   $scope.pdfNameShare = myname;

	   pdfName.addData({'name': $scope.pdfNameShare, 'location':$scope.pdfLocShare});
	  	window.location.href = "fileops.html";
	};
});

app.controller('myCtrl', function($scope,$http,pdfName) {
    var containertop=document.getElementById('pdfcontainer').offsetTop - document.getElementById('pdfcontainer').clientHeight;
    //var containertop = 200;
    var containerleft=document.getElementById('pdfcontainer').offsetLeft+document.getElementById('pdfcontainer').clientWidth;
    $scope.nullsummarystyle={"position": "absolute","top":containertop,"left":"20","display":"block","width":"20%"};
    $scope.nullsummary={"height":"800px"};
	$scope.toolName="ReadTo";
	$scope.tagLine="Enhance your reading experience...";
	$scope.count=1;
	$scope.commentnum=1;
	$scope.buttonlike="images/greylike.jpeg";
	$scope.userid=1;
    $scope.summarybackup=[];
    $scope.summary=[];
    $scope.GetDetails = function(obj,id)
    {

        $scope.details = obj;
        if(id==1)
        {
            if(document.getElementById('a2')){
                document.getElementById('a2').classList.remove('active');
            }
            document.getElementById('a1').classList.add('active');
        }
        else if(id==2){

            if(document.getElementById('a1')){
                document.getElementById('a1').classList.remove('active');
            }
            document.getElementById('a2').classList.add('active');
        }

    }
    $scope.listyle={'position':'absolute','top':containertop-52,'left':20};
    var setAllInactive = function() {
        angular.forEach($scope.workspaces, function(workspace) {
            workspace.active = false;
        });
    };

    var addNewWorkspace = function() {
        var id = $scope.workspaces.length + 1;
        $scope.workspaces.push({
            id: id,
            name: "Workspace " + id,
            active: true
        });
    };

    $scope.workspaces =
        [
            { id: 1, name: "Workspace 1", active:true  },
            { id: 2, name: "Workspace 2", active:false }
        ];

    $scope.addWorkspace = function () {
        setAllInactive();
        addNewWorkspace();
    };

	/*SHOW PDF*/
	var sharedpdfjson = pdfName.getData();
	var val=JSON.stringify(sharedpdfjson);

	var result = val.substring(1, val.length-1);
	var finalval = JSON.parse(result);
	$scope.sharedPDFName = finalval.name;
	$scope.sharedPDFLoc = finalval.location;


	/*GET LIKE COUNT*/
    var request = $http({
            method: "post",
            url: window.location.href + "/../php/setLike.php",
            data: [{'like': 'toget', 
                    'name': '"'+$scope.sharedPDFName+'"',
                    'loc': '"'+$scope.sharedPDFLoc+'"',
                    'userid': $scope.userid,
                    'flag': 'getLike' }],
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
        
        request.success(function(data){
            var breaks = data.split('\n');
            if(breaks[0]=="Yo")
            {
                $scope.buttonlike="images/bluelike.jpeg";
            }
            else
            {
                $scope.buttonlike="images/greylike.jpeg";
            }
            if(parseInt(breaks[1])<=1)
            {
                $scope.likestring="Like";
            }
            else
            {
                $scope.likestring="Likes";
            }
            $scope.pdflikecount=parseInt(breaks[1]);
        });

        request.error(function(error){
            alert(error);
        });


	$scope.imsaved="";

	/*PDF PAGE NUMBER*/



	$scope.checknupdate =function(btn){

		$scope.count=document.getElementById('page_num').innerHTML;
		
		var count=parseInt($scope.count);
		/*if(btn == "next" && count>1)
		count=count-1;
		else if(btn == "prev")
		count=count+1;*/
		
		$scope.savedcomments=[];
        $scope.comments=[];
		var req = $http({
    		method: "post",
    		url: window.location.href + "/../php/getComment.php",
    		data: [{'pageno': count, 
    				'scrollpos': 'noscroll',
    				'date': 'nodate',
    				'book': $scope.sharedPDFName,
    				'data': 'nodata',
    				'flag': 'getComment',
                    'left': containerleft
    				 }],
    		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    	});
		
    	req.success(function(data){

    		for(i=0;i<data.length;i++)
    		{
    			var jsontext = data[i];
    			var obj=JSON.parse(jsontext);
    			$scope.savedcomments.push(obj);
    		}
    	});

    	req.error(function(error){
    		alert(error);
    	});
        $scope.details=[];
        $scope.summary=[];
        var req = $http({
            method: "post",
            url: window.location.href + "/../php/getSummary.php",
            data: [{'pageno': count,
                'scrollpos': 'noscroll',
                'date': 'nodate',
                'book': $scope.sharedPDFName,
                'data': 'nodata',
                'flag': 'getSummary',
                'top': containertop
            }],
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });

        req.success(function(data){

            for(i=0;i<data.length;i++)
            {
                var jsontext = data[i];
                var obj=JSON.parse(jsontext);
                $scope.summary.push(obj);
                if($scope.summary.length>=1)
                    $scope.details=$scope.summary[0];
            }
        });

        req.error(function(error){
            alert(error);
        });
		document.getElementById('nullsummary').value = '';

	};

	/*PDF LIKE BUTTON*/
	$scope.togglelike =function(){
	    
		var request = $http({
    		method: "post",
    		url: window.location.href + "/../php/setLike.php",
    		data: [{'like': $scope.pdflikecount, 
    				'name': '"'+$scope.sharedPDFName+'"',
    				'loc': '"'+$scope.sharedPDFLoc+'"',
                    'userid': $scope.userid,
    				'flag': 'setLike' }],
    		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    	});
		
    	request.success(function(data){
            //var audio = new Audio('ogg/like.mp3');
            //audio.play();
            if($scope.pdflikecount<parseInt(data))
            {
                $scope.buttonlike="images/bluelike.jpeg";
            }
            else
            {
                $scope.buttonlike="images/greylike.jpeg";
            }
            if(data<=1)
            {
                $scope.likestring="Like";
            }
            else
            {
                $scope.likestring="Likes";
            }
    		$scope.pdflikecount=data;
            
    	});

    	request.error(function(error){
    		alert(error);
    	});
	};

	/*PDF COMMENT SECTION*/
    $scope.comments=[];
    $scope.savedcomments=[];
    var req = $http({
        method: "post",
        url: window.location.href + "/../php/getComment.php",
        data: [{'pageno': 1,
            'scrollpos': 'noscroll',
            'date': 'nodate',
            'book': $scope.sharedPDFName,
            'data': 'nodata',
            'flag': 'getComment',
            'left': containerleft
        }],
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });

    req.success(function(data){

        for(i=0;i<data.length;i++)
        {
            var jsontext = data[i];
            var obj=JSON.parse(jsontext);
            $scope.savedcomments.push(obj);
        }
    });
	$scope.opendiv =function($event){
		//var scrollpos=window.scrollTop;
		//var width=screen.width*0.80;
		var canvasid=document.getElementById("the-canvas");
		var canvastop=canvasid.offsetTop;
		//var canvasleft=canvasid.offsetLeft+2;
		var topval=$event.offsetY+canvastop;
		//var leftval=canvasid.offsetWidth+canvasleft;
		$scope.comments.push({'style':{'position': 'absolute','top':topval,'left':containerleft,'display':'block','width':'20%'},'id':'comment'+topval+$scope.commentnum});
		$scope.commentnum++;
	};

	$scope.savecomment = function($id){
		var commentele=document.getElementById($id);
		var topval=commentele.style.top;
		var leftval=commentele.style.left;
		$scope.leftdist = leftval;
		var buttonelem=commentele.getElementsByTagName('textarea')[0].value;
		$scope.savedcomments.push({'style':{'position': 'absolute','top':topval,'left':leftval,'display':'block','width':'20%'},'id':'savedcomment'+topval+$scope.commentnum, 'data':buttonelem});
		for(var i = 0; i < $scope.comments.length; i++) {
    		if($scope.comments[i].id == $id) {
        		$scope.comments.splice(i, 1);
        		break;
    		}
		}
		$scope.count=document.getElementById('page_num').innerHTML;
		var currdate = Date();
		var req = $http({
    		method: "post",
    		url: window.location.href + "/../php/getComment.php",
    		data: [{'pageno': $scope.count,
    				'leftval': containerleft,
                    'scrollpos':topval,
    				'date': currdate,
    				'book': $scope.sharedPDFName,
    				'data': buttonelem,
    				'id': 'savedcomment'+topval+$scope.commentnum,
    				'flag': 'saveComment' }],
    		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    	});
		
    	req.success(function(data){
    		
    	});

    	req.error(function(error){
    		alert(error);
    	});
		//commentele.remove();

	};

    //PDF Summary section
    $scope.summary=[];

    var req = $http({
        method: "post",
        url: window.location.href + "/../php/getSummary.php",
        data: [{'pageno': 1,
            'date': 'nodate',
            'book': $scope.sharedPDFName,
            'data': 'nodata',
            'flag': 'getSummary',
            'top': containertop
        }],
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });

    req.success(function(data){

        for(i=0;i<data.length;i++)
        {
            var jsontext = data[i];
            var obj=JSON.parse(jsontext);
            $scope.summary.push(obj);
        }
        $scope.details=$scope.summary[0];
    });

    $scope.savesummary = function(){

        var request = $http({
            method: "post",
            url: window.location.href + "/../php/getbookid.php",
            data: [{
                'name': $scope.sharedPDFName
            }],
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });

        request.success(function(data){
            $scope.bookid=data;

        });

        request.error(function(error){
            alert(error);
        });
        var summaryval=document.getElementById("nullsummary").value;
        $scope.summary=$scope.summarybackup;
        $scope.summary.push({"style":{"position": "absolute","top":containertop,"left":"20","display":"block","width":"20%"},"id":"summary"+$scope.bookid+$scope.count, "data":summaryval});
        $scope.summary=$scope.summary.splice(-2);
        var currdate = Date();
        var req = $http({
            method: "post",
            url: window.location.href + "/../php/getSummary.php",
            data: [{
                'pageno': $scope.count,
                'date': currdate,
                'book': $scope.sharedPDFName,
                'data': summaryval,
                'flag': 'setSummary',
                'top': containertop
            }],
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });

        req.success(function(data){
            $scope.details=[];
            if($scope.summary.length>=1)
                $scope.details=$scope.summary[0];
        });

        req.error(function(error){
            alert(error);
        });
        //commentele.remove();

    };

    $scope.addsummary = function(){
        $scope.summarybackup=$scope.summary;
        $scope.summary=[];

    };
    $scope.getSummaryIndex = function (post) {
        return $scope.summary.indexOf(post); //this will return the index from the array
    }
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


