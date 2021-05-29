// global variables
var colleges_DOM;
var colleges;
var arms;
var arm;
var give_up;
var tries;
var wrongs;
var solutions;
var time;
var start;
var end;

function fileName(collegeName){
    return collegeName.replace(' ','').replace(' ','').replace('.','').replace("'","");
}
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
function init(){
    // colleges arms names & filename
    colleges = ['All Souls', 'Balliol', 'Blackfriars Hall', 'Brasenose', 'Campion Hall', 'Christ Church', 
    'Corpus Christi', 'Exeter', 'Green Templeton', 'Harris Manchester', 'Hertford', 'Jesus', 'Keble', 
    'Kellogg', 'LadyMargaretHall', 'Linacre', 'Lincoln', 'Magdalen', 'Mansfield', 'Merton', 'New College', 
    'Nuffield', 'Oriel', 'Pembroke', "Queen's", "Regent's Park", 'Reuben', 'Somerville', "St. Anne's", 
    "St. Antony's", "St. Benet's Hall", "St. Catherine's", 'St. Cross', 'St. Edmund Hall', "St. Hilda's", 
    "St. Hugh's", "St. John's", "St. Peter's", "St. Stephen's House", 'Trinity', 'University', 'Wadham', 
    'Wolfson', 'Worcester', 'Wycliffe Hall'];

    // global variables
    colleges_DOM = document.getElementById("colleges").children;
    arm = document.getElementById("arm");
    give_up = document.getElementById("give_up");
    tries = 0;
    wrongs = 0;
    solutions = 0;
    time = 0;
    start = Date.now();

    //click listeners
    for(var i=0; i<colleges_DOM.length; i++){
        var element = colleges_DOM[i];
        element.addEventListener("click", function(e){
            noFrame()
            e.target.style.borderColor = "black";
            var selected = e.target.innerText
            //console.log(selected)
            if(fileName(selected)==arm.getAttribute("src").split('/')[1].split('.')[0]){
                //console.log('right')
                e.target.style.borderColor = "green";
                if(tries===0 || true){
                    const index = colleges.indexOf(selected);
                    colleges.splice(index, 1);
                }
                setTimeout(drawCollege, 1000);
            }
            else{
                //console.log('wrong')
                e.target.style.borderColor = "red";
                tries += 1;
                wrongs += 1;
            }
        });
    }

    //draw first
    drawCollege();
    document.getElementById("give_up").addEventListener("click", giveUp);
}



// main engine
function drawCollege(){
    noFrame()
    if(colleges.length===0){
        if(time===0){
            end = Date.now();
            time = end-start;
            document.getElementById("results_total").textContent = "Total Colleges Arms: 47";
            document.getElementById("results_wrong").textContent = "Wrong Tries: " + wrongs;
            document.getElementById("results_given_up").textContent = "Given Up: " + solutions;
            document.getElementById("results_time").textContent = "Time: " + time/1000 + "s";
            document.getElementById("results").style.display = "flex";
            document.getElementById("give_up").onclick = "";
        }
    }
    else{
        arm.src = "CollegeArms/"+fileName(colleges[Math.floor(Math.random() * colleges.length)])+".png";
        tries = 0;
    }
}
function noFrame(){
    for(var i=0; i<colleges_DOM.length; i++){
        var element = colleges_DOM[i];
        element.style.borderColor = "white";
    }
}
function giveUp(){
    for(var i=0; i<colleges_DOM.length; i++){
        var element = colleges_DOM[i];
        var selected = element.innerText
        if(fileName(selected)==arm.getAttribute("src").split('/')[1].split('.')[0]){
            element.style.borderColor = "black";
            element.scrollIntoView();
            const index = colleges.indexOf(selected);
            colleges.splice(index, 1);
            solutions += 1;
        }
        else{
            element.style.borderColor = "white";
        }
    }
    setTimeout(drawCollege, 1000);
}
function playAgain(){
    document.getElementById("results").style.display = "none";
    init();
}
function backToMenu(){
    window.location.replace("index.html");
}
//init
init();
