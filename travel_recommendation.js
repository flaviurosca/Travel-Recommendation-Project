document.getElementById('btnSearch').addEventListener('click', function () {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();

    fetch('./travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const results = [];

            data.countries.forEach(country => {
                if (searchInput.includes(country.name.toLowerCase()) 
                    || searchInput.includes('country')
                    || searchInput.includes('countries')) {
                    country.cities.forEach(city => {
                        results.push({
                            name: city.name,
                            imageUrl: city.imageUrl,
                            description: city.description
                        });
                    });
                }
            });

            if (searchInput.includes('temple') || searchInput.includes('temples')) {
                data.temples.forEach(temple => {
                    results.push({
                        name: temple.name,
                        imageUrl: temple.imageUrl,
                        description: temple.description
                    });
                });
            }

            if (searchInput.includes('beach') || searchInput.includes('beaches')) {
                data.beaches.forEach(beach => {
                    results.push({
                        name: beach.name,
                        imageUrl: beach.imageUrl,
                        description: beach.description
                    });
                });
            }

            displayResults(results);
        })
        .catch(error => console.error('Error fetching data:', error));
});

document.getElementById('btnReset').addEventListener('click', function () {
    document.getElementById('searchInput').value = '';
    document.getElementById('results-container').innerHTML = '';
});

function displayResults(results) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    results.forEach(result => {
        const card = document.createElement('div');
        card.classList.add('result-card');
        
        const image = document.createElement('img');
        image.src = result.imageUrl;
        image.alt = result.name;
        
        const name = document.createElement('h3');
        name.textContent = result.name;
        
        const description = document.createElement('p');
        description.textContent = result.description;
        
        const visitButton = document.createElement('button');
        visitButton.textContent = 'Visit';
        visitButton.addEventListener('click', () => {
            window.location.href = './contact_us.html';
        });
        
        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(description);
        card.appendChild(visitButton);
        
        resultsContainer.appendChild(card);
    });
}
