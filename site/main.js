/*const func = (thing) => { console.log(`hello ${thing}`) }
    func('A')*/
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    
    let cpx = 0;
    let cpy = 0;
    let px = 0;
    let py = 0;

    // grid color #5e8138
    ctx.fillStyle = "#688d41";
    // ctx.fillStyle = "rgba(255, 255, 255, 0.5)"; example of transparency
    const img = new Image();
    img.onload = () => {
        ctx.drawImage(img, canvas.width/2, canvas.height/2);   
    };
    img.src = "player.png";
    
    window.addEventListener('keydown', (e) =>{
        if((e.key!=='a'&&e.key!=='d')||(e.key!=='w'&&e.key!=='s')){
            switch(e.key){
            case 'a':cpx=-1; break;
            case 'd':cpx=1; break;
            case 'w':cpy=-1; break;
            case 's':cpy=1; break;
            }
        }
    });

    window.addEventListener('keyup', (e) =>{
        if((e.key!=='a'&&e.key!=='d')||(e.key!=='w'&&e.key!=='s')){
            if(e.key==='a'||e.key==='d') cpx=0;
            if(e.key==='w'||e.key==='s') cpy=0;
        }
    });

    function reload(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        px+=cpx;
        py+=cpy;
        ctx.drawImage(img, px, py);
    }

    setInterval(reload, 10);