function preload() { 
    table = loadTable("https://gist.githubusercontent.com/eranyoung/4734b5f9296c092c253fc1d07e2f8e8a/raw/da087803f3b107ad2357958cd47cb28d71ab81db/cancer(fullSheet)", "csv", "header");
}

function setup() { 
    createCanvas(2200, 550);
    numberOfRows = table.getRowCount();
    numberOfColumns = table.getColumnCount();
}

let pageHeight = 550;

function draw() { 

    background(220);
    fill(0);

    let bottomRow = "";
    line(80, 10, 80, pageHeight - 10);
    line(50, pageHeight - 50, 2140, pageHeight - 50);
    
    let max = 0;

    let ppt = (pageHeight - 110) / 300;

    let c = 80;
    textSize(14);
    for(let i = 0; i < numberOfRows; i++) { 
        c+=40;
        line(c, pageHeight - 60, c, pageHeight - 40);
        fill(52, 50, 168);
        textAlign(CENTER);
        text(table.getString(i, 0).substring(0,2).toUpperCase(), c, pageHeight - 20);
        let rate = table.getNum(i, 1);
        fill(168, 50, 50);
        rectMode(CORNERS);
        let circleHeight = Math.round((pageHeight-50-(rate*ppt))/50) * 50;
        for(let p = Math.round(circleHeight/75)*75; p < pageHeight-50; p+=75) {
            circle(c, p, 20, 20); 
        }
        if(rate > max) { 
            max = rate;
        }
    }

    max = Math.round(max / 100) * 100;
    for(let n = 1; n <= 6; n++) { 
        line(70, n*75, 90, n*75);
        text(max, 55, n * 75 + 3);
        max-=50;
    }

    text("0", 40, pageHeight - 46);
    textSize(20);
    fill(52, 50, 168);
    text("State", 1100, pageHeight - 5);
    fill(168, 50, 50);
    rotate(radians(270));
    text("Cancer Rate", -350, 20);
}