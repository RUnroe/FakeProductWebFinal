table_elements = document.getElementsByClassName('table_element');

const table_mouseover_handler_orange = evt => {
    evt.target.style.backgroundColor = 'var(--color-orange)';
};

const table_mouseover_handler_blue = evt => {
    evt.target.style.backgroundColor = 'var(--color-blue)';
};

const table_mouseout_handler = evt => {
    evt.target.style.backgroundColor = 'var(--color-light)';
};

// Set up event listeners on table elements
for (let i = 0; i < table_elements.length; i++) {
    // Make the left elements orange and the right elements blue
    if (i % 2 == 0)
        table_elements[i].addEventListener('mouseover', table_mouseover_handler_blue);
    else
        table_elements[i].addEventListener('mouseover', table_mouseover_handler_orange);
    table_elements[i].addEventListener('mouseout', table_mouseout_handler);
}

const subcos = (x, k) => {
    return 1 - Math.cos(Math.PI * k * x);
};

// Use a recursive sinusoidal curve to have clean animation
const table_fade = t => {
    t = t / 1000;
    if (t <= 0) return 0;
    else if (t >= 1) return table_elements.length * 16;
    else return table_elements.length * 8 * subcos(subcos(t, 1), 0.5);
};

const update_table_height = h => {
    document.getElementById('spec_table').style.height = h + 'px';
};


// With everything set up, now we fade in the table using spaced timeouts.
window.onload = evt => {
    for (let i = 1; i <= 100; i++) {
        setTimeout(_evt => {
            update_table_height(table_fade(i * 10));
        }, i * 10 + 100);
    }
};