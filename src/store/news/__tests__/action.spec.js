/* eslint-disable no-undef */
import {
  getArticlesPending,
  GET_ARTICLES_PENDING,
  getArticles
} from '../actions';

// jest.mock('firebase', () => ({

// }));

describe('news actions', () => {
  it("getArticlesPending returns and action with type", () => {
    const expected = {
      type: GET_ARTICLES_PENDING
    };
    const recived = getArticlesPending();
    expect(recived).toEqual(expected);
  });

  it("getArticles", async () => {
    fetchMock.mockOnce(
      "the next call fetch will always  return this as body"
    );
    await getArticles()(() => {})
  })
});