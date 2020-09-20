
var scene, renderer, mesh;
var boxes = [];
var buildings = [];
var roads = [];
var walks=[];
var walls=[];
var keyboard = {};
var Streetlightx=[];
var Streetlighty=[];
var Streetlightz=[];
var Streetlight=[];
var looker = {
    height: 3.0,
    speed: 0.2,
    turnspeed: Math.PI * 0.01,
    updownSpeed: 0.2
};
var Ground;
var seta=0;
var isSpinning=1;
var Animeupdate=false;


numOfLights=88

function building1(a) {
    return new THREE.Mesh(
        new THREE.BoxGeometry(3, a, 3),
        new THREE.MeshPhongMaterial(
            {
                color: 0xffffff,
                wireframe: false,
                map: buildingTexture
            }
        )
    )
}
function building2(a) {
    return new THREE.Mesh(
        new THREE.BoxGeometry(3, a, 3),
        new THREE.MeshPhongMaterial(
            {
                color: 0xffffff,
                wireframe: false,
                map: buildingTexture5
            }
        )
    )
}
function building3(a) {
    return new THREE.Mesh(
        new THREE.BoxGeometry(3, a, 3),
        new THREE.MeshPhongMaterial(
            {
                color: 0xffffff,
                wireframe: false,
                map: buildingTexture6
            }
        )
    )
}
function road() {
    return new THREE.Mesh(
        new THREE.BoxGeometry(50, 0.1, 2),
        new THREE.MeshPhongMaterial(
            {
                color: 0xffffff,
                map: roadtexture
            }
        )
    )
}
function walkroad(){
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 0.1, 50),
        new THREE.MeshPhongMaterial(
            {
                color: 0xffffff,
                map: textureCOLOR,
                normalMap: textureNORMAL,
                Disp: textureDISP
            }
        )
    )
}
function makebuilding2(a,b,c){
    return new THREE.Mesh(
        new THREE.BoxGeometry(a,b,c),
        new THREE.MeshPhongMaterial(
            {
                color:0xffffff,
                map: buildingTexture2
            }
        )
    )
}
function makebuilding3(a,b,c){
    return new THREE.Mesh(
        new THREE.BoxGeometry(a,b,c),
        new THREE.MeshPhongMaterial(
            {
                color:0xffffff,
                map: buildingTexture3
            }
        )
    )
}
function makebuilding4(a,b,c){
    return new THREE.Mesh(
        new THREE.BoxGeometry(a,b,c),
        new THREE.MeshPhongMaterial(
            {
                color:0xffffff,
                map: buildingTexture4
            }
        )
    )
}
function makeWall(){
    return new THREE.Mesh(
        new THREE.BoxGeometry(48,1,0.1),
        new THREE.MeshPhongMaterial(
            {
                color:0xffffff,
                map: brickTexture
            }
        )
    )
}


function makeTree(){
    return new THREE.Mesh(
        new THREE.BoxGeometry(0.5,0.5,0.5),
        new THREE.MeshPhongMaterial(
            {
                color:0xffffff,
                map: treetopTexture
            }
        )
    )
}
function makeTreeStick(){
    return new THREE.Mesh(
        new THREE.BoxGeometry(0.1,1,0.1),
        new THREE.MeshPhongMaterial(
            {
                color:0xffffff,
                map: treestickTexture
            }
        )
    )
}
function makeRoof1(){
    return new THREE.Mesh(
        new THREE.BoxGeometry(3,0.1,3),
        new THREE.MeshPhongMaterial(
            {color:0xffffff,
            map: brickTexture2}
        )
    )
}

function makeRoof2(){
    return new THREE.Mesh(
        new THREE.BoxGeometry(3,0.1,3),
        new THREE.MeshPhongMaterial(
            {color:0xffffff,
            map: roofTexture}
        )
    )
}

function makeRoof3(){
    return new THREE.Mesh(
        new THREE.BoxGeometry(3,0.1,3),
        new THREE.MeshPhongMaterial(
            {color:0xffffff,
            map: roofTexture2}
        )
    )
}


