let number = 1;
async function getFact() {
    if (number === 1) {
        const fact = await fetch('https://catfact.ninja/fact');
        const factJson = await fact.json();
        document.querySelectorAll('li').forEach(element => {
            if (element.textContent === factJson.fact) {
                getFact();
                return;
            }
        });
        createLi(factJson.fact);
    } else {
        const factList = await fetch(`https://catfact.ninja/facts/?limit=${number}`);
        const factListJson = await factList.json();
        factListJson.data.forEach(element => {
            document.querySelectorAll('li').forEach(item => {
                if (item.textContent === element.fact) {
                    getFact();
                    return;
                }
            });
        });
        factListJson.data.forEach(element => {
            createLi(element.fact);
        });
    }
}

function createLi(text) {
    const li = document.createElement('li');
    li.textContent = text
    document.querySelector('ul').append(li);
}

function removeLastFact() {
    for (let i = 1; i <= number; i++) {
        if (document.querySelector('ul').lastElementChild) {
            document.querySelector('ul').lastElementChild.remove();
        }
    }
}

function changeButtons() {
    const numberValue = document.querySelector('input').value;
    document.querySelectorAll('.number').forEach(element => {
        element.textContent = numberValue;
    });
    number = Number(numberValue);
}

function initPage() {
    const factsArray = ["70% of your cat's life is spent asleep.", "The cat has 500 skeletal muscles (humans have 650)."]
    factsArray.forEach(element => {
        createLi(element);
    });
}
window.addEventListener('load', () => initPage());
document.getElementById('add-fact').addEventListener('click', () => getFact());
document.getElementById('remove-fact').addEventListener('click', () => removeLastFact());
document.querySelector('input').addEventListener('input', () => changeButtons());