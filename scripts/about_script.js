const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");

let selectedIndex = 0;

const sales = {
    title: "Sales",
    quote: "The cake is a lie",
    x: {
        title: "Year 2019",
        data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
    },
    y: {
        title: "Number of Purchases",
        data: [0, 0, 1, 4, 2, 0, 1, 0, 0, 0, 8, 3]
    }
};

const casualities = {
    title: "\"Casualities\"",
    quote: "They don't ask how, they ask how many",
    x: {
        title: "Year 2019",
        data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
    },
    y: {
        title: "Number of Casualities",
        data: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0]
    }
};

const cakesLiedAbout = {
    title: "Cakes Lied About",
    quote: "The cake is a lie",
    x: {
        title: "Year 2019",
        data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
    },
    y: {
        title: "Number of Cakes",
        data: [0, 4, 1, 0, 0, 0, 3, 7, 4, 3, 2, 0]
    }
};


const charts = [sales, casualities, cakesLiedAbout];


const showData = data => {
    clearData();
    console.log(data);
    document.getElementById("graphTitle").innerHTML = data.title;
    document.getElementById("xaxisText").innerHTML = data.x.title;
    document.getElementById("yaxisText").innerHTML = data.y.title;

    let largestDataPoint = Math.max(...data.y.data) + 1;
    let heightOfUnity = Math.floor(canvas.height / largestDataPoint);
    let numOfDataPoints = data.y.data.length;
    let widthOfUnity = Math.floor(canvas.width / numOfDataPoints);
    let offset = 20;


    for (let i = 0; i < largestDataPoint; i++) {
        ctx.lineWidth = 1;
        ctx.moveTo(15, (heightOfUnity * i) - 1);
        ctx.lineTo(canvas.width - 10, (heightOfUnity * i) - 1);
        ctx.strokeStyle = "#CCC";
        ctx.stroke();

        ctx.fillStyle = "#000";
        ctx.fillText(largestDataPoint - i, 5, heightOfUnity * i);
    }
    ctx.font = "16px sans-serif";
    for (let i = 0; i < numOfDataPoints; i++) {
        if (selectedIndex % 2 == 0) {
            ctx.fillStyle = "#27a7d8";
        } else {
            ctx.fillStyle = "#ff9a00";
        }
        let barHeight = heightOfUnity * data.y.data[i] == 0 ? 3 + offset : (heightOfUnity * data.y.data[i] + Math.floor(largestDataPoint / 2));
        ctx.fillRect(widthOfUnity * i, canvas.height - barHeight, widthOfUnity - 1, barHeight - offset);
        ctx.fillStyle = "#000";
        ctx.fillText(data.x.data[i], widthOfUnity * i + (widthOfUnity / 4), canvas.height - 5);
    }


};

const clearData = () => {
    ctx.canvas.width = ctx.canvas.width;
};
const transitionToNewData = data => {
    //fade out
    document.getElementById("barGraphDiv").style.opacity = 0;
    document.getElementsByTagName("q")[0].style.opacity = 0;
    setTimeout(fadeOut, 1000, data);
    //clear data
    //set new data
    //fade in

};

const fadeOut = data => {
    showData(data);

    document.getElementById("barGraphDiv").style.opacity = 1;
    document.getElementsByTagName("q")[0].innerHTML = data.quote;
    document.getElementsByTagName("q")[0].style.opacity = 1;
};


const cycleLeft = evt => {
    cycle(-1);
};
const cycleRight = evt => {
    cycle(1);
};
const cycle = dir => {
    selectedIndex += dir;
    if (selectedIndex < 0) {
        selectedIndex = charts.length - 1;
    }
    if (selectedIndex >= charts.length) {
        selectedIndex = 0;
    }
    transitionToNewData(charts[selectedIndex]);
};

showData(charts[selectedIndex]);


document.getElementById("leftBtn").addEventListener("click", cycleLeft);
document.getElementById("rightBtn").addEventListener("click", cycleRight);

const footerText = document.getElementById("footerText");
footerText.addEventListener("mouseover", function () {
    footerText.style.opacity = 0;
    setTimeout(changeFooterText, 300);
});

const changeFooterText = () => {
    footerText.innerHTML = "Made by Ryan Unroe";
    footerText.style.opacity = 1;
};


footerText.addEventListener("mouseout", function () {
    footerText.style.opacity = 0;
    setTimeout(revertFooterText, 300);
});

const revertFooterText = () => {
    footerText.innerHTML = "Copyright &copy;2020 by Voyager Science";
    footerText.style.opacity = 1;
};