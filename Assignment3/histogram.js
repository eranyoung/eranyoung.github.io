function preload() { 
    table = loadTable("https://gist.githubusercontent.com/eranyoung/556aab573f01d601e3222169916b2d1d/raw/b0b824b6a0c8be735ec6a4d11969cb6588f0d505/twitchdata-update(cleaned).csv", "csv", "header");
    process();
}

var data = [[]];
var processedData = [[]];

function process() { 
    let maxStreamTime = 550000;
    let bins = 10;
    //text("Processing", 0, 10);
    for(let i = 0; i < table.getRowCount(); i++) {
        data[i] = [table.getNum(i, 2), table.getNum(i, 4)];
    }
    data.sort(function(a,b) {
        return a[0]-b[0];
    });
}

function getAvgOfNums(num1, num2) { 
    let sum = 0, count = 0;
    for(let i = 0; i < data.length ; i++) { 
        if(data[i][0] > num1 && data[i][0] < num2) { 
            sum += data[i][1];
            count++;
        }
    }
    return sum/count;
}

function setup() { 
    createCanvas(1350, 550);
    numberOfRows = table.getRowCount();
    numberOfColumns = table.getColumnCount();
}

let pageHeight = 550;
let pageWidth = 1350;

function draw() { 
    //background(220, 255, 255);
    process();
    text(data, 0, 20);
    text(getAvgOfNums(0, 5500), 0, 10);

    background(220);
    fill(0);

    let bottomRow = "";
    fill(0,0,0);
    line(80, 10, 80, pageHeight - 10);
    line(50, pageHeight - 50, 1300, pageHeight - 50);
    
    let max = 18300;

    max = Math.ceil(max / 100) * 100;
    sub = max/6;
    textSize(12);

    for(let n = 1; n <= 6; n++) { 
        line(70, n*75, 90, n*75);
        fill(60, 60, 60)
        line(70, n*75, 1300, n*75);
        fill(0, 0, 0);
        text(max, 50, n * 75 + 3);
        max-=sub;
    }

    let ppt = (pageHeight - 110) / 19500;

    let c = 80;
    let binSize = 550000/20;
    let currBinSize = 0;
    textSize(14);
    for(let i = 0; i < 20; i++) { 
        c+=60;
        line(c, pageHeight - 60, c, pageHeight - 40);
        fill(130, 50, 255);
        textAlign(CENTER);
        textSize(10);
        text((currBinSize+binSize), c, pageHeight - 28);
        let rate = Math.round(getAvgOfNums(currBinSize, currBinSize + binSize));
        fill(168, 50, 50);
        rectMode(CORNERS);
        rect(c-60, pageHeight-50-(rate*ppt), c, pageHeight-50);
        currBinSize += binSize;
    }

    text("0", 40, pageHeight - 46);
    textSize(20);
    fill(130, 50, 255);
    text("Hours Streamed", 700, pageHeight - 5);
    fill(168, 50, 50);
    rotate(radians(270));
    text("Average Viewers", -300, 20);

}