var colors = ['black', 'red', 'blue', 'purple', 'green', '#888888', '#545454', '#222222', 'yellow', '#AB0902', '#BBBBBB','#104C90', 'magenta', '#c115d0'];
var drawables = [];
var k = 2, iterNo = 0, points = [], seeds = [];
///////////////////////////////     event handling  ///////////////////////////////////

forwardTimeout = null;

segment = null;
var hitOptions = {fill:true, tolerance:5};

function onMouseDown(event){
    segment = null;
    
	var hitResult = project.hitTest(event.point, hitOptions);        
    if (hitResult) {
        console.log(hitResult.item.position.x+',' +hitResult.item.position.y)
        segment = hitResult.item;
    }
    else{    
        var p = new clusterPoint(event.point);
        p.draw();
        points.push(p);

        if (event.modifiers.shift) { // if control is pressed add new point
            clear();
        }  

        refreshPointsandSeeds();
        deltaError = 9999;
    }
    
}

tool.minDistance = 20;
function onMouseDrag(event) {
    
    
    if (event.modifiers.shift) { // if shift is pressed 
        if(segment)
        {
            var id = parseInt(segment.name.split("_")[1])
            console.log(id+'deneme' + event.point)
            seeds[id] = event.point;
            init();
        }
    } 
    else{
        var p = new clusterPoint(event.middlePoint);
        p.draw();
        points.push(p);
    }
    
}
//////////////////////////////////////  Classes  ////////////////////////////////////////

function clusterPoint(p){

    if (typeof clusterPoint.counter == 'undefined')
        clusterPoint.counter = 0;
    
    this.id = clusterPoint.counter++; // newly created vertex will have different id
    this.point = p;
    this.type = -1; // initially assigned to nothing, then it will take the id of the seed
    
    this.draw = function(){
        drawables.push(new Path.Circle({ name: 'point-'+this.id, center: p, radius: 4, fillColor: colors[this.type+1]}));
    }
};

function pointCloud(){ // It is used to calculate average value of the cloud (cloud is et of points which are assigned to the same seed)
    this.count = 0;
    this.point = new Point(0,0);
};

////////////////////////////////////     Math Helper Part      ///////////////////////////////

function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function createKRandom(n, minX, maxX, minY, maxY) {

    var temp = []

    var x_ = maxX || view.size.width;
    var y_ = maxY || view.size.height;

    for(var i=0; i < n; i++)
    {
        var x = getRandomFloat(minX || 0.1 * x_, 0.9 * x_);
        var y = getRandomFloat(minY || 0.1 * y_, 0.9 * y_);
        var tmpP = new Point(x,y);

        temp.push(tmpP);
    }
    return temp;
}

////////////////////////////////////     Visual Part      ///////////////////////////////

function clear(){
    for(i=0; i<drawables.length; i++) // it is for lines, circles, texts etc.
        drawables[i].remove();
    drawables.clear();
    
    clusterPoint.counter = 0;
}

Array.prototype.clear = function() {
  while (this.length) {
    this.pop();
  }
};

function refreshPointsandSeeds(){
    clear();

    for(var k=0; k < points.length; k++)
    {
        points[k].draw();  
        drawables.push(new Path.Line({from: seeds[points[k].type], to:points[k].point, strokeColor: colors[points[k].type +1], opacity:0.3}))    
    }  
    
    for(var i=0; i<seeds.length; i++)
        drawables.push(new Path.Circle({name: 'seed_'+i, center: seeds[i], radius: 10, strokeColor: colors[i+1], fillColor:'white', strokeWidth: 2, opacity: 0.75}));
}

