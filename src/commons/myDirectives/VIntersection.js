export default {
    name: 'intersection',
  // наблюдает за определенным тегом, при какой-то логике выполняет нужную ф-цию
  // например при достижении конца списка, подгрузит следующую страницу
  mounted(el, binding) {
    console.log("Директива VIntersection " + el, binding)
    console.log(binding.value)

    const options = {
      rootMargin: '0px',
      threshold: 1.0
    }
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting) {
        binding.value.onChangePage(binding.value.page)
      }
    }
    const observer = new IntersectionObserver(callback, options);
    observer.observe(el)
  },
}