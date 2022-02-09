function preload() { 
    table = loadTable("https://gist.githubusercontent.com/eranyoung/4dbf6e3d7744ee9326b896ffb5a82c9c/raw/bfce11e3a4f59aa64d49c77e081c848de3065ece/cancer(ageRate).csv", "csv", "header");
}

function setup() { 
    createCanvas(500, 825);
    numberOfRows = table.getRowCount();
    numberOfColumns = table.getColumnCount();
}

function draw() { 

    background(220);
    fill(0);

    let max = 1061;

    for(let r = 0; r < 10; r++) { 
        let state = table.getString(r, 0);
        textAlign(RIGHT);
        fill(0, 0, 0);
        textSize(13)
        text(state, 160, r * 75 + 60);
        for(let c = 0; c < 4; c++) { 
            let value = table.getNum(r, c+1);
            textAlign(LEFT);
            let rgb = getValueBetweenYellowRed(value/max);
            fill(rgb[0], rgb[1] , rgb[2]);
            rect(c * 75+ 170, r * 75 + 7, 75, 75);
            fill(0,0,0);
            //text("Red: " + rgb[0] + "\nGreen: " + rgb[1] + "\nBlue: " + rgb[2], c * 120 + 140, r * 120 + 30);
            if(r == 9) { 
                let cName = table.columns[c+1];
                let columnName = cName.substring(10, cName.length);
                textAlign(CENTER);
                text(columnName, c*75+ 210, r*75+95);
            }
        }
    }

    textSize(17)
    text("Age", 310, 800);
    rotate(radians(270));
    text("State", -400, 30);
}

function getValueBetweenYellowRed(value)
{
  let aR = 222, aG = 255, aB=0; 
  let bR = 255, bG = 0, bB=0;    
  
  red   = (float)(bR - aR) * value + aR;
  green = (float)(bG - aG) * value + aG;     
  blue  = (float)(bB - aB) * value + aB;    

  return [red, green, blue];
}