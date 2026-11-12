const img = document.getElementById("runaway-img");
const linksList = document.getElementById("links-list");
const statusText = document.getElementById("status");

let isCaught = false;

const articles = [
    { title: "Бесхвостые земноводные", articleUrl: "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D1%81%D1%85%D0%B2%D0%BE%D1%81%D1%82%D1%8B%D0%B5_%D0%B7%D0%B5%D0%BC%D0%BD%D0%BE%D0%B2%D0%BE%D0%B4%D0%BD%D1%8B%D0%B5" },
    { title: "Древолазы", articleUrl: "https://ru.wikipedia.org/wiki/%D0%94%D1%80%D0%B5%D0%B2%D0%BE%D0%BB%D0%B0%D0%B7%D1%8B" },
    { title: "Квакши", articleUrl: "https://ru.wikipedia.org/wiki/%D0%9A%D0%B2%D0%B0%D0%BA%D1%88%D0%B8" },
    { title: "Австралийские квакши", articleUrl: "https://ru.wikipedia.org/wiki/%D0%90%D0%B2%D1%81%D1%82%D1%80%D0%B0%D0%BB%D0%B8%D0%B9%D1%81%D0%BA%D0%B8%D0%B5_%D0%BA%D0%B2%D0%B0%D0%BA%D1%88%D0%B8" },
    { title: "Лягушка-голиаф", articleUrl: "https://ru.wikipedia.org/wiki/%D0%9B%D1%8F%D0%B3%D1%83%D1%88%D0%BA%D0%B0-%D0%B3%D0%BE%D0%BB%D0%B8%D0%B0%D1%84" }
];

function moveFrogRandomly() {
    const maxX = window.innerWidth - (img.offsetWidth || 200);
    const maxY = window.innerHeight - (img.offsetHeight || 200);
    img.style.left = Math.max(0, Math.random() * maxX) + 'px';
    img.style.top = Math.max(0, Math.random() * maxY) + 'px';
}

moveFrogRandomly();

document.addEventListener("mousemove", (event) => {
    if (isCaught) return;

    const imgRect = img.getBoundingClientRect();
    const imgX = imgRect.left + imgRect.width / 2;
    const imgY = imgRect.top + imgRect.height / 2;
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const distanceX = imgX - mouseX;
    const distanceY = imgY - mouseY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    const runRadius = 100; 

    if (distance < runRadius) {
        const maxX = window.innerWidth - imgRect.width;
        const maxY = window.innerHeight - imgRect.height;

        let newX = Math.random() * maxX;
        let newY = Math.random() * maxY;

        if (Math.abs(newX - mouseX) < runRadius) {
            newX = (newX + runRadius * 2) % maxX;
        }
        if (Math.abs(newY - mouseY) < runRadius) {
            newY = (newY + runRadius * 2) % maxY;
        }

        img.style.left = `${Math.max(0, newX)}px`;
        img.style.top = `${Math.max(0, newY)}px`;
    }
});

function getRandomArticleFromList() {
    const randomIndex = Math.floor(Math.random() * articles.length);
    const selectedArticle = articles.splice(randomIndex, 1)[0];
    return selectedArticle;
}

img.addEventListener("click", () => {
    if (isCaught) return;
    const article = getRandomArticleFromList();
    isCaught = true;
    img.style.opacity = "0.5";

    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = article.articleUrl;
    link.textContent = article.title;
    link.target = "_blank";

    link.addEventListener("click", () => {
        if (articles.length === 0) {
            statusText.textContent = "Это была последняя статья. Все ссылки открыты.";
            img.style.opacity = "0.3";
            img.style.cursor = "default"
            return;
        }
        isCaught = false;
        img.style.opacity = "1";
        statusText.textContent = `Лягушка сбежала! Осталось статей: ${articles.length}. Поймай её снова.`;
        moveFrogRandomly();
    });

    li.appendChild(link);
    linksList.appendChild(li);

    statusText.textContent = "Пройди по новой ссылке, чтобы прочитать.";
});