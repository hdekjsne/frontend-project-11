export default state = {
  elements: {
    core: {
      input: document.querySelector('#url-input'),
      submitBtn: document.querySelector('button[type=submit]'),
      feedbackP: document.querySelector('p.feedback'),
    },
    posts: {
      container: document.querySelector('.posts'),
      ul: undefined,
    },
    feeds: {
      container: document.querySelector('.feeds'),
      ul: undefined,
    },
    modal: {
      modalTitle: document.querySelector('.modal-title'),
      modalBody: document.querySelector('.modal-body'),
      modalBtn: document.querySelector('.modal-footer a'),
      infoLi: undefined,
    }
  },
  app: {
    state: 'welcome',
    errors: [],
  },
  input: {
    state: 'empty',
    enable: true,
    feeds: [],
  },
};
