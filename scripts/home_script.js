const pics = document.getElementById('pics');

let allPics = ['blueprints', 'portalGun', 'portalGun2', 'bluePrint', 'portalgundesign', 'portal-gunOrange'];
let count = 1;
pics.innerHTML = `<img id='pictureID' src='images/${allPics[0]}.jpg' />`;

const transition_fade_in = () => {
    pics.innerHTML = `<img id='pictureID' src='images/${allPics[count]}.jpg' />`;
    pics.style.opacity = 1;
};

const transition_image = () => {
    console.log(count);
    count = (count + 1) % allPics.length;
    // Fade out
    pics.style.opacity = 0;
    setTimeout(transition_fade_in, 510);
};

setInterval(transition_image, 5000);