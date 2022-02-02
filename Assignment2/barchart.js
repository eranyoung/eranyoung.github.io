function preload() { 
    table = loadTable("https://corgis-edu.github.io/corgis/datasets/csv/cancer/cancer.csv", "csv", "header");
}

function setup() { 
    createCanvas(2100, 700);
    numberOfRows = table.getRowCount();
    numberOfColumns = table.getColumnCount();
}

function draw() { 
    
    /*w = windowWidth, h = windowHeight;

    rect(w - (w - 20), h - (h - 20),
    w - 50, h - 50);*/

    background(220);
    fill(0);

    let bottomRow = "";
    line(50, 10, 50, 690);
    line(10, 650, 2090, 650);
    
    let max = 0;

    let c = 50;
    textSize(14);
    for(let i = 0; i < numberOfRows; i++) { 
        c+=40;
        line(c, 640, c, 660);
        fill(52, 50, 168);
        textAlign(CENTER);
        text(table.getString(i, 0).substring(0,2).toUpperCase(), c, 680);
        let rate = table.getNum(i, 1);
        fill(168, 50, 50);
        rect(c-10, rate, 20, 650-rate);
        if(rate > max) { 
            max = rate;
        }
    }

    max = Math.round(max / 100) * 100;
    for(let n = 1; n < 20; n++) { 
        line(40, n*33, 60, n*33);
        text(max, 20, n * 33 + 3)
        max-=15;
    }
}