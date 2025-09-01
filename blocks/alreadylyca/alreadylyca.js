export default function decorate(block) {
  // Get the surrounding .alreadylyca-container
  const container = block.closest('.alreadylyca-container');

  // Get the two target wrappers
  const contentWrapper = container.querySelector('.default-content-wrapper');
  const alreadyLycaWrapper = container.querySelector('.alreadylyca-wrapper');

  // Create the new inner wrapper
  const innerWrapper = document.createElement('div');
  innerWrapper.classList.add('alreadylyca-inner-wrapper');

  // Insert the new wrapper before contentWrapper
  container.insertBefore(innerWrapper, contentWrapper);

  // Move both wrappers into the new inner wrapper
  innerWrapper.appendChild(contentWrapper);
  innerWrapper.appendChild(alreadyLycaWrapper);
}
