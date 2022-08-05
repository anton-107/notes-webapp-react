import * as React from 'react';
import {create} from 'react-test-renderer';
import {App} from '../src/app';

describe('App', () => {
  it("should render a header", () => {
    const component = create(<App name='anonymous' />);
    const tree = component.toTree();
    expect(tree).toMatchSnapshot();
    expect(component.root.findByType('h1').children[1]).toContain('anonymous');
    
  });
});