function makeLight2(a,c,d){
    LS=new THREE.Mesh(
        new THREE.BoxGeometry(0.1,1,0.1),
        new THREE.MeshPhongMaterial(
            {
                color: 0xffffff,
                map: plasticTexture
            }
        )
    )
    Lighte=new THREE.Mesh(
        new THREE.BoxGeometry(0.5,0.1,0.1),
        new THREE.MeshPhongMaterial(
            {
                color: 0xffffff,
                map: plasticTexture
            }
        )
    )
    
    
    scene.add(LS);
    scene.add(Lighte);
    LS.receiveShadow=true;
    LS.castShadow=true;
    Lighte.receiveShadow=true;
    Lighte.castShadow=true;
    LS.position.set(a,0.5,c);
    Lighte.position.set(a-0.2,1,c);

    if(d==90){
        LS.position.set(a,0.5,c);
        Lighte.position.set(a+0.2,1,c);
    }
    
}



function makeLight(a,c,d){
    LS=new THREE.Mesh(
        new THREE.BoxGeometry(0.1,1,0.1),
        new THREE.MeshPhongMaterial(
            {
                color: 0xffffff,
                map: plasticTexture
            }
        )
    )
    Lighte=new THREE.Mesh(
        new THREE.BoxGeometry(0.1,0.1,0.5),
        new THREE.MeshPhongMaterial(
            {
                color: 0xffffff,
                map: plasticTexture
            }
        )
    )
    
    
    scene.add(LS);
    scene.add(Lighte);
    LS.receiveShadow=true;
    LS.castShadow=true;
    Lighte.receiveShadow=true;
    Lighte.castShadow=true;
    LS.position.set(a,0.5,c);
    Lighte.position.set(a,1,c-0.2);

    if(d==90){
        LS.position.set(a,0.5,c);
        Lighte.position.set(a,1,c+0.2);
    }
    else if(d==180){
        LS.position.set(a,0.5,c);
        Lighte.position.set(a,1,c+0.2);
    }
}



function makeCircle(ir,or,x,z){
    var geometry = new THREE.RingGeometry( ir, or, 32 );
    var material = new THREE.MeshPhongMaterial( { color: 0xffffff, 
        side: THREE.DoubleSide,
        map: stonefloorTexture } );
    var mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );
    mesh.rotation.x+=Math.PI/2;
    mesh.position.set(x,0.1,z);
    mesh.receiveShadow=true;
}