window.distributePoints = function(t){ 

    points.clear();
    
    var temp;
    if(t == 1)
        temp =  [[193.5,145],[186.5,212],[268.5,192],[283.5,145],[233.5,153],[226.5,90],[163.5,115],[141.5,149],[424.5,375],[482.5,459],[561.5,386],[456.5,395],[429.5,449],[589.5,426],[511.5,331],[512.5,382],[642.5,282]];
    else if(t==2)
        temp = [[222,56],[161,98],[184,119],[225,125],[203,79],[157,56],[265,102],[264,70],[433,68],[404,91],[419,125],[470,152],[460,109],[447,104],[483,69],[482,130],[532,100],[528,133],[518,56],[502,94],[170,405],[146,428],[166,484],[132,481],[181,442],[200,504],[231,459],[208,409],[273,438],[247,489],[197,469],[229,428],[420,391],[406,423],[437,476],[439,427],[466,379],[472,425],[507,381],[472,406],[514,449],[478,451],[522,480],[542,437],[516,415]];
    else if(t==3)
        temp = [[193.5,145],[186.5,212],[268.5,192],[283.5,145],[233.5,153],[226.5,90],[163.5,115],[141.5,149],[424.5,375],[482.5,459],[561.5,386],[456.5,395],[429.5,449],[589.5,426],[511.5,331],[512.5,382],[642.5,282],[193.5,145],[186.5,212],[268.5,192],[283.5,145],[233.5,153],[226.5,90],[163.5,115],[141.5,149],[424.5,375],[482.5,459],[561.5,386],[456.5,395],[429.5,449],[589.5,426],[511.5,331],[512.5,382],[642.5,282],[193.5,145],[186.5,212],[268.5,192],[283.5,145],[233.5,153],[226.5,90],[163.5,115],[141.5,149],[424.5,375],[482.5,459],[561.5,386],[456.5,395],[429.5,449],[589.5,426],[511.5,331],[512.5,382],[642.5,282],[134,382],[166,373],[213,424],[167,435],[175,408],[114,431],[111,356],[163,478],[255,463],[209,484],[228,382],[198,343],[245,111],[290,77],[286,124],[185,65]];
    else if(t==4)
        temp =  [[168.5,53.5],[150.5,65.5],[143.5,79.5],[150.5,101.5],[163.5,107.5],[211.5,80.5],[181.5,79.5],[194.5,108.5],[233.5,65.5],[217.5,51.5],[234.5,96.5],[281.5,115.5],[423.5,59.5],[391.5,80.5],[412.5,100.5],[450.5,112.5],[472.5,102.5],[484.5,82.5],[466.5,87.5],[437.5,85.5],[387.5,50.5],[458.5,41.5],[479.5,50.5],[524.5,68.5],[528.5,76.5],[510.5,98.5],[515.5,117.5],[617.5,111.5],[606.5,129.5],[613.5,152.5],[617.5,155.5],[655.5,156.5],[630.5,121.5],[637.5,94.5],[664.5,99.5],[682.5,116.5],[666.5,139.5],[675.5,177.5],[644.5,161.5],[651.5,132.5],[701.5,157.5],[295.5,253.5],[250.5,269.5],[283.5,292.5],[302.5,301.5],[400.5,319.5],[434.5,320.5],[466.5,317.5],[472.5,304.5],[416.5,292.5],[381.5,294.5],[344.5,281.5],[333.5,268.5],[365.5,248.5],[412.5,261.5],[172.5,471.5],[155.5,484.5],[191.5,505.5],[289.5,509.5],[290.5,497.5],[236.5,480.5],[227.5,486.5],[270.5,513.5],[280.5,520.5],[229.5,507.5],[435.5,508.5],[410.5,524.5],[447.5,533.5],[472.5,534.5],[497.5,533.5],[536.5,531.5],[538.5,528.5],[501.5,525.5],[492.5,527.5],[462.5,513.5],[477.5,507.5],[526.5,508.5],[534.5,512.5],[624.5,519.5],[623.5,529.5],[640.5,548.5],[663.5,546.5],[688.5,539.5],[695.5,523.5],[668.5,540.5],[660.5,536.5],[642.5,516.5],[663.5,513.5],[697.5,502.5],[666.5,491.5],[647.5,497.5],[644.5,515.5]];
    else if(t==5)
        temp = [[524.5,117.5],[514.3,110.2],[493.0,97.3],[469.7,88.6],[445.1,85.5],[420.2,86.5],[395.6,90.7],[371.9,98.6],[350.2,110.6],[330.2,125.5],[311.1,141.5],[294.6,160.2],[279.8,180.3],[266.9,201.6],[259.1,225.2],[255.0,249.8],[253.0,274.7],[253.9,299.6],[257.7,324.3],[263.7,348.6],[268.7,373.0],[273.2,397.5],[283.2,420.0],[298.9,439.3],[317.4,456.0],[337.6,470.7],[357.6,485.7],[378.3,499.6],[401.4,508.5],[426.1,511.8],[451.0,511.5],[475.8,508.6],[499.7,501.9],[521.2,489.4],[540.4,473.5],[556.4,454.6],[568.2,432.6],[575.3,408.9],[577.9,384.1],[576.5,359.2],[571.4,334.8],[562.9,311.4],[547.6,292.6],[525.2,283.0],[500.4,280.6],[508.5,387.5],[496.0,388.5],[471.4,386.5],[448.0,378.2],[425.5,367.3],[405.1,353.3],[388.4,334.9],[374.6,314.1],[367.5,290.7],[368.4,265.9],[375.2,242.0],[387.1,220.2],[403.3,201.3],[423.3,186.7],[446.5,178.2],[471.2,174.6],[495.8,176.5],[519.6,183.9],[542.7,193.4],[564.4,205.7],[584.6,220.3],[602.8,237.3],[618.1,257.0],[630.0,278.8],[637.0,302.7],[641.3,327.3],[645.3,352.0],[649.9,376.6],[652.4,401.3],[649.1,425.8],[642.7,450.0],[635.3,473.8],[624.0,496.0],[609.0,515.8],[589.8,531.3],[567.1,541.7],[543.6,550.3],[519.4,555.9],[494.9,560.3],[470.4,565.2],[445.5,567.4],[420.5,567.5],[395.6,566.1],[371.4,560.6],[348.3,551.1],[326.1,539.6],[304.0,528.0],[282.2,515.8],[261.6,501.6],[242.2,486.0],[225.2,467.8],[208.8,449.0],[190.5,431.9],[173.9,413.6],[161.2,392.1],[150.9,369.4],[144.9,345.4],[142.3,320.5],[140.7,295.6]]
    else if(t==6)
        temp = [[55.5,244.5],[60.2,232.9],[69.7,209.8],[79.5,186.8],[90.1,164.2],[101.3,141.8],[113.6,120.1],[128.4,100.0],[145.2,81.6],[165.7,67.9],[185.5,72.4],[201.5,91.6],[215.5,112.3],[227.6,134.1],[238.5,156.6],[249.8,178.9],[262.9,200.1],[279.5,218.6],[299.2,233.9],[316.5,230.8],[328.9,209.2],[338.1,185.9],[346.0,162.2],[355.4,139.1],[367.5,117.3],[385.3,100.8],[407.4,100.4],[426.6,115.5],[442.5,134.9],[457.5,154.8],[473.7,173.8],[491.9,191.0],[511.7,192.8],[530.2,176.4],[545.5,156.7],[561.3,137.3],[580.1,121.2],[602.8,111.5],[626.2,114.1],[645.4,129.2],[660.8,148.9],[675.5,169.1],[690.5,189.0],[707.3,207.5],[109.5,531.5],[116.6,521.2],[130.8,500.6],[144.9,480.0],[159.8,459.9],[175.9,440.8],[193.4,423.0],[212.2,406.5],[232.5,392.1],[255.1,381.8],[279.4,376.0],[300.6,382.8],[314.3,403.2],[324.0,426.2],[334.4,448.9],[345.3,471.4],[358.3,492.7],[376.3,509.2],[397.2,508.3],[415.8,491.8],[432.3,473.0],[448.8,454.3],[466.5,436.6],[486.0,421.2],[507.9,409.3],[528.6,412.9],[545.8,430.9],[561.8,450.1],[577.3,469.7],[592.6,489.5],[610.0,507.3],[632.0,517.0],[654.8,511.7]]

    for(var k=0; k < temp.length; k++){
        var p = new clusterPoint(new Point(temp[k]));
        p.draw();
        points.push(p);
    }

    init();
}

