function loadContent(page, pushState = true) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'pages/' + page + '.html', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            document.getElementById('content').innerHTML = xhr.responseText;
            addHeader(page);
            updateHeaderStyle(page);
            
            // Modifier l'URL sans recharger la page
            if (pushState) {
                history.pushState({page: page}, null, '#' + page);
                localStorage.setItem('currentPage', page); // Sauvegarder l'état actuel
            }
        } else {
            // Rediriger vers la page de présentation avec une alerte
            alert("Cette page n'existe pas ou est mal orthographiée, vous revoici à l'accueil.");
            loadContent('acceuil', false); // Assurez-vous de ne pas empiler les états
        }
    };
    xhr.onerror = function() {
        // Gérer les erreurs de réseau
        alert("Erreur de chargement du contenu, vous revoici à l'accueil.");
        loadContent('acceuil', false); // Assurez-vous de ne pas empiler les états
    };
    xhr.send();
}

function updateHeaderStyle(page) {
    var header = document.querySelector('header');
    // Supprimer toutes les classes spécifiques aux pages
    header.classList.remove('header-acceuil', 'header-regles', 'header-scenarios', 'header-materiel');
    // Ajouter la classe spécifique à la page actuelle
    header.classList.add('header-' + page);
}

window.onpopstate = function(event) {
    if (event.state && event.state.page) {
        loadContent(event.state.page, false);
    }
};

// Charger la dernière page affichée à partir de localStorage ou de l'URL lors du chargement initial
document.addEventListener('DOMContentLoaded', function() {
    var currentPage = localStorage.getItem('currentPage') || location.hash.slice(1) || 'acceuil';
    loadContent(currentPage, false);
});

function addHeader(page) {
    // Supprimer les anciens liens CSS et scripts JS si présents
    var oldLinks = document.querySelectorAll('link[data-page], script[data-page]');
    oldLinks.forEach(function(link) {
        link.parentNode.removeChild(link);
    });

    // Ajouter le lien CSS spécifique
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/' + page + '.css';
    link.setAttribute('data-page', page);
    document.head.appendChild(link);

    // Ajouter le script JS spécifique
    var script = document.createElement('script');
    script.src = 'js/' + page + '.js';
    script.defer = true;
    script.setAttribute('data-page', page);
    document.head.appendChild(script);
}