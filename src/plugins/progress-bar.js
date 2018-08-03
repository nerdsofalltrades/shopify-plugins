import Plugin from '../common/plugin';

Plugin.register('progress-bar', (options = {}) => {
  const style = document.createElement('style');
  style.innerText = require('./progress-bar.css').toString();
  document.head.appendChild(style);

  process.env.NODE_ENV === 'development' && console.log('PLUGIN: I am the progress-bar plugin with options', options);
});
