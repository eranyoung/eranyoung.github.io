function preload() { 
    table = loadTable("https://gist.githubusercontent.com/eranyoung/005b9e97f2e847a5a534184b75c68877/raw/036c1998c0213b5d7184568ad295cd4326048ea9/aids(cleaned).csv", "csv", "header");
}
let pageHeight = 550;
let pageWidth = 1000;

function setup() { 
    createCanvas(pageWidth, pageHeight);
    background(220);

    let max = 0;
    for(let d = 0; d < 90 * 6; d++) { 
        if(table.getNum(d, 1) > max) { 
            max = table.getNum(d, 1);
        }
    }

    fill(0,0,0);
    line(80, 10, 80, pageHeight - 10);
    line(50, pageHeight - 50, 1300, pageHeight - 50);

    maxCopy = Math.ceil(max / 100) * 100;
    sub = Math.ceil(maxCopy/6);
    textSize(12);

    for(let n = 1; n <= 6; n++) { 
        line(70, n*75-10, 90, n*75-10);
        fill(60, 60, 60)
        line(70, n*75-10, 1300, n*75-10);
        fill(0, 0, 0);
        text(Math.round(maxCopy), 30, n * 75 - 7);
        maxCopy-=sub;
    }

    let ppt = max / (pageHeight - 115);

    let c = 80;
    textSize(14);
    let b = 0;
    for(let i = 0; i < 6; i++) { 
        c+=120;
        line(c, pageHeight - 60, c, pageHeight - 40);
        fill(130, 50, 255);
        textAlign(CENTER);
        textSize(10);
        text(1990+i, c, pageHeight - 28);
        for(let m = i * 90; m < i * 90 + 90; m++) { 
            circle(random(c-20, c+20), pageHeight - 50 - (table.getNum(m, 1) / ppt), 10);
        }
    }

    fill(0,0,0);
    textSize(12);
    text("0", 40, pageHeight - 46);
    textSize(20);
    textAlign(CENTER);
    fill(0,0,0);
    text("AIDS Death Rate Distribution from 1990 - 1995", pageWidth/2, 20);
    fill(130, 50, 255);
    text("Year", pageWidth/2, pageHeight - 5);
    fill(168, 50, 50);
    rotate(radians(270));
    text("AIDS Death Rate", -300, 20);
}