document.addEventListener('DOMContentLoaded', function () {
    let currentPageIndex = 0;

    function showProfile(profile) {
        document.getElementById('title').textContent = profile.title;
        document.getElementById('photo').src = profile.photo;
        document.getElementById('photo').alt = profile.alt;
        document.getElementById('description').textContent = profile.description;
        document.getElementById('instagram').href = profile.instagram;
        document.getElementById('linkedIn').href = profile.linkedIn;
    }

    function goToProfile(index) {
        const profile = content[index];
        showProfile(profile);
        currentPageIndex = index;
        updateButtonsState();
    }

    function updateButtonsState() {
        const pageButtons = document.querySelectorAll('#pages > button');
        for (let i = 0; i < pageButtons.length; i++) {
            pageButtons[i].classList.remove('active');
        }
        pageButtons[currentPageIndex].classList.add('active');

        const start = document.getElementById('start');
        const previous = document.getElementById('previous');
        const end = document.getElementById('end');
        const next = document.getElementById('next');

        start.disabled = currentPageIndex === 0;
        previous.disabled = currentPageIndex === 0;
        end.disabled = currentPageIndex === content.length - 1;
        next.disabled = currentPageIndex === content.length - 1;
    }

    function goToPreviousProfile() {
        if (currentPageIndex > 0) {
            goToProfile(currentPageIndex - 1);
        }
    }

    function goToNextProfile() {
        if (currentPageIndex < content.length - 1) {
            goToProfile(currentPageIndex + 1);
        }
    }

    document.getElementById('start').addEventListener('click', () => goToProfile(0));
    document.getElementById('end').addEventListener('click', () => goToProfile(content.length - 1));
    document.getElementById('previous').addEventListener('click', goToPreviousProfile);
    document.getElementById('next').addEventListener('click', goToNextProfile);

    const pageButtons = document.querySelectorAll('#pages > button');
    for (let i = 0; i < pageButtons.length; i++) {
        pageButtons[i].addEventListener('click', goToProfile.bind(null, i));
    }

    // Charger les données depuis le fichier JSON
    fetch('data/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            content = data; // Assurez-vous que content est une variable globale accessible à cet endroit
            showProfile(data[0]); // Afficher le premier profil après le chargement
            updateButtonsState();
        })
        .catch(error => {
            console.error('There was a problem fetching the data:', error);
        });
});
