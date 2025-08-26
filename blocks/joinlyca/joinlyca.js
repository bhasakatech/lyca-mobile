export default function decorate(block) {
  const rows = [...block.children];  
  const container = document.createElement('div');
  container.classList.add('lyca-cards');
  rows.forEach((row) => {
 
    const card = document.createElement('div');
    card.classList.add('lyca-card');
    const img = row.querySelector('img');
    const heading = row.querySelector('h3');
    const paragraph = row.querySelector('p');
    if (img) {
        card.appendChild(img);
    }
    if (heading) {  
  heading.classList.add('head');
  card.appendChild(heading);
}
    if (paragraph) {
            card.appendChild(paragraph);
    }
    container.appendChild(card);
    row.remove(); 
  });
  block.appendChild(container);
}
