document.getElementById('cars').addEventListener('click', ({target}) => {
    if (target.classList.contains('more')) {
        const desc = target.parentElement.querySelector('.description');
        if (desc.style.display == 'block') {
            desc.style.display = 'none';
            target.textContet = 'Show more';
        } else {
            desc.style.display = 'block';
            target.textContet = 'Hide';
        }
    }
})