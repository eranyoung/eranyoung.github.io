function preload() { 
    table = loadTable("https://gist.githubusercontent.com/eranyoung/4d6c770200149722d348e1d967760c7c/raw/3ac0bd94cd0e5034dfa7ab358bfcf7b010bb2afa/cancer(rateonlyordered).csv", "csv", "header");
}

function setup() { 
    createCanvas(1150, 550);
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

    let c = 85;
    textSize(14);
    for(let i = 0; i < numberOfRows; i++) { 
        c+=20;
        line(c, pageHeight - 60, c, pageHeight - 40);
        fill(52, 50, 168);
        textAlign(CENTER);
        textSize(12);
        text(table.getString(i, 0).substring(0,2).toUpperCase(), c, pageHeight - 28);
        let rate = table.getNum(i, 1);
        fill(168, 50, 50);
        rectMode(CORNERS);
        rect(c-10, pageHeight-50-(rate*ppt), c+10, pageHeight-50);
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
    text("State", 550, pageHeight - 5);
    fill(168, 50, 50);
    rotate(radians(270));
    text("Cancer Rate", -350, 20);
}