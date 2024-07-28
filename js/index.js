function loadContent(page) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'pages/' + page + '.html', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            document.getElementById('content').innerHTML = xhr.responseText;
            // Ajouter le header avec les liens CSS et JS spécifiques
            addHeader(page);
        } else {
            document.getElementById('content').innerHTML = '<p>Erreur de chargement du contenu</p>';
        }
    };
    xhr.send();
}

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