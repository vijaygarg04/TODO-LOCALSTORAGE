window.onload=function(){
    window.add=this.document.getElementById('add');
    window.deletebtn=this.document.getElementById('delete');
    window.sort=this.document.getElementById('sort');
    window.list=this.document.getElementById('list');
    window.input=this.document.getElementById('input');
    var array=[];
    function giveli(task){
        
        let li=document.createElement('li');
        let div1=document.createElement('div');
        div1.className="item border-success rounded";
        let div2=document.createElement('div');
        div2.className="input-group mb-3 lis";
        div1.appendChild(div2);
        let div3=document.createElement('div');
        div3.className="input-group-prepend";
        div2.appendChild(div3);
        let div4=document.createElement('div');
        div4.className="input-group-text div4";
        div3.appendChild(div4);
        let chkbx=document.createElement('input');
        chkbx.setAttribute('type','checkbox');
        chkbx.className="chkbx";
        div4.appendChild(chkbx);

        let span=document.createElement('span');
        span.className="form-control";
        span.innerText=task;
        div2.appendChild(span);
        
        let div5=document.createElement('div');
        div5.className="updowndiv";

        let btnup=document.createElement('button');
        btnup.className="btn btn-info btn-md";
        let iup=document.createElement('i');
        iup.setAttribute('class','fas fa-arrow-up');
        btnup.appendChild(iup);
        btnup.innerHTML=btnup.innerHTML+"MOVE UP";
        div5.appendChild(btnup);
        
        let btndown=document.createElement('button');
        btndown.className="btn btn-success btn-md"
        let idown=document.createElement('i');
        idown.setAttribute('class','fas fa-arrow-down');
        btndown.appendChild(idown);
        btndown.innerHTML=btndown.innerHTML+"MOVE DOWN";
        div5.appendChild(btndown);
        div1.appendChild(div5);
        li.appendChild(div1);

        chkbx.onchange=function(event){
            if(chkbx.checked===true){
                span.style.textDecoration='line-through';
                span.className="form-control setcolor";
            }else{

                span.style.textDecoration='none';
                span.className="form-control";
            }
        };


        btnup.onclick=function(){
            let liprevious=li.previousSibling;
            if (liprevious ) {
                var idx=array.indexOf(liprevious);
                if(idx===0){
                    liprevious.children[0].children[1].children[0].style.display="inline";
                    li.children[0].children[1].children[0].style.display="none";
                }
                if(idx===array.length-2){
                    liprevious.children[0].children[1].children[1].style.display="none";
                    li.children[0].children[1].children[1].style.display="inline";
                }
                console.log(idx);
                li.parentNode.insertBefore(li, liprevious);
                swap(li,liprevious);
            }
        };

        
        btndown.onclick=function(){
            let linext=li.nextSibling;
            if (linext ) {
                var idx=array.indexOf(linext);
                if(idx===1){
                    linext.children[0].children[1].children[0].style.display="none";
                    li.children[0].children[1].children[0].style.display="inline";
                }
                if(idx===array.length-1){
                    linext.children[0].children[1].children[1].style.display="inline";
                    li.children[0].children[1].children[1].style.display="none";
                }
                console.log(idx);
                li.parentNode.insertBefore(li, linext);
                swap(li,linext);
            }

            
            if (li.nextSibling ) {
                li.parentNode.insertBefore(li.nextSibling,li);
            }
        };



        return li;

    }
deletebtn.onclick=function(){
    sortstrike();
    console.log(array);
    while(array.length>0 && array[array.length-1].children[0].checked){
        console.log(array[array.length-1])
        array.pop();
    }
    createfreshdata();
    updatebuttons();
}

    add.onclick=function(){
        addnewelement();
    };
    input.onkeypress=function (event){
        if (event.keyCode == 13 || event.which == 13){
            addnewelement();
        }
    }
    function addnewelement(){
        var task=input.value;
        if(task.length<=0){
            return ;
        }
        var liref=giveli(task);
        array.push(liref);
        updatebuttons();
        list.appendChild(liref);
        input.value="";
    }
    

    sort.onclick=function(){
        
        if(array.length<=0){
            return;
        }
        sortstrike();
    };
    function sortstrike(){
        var strikea=[];
        var nstrikea=[];
        array[0].children[0].children[1].children[0].style.display="inline";
        array[array.length-1].children[0].children[1].children[1].style.display="inline";
        console.log(array[0].children[0].children[0].children[0].children[0].children[0]);
        for(var i=0;i<array.length;i++){
            
            if(array[i].children[0].children[0].children[0].children[0].children[0].checked===true){
                console.log(i);
                strikea.push(array[i]);
            }else{
                nstrikea.push(array[i]);
            }
        }
        console.log(strikea.length);
        console.log(nstrikea.length);
        array=[];
        for(var j=0;j<nstrikea.length;j++){
            array.push(nstrikea[j]);
            
        }
        for(var k=0;k<strikea.length;k++){
            array.push(strikea[k]);
        }
        console.log(array);
        createfreshdata();
        updatebuttons();

    }
    function createfreshdata(){
        while (list.hasChildNodes()) {   
            list.removeChild(list.firstChild);
        }
        for(var m=0;m<array.length;m++){
            list.appendChild(array[m]);
        }
    }

    function updatebuttons(){
        let lilast=array[array.length-1];
        let lifirst=array[0];
        
        if(array.length>=2){
            let liseclast=array[array.length-2];
            let upbtn=liseclast.children[0].children[1].children[0];
            let downbtn=liseclast.children[0].children[1].children[1];
             upbtn.style.display="inline";
             downbtn.style.display="inline";

        }
        
         lifirst.children[0].children[1].children[0].style.display="none";
         lilast.children[0].children[1].children[1].style.display="none";

    }

    function swap(li1,li2){
        var temp=li2;
        var idx1=array.indexOf(li1);
        var idx2=array.indexOf(li2);
        array[idx2]=li1;
        array[idx1]=temp;
    }


};