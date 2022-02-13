function preload() { 
    table = loadTable("https://gist.githubusercontent.com/eranyoung/556aab573f01d601e3222169916b2d1d/raw/b0b824b6a0c8be735ec6a4d11969cb6588f0d505/twitchdata-update(cleaned).csv", "csv", "header");
    process();
}

var data = [[]];

function process() { 
    //text("Processing", 0, 10);
    for(let i = 0; i < table.getRowCount()/10; i++) {
        data[i] = [table.getNum(i, 5), table.getNum(i, 1)];
    }
    data.sort(function(a,b) {
        return a[1]-b[1];
    });
}

let pageHeight = 550;

function setup() { 
    createCanvas(1000, 550);
    process();
    //text(data, 0, 20);
    //text(getAvgOfNums(0, 5500), 0, 10);

    background(220);
    fill(0);

    let bottomRow = "";
    fill(0,0,0);
    line(80, 10, 80, pageHeight - 10);
    line(50, pageHeight - 50, 1300, pageHeight - 50);
    
    let max = data[data.length-1][1];

    maxCopy = Math.ceil(max / 100) * 100;
    sub = Math.ceil(maxCopy/6);
    textSize(12);

    for(let n = 1; n <= 6; n++) { 
        line(70, n*75-10, 90, n*75-10);
        fill(60, 60, 60)
        line(70, n*75-10, 1300, n*75-10);
        fill(0, 0, 0);
        text(Math.round(maxCopy/60/24/365), 40, n * 75 - 7);
        maxCopy-=sub;
    }

    data.sort(function(a,b) {
        return a[0]-b[0];
    });

    let ppt = max / (pageHeight - 115);

    let c = 80;
    let binSize = Math.ceil(data[data.length-1][0])/7;
    let currBinSize = 0;
    textSize(14);
    let b = 0;
    for(let i = 0; i < 7; i++) { 
        c+=120;
        line(c, pageHeight - 60, c, pageHeight - 40);
        fill(130, 50, 255);
        textAlign(CENTER);
        textSize(10);
        text(Math.round(currBinSize+1) + " - " + Math.round((currBinSize+binSize)), c, pageHeight - 28);
        while(data[b][0] < currBinSize+binSize) { 
            circle(random(c-20, c+20), pageHeight - 50 - (data[b][1]/ppt), 5);
            b++;
        }
        currBinSize += binSize;
    }

    text("0", 40, pageHeight - 46);
    textSize(20);
    fill(130, 50, 255);
    text("Followers", 550, pageHeight - 5);
    fill(168, 50, 50);
    rotate(radians(270));
    text("Watch Time(Years)", -300, 20);

}