import { render } from '@testing-library/react';
import { Button } from '../Button';

describe('<Button />', () => {
  it('render with props', () => {
    const { getByText, debug } = render(
      <Button loading={false} actionText={'test button'} />
    );
    getByText('test button');
  });

  it('button text "loading", has custom class', () => {
    const { getByText, container, debug } = render(
      <Button loading={true} actionText={'test button'} customClass={'my_class'} />
    );
    getByText('Loading');
    expect(container.firstChild).toHaveClass('my_class');
  });
});