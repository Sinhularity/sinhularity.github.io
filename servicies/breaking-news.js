
// Function to fetch and display news headlines from local JSON
async function fetchNewsHeadlines() {
    try {
        const response = await fetch('/assets/information/news.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const newsData = await response.json();
        displayNewsFromJSON(newsData);
        
    } catch (error) {
        console.error('Error fetching news:', error);
        displayFallbackNews();
    }
}

function displayNewsFromJSON(newsData) {
    const rightSection = document.querySelector('.topHeadlines .right');
    
    if (!rightSection) {
        console.error('Right section not found');
        return;
    }
    
    const newsItems = newsData.slice(0, 4);
    
    rightSection.innerHTML = `
        <div class="title">
            <h2>Noticias</h2>
        </div>
        <div class="topNews">
            ${newsItems.map((item, index) => {
                const newsItem = item.stories ? item.stories[0] : item;

                const title = newsItem.title || item.title;
                const source = newsItem.source?.name || 'Unknown Source';
                const link = newsItem.link;
                const thumbnail = newsItem.thumbnail || newsItem.thumbnail_small || '';
                const date = newsItem.date || '';
                
                return `
                    <div class="news" id="news-${index + 1}">
                        <div class="img" id="news-${index + 1}-img">
                            ${thumbnail ? (`<img src="${thumbnail}" alt="${title}">`) : ''}
                        </div>
                        <div class="text" id="news-${index + 1}-text">
                            <div class="title">
                                <a href="${link}" target="_blank">${title}</a>
                            </div>
                            <div class="source">
                                <small>${source}${date ? ` - ${formatDate(date)}` : ''}</small>
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}
                    
// Actual format is "08/24/2025, 08:02 AM, +0000 UTC"
function formatDate(dateString) {
    try {
        const datePart = dateString.split(',')[0]; // "08/24/2025"
        const date = new Date(datePart);
        return date.toLocaleDateString();
    } catch (error) {
        return dateString;
    }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', function() {
    fetchNewsHeadlines();
});
