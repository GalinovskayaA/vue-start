export default {
  name: 'super-focus',
  mounted(el) {
   // el.focus(el);
    const options = {
      rootMargin: '0px',
      threshold: 1.0
    }
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting) {
        el.focus();
      }
    }
    const observer = new IntersectionObserver(callback, options);
    observer.observe(el)
  }
}