function grassTamble(a,c){
    grass=new THREE.Mesh(
        new THREE.BoxGeometry(3,0.25,0.2),
        new THREE.MeshPhongMaterial(
            {
                color:0x00ff00,
                map: grassTambleTexture
            }
        )
    )

    scene.add(grass);
    grass.position.set(a,0.125,c);
    grass.receiveShadow=true;
    grass.castShadow=true;


}
function grassTamble2(a,c){
    grass=new THREE.Mesh(
        new THREE.BoxGeometry(0.2,0.25,3),
        new THREE.MeshPhongMaterial(
            {
                color:0x00ff00,
                map: grassTambleTexture
            }
        )
    )

    scene.add(grass);
    grass.position.set(a,0.125,c);
    grass.receiveShadow=true;
    grass.castShadow=true;


}
function makeStructure(a,c){
    
}
function makeTotalTree(a,c){
    tree=makeTree();
    ts=makeTreeStick();

    scene.add(tree);
    scene.add(ts);
    tree.position.set(a,1,c);
    ts.position.set(a,0.5,c);
    tree.castShadow=true;
    tree.receiveShadow=true;
    ts.castShadow=true;
    ts.receiveShadow=true;
}
function drawRoad(){
    //앞쪽 방향
    roads.push(road());
    roads.push(road());
    roads[0].position.set(25,0.02,0);
    roads[1].position.set(-25,0.02,0);
    scene.add(roads[0]);
    scene.add(roads[1]);
    roads.push(road());
    roads.push(road());


    walk=walkroad();
    walk.position.set(-1.5,0,25);
    walks.push(walk);
    scene.add(walk);
    walk=walkroad();
    walk.position.set(1.5,0,25);
    walks.push(walk);
    scene.add(walk);
    walk=walkroad();
    walk.position.set(1.5,0,-25);
    walks.push(walk);
    scene.add(walk);
    walk=walkroad();
    walk.position.set(-1.5,0,-25);
    walks.push(walk);
    scene.add(walk);


    walk=walkroad();
    walk.rotation.y+=Math.PI/2;
    walk.position.set(25,0,-1.5);
    walks.push(walk);
    scene.add(walk);
    walk=walkroad();
    walk.rotation.y+=Math.PI/2;
    walk.position.set(25,0,1.5);
    walks.push(walk);
    scene.add(walk);
    walk=walkroad();
    walk.rotation.y+=Math.PI/2;
    walk.position.set(-25,0,-1.5);
    walks.push(walk);
    scene.add(walk);
    walk=walkroad();
    walk.rotation.y+=Math.PI/2;
    walk.position.set(-25,0,1.5);
    walks.push(walk);
    scene.add(walk);
    for(i=0;i<walks.length;i++)
    {
        walks[i].receiveShadow=true;
        //walks[i].castShadow=true;
    }


    roads[2].position.set(0,0.01,25);
    roads[2].rotation.y+=Math.PI/2;
    roads[3].position.set(0,0.01,-25);
    roads[3].rotation.y+=Math.PI/2;
    scene.add(roads[2]);
    scene.add(roads[3]);
    for(i=0;i<4;i++){
        roads[i].receiveShadow=true;
    }
    
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(90, 1280 / 720, 0.1, 1000);


    var textureLoader = new THREE.TextureLoader();


    // 땅 텍스쳐 
    textureCOLOR = textureLoader.load("Stone Floor 002/Pavement_005_COLOR.png");
    textureNORMAL = textureLoader.load("Stone Floor 002/Pavement_005_NRM.png");
    textureDISP = textureLoader.load("Stone Floor 002/Pavement_005_DISP.png")

    textureCOLOR.wrapS = THREE.RepeatWrapping;
    textureNORMAL.wrapS = THREE.RepeatWrapping;
    textureDISP.wrapS = THREE.RepeatWrapping;

    textureCOLOR.wrapT = THREE.RepeatWrapping;
    textureNORMAL.wrapT = THREE.RepeatWrapping;
    textureDISP.wrapT = THREE.RepeatWrapping;

    textureCOLOR.repeat.set(1,60);
    textureNORMAL.repeat.set(1, 60);
    textureDISP.repeat.set(1, 60);

    //길 텍스쳐
    roadtexture = textureLoader.load("texture/road1.jpg");
    roadtexture.wrapS = THREE.RepeatWrapping;
    roadtexture.wrapT = THREE.RepeatWrapping;
    roadtexture.repeat.set(10, 1);

    //빌딩1 텍스쳐
    buildingTexture = textureLoader.load("texture/building1.jpg");
    buildingTexture.wrapS = THREE.RepeatWrapping;
    buildingTexture.wrapT = THREE.RepeatWrapping;
    buildingTexture.repeat.set(1, 1);

    //빌딩2 텍스쳐
    buildingTexture2 = textureLoader.load("texture/building2.jpg");
    buildingTexture2.wrapS = THREE.RepeatWrapping;
    buildingTexture2.wrapT = THREE.RepeatWrapping;
    buildingTexture2.repeat.set(1, 1);

    //grass 텍스쳐
    grassTexture=textureLoader.load("texture/grass1.jpg");
    grassTexture.wrapS = THREE.RepeatWrapping;
    grassTexture.wrapT = THREE.RepeatWrapping;
    grassTexture.repeat.set(50,50);

    grassTexture2=textureLoader.load("texture/grass2.jpg");
    grassTexture2.wrapS = THREE.RepeatWrapping;
    grassTexture2.wrapT = THREE.RepeatWrapping;
    grassTexture2.repeat.set(3,10);

    //brickwall 텍스쳐
    brickTexture=textureLoader.load("texture/brickwall1.jpg");
    brickTexture.wrapS = THREE.RepeatWrapping;
    brickTexture.wrapT = THREE.RepeatWrapping;
    brickTexture.repeat.set(50,1);


    brickTexture2=textureLoader.load("texture/brickwall1.jpg");
    brickTexture2.wrapS = THREE.RepeatWrapping;
    brickTexture2.wrapT = THREE.RepeatWrapping;
    brickTexture2.repeat.set(1,1);


    buildingTexture3=textureLoader.load("texture/build2.jpg");
    buildingTexture3.wrapS = THREE.RepeatWrapping;
    buildingTexture3.wrapT = THREE.RepeatWrapping;
    buildingTexture3.repeat.set(1,1);

    buildingTexture4=textureLoader.load("texture/build4.jpg");
    buildingTexture4.wrapS = THREE.RepeatWrapping;
    buildingTexture4.wrapT = THREE.RepeatWrapping;
    buildingTexture4.repeat.set(1,1);

    buildingTexture5=textureLoader.load("texture/build5.jpg");
    buildingTexture5.wrapS = THREE.RepeatWrapping;
    buildingTexture5.wrapT = THREE.RepeatWrapping;
    buildingTexture5.repeat.set(2,4);

    buildingTexture6=textureLoader.load("texture/build6.jpg");
    buildingTexture6.wrapS = THREE.RepeatWrapping;
    buildingTexture6.wrapT = THREE.RepeatWrapping;
    buildingTexture6.repeat.set(2,2);


    treetopTexture=textureLoader.load("texture/treetop.jpg");
    treetopTexture.wrapS=THREE.RepeatWrapping;
    treetopTexture.wrapT=THREE.RepeatWrapping;
    treetopTexture.repeat.set(1,1);

    treestickTexture=textureLoader.load("texture/treestick.jpg");
    treestickTexture.wrapS=THREE.RepeatWrapping;
    treestickTexture.wrapT=THREE.RepeatWrapping;
    treestickTexture.repeat.set(1,1);

    plasticTexture=textureLoader.load("texture/plastic1.jpg");
    plasticTexture.wrapS=THREE.RepeatWrapping;
    plasticTexture.wrapT=THREE.RepeatWrapping;
    plasticTexture.repeat.set(1,1);


    roofTexture=textureLoader.load("texture/roof1.jpg");
    roofTexture.wrapS=THREE.RepeatWrapping;
    roofTexture.wrapT=THREE.RepeatWrapping;
    roofTexture.repeat.set(1,1);

    roofTexture2=textureLoader.load("texture/roof2.jpg");
    roofTexture2.wrapS=THREE.RepeatWrapping;
    roofTexture2.wrapT=THREE.RepeatWrapping;
    roofTexture2.repeat.set(1,1);

    grassTambleTexture=textureLoader.load("texture/grasstamble.jpg");
    grassTambleTexture.wrapT=THREE.RepeatWrapping;
    grassTambleTexture.wrapS=THREE.RepeatWrapping;
    grassTambleTexture.repeat.set(5,1);

    stonefloorTexture=textureLoader.load("texture/stonefloor.jpg");
    stonefloorTexture.wrapS=THREE.RepeatWrapping;
    stonefloorTexture.wrapT=THREE.RepeatWrapping;
    stonefloorTexture.repeat.set(5,5);




    var i;
    
    


    Ground = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100, 200, 200),
        new THREE.MeshPhongMaterial(
            {
                color: 0xffffff,
                wireframe: false,
                map: grassTexture
            })
    );


    Ground.rotation.x -= Math.PI / 2;  // 평면으로 만들기   
    Ground.receiveShadow = true;
    scene.add(Ground);

    drawRoad();

    
    

    //building 
    var j;
    var height;
    for (i = 0; i < 10; i++) {
        for(j=0;j<10;j++){
            height=getRndInteger(8,25);
            if(height%3==0)
                buildings.push(building1(height));
            else if(height%3==1)
                buildings.push(building2(height));
            else
                buildings.push(building3(height));
            buildings[10*i+j].position.set(-5-4.5*j,height/2,7+ 4*i);
            if(height%3==0)
                roof=makeRoof1();
            else if(height%3==1)
                roof=makeRoof2();
            else
                roof=makeRoof3();
            roof.position.set(-5-4.5*j,height+0.05,7+ 4*i)

            buildings[10*i+j].castShadow = true;
            buildings[10*i+j].receiveShadow = true;
            scene.add(buildings[10*i+j]);
            scene.add(roof);
            roof.castShadow=true;
            roof.receiveShadow=true;
        }
    }
    buildings=[];
    for (i = 0; i < 10; i++) {
        for(j=0;j<10;j++){
            height=getRndInteger(8,25);
            if(height%3==0)
                buildings.push(building1(height));
            else if(height%3==1)
                buildings.push(building2(height));
            else
                buildings.push(building3(height));
            buildings[10*i+j].position.set(-5-4.5*j,height/2,-7- 4*i);
            if(height%3==0)
                roof=makeRoof1();
            else if(height%3==1)
                roof=makeRoof2();
            else
                roof=makeRoof3();
            roof.position.set(-5-4.5*j,height+0.05,-7- 4*i);
            buildings[10*i+j].castShadow = true;
            buildings[10*i+j].receiveShadow = true;
            scene.add(buildings[10*i+j]);
            scene.add(roof);
            roof.castShadow=true;
            roof.receiveShadow=true;
        }
    }
    buildings=[];
    for (i = 0; i < 10; i++) {
        for(j=0;j<10;j++){
            height=getRndInteger(8,25);
            if(height%3==0)
                buildings.push(building1(height));
            else if(height%3==1)
                buildings.push(building2(height));
            else
                buildings.push(building3(height));
            buildings[10*i+j].position.set(5+4.5*j,height/2,7+ 4*i);
            if(height%3==0)
                roof=makeRoof1();
            else if(height%3==1)
                roof=makeRoof2();
            else
                roof=makeRoof3();
            roof.position.set(5+4.5*j,height+0.05,7+ 4*i);
            buildings[10*i+j].castShadow = true;
            buildings[10*i+j].receiveShadow = true;
            scene.add(buildings[10*i+j]);
            scene.add(roof);
            roof.castShadow=true;
            roof.receiveShadow=true;
        }
    }

    //빌딩 만들자



    //이건 앞에 상가
    var seed=0;
    for(i=0;i<16;i++){
        seed=getRndInteger(1,100);
        if(seed%3==0)
            B=makebuilding2(3,3,3);
        else if(seed%3==1)
            B=makebuilding3(3,3,3);
        else
            B=makebuilding4(3,3,3);
        B.receiveShadow=true;
        B.castShadow=true;
        B.position.set(-3.5-3*i,1.5,3.5);
        scene.add(B);
    }




    for(i=0;i<16;i++){
        seed=getRndInteger(1,100);
        if(seed%3==0)
            B=makebuilding2(3,3,3);
        else if(seed%3==1)
            B=makebuilding3(3,3,3);
        else
            B=makebuilding4(3,3,3);
        B.receiveShadow=true;
        B.castShadow=true;
        B.position.set(-3.5-3*i,1.5,-3.5);
        scene.add(B);
    }
    
   
    topGround = new THREE.Mesh(
        new THREE.PlaneGeometry(3, 48, 100, 100),
        new THREE.MeshPhongMaterial(
            {
                color: 0xffffff,
                wireframe: false,
                map: grassTexture2
            })
    );


    topGround.rotation.x -= Math.PI / 2;  // 평면으로 만들기   
    topGround.rotation.z-=Math.PI/2;
    topGround.position.set(-26,3.01,-3.5);
    topGround.receiveShadow = true;
    scene.add(topGround);

    topGround = new THREE.Mesh(
        new THREE.PlaneGeometry(3, 48, 100, 100),
        new THREE.MeshPhongMaterial(
            {
                color: 0xffffff,
                wireframe: false,
                map: grassTexture2
            })
    );
    topGround.rotation.x -= Math.PI / 2;  // 평면으로 만들기   
    topGround.rotation.z-=Math.PI/2;
    topGround.position.set(-26,3.01,3.5);
    topGround.receiveShadow = true;
    scene.add(topGround);


    wall=makeWall();
    wall.receiveShadow=true;
    wall.castShadow=true;
    wall.position.set(26,0.5,50);
    scene.add(wall);

    wall=makeWall();
    wall.receiveShadow=true;
    wall.castShadow=true;
    wall.position.set(-26,0.5,50);
    scene.add(wall);

    wall=makeWall();
    wall.receiveShadow=true;
    wall.castShadow=true;
    wall.position.set(26,0.5,-50);
    scene.add(wall);

    wall=makeWall();
    wall.receiveShadow=true;
    wall.castShadow=true;
    wall.position.set(-26,0.5,-50);
    scene.add(wall);


    wall=makeWall();
    wall.rotation.y-=Math.PI/2;
    wall.receiveShadow=true;
    wall.castShadow=true;
    wall.position.set(50,0.5,26);
    scene.add(wall);

    wall=makeWall();
    wall.rotation.y-=Math.PI/2;
    wall.receiveShadow=true;
    wall.castShadow=true;
    wall.position.set(50,0.5,-26);
    scene.add(wall);

    wall=makeWall();
    wall.rotation.y-=Math.PI/2;
    wall.receiveShadow=true;
    wall.castShadow=true;
    wall.position.set(-50,0.5,-26);
    scene.add(wall);

    wall=makeWall();
    wall.rotation.y-=Math.PI/2;
    wall.receiveShadow=true;
    wall.castShadow=true;
    wall.position.set(-50,0.5,26);
    scene.add(wall);
    
    







    
    for(i=0;i<11;i++){
        grassTamble(4*i+6,-2.0);
    }
    for(i=0;i<11;i++){
        grassTamble2(2.0,-4*i-6);
    }


    //1 먼저 나무를 넣어보자 4 와 소수로 겹치지 않도록
    for(i=0;i<23;i++){
        makeTotalTree(2*i+4,-4);
    }
    for(i=0;i<23;i++){
        makeTotalTree(2*i+4,-5);
    }
    for(i=0;i<23;i++){
        makeTotalTree(2*i+4,4);
    }


    //외부 1
    for(i=0;i<23;i++){
        makeTotalTree(2*i+4,46);
    }
    for(i=0;i<23;i++){
        makeTotalTree(2*i+4,47);
    }
    for(i=0;i<23;i++){
        makeTotalTree(-2*i-4,46);
    }
    for(i=0;i<23;i++){
        makeTotalTree(-2*i-4,47);
    }
    //외부 2
    for(i=0;i<23;i++){
        makeTotalTree(2*i+4,-47);
    }
    for(i=0;i<23;i++){
        makeTotalTree(2*i+4,-48);
    }
    for(i=0;i<23;i++){
        makeTotalTree(-2*i-4,-47);
    }
    for(i=0;i<23;i++){
        makeTotalTree(-2*i-4,-48);
    }


    //외부 3
    for(i=0;i<23;i++){
        makeTotalTree(47,-2*i-4);
        makeTotalTree(48,-2*i-4);
    }
    for(i=0;i<23;i++){
        makeTotalTree(48,2*i+4);
        makeTotalTree(49,2*i+4);
    }

    for(i=0;i<23;i++){
        makeTotalTree(-48,-2*i-4);
        makeTotalTree(-49,-2*i-4);
    }
    for(i=0;i<23;i++){
        makeTotalTree(-48,2*i+4);
        makeTotalTree(-49,2*i+4);
    }
    
    



    for(i=0;i<23;i++){
        makeTotalTree(4,-2*i-4);
    }
    for(i=0;i<23;i++){
        makeTotalTree(5,-2*i-4);
    }

    
    

    geo=new THREE.TetrahedronGeometry(1);
    mat=new THREE.MeshPhongMaterial(
        {
            color: 0xffffff,
            map: brickTexture2
        }
    )
    mesh=new THREE.Mesh(geo,mat);
    scene.add(mesh);
    mesh.position.set(27,1.55,-27);
    mesh.receiveShadow=true;
    mesh.castShadow=true;
    geo2=new THREE.BoxGeometry(1,1,1);
    mat2=new THREE.MeshPhongMaterial(
        {
            color:0xffffff,
            map:plasticTexture
        }
    )
    mesh2=new THREE.Mesh(geo2,mat2);
    scene.add(mesh2);
    mesh2.position.set(27,0.5,-27);
    mesh2.receiveShadow=true;
    mesh2.castShadow=true;


    //2 이제 가로등을 넣는다

    //먼저 메인로드쪽 가로등
    for(i=0;i<11;i++){
        makeLight(4*i+4,2,0);
    }
    for(i=0;i<11;i++){
        makeLight(4*i+4,-2,90);
    }


    //상가쪽 가로등
    for(i=0;i<11;i++){
        makeLight(-4*i-4,1.8,0);
    }
    for(i=0;i<11;i++){
        makeLight(-4*i-4,-1.8,90);
    }

    //옆에 가로등
    for(i=0;i<11;i++){
        makeLight2(1.8,-4*i-4,0);
    }

    for(i=0;i<11;i++){
        makeLight2(1.8,4*i+4,0);
    }
    for(i=0;i<11;i++){
        makeLight2(-1.8,-4*i-4,90);
    }

    for(i=0;i<11;i++){
        makeLight2(-1.8,4*i+4,90);
    }



    ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    camera.position.set(0, looker.height, -5);
    camera.lookAt(new THREE.Vector3(0, looker.height, 0));

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(1280, 720);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;//THREE.BasicShadowMap;
    renderer.shadowMapCullFace = THREE.CullFaceBack;






    var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.05);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 500, 0);
    scene.add(hemiLight);

    // this is the Sun
    dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.color.setHSL(0.1, 1, 0.95);
    dirLight.position.set(-1, 0.75, 1);
    dirLight.position.multiplyScalar(50);
    scene.add(dirLight);

    dirLight.castShadow = true;
    dirLight.shadowMapWidth = dirLight.shadowMapHeight = 512 * 2;




    
    var d = 50;

    dirLight.shadowCameraLeft = -d-20;
    dirLight.shadowCameraRight = d+20;
    dirLight.shadowCameraTop = d;
    dirLight.shadowCameraBottom = -d;

    // the magic is here - this needs to be tweaked if you change dimensions

    dirLight.shadowCameraFar = 3500;
    dirLight.shadowBias = -0.000001;
    dirLight.shadowDarkness = 0.35;
    
    
    scene.add(dirLight);

   
    for(i=0;i<11;i++){
        Streetlight.push(new THREE.PointLight( 0xffff00, 1, 5 ));
        Streetlightx.push(4+4*i);
        Streetlighty.push(1);
        Streetlightz.push(1.8);
        scene.add(Streetlight[i]);
        Streetlight[i].position.set(Streetlightx[i],Streetlighty[i],Streetlightz[i]);
        
    }

    
    for(i=11;i<22;i++){
        Streetlight.push(new THREE.PointLight( 0xffff00, 1, 5 ));
        Streetlightx.push(1.8);
        Streetlighty.push(1);
        Streetlightz.push(4+4*(i-11));
        scene.add(Streetlight[i]);
        Streetlight[i].position.set(Streetlightx[i],Streetlighty[i],Streetlightz[i]);
    }
    for(i=22;i<33;i++){
        Streetlight.push(new THREE.PointLight( 0xffff00, 1, 5 ));
        Streetlightx.push(1.8);
        Streetlighty.push(1);
        Streetlightz.push(-4-4*(i-22));
        scene.add(Streetlight[i]);
        Streetlight[i].position.set(Streetlightx[i],Streetlighty[i],Streetlightz[i]);
    }

    for(i=33;i<44;i++){
        Streetlight.push(new THREE.PointLight( 0xffff00, 1, 5 ));
        Streetlightx.push(4+4*(i-33));
        Streetlighty.push(1);
        Streetlightz.push(-1.8);
        scene.add(Streetlight[i]);
        Streetlight[i].position.set(Streetlightx[i],Streetlighty[i],Streetlightz[i]);
    }





    //상가쪽  makeLight(-4*i-4,1.8,0);
    for(i=44;i<55;i++){
        Streetlight.push(new THREE.PointLight( 0xffff00, 1, 5 ));
        Streetlightx.push(-4-4*(i-44));
        Streetlighty.push(1);
        Streetlightz.push(1.5);
        scene.add(Streetlight[i]);
        Streetlight[i].position.set(Streetlightx[i],Streetlighty[i],Streetlightz[i]);
    }

    for(i=55;i<66;i++){
        Streetlight.push(new THREE.PointLight( 0xffff00, 1, 5 ));
        Streetlightx.push(-4-4*(i-55));
        Streetlighty.push(1);
        Streetlightz.push(-1.5);
        scene.add(Streetlight[i]);
        Streetlight[i].position.set(Streetlightx[i],Streetlighty[i],Streetlightz[i]);
    }


    for(i=66;i<77;i++){
        Streetlight.push(new THREE.PointLight( 0xffff00, 1, 5 ));
        Streetlightx.push(-1.8);
        Streetlighty.push(1);
        Streetlightz.push(-4-4*(i-66));
        scene.add(Streetlight[i]);
        Streetlight[i].position.set(Streetlightx[i],Streetlighty[i],Streetlightz[i]);
    }
    for(i=77;i<88;i++){
        Streetlight.push(new THREE.PointLight( 0xffff00, 1, 5 ));
        Streetlightx.push(-1.8);
        Streetlighty.push(1);
        Streetlightz.push(4+4*(i-77));
        scene.add(Streetlight[i]);
        Streetlight[i].position.set(Streetlightx[i],Streetlighty[i],Streetlightz[i]);
    }

   


    for(i=0;i<20;i=i+4){
        makeCircle(i+1,i+3,27,-27);
    }

    rockTexture=textureLoader.load("texture/rock.jpg");
    rockTexture.wrapS=THREE.RepeatWrapping;
    rockTexture.wrapT=THREE.RepeatWrapping;
    rockTexture.repeat.set(1,3);
    
    for(i=0;i<12;i++){
        geo=new THREE.BoxGeometry(1,i+1,1);
        mat=new THREE.MeshPhongMaterial(
            {
                color:0xffffff,
                map: rockTexture

            }
        )
        mesh=new THREE.Mesh(geo,mat);
        scene.add(mesh);
        mesh.position.set(27+16*Math.cos(30*i/180*Math.PI),0.5*i+0.5,-27+16*Math.sin(30*i/180*Math.PI));
        mesh.castShadow=true;
        mesh.receiveShadow=true;
    }

    var loader = new THREE.FontLoader();

    loader.load( 'helvetiker_regular.typeface.json', function ( font ) {

        var geometry = new THREE.TextGeometry( 'CITY PARK', {
            font: font,
            size: 1,
            height: 0.1,
            
        } );

        var mat=new THREE.MeshPhongMaterial(
            {
                color:0xff0000,
                map:brickTexture2
            }
        )

        var mesh=new THREE.Mesh(geometry,mat);
        scene.add(mesh);
        mesh.position.set(10,0.2,-3);
        mesh.castShadow=true;
        mesh.receiveShadow=true;

    } );
    SignGeo=new THREE.BoxGeometry(7,0.2,0.2);
    material=new THREE.MeshPhongMaterial(
        {
            color:0xffffff,
            map:plasticTexture
        }
    )
    
    mesh=new THREE.Mesh(SignGeo,material);
    scene.add(mesh);
    mesh.position.set(13.5,0.1,-3);
    mesh.receiveShadow=true;
    mesh.castShadow=true;

    
    





    scene.fog = new THREE.Fog(0x222233, 0, 20000);
    renderer.setClearColor(scene.fog.color, 1);
    

    document.body.appendChild(renderer.domElement);
    var controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.update();
    
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    if(isSpinning==1 ){
        dirLight.position.set(100*Math.cos(seta),50,100*Math.sin(seta));
        seta+=0.05;
        if(Animeupdate==false){
            for(i=0;i<numOfLights;i++){
                Streetlight[i].position.set(0,-10,0);
            }
            Animeupdate=true;
        }
    }
    
    
    if (keyboard[87]) {//w
        camera.position.x -= Math.sin(camera.rotation.y) * looker.speed;
        camera.position.z -= -Math.cos(camera.rotation.y) * looker.speed;
    }
    if (keyboard[83]) {//s
        camera.position.x += Math.sin(camera.rotation.y) * looker.speed;
        camera.position.z += -Math.cos(camera.rotation.y) * looker.speed;
    }
    if (keyboard[65]) {//a
        camera.position.x += Math.sin(camera.rotation.y + Math.PI / 2) * looker.speed;
        camera.position.z += -Math.cos(camera.rotation.y + Math.PI / 2) * looker.speed;
    }
    if (keyboard[68]) {//d
        camera.position.x += Math.sin(camera.rotation.y - Math.PI / 2) * looker.speed;
        camera.position.z += -Math.cos(camera.rotation.y - Math.PI / 2) * looker.speed;
    }
    if(keyboard[78]){
        isSpinning=1;
        
        for(i=0;i<numOfLights;i++){
            Streetlight[i].position.set(0,-10,0);
        }
    }
    if(keyboard[77]){
        isSpinning=0;
        dirLight.position.set(0,-50,0);
        for(i=0;i<numOfLights;i++){
            Streetlight[i].position.set(Streetlightx[i],Streetlighty[i],Streetlightz[i]);
        }

    }
    if (keyboard[37]) {
        camera.rotation.y -= looker.turnspeed;
    }
    if (keyboard[39]) {
        camera.rotation.y += looker.turnspeed;
    }

    
    renderer.render(scene, camera);
    
}

function keyDown(event) {
    keyboard[event.keyCode] = true;
}

function keyUp(event) {
    keyboard[event.keyCode] = false;
}
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

window.onload = init;