////////////////////////////////////////////////////////////////////////////////////

//https://en.wikipedia.org/wiki/K-means_clustering

function assign(){
    
    for(var i=0; i < points.length; i++)
    {
        var closest = -1;
        var dist = 9999;
        
        for(var k=0; k < seeds.length; k++) // find the closest seed
        {
            var tempDist = (seeds[k]-points[i].point).length;
            if(tempDist < dist)
            {
                dist = tempDist;
                closest = k;
            }
        }        
        points[i].type = closest;
    }    
}

function update(){         // update seeds
    clouds = [];
    
    for(var i=0; i<seeds.length; i++)
        clouds.push(new pointCloud());        
    
    for(var i=0; i < points.length; i++){
        clouds[points[i].type].point += points[i].point;
        clouds[points[i].type].count++;
    }
    
    deltaError = 0;
    for(var i=0; i<seeds.length; i++)
    {
        var newPlace = 0;
        if(clouds[i].count != 0) // If seed doesnt have a point, use the old position otherwise go the average of the points
            newPlace = clouds[i].point/clouds[i].count;
        else
            newPlace = seeds[i];
            
        deltaError += (seeds[i] - newPlace).length; 
        seeds[i] = newPlace;
    }
    document.getElementById("info_deltaError").innerHTML = "Delta position:  "+deltaError.toFixed(2);   
}

function init(){
    assign();
    refreshPointsandSeeds();
    
    deltaError = 9999;
    iterNo = 0; 
    document.getElementById("info_iter").innerHTML = "Iterations:  "+iterNo;
    
    clearTimeout(forwardTimeout);
}

window.restart = function(){
    seeds = createKRandom(k, 0, view.size.width, 0, view.size.height);
    init();
}
window.restart();


window.iterate = function(){
    
    if(deltaError == 0){
        if(forwardTimeout)
        {
            clearTimeout(forwardTimeout);
            forwardTimeout = null;
        }
        return;
    }
    
    iterNo++;
    document.getElementById("info_iter").innerHTML = "Iterations:  "+iterNo;
         
    assign();
    update();
    
    refreshPointsandSeeds();
}

window.forward = function(){
    window.iterate();
    forwardTimeout = setTimeout(window.forward, 500);
}


window.decreaseK = function(){
    if(k>2)
    {
        k = parseInt(document.getElementById("num-layers").innerHTML)-1;
        document.getElementById("num-layers").innerHTML = ""+k;  
        seeds.pop();
        init();
    }
}

window.increaseK = function(){
    k = parseInt(document.getElementById("num-layers").innerHTML)+1;
    document.getElementById("num-layers").innerHTML = ""+k;  
    seeds = seeds.concat(createKRandom(1, 0, view.size.width, 0, view.size.height));
    init();
}

function onFrame(event){}

////////// Some Miscalleneous Functions ///////
window.getPoints = function(){

    var str = ""
    for(k=0; k < points.length; k++)
        str += "["+points[k].point.x.toFixed(1)+"," +points[k].point.y.toFixed(1)+"],"    
        
    console.info(str.substr(0, str.length-1)); // omit last , and print to console
}


