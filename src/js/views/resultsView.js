import reviewView from './reviewView.js';

class ResultsView extends reviewView {
  holder = document.querySelector('.results');
  errorMessage = 'No recipes found for your query! Please try again!';
}
export default new ResultsView();
