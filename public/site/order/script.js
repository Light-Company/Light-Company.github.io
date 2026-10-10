import { resolveOffer } from './checkout.mjs';

const features = {
  vision: { kicker: 'SEE THE STARTING CONDITIONS', title: 'A camera that\nchecks the scene.', description: 'Verify object position and task setup before the robot moves. Catch a misplaced object before it becomes a misleading result.' },
  projection: { kicker: 'PUT THE PLAN ON THE TABLE', title: 'The right setup.\nWritten in light.', description: 'Project object positions and task instructions directly into the workcell. Give your operators a clear physical reference for the next evaluation.' },
  placement: { kicker: 'MAKE THE WORKCELL YOUR BENCHMARK', title: 'One station.\nA shared starting point.', description: 'Configure Prism around your task, surface, and robot. Recreate a known condition or vary it deliberately to find where the policy succeeds and fails.' },
};

document.querySelectorAll('[data-feature]').forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.feature;
    const feature = features[key];
    if (!feature) return;
    document.querySelectorAll('[data-feature]').forEach(item => item.setAttribute('aria-pressed', String(item.dataset.feature === key)));
    document.querySelector('#feature-kicker').textContent = feature.kicker;
    const title = document.querySelector('#feature-title');
    title.replaceChildren();
    feature.title.split('\n').forEach((line, index) => {
      if (index) title.append(document.createElement('br'));
      title.append(document.createTextNode(line));
    });
    document.querySelector('#feature-description').textContent = feature.description;
  });
});

document.querySelectorAll('[data-gallery-src]').forEach(button => {
  button.addEventListener('click', () => {
    const photo = document.querySelector('#gallery-image');
    photo.src = button.dataset.gallerySrc;
    photo.alt = button.dataset.galleryAlt;
    document.querySelector('#gallery-note').textContent = button.dataset.galleryNote;
    document.querySelectorAll('[data-gallery-src]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  });
});

const motionButton = document.querySelector('[data-motion-toggle]');
motionButton?.addEventListener('click', () => {
  const paused = document.body.classList.toggle('motion-paused');
  motionButton.setAttribute('aria-pressed', String(paused));
  motionButton.textContent = paused ? 'Resume motion' : 'Pause motion';
});

async function loadOffer() {
  try {
    const response = await fetch('/site/order/offer.json', { cache: 'no-store' });
    if (!response.ok) return;
    const config = await response.json();
    const offer = resolveOffer(config);
    const checkout = document.querySelector('[data-checkout]');
    checkout.href = offer.url;
    document.querySelector('[data-checkout-label]').textContent = offer.label;
    document.querySelector('[data-offer-price]').textContent = offer.formattedPrice;
    if (offer.available) {
      document.querySelector('[data-offer-price-note]').textContent = config.kind === 'preorder' ? 'Prism preorder · USD' : 'Prism hardware · USD';
      document.querySelector('[data-checkout-note]').textContent = 'Continue to secure checkout with Stripe.';
    }
    if (typeof config.shippingSummary === 'string' && config.shippingSummary.trim()) {
      document.querySelector('[data-shipping-summary]').textContent = config.shippingSummary;
    }
    if (Array.isArray(config.includes) && config.includes.length) {
      const list = document.querySelector('[data-offer-inclusions]');
      list.replaceChildren();
      config.includes.filter(item => typeof item === 'string').forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        list.append(li);
      });
      list.hidden = !list.children.length;
    }
  } catch {
    // The server-rendered contact option remains usable if configuration cannot load.
  }
}

loadOffer();
