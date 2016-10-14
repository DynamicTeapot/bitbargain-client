import React from 'react';
import { shallow } from 'enzyme';

import SearchResults from '../../app/components/search/SearchResults.jsx';
// import SearchResult from '../../app/components/searc/SearchResult.jsx';

describe('<SearchResults />', () => {
  it('should have an image to display the gravatar', () => {
    const wrapper = shallow(<SearchResults />);
    expect(wrapper.find('img')).to.have.length(1);
  });
});
