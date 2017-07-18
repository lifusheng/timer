

var ClockImg = React.createClass({
    render: function() {
        return <img src={"clock.png"} />;
    }
});

var Canvas = React.createClass({
    render: function() {
        return <canvas id="c13" width="300" height="300"></canvas>;
    }
});

var Container = React.createClass({
    getInitialState: function() {
        return {sec: 60};    //初始时间 60
    },
    getTimer: function(){
        $.get('/getTime', (result)=> {
            //console.log(result.time)
            var time = parseInt(result.time);
            if(!time){ throw new Error("server err!");}
            this.setState({sec: time});
        });
    },
    start: function(){
        var c13 = document.getElementById('c13');
        var ctx = c13.getContext('2d');

        //绘制圆形进度条
        var start = -90,end = -90;   //进度条的起始/终止角度
        var num = 60;   //倒计时数字
        var t = setInterval(()=>{
            //绘制灰色的背景圆环
            ctx.beginPath();
            ctx.arc(150,150,150,0, 2*Math.PI);
            ctx.lineWidth = 20;
            ctx.strokeStyle = '#00f';
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(150,150,150,start*Math.PI/180,end*Math.PI/180);
            ctx.strokeStyle = '#ff0';
            ctx.stroke();
            ctx.clearRect(90,90,160,160);

            ctx.fillStyle='#00f';
            ctx.textAlign="center";
            ctx.font="80px Arial";
            num<10? num='0'+num : '';
            ctx.fillText(num,155,170);
            end += 6;
            num -=1;
            if(end>270){
                console.log('倒计时完成，重新请求时间。。');
                this.getTimer();
                num = this.state.sec;
                end =-90;
                ctx.clearRect(0,0,300,300);

                //clearInterval(t);
            }
        }, 100);
    },

    componentDidMount: function() {
        this.start();
    },

    render: function(){
        return <div className="container">
            <ClockImg></ClockImg>
            <Canvas></Canvas>
        </div>
    }
});

ReactDOM.render(
    <Container></Container>,
    document.getElementById('exm')
);