function preload() { 
    table = loadTable("https://gist.githubusercontent.com/eranyoung/556aab573f01d601e3222169916b2d1d/raw/b0b824b6a0c8be735ec6a4d11969cb6588f0d505/twitchdata-update(cleaned).csv", "csv", "header");
    process();
}

var data = [];
var min, max, median, upperq, lowerq;

function process() { 
    for(let i = 0; i < table.getRowCount()/10; i++) {
        data[i] = table.getNum(i, 3);
    }
    data.sort(function(a,b) {
        return a-b;
    });
    min = data[0];
    max = data[data.length - 1];
    if(data.length % 2 == 0) { 
        median = data[data.length/2];
    } else { 
        var mid = data.length/2;
        median = ( data[mid] + data[mid - 1] ) / 2;
    }
    upperq = (max - median) / 2;
    lowerq = (median - min) / 2;
}

let pageHeight = 550;
let pageWidth = 375;

function setup() { 
    createCanvas(pageWidth, pageHeight);
    numberOfRows = table.getRowCount();
    numberOfColumns = table.getColumnCount();
}

function draw() { 
    //background(220, 255, 255);
    process();

    background(220);
    fill(0);

    let bottomRow = "";
    fill(0,0,0);
    line(80, 10, 80, pageHeight - 10);
    line(50, pageHeight - 50, 350, pageHeight - 50);
    

    maxCopy = Math.ceil(max / 100) * 100;
    sub = Math.ceil(max/6);
    textSize(12);
    for(let n = 1; n <= 6; n++) { 
        line(70, n*75-10, 90, n*75-10);
        fill(60, 60, 60)
        fill(0, 0, 0);
        text(maxCopy, 47, n * 75 - 7);
        maxCopy-=sub;
    }

    let npp = max / (pageHeight - 115);

    line(180, pageHeight - 50 - (min/npp), 220, pageHeight - 50 - (min/npp))
    line(180, pageHeight - 50 - (max/npp), 220, pageHeight - 50 - (max/npp));
    fill(255, 255, 255);
    rectMode(CORNERS);
    rect(140, pageHeight - 50 - (upperq/npp), 260,  pageHeight - 50 - (lowerq/npp));
    fill(0, 0, 0)
    line(140, pageHeight - 50 - (median/npp), 260, pageHeight - 50 - (median/npp));
    line(200, pageHeight - 50 - (max/npp), 200, pageHeight - 50 - (upperq/npp));
    line(200, pageHeight - 50 - (min/npp), 200, pageHeight - 50 - (lowerq/npp));
    textSize(18);

    fill(0,0,0);
    textSize(12);
    text("0", 40, pageHeight - 46);
    textSize(20);
    textAlign(CENTER);
    fill(0,0,0);
    text("Peak Viewers of the \nTop 100 Twitch Streamers", pageWidth/2 + 20, pageHeight-30);
    fill(168, 50, 50);
    rotate(radians(270));
    text("Peak Viewers", -300, 20);


}