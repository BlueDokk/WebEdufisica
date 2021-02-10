(function(global){ 

    // URI SNIPPETS
    var cont = {};
    var vid = {};
    var homeHtml = "snippets/home-snippet.html";
    var areaHtml = "snippets/area-snippet.html";
    var guiasHtml = "snippets/guias-snippet.html";
    var reglaHtml = "snippets/regla-snippet.html";
    var videosHtml = "snippets/videos-snippet.html";

    // INSET HTML
    var insertHtml = function(selector,html){
        let targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };

    //SHOW LOADING ICON
    var showLoading = function(selector){
        let html = "<div class='d-flex justify-content-center'>";
        html += "<div class='spinner-border' role='status'>";
        html += "<span class='visually-hidden'>Loading...<span><div></div>";
        insertHtml(selector,html);
    };

    document.addEventListener("DOMContentLoaded",function(){
        
        // HIDE MENU
        $("html").click(function(event){
            let screenWidth = window.innerWidth;
            if (screenWidth < 992) {
            $("#navbarSupportedContent").collapse('hide');
            }
        });
        
        //ACTIVE MENU
        (function(){
            const elementsMenu=['homeMenu','areaMenu','guiasMenu','reglaMenu','videosMenu'];
            for (let i=0;i < elementsMenu.length;i++){
                $(`#${elementsMenu[i]}`).click(function(event){
                    let activeMenu=document.getElementById(elementsMenu[i]);
                    for (let j=0;j < elementsMenu.length;j++){
                        document.getElementById(elementsMenu[j]).classList.remove('active');
                    }
                    activeMenu.classList.add('active');
                });
            }
        })();
        //HIDE AND SHOW COMMENTS FB
        $('#guiasMenu').click(function(){
            document.getElementById('fb').style.display = "block";
        });
        $('#homeMenu, #reglaMenu, #videosMenu, areaMenu').click(function(){
            document.getElementById('fb').style.display = "none";
        });
        
        // STOP VIDEO-MODAL
        var modal_video = function(modal,video,src_video){
            $(document).on('hide.bs.modal',modal,function(){
                $(video).attr('src',"");
            });
            $(document).on('show.bs.modal',modal,function(){
                $(video).attr('src',src_video);
            });
        };
        modal_video('#myModal','#video',"https://www.youtube.com/embed/mL6o4NKpfEk?autoplay=1&showinfo=0&modestbranding=1&rel=0");
        
        //FUNCTION HIDE ALL
        var hideAll = function(){
            const allSessions = ["601","602","701","702","801","802","901","902","1001","1002","1101","1102","Profe","Hist","Rut","Futbol","Baloncesto","Natacion"];
            for (let i=0;i < allSessions.length;i++){
                $("#collapseThree"+allSessions[i]).collapse('hide'); 
            }
        };
        document.querySelector('html').addEventListener('click',hideAll);
        
        // AJAX REQUEST HOME
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            homeHtml, 
            function(responseText){
                insertHtml('#main-content',responseText)
            },
        false);

        //TEXT-ANIMATION
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);

        // CHANGE VIDEO "RUTINAS"
        var videoTitle = document.getElementById('video-title');
        const nameVideo = ['ejer1','ejer2','ejer3','ejer4',
        'hist1','hist2','rut1','rut2','fut1','fut2','bal1','bal2',
        'bal3','nat1','nat2','nat3'];
        const videoTitles = ['Ejercicios en casa 1','Ejercicios en casa 2',
        'Ejercicios en casa 3','Ejercicios en casa 4', 'Historia del baloncesto',
        'Vida de Kobe Bryant','Rutina en casa','Rutina cardio','Jugadas del fútbol','Ejercicios técnica individual','Drible para principiantes',
        'Cómo driblar','Tipos de drible','Estilo libre','Estilo libre suave','Estilo mariposa'];
        const videoLinks = [
        'https://www.youtube.com/embed/gV1PVykyeJA',
        'https://www.youtube.com/embed/tuwCA9j3XT8',
        'https://www.youtube.com/embed/Zku4zJIxvcw',
        'https://www.youtube.com/embed/IIN2OGTESMY',
        'https://www.youtube.com/embed/6d3smqwR1Vk',
        'https://www.youtube.com/embed/xP4Fvg_0SSM',
        'https://www.youtube.com/embed/4CBgdHkmmdQ',
        'https://www.youtube.com/embed/iQ3g-gqKe_A',
        'https://www.youtube.com/embed/w0CJgti_7n8',
        'https://www.youtube.com/embed/S2sJSbZwwq4',
        'https://www.youtube.com/embed/pyBahhoU4EA',
        'https://www.youtube.com/embed/zuU_fw4TdK0',
        'https://www.youtube.com/embed/WObNwGZ6KDs',
        'https://www.youtube.com/embed/u5ZWVginAXQ',
        'https://www.youtube.com/embed/VQxykkE2t-g',
        'https://www.youtube.com/embed/YlhXuC25_L4'];
        
        for (let i=0;i< nameVideo.length;i++){
            vid[nameVideo[i]]=function(){
                $('#videos-rutinas').attr('src',videoLinks[i]);
                videoTitle = `VIDEO: ${videoTitles[i]}`;
                insertHtml('#video-title',videoTitle);
            };
        };
    });
    global.$cont = cont;
    global.$vid = vid;

    
    // LOAD "PLAN DE AREA"
    cont.loadArea = function () {
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
        areaHtml,
        function(responseText){
            insertHtml('#main-content',responseText)
        },
        false);
    };
    
    // LOAD "GUIAS Y ACTIVIDADES"
    cont.loadGuias = function () {
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
        guiasHtml,
        function(responseText){
            insertHtml('#main-content',responseText)
        },
        false);
    };
    
    // LOAD "REGLAMENTOS DEPORTIVOS"
    cont.loadRegla = function () {
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
        reglaHtml,
        function(responseText){
            insertHtml('#main-content',responseText)
        },
        false);
    };
    
    // LOAD "VIDEOS Y RUTINAS"
    cont.loadVideos = function () {
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
        videosHtml,
        function(responseText){
            insertHtml('#main-content',responseText);
        },
        false);
    };
})(window);

// TEXT ANIMATION JUMBOTRON
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};



